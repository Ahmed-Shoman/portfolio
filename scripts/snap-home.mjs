// dev helper: node scripts/snap-home.mjs <outPrefix>  → desktop + mobile shots of the stores area
import { chromium } from "playwright";
const out = process.argv[2] || "snap";
const b = await chromium.launch();
for (const [tag, vp, mobile] of [["desktop", { width: 1440, height: 900 }, false], ["mobile", { width: 390, height: 844 }, true]]) {
  const p = await b.newPage({ viewport: vp, isMobile: mobile, deviceScaleFactor: mobile ? 2 : 1 });
  await p.goto("http://localhost:3077/", { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important}.header,.wa-fab,nextjs-portal{display:none!important}" });
  const sel = (await p.$("#stores")) ? "#stores" : "#process";
  const el = await p.$(sel);
  await el.scrollIntoViewIfNeeded();
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
  await p.waitForTimeout(800);
  if (sel === "#stores") await el.screenshot({ path: `${out}-${tag}.png` });
  else {
    const box = await el.boundingBox();
    await p.evaluate((y) => window.scrollTo(0, y), box.y + (await p.evaluate(() => scrollY)) - vp.height * 0.45);
    await p.waitForTimeout(400);
    await p.screenshot({ path: `${out}-${tag}.png` });
  }
  const sw = await p.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
  console.log(tag, "scrollWidth/innerWidth", sw);
}
await b.close();
