// Screenshots every store in scripts/stores.csv → public/img/stores/<domain>.jpg + data/stores.json
// Usage: node scripts/shoot-stores.mjs            (all)
//        node scripts/shoot-stores.mjs --only a.com,b.com   (re-shoot some)
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CSV = path.join(ROOT, "scripts", "stores.csv");
const OUT_DIR = path.join(ROOT, "public", "img", "stores");
const JSON_OUT = path.join(ROOT, "data", "stores.json");
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);
const TIMEOUT = 30_000;
const QUALITY = Number(process.env.JPG_QUALITY || 78);

// ── CSV ──
function parseCsv(text) {
  const rows = [];
  let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cur); cur = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
    } else cur += ch;
  }
  row.push(cur);
  if (row.some((c) => c.trim())) rows.push(row);
  const [head, ...body] = rows;
  const keys = head.map((h) => h.replace(/^﻿/, "").trim().toLowerCase());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? "").trim()])));
}

// accept other sheet layouts too (e.g. websitelink / Platform type / Date / Task)
const pick = (r, keys) => { for (const k of keys) if (r[k]) return r[k]; return ""; };
const URL_KEYS = ["url", "websitelink", "website link", "website", "link", "store", "store url", "domain", "site"];
export function normalizeRows(rows) {
  return rows.map((r) => {
    let url = pick(r, URL_KEYS).split(/\s+/)[0] || "";
    url = url.replace(/[)\],;]+$/, "");
    return {
      url,
      platform_hint: pick(r, ["platform_hint", "platform type", "platform"]),
      month: pick(r, ["month", "date"]),
      work: pick(r, ["work", "task", "notes"]),
    };
  }).filter((r) => /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/.*)?$/i.test(r.url) && !/figma\.com|google\.com|drive\./i.test(r.url));
}

const PLATFORM_HOSTS = /^(www\.)?(salla\.sa|zid\.store|zid\.sa)$/i;
const toUrl = (u) => {
  const x = new URL(/^https?:\/\//i.test(u) ? u : `https://${u}`);
  if (PLATFORM_HOSTS.test(x.hostname)) return `${x.origin}/${x.pathname.split("/")[1] || ""}`; // salla.sa/<store>
  return `${x.origin}/`; // public homepage only (never wp-admin, product pages, etc.)
};
const domainOf = (u) => new URL(toUrl(u)).hostname.replace(/^www\./, "").toLowerCase();

// ── detection ──
function detectPlatform(html, scripts, globals) {
  const blob = (html + " " + scripts.join(" ")).toLowerCase();
  if (globals.salla || /cdn\.salla\.network|salla\.sa|salla\.cloud|assets\.salla/.test(blob)) return "salla";
  if (globals.zid || /zid\.store|zidcdn|assets\.zid|media\.zid|zid\.sa\b|cdn\.zid/.test(blob)) return "zid";
  if (globals.shopify || /cdn\.shopify\.com|shopify\.com\/s\/files|myshopify\.com/.test(blob)) return "shopify";
  if (/rekaz/.test(blob)) return "rekaz";
  if (/wp-content|wp-includes/.test(blob)) return "wordpress";
  return "other";
}
const normHint = (h) => {
  h = (h || "").toLowerCase();
  for (const p of ["salla", "zid", "shopify", "wordpress", "rekaz"]) if (h.includes(p)) return p;
  return "";
};

const CLOSED_RE = [
  /المتجر\s*(مغلق|مقفل|متوقف)/, /المتجر تحت الصيانة|تحت الصيانة|وضع الصيانة|صيانة/,
  /store is (closed|unavailable)|store (is )?under maintenance|maintenance mode|under construction/i,
  /opening soon|enter store using password|this store is password protected|password-page/i,
  /domain (is )?for sale|buy this domain|this domain may be for sale|هذا (النطاق|الدومين) للبيع/i,
  /this store is unavailable|store unavailable|المتجر غير متاح|متجر غير متوفر/i,
  /تم تغيير رابط هذا المتجر|store (link|url) (has )?(been )?changed/i,
];

const HIDE_CSS = `
*,*::before,*::after{transition:none!important;animation-duration:.001s!important;animation-delay:0s!important;caret-color:transparent!important}
:is([class*="cookie" i],[id*="cookie" i],[class*="newsletter" i],[id*="newsletter" i],
[class*="modal" i],[id*="modal" i],[class*="popup" i],[id*="popup" i],[class*="consent" i],
[aria-modal="true"],[role="dialog"]):not(html):not(body){display:none!important}
html,body{overflow:auto!important}`;

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// share of pixels close to the most common colour (0..1) — 1 = blank/flat screenshot
async function uniformity(buf) {
  const { data, info } = await sharp(buf).resize(48, 30, { fit: "fill" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height, px = [];
  for (let i = 0; i < n; i++) px.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]);
  const bins = new Map();
  for (const [r, g, b] of px) { const k = `${r >> 4},${g >> 4},${b >> 4}`; bins.set(k, (bins.get(k) || 0) + 1); }
  const top = [...bins.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map((v) => Number(v) * 16 + 8);
  const close = px.filter(([r, g, b]) => Math.abs(r - top[0]) + Math.abs(g - top[1]) + Math.abs(b - top[2]) < 40).length;
  return +(close / n).toFixed(3);
}

async function shoot(browser, row) {
  const url = toUrl(row.url);
  const domain = domainOf(row.url);
  const rec = {
    domain, src: domain, url, platform_hint: row.platform_hint || "", month: row.month || "", work: row.work || "",
    status: "down", platform: normHint(row.platform_hint) || "other", detected: false,
    title: "", description: "", siteName: "", lang: "", finalUrl: "", img: "", uniform: null, reason: "",
  };
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: "ar-SA", ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  page.setDefaultTimeout(TIMEOUT);
  try {
    let res;
    try {
      res = await page.goto(url, { waitUntil: "load", timeout: TIMEOUT });
    } catch (e) {
      // slow 'load' — accept whatever DOM we have if it got that far
      if (!/Timeout/i.test(e.message) || !(await page.evaluate(() => document.body?.innerText?.length || 0).catch(() => 0))) throw e;
    }
    const code = res?.status() ?? 0;
    rec.finalUrl = page.url();
    const fin = new URL(rec.finalUrl);
    const finHost = fin.hostname.replace(/^www\./, "").toLowerCase();
    if (finHost && finHost !== domain && !PLATFORM_HOSTS.test(finHost) && !/login|auth|accounts\./.test(finHost)) {
      rec.domain = finHost; rec.url = `${fin.origin}/`;
    }
    await page.waitForTimeout(4000);
    await page.addStyleTag({ content: HIDE_CSS }).catch(() => {});
    await page.keyboard.press("Escape").catch(() => {});
    await page.evaluate(async () => {
      window.scrollTo(0, 1400); await new Promise((r) => setTimeout(r, 700));
      window.scrollTo(0, 2800); await new Promise((r) => setTimeout(r, 700));
      window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 900));
    }).catch(() => {});

    const info = await page.evaluate(() => {
      const meta = (sel) => document.querySelector(sel)?.getAttribute("content")?.trim() || "";
      return {
        html: document.documentElement.outerHTML.slice(0, 600000),
        scripts: [...document.scripts].map((s) => s.src).filter(Boolean),
        globals: { salla: !!window.salla, zid: !!window.zid, shopify: !!window.Shopify },
        title: document.title.trim(),
        description: meta('meta[name="description"]') || meta('meta[property="og:description"]'),
        siteName: meta('meta[property="og:site_name"]'),
        lang: document.documentElement.lang || "",
        text: (document.body?.innerText || "").trim().slice(0, 4000),
        path: location.pathname,
      };
    });
    Object.assign(rec, { title: info.title, description: info.description, siteName: info.siteName, lang: info.lang });
    const det = detectPlatform(info.html, info.scripts, info.globals);
    if (det !== "other") { rec.platform = det; rec.detected = true; }

    const buf = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1440, height: 900 } });
    await sharp(buf).resize(960, 600).jpeg({ quality: QUALITY, mozjpeg: true }).toFile(path.join(OUT_DIR, `${rec.domain}.jpg`));
    rec.img = `/img/stores/${rec.domain}.jpg`;
    rec.uniform = await uniformity(buf);

    const hay = `${info.title}\n${info.text.slice(0, 1500)}`;
    if (code >= 400) { rec.status = "down"; rec.reason = `HTTP ${code}`; }
    else if (/\/password\b/.test(info.path)) { rec.status = "closed"; rec.reason = "Shopify password page"; }
    else if (info.text.length < 40) { rec.status = "closed"; rec.reason = "empty page"; }
    else {
      const hit = CLOSED_RE.find((re) => re.test(hay));
      if (hit) { rec.status = "closed"; rec.reason = `matched ${hit.source.slice(0, 40)}`; }
      else rec.status = "ok";
    }
  } catch (e) {
    rec.status = "down";
    rec.reason = e.message.split("\n")[0].slice(0, 140);
  } finally {
    await ctx.close().catch(() => {});
  }
  return rec;
}

async function main() {
  const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1].split(",").map((d) => d.trim().toLowerCase()) : null;
  const rows = normalizeRows(parseCsv(await fs.readFile(CSV, "utf8")));
  if (!rows.length) { console.log("No store URLs found in stores.csv (need a url / websitelink column)."); process.exit(2); }
  const seen = new Set();
  let list = rows.filter((r) => { try { const d = domainOf(r.url); if (seen.has(d)) return false; seen.add(d); return true; } catch { return false; } });
  if (only) list = list.filter((r) => only.includes(domainOf(r.url)));
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(JSON_OUT), { recursive: true });

  // SKIP_DONE=1 → only shoot stores that aren't in data/stores.json yet (keeps the old results)
  const skip = process.env.SKIP_DONE === "1" && !only;
  let prev = [];
  if (only || skip) prev = JSON.parse(await fs.readFile(JSON_OUT, "utf8").catch(() => "[]"));
  if (skip) {
    const had = new Set(prev.flatMap((p) => [p.domain, p.src]).filter(Boolean));
    const before = list.length;
    list = list.filter((r) => !had.has(domainOf(r.url)));
    console.log(`Skipping ${before - list.length} stores already shot · ${list.length} new`);
  }

  const save = async () => {
    const got = results.filter(Boolean);
    const doneSet = new Set(got.map((r) => r.domain));
    const base = only || skip ? prev.filter((p) => !doneSet.has(p.domain) && !(only || []).includes(p.domain)) : [];
    const uniq = new Map(); for (const r of [...base, ...got]) uniq.set(r.domain, r);
    await fs.writeFile(JSON_OUT, JSON.stringify([...uniq.values()], null, 2));
  };
  const browser = await chromium.launch({ headless: true });
  const results = new Array(list.length);
  let next = 0, done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < list.length) {
      const i = next++;
      results[i] = await shoot(browser, list[i]).catch((e) => ({ domain: domainOf(list[i].url), src: domainOf(list[i].url), status: "down", reason: String(e) }));
      done++;
      const r = results[i];
      if (done % 5 === 0) await save();
      console.log(`[${String(done).padStart(3)}/${list.length}] ${r.status.padEnd(6)} ${(r.platform || "").padEnd(9)} ${r.domain}${r.reason ? "  · " + r.reason : ""}`);
    }
  }));
  await browser.close();

  await save();
  const merged = JSON.parse(await fs.readFile(JSON_OUT, "utf8"));

  const tally = (k) => merged.reduce((a, r) => ((a[r[k]] = (a[r[k]] || 0) + 1), a), {});
  console.log("\n── Summary ──");
  console.log("Total:", merged.length);
  console.log("Status:", tally("status"));
  console.log("Platform:", tally("platform"));
  console.log("Wrote", path.relative(ROOT, JSON_OUT));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) && !process.argv.includes("--count"))
  main().catch((e) => { console.error(e); process.exit(1); });
else if (process.argv.includes("--count")) {
  const rows = normalizeRows(parseCsv(await fs.readFile(CSV, "utf8")));
  console.log(new Set(rows.map((r) => domainOf(r.url))).size);
}
