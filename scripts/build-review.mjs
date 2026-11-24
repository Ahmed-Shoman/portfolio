// data/stores.json → scripts/review.html (+ data/stores-review.json with included/excluded + reasons)
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stores = JSON.parse(await fs.readFile(path.join(ROOT, "data", "stores.json"), "utf8"));
const MANUAL = path.join(ROOT, "scripts", "manual-excluded.json"); // optional: ["domain.com", ...]
const manual = new Set(JSON.parse(await fs.readFile(MANUAL, "utf8").catch(() => "[]")));

// hand-checked names/types: { "domain.com": { "name": "...", "type": "..." } }
const OVR = JSON.parse(await fs.readFile(path.join(ROOT, "scripts", "store-overrides.json"), "utf8").catch(() => "{}"));
const KEEP = new Set(["salla", "zid", "shopify"]);
const GENERIC = /^(home|homepage|الرئيسية|الصفحة الرئيسية|متجر|store|shop|online store|المتجر الإلكتروني|welcome|مرحبا.*)$/i;

export function cleanName(r) {
  const cand = [r.siteName, ...(r.title || "").split(/\s[|\-–—:•·]\s|\s?\|\s?/)]
    .map((s) => (s || "").replace(/\s+/g, " ").trim())
    .filter((s) => s && s.length <= 40 && !GENERIC.test(s));
  if (cand.length) return cand[0];
  const d = r.domain.split(".")[0];
  return d.charAt(0).toUpperCase() + d.slice(1);
}

const TYPES = [
  ["Abayas", /عباي|abaya|جلابي|طرح|حجاب|hijab/i],
  ["Perfume", /عطر|عطور|perfum|fragrance|parfum|\boud\b|عود|بخور|دخون|مسك|musk/i],
  ["Beauty", /تجميل|مكياج|makeup|beauty|cosmetic|بشرة|skin ?care|عناية|شعر|hair|رموش|lashes|أظافر|nails/i],
  ["Jewelry", /مجوهرات|ذهب|jewel|gold|فضة|silver|خواتم|ring|ساعات|watch|اكسسوار|إكسسوار|accessor/i],
  ["Electronics", /الكترون|إلكترون|electronic|جوال|جوالات|mobile|phone|اجهزة|أجهزة|gaming|قيمنق|tech|شواحن|charger|سماعات/i],
  ["Coffee", /قهوة|كوفي|coffee|محمصة|roaster|مختصة|espresso/i],
  ["Honey & Dates", /عسل|honey|تمر|تمور|dates/i],
  ["Kids", /أطفال|اطفال|طفل|kids|baby|بيبي|مواليد|ألعاب|العاب|toys/i],
  ["Home", /منزل|مفروشات|home|furniture|اثاث|أثاث|ديكور|decor|مطبخ|kitchen|سجاد|مفارش|bedding|أواني/i],
  ["Gifts", /هدايا|هدية|gift|ورد|زهور|flower|تنسيق/i],
  ["Sweets", /حلويات|حلا|شوكولا|chocolate|sweets|كيك|cake|بسكويت|cookies/i],
  ["Food", /مكسرات|nuts|بهارات|spices|food|أغذية|اغذية|لحوم|meat|تموينات|grocery/i],
  ["Health", /مكملات|supplement|vitamin|فيتامين|صحة|health|طبي|medical|صيدلية|pharmacy/i],
  ["Pets", /\bpets?\b|حيوانات|قطط|كلاب|أليف/i],
  ["Sports", /رياض|sport|fitness|جيم|gym/i],
  ["Fashion", /ملابس|أزياء|ازياء|fashion|clothing|wear|فساتين|dress|شنط|حقائب|bags|أحذية|احذية|shoes|قمصان|ثياب|ثوب|بوتيك|boutique/i],
];
export function storeType(r) {
  const hay = `${r.work || ""} ${r.siteName} ${r.title} ${r.description} ${r.domain}`;
  return (TYPES.find(([, re]) => re.test(hay)) || ["Store"])[0];
}

const rows = stores.map((r) => {
  let why = "";
  if (r.status === "down") why = `down${r.reason ? ` (${r.reason})` : ""}`;
  else if (r.status === "closed") why = `closed${r.reason ? ` (${r.reason})` : ""}`;
  else if (!r.img) why = "no screenshot";
  else if (r.uniform != null && r.uniform >= 0.9) why = `blank / one colour (${Math.round(r.uniform * 100)}%)`;
  else if (!KEEP.has(r.platform)) why = `platform: ${r.platform}`;
  else if (manual.has(r.domain)) why = "removed by hand";
  return { ...r, name: OVR[r.domain]?.name || cleanName(r), type: OVR[r.domain]?.type || storeType(r), excluded: why };
});

const included = rows.filter((r) => !r.excluded);
const excluded = rows.filter((r) => r.excluded);
await fs.writeFile(
  path.join(ROOT, "data", "stores-review.json"),
  JSON.stringify({
    included: included.map(({ domain, url, name, type, platform, img }) => ({ domain, url, name, type, platform, img })),
    excluded: excluded.map(({ domain, platform, status, excluded: why }) => ({ domain, platform, status, why })),
  }, null, 2),
);

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const count = (arr, p) => arr.filter((r) => r.platform === p).length;
const card = (r) => `
<article class="c${r.excluded ? " x" : ""}" data-d="${esc(r.domain)}" data-p="${esc(r.platform)}" data-s="${r.excluded ? "out" : "in"}">
  <a href="${esc(r.url)}" target="_blank" rel="noreferrer" class="img">${r.img ? `<img loading="lazy" src="../public${esc(r.img)}" alt="">` : `<div class="noimg">no screenshot</div>`}</a>
  <div class="meta">
    <b>${esc(r.name)}</b>
    <span class="chip p-${esc(r.platform)}">${esc(r.platform)}</span><span class="chip">${esc(r.type)}</span><span class="chip st-${esc(r.status)}">${esc(r.status)}</span>
    <small>${esc(r.domain)}${r.month ? ` · ${esc(r.month)}` : ""}</small>
    ${r.excluded ? `<em>${esc(r.excluded)}</em>` : `<label><input type="checkbox" class="rm"> remove</label>`}
  </div>
</article>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Stores review</title>
<style>
:root{--ivory:#fff4ec;--ink:#14160d;--lime:#d1e030;--mint:#9eef80;--gold:#fbd535;--sage:#9fcd7a}
*{box-sizing:border-box}body{margin:0;font:13px/1.5 "JetBrains Mono",Consolas,monospace;background:var(--ivory);color:var(--ink)}
header{position:sticky;top:0;z-index:5;background:var(--ivory);border-bottom:2px solid var(--ink);padding:14px 24px;display:flex;gap:14px;flex-wrap:wrap;align-items:center}
h1{font:700 22px Oswald,Arial Narrow,sans-serif;text-transform:uppercase;margin:0 12px 0 0}
button{font:inherit;font-weight:700;border:2px solid var(--ink);border-radius:999px;background:#fff;padding:6px 14px;cursor:pointer}
button.on{background:var(--lime)}.stat{opacity:.7}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px;padding:24px}
.c{border:2px solid var(--ink);border-radius:12px;overflow:hidden;background:#fff}
.c.x{opacity:.55}.c.rmv{opacity:.35;outline:3px solid #e0533d}
.img img,.noimg{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;border-bottom:2px solid var(--ink)}
.noimg{display:grid;place-items:center;background:#eee}
.meta{padding:10px 12px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.meta b{width:100%;font-size:15px}.meta small{width:100%;opacity:.6}.meta em{width:100%;color:#b3261e;font-style:normal;font-weight:700}
.chip{font-size:10px;font-weight:700;text-transform:uppercase;border:1.5px solid var(--ink);border-radius:999px;padding:2px 8px}
.p-salla{background:#bff3e3}.p-zid{background:#e3d4ff}.p-shopify{background:#d5f5b0}.st-down,.st-closed{background:#ffd0c8}
label{cursor:pointer;font-weight:700}
</style></head><body>
<header>
  <h1>Stores review</h1>
  <span class="stat">In: <b id="nin">${included.length}</b> (Salla ${count(included, "salla")} · Zid ${count(included, "zid")} · Shopify ${count(included, "shopify")}) — Out: ${excluded.length}</span>
  <span style="flex:1"></span>
  <button data-f="in" class="on">Included</button><button data-f="out">Excluded</button><button data-f="all">All</button>
  <button id="copy">Copy removed list</button>
</header>
<main>${[...included, ...excluded].map(card).join("")}</main>
<script>
const KEY="stores-review-removed",removed=new Set(JSON.parse(localStorage.getItem(KEY)||"[]"));
const cards=[...document.querySelectorAll(".c")];
const sync=()=>{cards.forEach(c=>{const b=c.querySelector(".rm");if(!b)return;b.checked=removed.has(c.dataset.d);c.classList.toggle("rmv",b.checked)});
  document.getElementById("nin").textContent=${included.length}-removed.size;localStorage.setItem(KEY,JSON.stringify([...removed]))};
document.addEventListener("change",e=>{if(!e.target.classList.contains("rm"))return;const d=e.target.closest(".c").dataset.d;e.target.checked?removed.add(d):removed.delete(d);sync()});
document.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-f]").forEach(x=>x.classList.toggle("on",x===b));
  cards.forEach(c=>c.hidden=b.dataset.f!=="all"&&c.dataset.s!==b.dataset.f)});
document.querySelector("[data-f=in]").click();
document.getElementById("copy").onclick=async()=>{const t=JSON.stringify([...removed],null,1);try{await navigator.clipboard.writeText(t);alert("Copied "+removed.size+" domains.\\nSave as scripts/manual-excluded.json (or paste in the app).")}catch{prompt("Copy:",t)}};
sync();
</script></body></html>`;

const out = path.join(ROOT, "scripts", "review.html");
await fs.writeFile(out, html);
console.log(`review: ${pathToFileURL(out).href}`);
console.log(`included ${included.length} (salla ${count(included, "salla")}, zid ${count(included, "zid")}, shopify ${count(included, "shopify")}) · excluded ${excluded.length}`);
