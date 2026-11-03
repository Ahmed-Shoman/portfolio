// ─────────────────────────────────────────────────────────────
//  All site content lives here, in English (en) and Arabic (ar).
//  Edit this file only to change text.
// ─────────────────────────────────────────────────────────────

export type Lang = "en" | "ar";
export type ProjColor = "lime" | "mint" | "gold" | "olive";
export type WorkCat = "Systems" | "E-commerce" | "Websites";

// Shared (same in both languages)
export const shared = {
  logo: "SHOMAN",
  email: "hello@ahmedshoman.dev", // TODO: put your real email
  github: "Ahmed-Shoman",
  // TODO: your WhatsApp number in international format, digits only (e.g. 2010xxxxxxxx)
  whatsapp: "201203958757",
  year: 2026,
  photo: "/img/hero-cutout.png",
};

// ─── Projects grid: links and images are shared, text is per language ───
const workBase: { key: string; name: string; cat: WorkCat; url: string; img: string }[] = [
  { key: "pyramids", name: "PYRAMIDSHOOD HR", cat: "Systems", url: "https://pyramids-attandance.techflow1.com", img: "/img/work/pyramids.jpg" },
  { key: "medwizards", name: "MedWizards", cat: "Systems", url: "https://pioneers.techflow1.com", img: "/img/work/medwizards.jpg" },
  { key: "ethra", name: "Ethra", cat: "Systems", url: "https://ethra.techflow1.com", img: "/img/work/ethra.jpg" },
  { key: "stars", name: "Stars Gold Logistics", cat: "Systems", url: "https://starlogisticskw.com", img: "/img/work/stars.jpg" },
  { key: "luma", name: "Luma Wear", cat: "E-commerce", url: "https://lumaawear.com", img: "/img/work/luma.jpg" },
  { key: "glamour", name: "Glamour Aura", cat: "E-commerce", url: "https://glamouur.store", img: "/img/work/glamour.jpg" },
  { key: "lunora", name: "Lunora", cat: "E-commerce", url: "https://lunoraa.store", img: "/img/work/lunora.jpg" },
  { key: "kaya", name: "KAYA Boutique", cat: "E-commerce", url: "https://kayaboutique.shop", img: "/img/work/kaya.jpg" },
  { key: "imtiaz", name: "Imtiaz Al Arabia", cat: "Websites", url: "https://imtiazalarabia.com.sa", img: "/img/work/imtiaz.jpg" },
  { key: "qualiexce", name: "Qualiexce", cat: "Websites", url: "https://qualiexce.com", img: "/img/work/qualiexce.jpg" },
  { key: "see", name: "SEE Elevators", cat: "Websites", url: "https://see.sa", img: "/img/work/see.jpg" },
  { key: "touchone", name: "Touch One", cat: "Websites", url: "https://touch-colors.com", img: "/img/work/touchone.jpg" },
  { key: "ansary", name: "Ansary", cat: "Websites", url: "https://car-rent.techflow1.com", img: "/img/work/ansary.jpg" },
  { key: "kmfilms", name: "KM Films", cat: "Websites", url: "https://kmfilms.techflow1.com/en", img: "/img/work/kmfilms.jpg" },
  { key: "mal", name: "Mal & Aamal", cat: "Websites", url: "https://mal.techflow1.com", img: "/img/work/mal.jpg" },
  { key: "almadhi", name: "Al-Madhi Family", cat: "Websites", url: "https://almadhi.techflow1.com", img: "/img/work/almadhi.jpg" },
  { key: "techflow", name: "Tech Flow", cat: "Websites", url: "https://techflow1.com", img: "/img/work/techflow.jpg" },
];

// TODO: add the stack you used to each project's tags if you want it shown.
const workText: Record<Lang, Record<string, { desc: string; tags: string[] }>> = {
  en: {
    pyramids: { desc: "HR, attendance and payroll system: employees, departments, lateness tracking and automatic salary deductions.", tags: ["Dashboard", "API", "Egypt"] },
    medwizards: { desc: "Admin portal for a medical LMS: enrollments, courses and user activity in one place.", tags: ["LMS", "Dashboard", "API"] },
    ethra: { desc: "Academic platform for medical and scientific research: a research library and accounts for academics.", tags: ["Platform", "API", "Saudi"] },
    stars: { desc: "International shipping company in Kuwait: website, shipment tracking and an admin dashboard.", tags: ["Tracking", "Dashboard", "Kuwait"] },
    luma: { desc: "Premium fashion store with its own admin dashboard, in Arabic and English.", tags: ["Store", "Dashboard", "Bilingual"] },
    glamour: { desc: "Fashion and accessories store shipping across Egypt, with cash on delivery.", tags: ["Store", "API", "Egypt"] },
    lunora: { desc: "Women's fashion store: clothing, bags, shoes and makeup, delivered across Egypt.", tags: ["Store", "Arabic", "Egypt"] },
    kaya: { desc: "Womenswear boutique store with collections, exchanges and cash on delivery.", tags: ["Store", "Egypt"] },
    imtiaz: { desc: "Saudi institutional-excellence consultancy: bilingual company site plus a content dashboard.", tags: ["Corporate", "Dashboard", "Saudi"] },
    qualiexce: { desc: "Quality management, ISO certification and governance consultancy website.", tags: ["Corporate", "API", "Saudi"] },
    see: { desc: "Saudi Elevator & Escalator Co.: installation and maintenance requests, projects and services.", tags: ["Corporate", "Bilingual", "Saudi"] },
    touchone: { desc: "Painting, decor and renovation company in Saudi Arabia: services, projects and quote requests.", tags: ["Corporate", "Saudi"] },
    ansary: { desc: "Luxury transport for pilgrims and VIP guests: fleet, trips and online booking.", tags: ["Booking", "Bilingual", "Saudi"] },
    kmfilms: { desc: "Cinematic wedding films studio in Egypt: films, packages and booking.", tags: ["Portfolio", "Bilingual", "Egypt"] },
    mal: { desc: "Finance and business news platform: articles, categories and market analysis.", tags: ["Blog", "CMS"] },
    almadhi: { desc: "Official family website: history, biographies, family tree, events and photo gallery.", tags: ["Heritage", "Saudi"] },
    techflow: { desc: "Digital agency website: web design, e-commerce, SEO and branding services.", tags: ["Agency", "Saudi"] },
  },
  ar: {
    pyramids: { desc: "نظام موارد بشرية وحضور ورواتب: الموظفين والأقسام، متابعة التأخير، وحساب الخصومات والرواتب تلقائيًا.", tags: ["لوحة تحكم", "API", "مصر"] },
    medwizards: { desc: "لوحة إدارة لمنصة تعليم طبي: الاشتراكات والكورسات ونشاط المستخدمين في مكان واحد.", tags: ["LMS", "لوحة تحكم", "API"] },
    ethra: { desc: "منصة أكاديمية للأبحاث الطبية والعلمية: مكتبة أبحاث وحسابات للأكاديميين.", tags: ["منصة", "API", "السعودية"] },
    stars: { desc: "شركة شحن دولي في الكويت: موقع الشركة، تتبع الشحنات، ولوحة تحكم.", tags: ["تتبع شحنات", "لوحة تحكم", "الكويت"] },
    luma: { desc: "متجر أزياء فاخر بلوحة تحكم خاصة، بالعربي والإنجليزي.", tags: ["متجر", "لوحة تحكم", "لغتين"] },
    glamour: { desc: "متجر أزياء وإكسسوارات بيشحن لكل مصر، مع الدفع عند الاستلام.", tags: ["متجر", "API", "مصر"] },
    lunora: { desc: "متجر أزياء حريمي: لبس وشنط وأحذية وميك أب، بتوصيل لكل مصر.", tags: ["متجر", "عربي", "مصر"] },
    kaya: { desc: "متجر بوتيك حريمي بكولكشنز، واستبدال، ودفع عند الاستلام.", tags: ["متجر", "مصر"] },
    imtiaz: { desc: "شركة سعودية للتميز المؤسسي: موقع بلغتين ولوحة تحكم للمحتوى.", tags: ["شركات", "لوحة تحكم", "السعودية"] },
    qualiexce: { desc: "موقع شركة استشارات إدارة الجودة وشهادات الآيزو والحوكمة.", tags: ["شركات", "API", "السعودية"] },
    see: { desc: "شركة المصاعد والسلالم السعودية: طلبات التركيب والصيانة، المشاريع والخدمات.", tags: ["شركات", "لغتين", "السعودية"] },
    touchone: { desc: "شركة دهانات وديكور وتشطيبات في السعودية: الخدمات والمشاريع وطلب عرض سعر.", tags: ["شركات", "السعودية"] },
    ansary: { desc: "نقل فاخر لضيوف الرحمن وكبار الزوار: الأسطول والرحلات والحجز أونلاين.", tags: ["حجز", "لغتين", "السعودية"] },
    kmfilms: { desc: "استوديو أفلام أفراح سينمائية في مصر: الأفلام والباقات والحجز.", tags: ["بورتفوليو", "لغتين", "مصر"] },
    mal: { desc: "منصة أخبار المال والأعمال: مقالات وأقسام وتحليلات للأسواق.", tags: ["مدونة", "CMS"] },
    almadhi: { desc: "الموقع الرسمي لأسرة: التاريخ، التراجم، شجرة العائلة، الفعاليات ومعرض الصور.", tags: ["تراث", "السعودية"] },
    techflow: { desc: "موقع وكالة رقمية: تصميم مواقع، متاجر إلكترونية، سيو وهوية بصرية.", tags: ["وكالة", "السعودية"] },
  },
};

const statsBase = [
  { to: 95, dec: 0 },
  { to: 6, dec: 0 },
  { to: 3, dec: 0 },
  { to: 1.2, dec: 1 },
];

const projColors: ProjColor[] = ["lime", "mint", "gold", "olive"];

// ─────────────────────────── ENGLISH ───────────────────────────
const en = {
  lang: "en" as Lang,
  dir: "ltr" as "ltr" | "rtl",
  title: "SHOMAN® — Ahmed Shoman, fullstack developer",
  description: "Ahmed Shoman builds frontend, backend and e-commerce for product teams. Laravel + React + Next.js.",
  switchLang: { href: "/ar", label: "ع", aria: "عربي" },
  location: "Mansoura, EG · remote worldwide",
  ticker: ["Writing code", "Breaking code", "Fixing code", "Shipping features", "Frontend", "Backend", "E-commerce"],
  nav: [
    { href: "#stack", label: "Stack" },
    { href: "#doposle", label: "Before·After" },
    { href: "#projects", label: "Work" },
    { href: "#work", label: "Projects" },
    { href: "#process", label: "Process" },
  ],
  sayHello: "Say hello",
  hero: {
    meta: ["ahmed shoman — fullstack", "Mansoura, EG · EET", "shipping since 2024"],
    first: "AHMED",
    last: "SHOMAN",
    circle: "DEV",
    photoAlt: "Ahmed Shoman in a black suit and sunglasses",
    caption: "// the dev you can trust with prod",
    ctaMain: "Discuss a project",
    ctaSecond: "Before/after stats",
  },
  manifest: {
    note: "// manifesto",
    lines: [
      { pre: "I build", mark: "front.", color: "lime" },
      { pre: "I build", mark: "back.", color: "mint" },
      { pre: "I ship", mark: "everything.", color: "gold" },
    ],
    sub: "One person instead of a distributed team: interface, API, database, admin panel and deploy — in a single pair of hands. Nothing gets lost between departments, because there are no departments.",
  },
  stackHead: { title: "What I work with", note: "// languages & tools" },
  stack: [
    { title: "Frontend", text: "Interfaces that don't lag and don't fall apart. SSR, responsive layouts, RTL & LTR, clean component systems.", tags: ["TypeScript", "React", "Next.js", "Tailwind", "HTML/CSS"] },
    { title: "Backend", text: "APIs, queues, databases and deploys. From data schema to admin panel — no \"not my area\".", tags: ["Laravel", "PHP", "MySQL", "PostgreSQL", "Redis", "Filament"] },
    { title: "E-commerce", text: "Stores that sell: theme customization, checkout tweaks, integrations and landing pages.", tags: ["Salla", "Zid", "Shopify", "WordPress", "WooCommerce"] },
  ],
  beforeAfter: {
    before: "BEFORE",
    after: "AFTER",
    note: "// average numbers across client projects, first months of working with me",
    beforeImg: { src: "/img/before.svg", alt: "Before: chaos", caption: "before: 2 AM, red logs, deadline was yesterday" },
    afterImg: { src: "/img/after.svg", alt: "After: calm", caption: "after: releases on schedule, sleep at night" },
    arrow: "→",
    // TODO: replace with your real numbers
    stats: [
      { label: "Page speed score", before: "48", prefix: "", suffix: "" },
      { label: "Releases per month", before: "1", prefix: "×", suffix: "" },
      { label: "Prod bugs / month", before: "30", prefix: "", suffix: "−90%" },
      { label: "Page load time", before: "4.8s", prefix: "", suffix: "s" },
    ],
  },
  projectsHead: { title: "Selected work", note: "// scroll sideways →" },
  projects: [
    { idx: "№01 — 2026", name: "CARE STREAM", desc: "Clinic management SaaS for Egypt, now adapting for the Saudi market: appointments, patients, billing.", role: "front · back · saas" },
    { idx: "№02 — 2025", name: "AQAR", desc: "Premium real estate rental marketplace for Egypt & MENA: Laravel 11, Next.js, PostgreSQL, Redis, Filament.", role: "front · back · admin" },
    { idx: "№03 — 2025", name: "PYRAMIDS HR", desc: "HR system: employees, attendance, salaries, field visits and travel allowances. Laravel API + SPA.", role: "front · back · deploy" },
    { idx: "№04 — 2025", name: "CLEAN OPS", desc: "Management system for cleaning companies: finance, attendance and time tracking, ZATCA integration.", role: "back · integrations" },
  ],
  workHead: { title: "All projects", note: "live sites · open any for the full story" },
  workUi: {
    all: "All",
    cats: { Systems: "Systems", "E-commerce": "E-commerce", Websites: "Websites" } as Record<WorkCat, string>,
    visit: "Case study →",
    shotAlt: "website screenshot",
    filterAria: "Filter projects",
  },
  processHead: { title: "How the work goes", note: "// 4 steps, no magic" },
  process: [
    { title: "Audit", text: "I read the code, metrics and logs. Then tell you honestly what's on fire." },
    { title: "Architecture", text: "A plan: stack, data schema, delivery strategy." },
    { title: "Development", text: "One-week iterations, a demo every Friday." },
    { title: "Launch", text: "Tested, deployed, monitored. Releases without surprises." },
  ],
  footer: { note: "// got a project? a bug? doubts?", cta: "WRITE ME" },
  contact: {
    title: "Tell me about your project",
    sub: "Fill this in and it opens WhatsApp with your request ready to send. I usually reply the same day.",
    name: "Your name",
    namePh: "e.g. Mohamed",
    type: "Project type",
    types: ["Online store (Salla / Zid / Shopify)", "Company website", "System / dashboard", "Fix or improve an existing site", "Other"],
    budget: "Budget",
    budgets: ["Not sure yet", "Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"],
    msg: "Details",
    msgPh: "What do you need, and by when?",
    send: "Send on WhatsApp",
    noNumber: "WhatsApp isn't set up yet. Email me instead:",
    waIntro: "Hi Ahmed, I'd like to discuss a project.",
    waName: "Name",
    waType: "Type",
    waBudget: "Budget",
    waMsg: "Details",
  },
  fab: "Chat on WhatsApp",
};

// ─────────────────────────── ARABIC ───────────────────────────
type Content = typeof en;

const ar: Content = {
  lang: "ar",
  dir: "rtl",
  title: "شومان® — أحمد شومان، مطوّر فل ستاك",
  description: "أحمد شومان بيبني الفرونت والباك إند والمتاجر الإلكترونية. Laravel + React + Next.js.",
  switchLang: { href: "/", label: "EN", aria: "English" },
  location: "المنصورة، مصر · عن بُعد لكل الدول",
  ticker: ["كتابة كود", "تجربة الكود", "إصلاح الكود", "تسليم مميزات", "فرونت إند", "باك إند", "متاجر إلكترونية"],
  nav: [
    { href: "#stack", label: "الأدوات" },
    { href: "#doposle", label: "قبل·بعد" },
    { href: "#projects", label: "أعمالي" },
    { href: "#work", label: "المشاريع" },
    { href: "#process", label: "طريقة الشغل" },
  ],
  sayHello: "كلّمني",
  hero: {
    meta: ["أحمد شومان — فل ستاك", "المنصورة، مصر", "بشتغل من 2024"],
    first: "أحمد",
    last: "شومان",
    circle: "DEV",
    photoAlt: "أحمد شومان ببدلة سوداء ونظارة شمس",
    caption: "// مطوّر تقدر تأمّنه على موقعك",
    ctaMain: "ابدأ مشروعك",
    ctaSecond: "أرقام قبل وبعد",
  },
  manifest: {
    note: "// مبدأي",
    lines: [
      { pre: "ببني", mark: "الواجهة.", color: "lime" },
      { pre: "ببني", mark: "السيرفر.", color: "mint" },
      { pre: "بسلّم", mark: "كل حاجة.", color: "gold" },
    ],
    sub: "شخص واحد بدل فريق متفرّق: الواجهة، الـ API، قاعدة البيانات، لوحة التحكم والرفع على السيرفر، كله في إيد واحدة. مفيش حاجة بتضيع بين الأقسام، لأن مفيش أقسام.",
  },
  stackHead: { title: "بشتغل بإيه", note: "// لغات وأدوات" },
  stack: [
    { title: "الواجهة", text: "واجهات سريعة ومتظبطة على كل الشاشات. عربي وإنجليزي، تصميم متجاوب، ومكوّنات منظمة.", tags: ["TypeScript", "React", "Next.js", "Tailwind", "HTML/CSS"] },
    { title: "الباك إند", text: "APIs وقواعد بيانات ورفع على السيرفر. من تصميم الداتا لحد لوحة التحكم، من غير \"مش شغلتي\".", tags: ["Laravel", "PHP", "MySQL", "PostgreSQL", "Redis", "Filament"] },
    { title: "المتاجر", text: "متاجر بتبيع: تعديل الثيمات، تحسين صفحة الدفع، الربط مع الأنظمة، وصفحات الهبوط.", tags: ["سلة", "زد", "Shopify", "WordPress", "WooCommerce"] },
  ],
  beforeAfter: {
    before: "قبل",
    after: "بعد",
    note: "// متوسط الأرقام في مشاريع العملاء، أول شهور من الشغل معايا",
    beforeImg: { src: "/img/before.svg", alt: "قبل: فوضى", caption: "قبل: الساعة 2 بالليل، أخطاء، والتسليم كان امبارح" },
    afterImg: { src: "/img/after.svg", alt: "بعد: هدوء", caption: "بعد: تسليم في الميعاد ونوم بالليل" },
    arrow: "←",
    // TODO: replace with your real numbers
    stats: [
      { label: "سكور سرعة الموقع", before: "48", prefix: "", suffix: "" },
      { label: "تحديثات في الشهر", before: "1", prefix: "×", suffix: "" },
      { label: "أخطاء في الشهر", before: "30", prefix: "", suffix: "−90%" },
      { label: "وقت تحميل الصفحة", before: "4.8s", prefix: "", suffix: "s" },
    ],
  },
  projectsHead: { title: "مشاريع مختارة", note: "// اسحب بالعرض ←" },
  projects: [
    { idx: "№01 — 2026", name: "CARE STREAM", desc: "نظام SaaS لإدارة العيادات في مصر، وبيتجهز للسوق السعودي: المواعيد، المرضى والفواتير.", role: "واجهة · سيرفر · SaaS" },
    { idx: "№02 — 2025", name: "عقار", desc: "منصة إيجار عقارات فاخرة لمصر والشرق الأوسط: Laravel 11 و Next.js و PostgreSQL و Redis و Filament.", role: "واجهة · سيرفر · لوحة تحكم" },
    { idx: "№03 — 2025", name: "PYRAMIDS HR", desc: "نظام موارد بشرية: الموظفين، الحضور، الرواتب، الزيارات الميدانية وبدلات السفر.", role: "واجهة · سيرفر · رفع" },
    { idx: "№04 — 2025", name: "CLEAN OPS", desc: "نظام إدارة لشركات النظافة: الحسابات، الحضور وتتبع الوقت، والربط مع هيئة الزكاة.", role: "سيرفر · ربط أنظمة" },
  ],
  workHead: { title: "كل المشاريع", note: "مواقع شغالة · دوس للزيارة" },
  workUi: {
    all: "الكل",
    cats: { Systems: "أنظمة", "E-commerce": "متاجر", Websites: "مواقع" },
    visit: "زيارة ↖",
    shotAlt: "صورة من الموقع",
    filterAria: "فلترة المشاريع",
  },
  processHead: { title: "إزاي بنشتغل", note: "// 4 خطوات، من غير سحر" },
  process: [
    { title: "تحليل", text: "بقرا الكود والأرقام والمشاكل، وبقولك بصراحة إيه اللي محتاج يتصلّح." },
    { title: "تخطيط", text: "خطة واضحة: التقنيات، شكل الداتا، وطريقة التسليم." },
    { title: "تنفيذ", text: "شغل على مراحل أسبوعية، وتشوف اللي اتعمل كل أسبوع." },
    { title: "إطلاق", text: "متجرّب ومرفوع ومتابَع. تسليم من غير مفاجآت." },
  ],
  footer: { note: "// عندك مشروع؟ مشكلة؟ سؤال؟", cta: "كلّمني" },
  contact: {
    title: "احكيلي عن مشروعك",
    sub: "املا البيانات دي وهيفتحلك واتساب والرسالة جاهزة. غالبًا برد في نفس اليوم.",
    name: "اسمك",
    namePh: "مثلًا: محمد",
    type: "نوع المشروع",
    types: ["متجر إلكتروني (سلة / زد / شوبيفاي)", "موقع شركة", "نظام / لوحة تحكم", "تعديل أو تحسين موقع موجود", "حاجة تانية"],
    budget: "الميزانية",
    budgets: ["لسه مش محدد", "أقل من 500$", "500$ – 1,500$", "1,500$ – 5,000$", "أكتر من 5,000$"],
    msg: "التفاصيل",
    msgPh: "محتاج إيه، ومحتاجه إمتى؟",
    send: "ابعت على واتساب",
    noNumber: "الواتساب لسه متضافش. ابعتلي على الإيميل:",
    waIntro: "أهلًا أحمد، عاوز أتكلم معاك عن مشروع.",
    waName: "الاسم",
    waType: "النوع",
    waBudget: "الميزانية",
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
    workCats: ["Systems", "E-commerce", "Websites"] as WorkCat[],
  };
}

export type SiteContent = ReturnType<typeof getContent>;
