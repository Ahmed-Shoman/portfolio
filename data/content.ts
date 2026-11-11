// ─────────────────────────────────────────────────────────────
//  All site content lives here, in English (en) and Arabic (ar).
//  Edit this file only to change text.
//  Every number comes from a real ads / Salla screenshot (names hidden).
// ─────────────────────────────────────────────────────────────

export type Lang = "en" | "ar";
export type ProjColor = "lime" | "mint" | "gold" | "olive";
export type WorkCat = "Snapchat" | "TikTok" | "Google" | "Store";

// Shared (same in both languages)
export const shared = {
  logo: "AYMAN",
  email: "", // add an email here to show it in the footer
  github: "", // add a GitHub username here to show it in the footer
  // TODO: your WhatsApp number in international format, digits only (e.g. 2010xxxxxxxx)
  whatsapp: "201026830756",
  year: 2026,
  photo: "/img/hero-ayman.png",
};

// ─── Case studies grid: links and images are shared, text is per language ───
// `url` is only shown in the little browser bar above each screenshot.
const workBase: { key: string; name: string; cat: WorkCat; url: string; img: string }[] = [
  { key: "snap-scale", name: "Snapchat · 7.51× ROAS", cat: "Snapchat", url: "https://ads.snapchat.com", img: "/img/work/snap-scale.jpg" },
  { key: "snap-launch", name: "Snapchat · 10.6× ROAS", cat: "Snapchat", url: "https://ads.snapchat.com", img: "/img/work/snap-launch.jpg" },
  { key: "tiktok-longrun", name: "TikTok · 257K SAR", cat: "TikTok", url: "https://ads.tiktok.com", img: "/img/work/tiktok-longrun.jpg" },
  { key: "tiktok-sprint", name: "TikTok · 7.23× ROAS", cat: "TikTok", url: "https://ads.tiktok.com", img: "/img/work/tiktok-sprint.jpg" },
  { key: "tiktok-september", name: "TikTok · 64K in 30 days", cat: "TikTok", url: "https://ads.tiktok.com", img: "/img/work/tiktok-september.jpg" },
  { key: "google-shopping", name: "Google Ads · 9.85× ROAS", cat: "Google", url: "https://ads.google.com", img: "/img/work/google-shopping.jpg" },
  { key: "salla-growth", name: "Salla · 100K month", cat: "Store", url: "https://s.salla.sa", img: "/img/work/salla-growth.jpg" },
];

const workText: Record<Lang, Record<string, { desc: string; tags: string[] }>> = {
  en: {
    "snap-scale": { desc: "SAR 27.6K of Snapchat spend turned into SAR 207.7K in sales: 940 purchases at SAR 29.42 each.", tags: ["Sales", "3.18M impressions", "KSA"] },
    "snap-launch": { desc: "A short Snapchat push: SAR 3.67K spend, SAR 38.9K in sales, 142 purchases at SAR 25.86 each.", tags: ["Sales", "Offers", "KSA"] },
    "tiktok-longrun": { desc: "91 TikTok campaigns over time: SAR 37.8K spend, 1,179 purchases and a 6.81× return.", tags: ["Testing", "Scaling", "KSA"] },
    "tiktok-sprint": { desc: "Ten weeks on TikTok: SAR 6.3K spend, SAR 45.9K in sales. Two winning campaigns made 98% of purchases.", tags: ["Test & scale", "KSA"] },
    "tiktok-september": { desc: "One month on TikTok: SAR 10.3K spend, SAR 64K in sales, 314 purchases at SAR 32.68.", tags: ["Monthly", "Checkout", "KSA"] },
    "google-shopping": { desc: "Google Ads for a high-ticket store: SAR 7.93K cost, SAR 78.2K in conversion value in five weeks.", tags: ["Shopping", "High AOV", "KSA"] },
    "salla-growth": { desc: "A Salla store month by month: SAR 72.9K in June, SAR 100.5K in July. Orders up from 320 to 443.", tags: ["Salla", "Growth", "KSA"] },
  },
  ar: {
    "snap-scale": { desc: "صرف 27.6 ألف ريال على سناب جاب 207.7 ألف ريال مبيعات: 940 عملية شراء بتكلفة 29.42 ريال للطلب.", tags: ["مبيعات", "3.18 مليون ظهور", "السعودية"] },
    "snap-launch": { desc: "حملة سناب قصيرة: صرف 3.67 ألف ريال، ومبيعات 38.9 ألف ريال، و142 طلب بتكلفة 25.86 ريال.", tags: ["مبيعات", "عروض", "السعودية"] },
    "tiktok-longrun": { desc: "91 حملة تيك توك: صرف 37.8 ألف ريال، 1,179 طلب، وعائد 6.81 ضعف الصرف.", tags: ["اختبار", "توسيع", "السعودية"] },
    "tiktok-sprint": { desc: "عشر أسابيع على تيك توك: صرف 6.3 ألف ريال ومبيعات 45.9 ألف ريال. حملتين ناجحتين جابوا 98% من الطلبات.", tags: ["اختبار وتوسيع", "السعودية"] },
    "tiktok-september": { desc: "شهر واحد على تيك توك: صرف 10.3 ألف ريال، ومبيعات 64 ألف ريال، و314 طلب بتكلفة 32.68 ريال.", tags: ["شهري", "الدفع", "السعودية"] },
    "google-shopping": { desc: "إعلانات جوجل لمتجر منتجاته غالية: تكلفة 7.93 ألف ريال وقيمة تحويلات 78.2 ألف ريال في خمس أسابيع.", tags: ["Shopping", "سلة شراء عالية", "السعودية"] },
    "salla-growth": { desc: "متجر على سلة شهر بشهر: 72.9 ألف ريال في يونيو، و100.5 ألف ريال في يوليو. الطلبات زادت من 320 لـ 443.", tags: ["سلة", "نمو", "السعودية"] },
  },
};

// Not shown on the home page right now (no before/after section), kept in sync anyway.
// Real numbers: same Salla store, June 2026 → July 2026.
const statsBase = [
  { to: 100.5, dec: 1 },
  { to: 443, dec: 0 },
  { to: 26004, dec: 0 },
  { to: 1.7, dec: 1 },
];

const projColors: ProjColor[] = ["lime", "mint", "gold", "olive"];

// ─────────────────────────── ENGLISH ───────────────────────────
const en = {
  lang: "en" as Lang,
  dir: "ltr" as "ltr" | "rtl",
  title: "AYMAN® — Ayman Abdullah, media buyer",
  description:
    "Ayman Abdullah runs Snapchat, TikTok, Meta and Google Ads for e-commerce stores. SAR 690K+ in tracked sales at a 7.4× blended ROAS.",
  switchLang: { href: "/ar", label: "ع", aria: "عربي" },
  location: "Mansoura, EG · remote worldwide",
  ticker: ["Testing creatives", "Killing losers", "Scaling winners", "Snapchat Ads", "TikTok Ads", "Meta Ads", "Google Ads", "ROAS over likes"],
  nav: [
    { href: "#stack", label: "Platforms" },
    { href: "#projects", label: "Results" },
    { href: "#work", label: "Case studies" },
    { href: "#process", label: "Process" },
  ],
  sayHello: "Say hello",
  hero: {
    meta: ["ayman abdullah — media buyer", "Mansoura, EG · EET", "SAR 690K+ tracked sales"],
    first: "AYMAN",
    last: "ABDULLAH",
    circle: "ADS",
    photoAlt: "Ayman Abdullah in a black blazer",
    caption: "// the media buyer you can trust with your budget",
    ctaMain: "Grow my sales",
    ctaSecond: "See the numbers",
  },
  manifest: {
    note: "// manifesto",
    lines: [
      { pre: "I test", mark: "creatives.", color: "lime" },
      { pre: "I scale", mark: "winners.", color: "mint" },
      { pre: "I chase", mark: "ROAS.", color: "gold" },
    ],
    sub: "Not reach, not likes: purchases. Every campaign has one job, to bring back more than it spends. Tests start small, losers get cut fast and the budget moves to what sells. Across the Snapchat, TikTok and Google accounts on this page that adds up to SAR 93.6K spent and SAR 692K in sales.",
  },
  stackHead: { title: "Where I buy media", note: "// platforms & tools" },
  stack: [
    { title: "Snapchat Ads", text: "Where the Saudi shopper scrolls. Sales campaigns on the pixel, fast creative rotation and offers made for Snap.", tags: ["Sales objective", "Pixel", "Retargeting", "KSA"] },
    { title: "TikTok Ads", text: "Short videos that sell: many hooks tested, the winners kept, then scaled with budget instead of luck.", tags: ["Web purchases", "Creative testing", "Scaling"] },
    { title: "Meta & Google", text: "Meta for retargeting and lookalikes. Google Shopping to catch people already searching for the product.", tags: ["Meta Ads", "Google Ads", "Shopping", "Catalog"] },
    { title: "The store side", text: "Ads only work if the store converts. I read the Salla and Zid numbers and fix what leaks: offers, landing pages, checkout.", tags: ["Salla", "Zid", "Shopify", "Analytics"] },
  ],
  beforeAfter: {
    before: "BEFORE",
    after: "AFTER",
    note: "// one Salla store, June 2026 vs July 2026",
    beforeImg: { src: "/img/before.svg", alt: "Before", caption: "June: SAR 72.9K in sales" },
    afterImg: { src: "/img/after.svg", alt: "After", caption: "July: SAR 100.5K, monthly goal hit" },
    arrow: "→",
    stats: [
      { label: "Monthly sales (SAR K)", before: "72.9", prefix: "", suffix: "K" },
      { label: "Orders", before: "320", prefix: "", suffix: "" },
      { label: "Visits", before: "18,938", prefix: "", suffix: "" },
      { label: "Conversion rate", before: "1.7%", prefix: "", suffix: "%" },
    ],
  },
  projectsHead: { title: "Headline results", note: "// scroll sideways →" },
  projects: [
    { idx: "№01 — Snapchat", name: "207K SAR", desc: "Sales from SAR 27.6K of Snapchat spend for a Saudi store: 940 purchases at SAR 29.42 each, a 7.51× ROAS.", role: "snapchat · sales · scale" },
    { idx: "№02 — TikTok", name: "257K SAR", desc: "Sales from 91 TikTok campaigns: 1,179 purchases, a 6.81× return and an average order of SAR 218.", role: "tiktok · testing · scale" },
    { idx: "№03 — Salla", name: "+38% SALES", desc: "One store, June to July 2026: sales up from SAR 72.9K to SAR 100.5K and orders from 320 to 443. The 100K goal was hit.", role: "salla · monthly growth" },
    { idx: "№04 — Google", name: "9.85× ROAS", desc: "Google Ads for a high-ticket store: SAR 7.93K in cost turned into SAR 78.2K in conversion value.", role: "google · shopping" },
  ],
  workHead: { title: "Case studies", note: "ad accounts · open any for the full numbers" },
  workUi: {
    all: "All",
    cats: { Snapchat: "Snapchat", TikTok: "TikTok", Google: "Google Ads", Store: "Store" } as Record<WorkCat, string>,
    visit: "Case study →",
    shotAlt: "ads dashboard screenshot",
    filterAria: "Filter case studies",
  },
  processHead: { title: "How the work goes", note: "// 4 steps, no magic" },
  process: [
    { title: "Audit", text: "I go through your ad accounts, pixel and store numbers, then tell you honestly where the money leaks." },
    { title: "Setup", text: "Tracking done right, a clear offer and a creative plan before a single riyal is spent." },
    { title: "Test", text: "Small budgets across hooks and audiences. Losers get cut in days, not weeks." },
    { title: "Scale", text: "Budget moves to the winners. A weekly report: spend, purchases, cost per purchase, ROAS." },
  ],
  footer: { note: "// want more sales from the same budget?", cta: "WRITE ME" },
  contact: {
    title: "Tell me about your store",
    sub: "Fill this in and it opens WhatsApp with your request ready to send. I usually reply the same day.",
    name: "Your name",
    namePh: "e.g. Mohamed",
    type: "What you need",
    types: ["Run my ads (Snapchat / TikTok / Meta)", "Google Ads / Shopping", "Audit my ad accounts", "Ads + store improvements", "Other"],
    budget: "Monthly ad budget",
    budgets: ["Not sure yet", "Under SAR 5K", "SAR 5K – 15K", "SAR 15K – 50K", "SAR 50K+"],
    msg: "Details",
    msgPh: "What do you sell, and what are you spending on ads now?",
    send: "Send on WhatsApp",
    noNumber: "WhatsApp isn't set up yet. Email me instead:",
    waIntro: "Hi Ayman, I'd like to talk about running ads for my store.",
    waName: "Name",
    waType: "Need",
    waBudget: "Ad budget",
    waMsg: "Details",
  },
  fab: "Chat on WhatsApp",
};

// ─────────────────────────── ARABIC ───────────────────────────
type Content = typeof en;

const ar: Content = {
  lang: "ar",
  dir: "rtl",
  title: "أيمن® — أيمن عبدالله، ميديا باير",
  description: "أيمن عبدالله بيدير إعلانات سناب شات وتيك توك وميتا وجوجل للمتاجر الإلكترونية. أكتر من 690 ألف ريال مبيعات متتبّعة بعائد 7.4 ضعف الصرف.",
  switchLang: { href: "/", label: "EN", aria: "English" },
  location: "المنصورة، مصر · عن بُعد لكل الدول",
  ticker: ["اختبار الكريتيف", "قفل الخسران", "توسيع الكسبان", "إعلانات سناب", "إعلانات تيك توك", "إعلانات ميتا", "إعلانات جوجل", "العائد قبل اللايكات"],
  nav: [
    { href: "#stack", label: "المنصات" },
    { href: "#projects", label: "النتايج" },
    { href: "#work", label: "دراسات الحالة" },
    { href: "#process", label: "طريقة الشغل" },
  ],
  sayHello: "كلّمني",
  hero: {
    meta: ["أيمن عبدالله — ميديا باير", "المنصورة، مصر", "+690 ألف ريال مبيعات متتبّعة"],
    first: "أيمن",
    last: "عبدالله",
    circle: "ADS",
    photoAlt: "أيمن عبدالله ببليزر أسود",
    caption: "// ميديا باير تقدر تأمّنه على ميزانيتك",
    ctaMain: "زوّد مبيعاتي",
    ctaSecond: "شوف الأرقام",
  },
  manifest: {
    note: "// مبدأي",
    lines: [
      { pre: "بختبر", mark: "الكريتيف.", color: "lime" },
      { pre: "بكبّر", mark: "الكسبان.", color: "mint" },
      { pre: "بطارد", mark: "العائد.", color: "gold" },
    ],
    sub: "مش وصول ولا لايكات: مبيعات. كل حملة ليها شغلانة واحدة، إنها ترجّع أكتر من اللي اتصرف عليها. الاختبار بميزانية صغيرة، الخسران بيتقفل بسرعة، والميزانية بتروح للي بيبيع. في حسابات سناب وتيك توك وجوجل اللي في الصفحة دي: 93.6 ألف ريال صرف و692 ألف ريال مبيعات.",
  },
  stackHead: { title: "بعلن فين", note: "// منصات وأدوات" },
  stack: [
    { title: "سناب شات", text: "المكان اللي العميل السعودي بيقضي فيه وقته. حملات مبيعات على البكسل، تغيير كريتيف سريع، وعروض معمولة لسناب.", tags: ["هدف المبيعات", "البكسل", "إعادة الاستهداف", "السعودية"] },
    { title: "تيك توك", text: "فيديوهات قصيرة بتبيع: بنجرّب هوكات كتير، نسيب الكسبان، ونكبّره بالميزانية مش بالحظ.", tags: ["مشتريات الموقع", "اختبار الكريتيف", "التوسيع"] },
    { title: "ميتا وجوجل", text: "ميتا لإعادة الاستهداف والجماهير المشابهة، وجوجل شوبينج للي بيدوّر على المنتج أصلًا.", tags: ["Meta Ads", "Google Ads", "Shopping", "الكتالوج"] },
    { title: "ناحية المتجر", text: "الإعلان مش هيجيب نتيجة لو المتجر مش بيحوّل. بقرا أرقام سلة وزد وبصلّح اللي بيسرّب: العروض وصفحات الهبوط والدفع.", tags: ["سلة", "زد", "Shopify", "التحليلات"] },
  ],
  beforeAfter: {
    before: "قبل",
    after: "بعد",
    note: "// متجر واحد على سلة، يونيو 2026 مقابل يوليو 2026",
    beforeImg: { src: "/img/before.svg", alt: "قبل", caption: "يونيو: 72.9 ألف ريال مبيعات" },
    afterImg: { src: "/img/after.svg", alt: "بعد", caption: "يوليو: 100.5 ألف ريال وتحقيق هدف الشهر" },
    arrow: "←",
    stats: [
      { label: "مبيعات الشهر (ألف ريال)", before: "72.9", prefix: "", suffix: "K" },
      { label: "الطلبات", before: "320", prefix: "", suffix: "" },
      { label: "الزيارات", before: "18,938", prefix: "", suffix: "" },
      { label: "معدل التحويل", before: "1.7%", prefix: "", suffix: "%" },
    ],
  },
  projectsHead: { title: "أهم النتايج", note: "// اسحب بالعرض ←" },
  projects: [
    { idx: "№01 — سناب", name: "207K SAR", desc: "مبيعات من صرف 27.6 ألف ريال على سناب لمتجر سعودي: 940 طلب بتكلفة 29.42 ريال، وعائد 7.51 ضعف.", role: "سناب · مبيعات · توسيع" },
    { idx: "№02 — تيك توك", name: "257K SAR", desc: "مبيعات من 91 حملة تيك توك: 1,179 طلب، عائد 6.81 ضعف، ومتوسط طلب 218 ريال.", role: "تيك توك · اختبار · توسيع" },
    { idx: "№03 — سلة", name: "+38% مبيعات", desc: "متجر واحد من يونيو ليوليو 2026: المبيعات من 72.9 لـ 100.5 ألف ريال، والطلبات من 320 لـ 443. وهدف الـ 100 ألف اتحقق.", role: "سلة · نمو شهري" },
    { idx: "№04 — جوجل", name: "9.85× ROAS", desc: "إعلانات جوجل لمتجر منتجاته غالية: تكلفة 7.93 ألف ريال جابت قيمة تحويلات 78.2 ألف ريال.", role: "جوجل · شوبينج" },
  ],
  workHead: { title: "دراسات الحالة", note: "حسابات إعلانية · افتح أي واحد للأرقام كاملة" },
  workUi: {
    all: "الكل",
    cats: { Snapchat: "سناب شات", TikTok: "تيك توك", Google: "جوجل", Store: "المتجر" },
    visit: "التفاصيل ↖",
    shotAlt: "صورة من لوحة الإعلانات",
    filterAria: "فلترة دراسات الحالة",
  },
  processHead: { title: "إزاي بنشتغل", note: "// 4 خطوات، من غير سحر" },
  process: [
    { title: "تحليل", text: "بقرا حساباتك الإعلانية والبكسل وأرقام المتجر، وبقولك بصراحة الفلوس بتضيع فين." },
    { title: "تجهيز", text: "تتبّع مظبوط، عرض واضح، وخطة كريتيف قبل ما يتصرف ريال واحد." },
    { title: "اختبار", text: "ميزانيات صغيرة على هوكات وجماهير مختلفة. الخسران بيتقفل في أيام مش أسابيع." },
    { title: "توسيع", text: "الميزانية بتروح للكسبان، وتقرير أسبوعي: الصرف، الطلبات، تكلفة الطلب، والعائد." },
  ],
  footer: { note: "// عاوز مبيعات أكتر من نفس الميزانية؟", cta: "كلّمني" },
  contact: {
    title: "احكيلي عن متجرك",
    sub: "املا البيانات دي وهيفتحلك واتساب والرسالة جاهزة. غالبًا برد في نفس اليوم.",
    name: "اسمك",
    namePh: "مثلًا: محمد",
    type: "محتاج إيه",
    types: ["إدارة إعلاناتي (سناب / تيك توك / ميتا)", "إعلانات جوجل / شوبينج", "مراجعة حساباتي الإعلانية", "إعلانات + تحسين المتجر", "حاجة تانية"],
    budget: "ميزانية الإعلانات الشهرية",
    budgets: ["لسه مش محدد", "أقل من 5 آلاف ريال", "5 – 15 ألف ريال", "15 – 50 ألف ريال", "أكتر من 50 ألف ريال"],
    msg: "التفاصيل",
    msgPh: "بتبيع إيه، وبتصرف كام على الإعلانات دلوقتي؟",
    send: "ابعت على واتساب",
    noNumber: "الواتساب لسه متضافش. ابعتلي على الإيميل:",
    waIntro: "أهلًا أيمن، عاوز أتكلم معاك عن إعلانات متجري.",
    waName: "الاسم",
    waType: "المطلوب",
    waBudget: "ميزانية الإعلانات",
    waMsg: "التفاصيل",
  },
  fab: "كلّمني واتساب",
};

const dict: Record<Lang, Content> = { en, ar };

export function getContent(lang: Lang) {
  const c = dict[lang];
  return {
    ...c,
    shared,
    stats: c.beforeAfter.stats.map((s, i) => ({ ...s, ...statsBase[i] })),
    projectsFull: c.projects.map((p, i) => ({ ...p, color: projColors[i % projColors.length] })),
    work: workBase.map((w) => ({ ...w, ...workText[lang][w.key] })),
    workCats: ["Snapchat", "TikTok", "Google", "Store"] as WorkCat[],
  };
}

export type SiteContent = ReturnType<typeof getContent>;
