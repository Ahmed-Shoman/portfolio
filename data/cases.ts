// ─────────────────────────────────────────────────────────────
//  Case-study pages: /work/<key>
//  One entry per project in data/content.ts (same `key`).
//  Screens live in public/img/cases/<key>/ — a screen whose file
//  doesn't exist yet is skipped automatically, so you can add
//  dashboard screenshots later just by dropping the file in.
//  TODO: check the "services" line of each project matches what you did.
// ─────────────────────────────────────────────────────────────

export type Shot = { src: string; caption: string; wide?: boolean };

export type CaseStudy = {
  key: string;
  headline: string;
  industry: string;
  location: string;
  type: string;
  services: string[];
  overview: string;
  challenge: string;
  solution: string;
  features: { title: string; text: string }[];
  gallery: Shot[];
  outcome: string;
};

const s = (key: string, file: string, caption: string, wide = false): Shot => ({
  src: file.startsWith("/") ? file : `/img/cases/${key}/${file}.jpg`,
  caption,
  wide,
});

export const cases: CaseStudy[] = [
  // ───────────────────────── SYSTEMS ─────────────────────────
  {
    key: "pyramids",
    headline: "An HR system that replaced spreadsheets: attendance, payroll and field visits in one place.",
    industry: "Restaurants & franchise operations",
    location: "Egypt",
    type: "Web system + API",
    services: ["System design", "Backend & API", "Admin dashboard", "Deployment"],
    overview:
      "PYRAMIDSHOOD runs several restaurant brands with staff spread across branches. Attendance, lateness and salaries were tracked by hand. I built them one system that knows every employee, every shift and every deduction, so payroll stops being a monthly headache.",
    challenge:
      "Attendance lived in sheets, branch visits were logged manually per brand, and salary deductions were calculated by hand at the end of every month. Mistakes were easy and nobody had a single source of truth.",
    solution:
      "A web system with a clean admin dashboard: employees and departments, daily attendance with lateness tracking, automatic payroll and deductions, reports and an archive. Travel and allowance rules are configurable from settings, so the business can change them without a developer.",
    features: [
      { title: "Employees & departments", text: "Full profiles, roles and departments, all searchable from one dashboard." },
      { title: "Attendance & lateness", text: "Check-in records, absence and lateness tracked per day and per employee." },
      { title: "Automatic payroll", text: "Salaries and deductions calculated by the system instead of a calculator." },
      { title: "Allowances & travel", text: "Field visits and travel allowances with amounts editable from settings." },
      { title: "Reports & archive", text: "Monthly reports ready to export, with history kept for every employee." },
    ],
    gallery: [
      s("pyramids", "/img/work/pyramids.jpg", "Secure sign-in for HR staff", true),
      s("pyramids", "dashboard", "Main dashboard"),
      s("pyramids", "employees", "Employees list"),
      s("pyramids", "attendance", "Attendance & lateness"),
      s("pyramids", "payroll", "Payroll & deductions"),
    ],
    outcome:
      "HR now works from one system instead of scattered sheets: attendance, payroll and allowances are calculated the same way every month, and managers can see the whole picture in minutes.",
  },
  {
    key: "medwizards",
    headline: "The admin portal behind a medical learning platform.",
    industry: "Medical education (LMS)",
    location: "Middle East",
    type: "Admin dashboard + API",
    services: ["Dashboard UI", "Backend & API", "Authentication"],
    overview:
      "MedWizards is an online learning platform for medical students. Behind it sits this admin portal, where the team manages courses, enrollments and users, and keeps an eye on activity across the platform.",
    challenge:
      "A growing course catalogue and student base needed one secure place to manage content and enrollments without touching the database.",
    solution:
      "A focused admin portal with secure authentication, course and enrollment management, and activity tracking, built on an API that the student-facing apps share.",
    features: [
      { title: "Secure admin access", text: "Protected sign-in for the team, separate from student accounts." },
      { title: "Courses", text: "Create and organise courses and their content from the dashboard." },
      { title: "Enrollments", text: "See who joined what, and manage access per student." },
      { title: "User activity", text: "Track activity across the platform in one place." },
    ],
    gallery: [
      s("medwizards", "/img/work/medwizards.jpg", "Admin sign-in", true),
      s("medwizards", "dashboard", "Overview dashboard"),
      s("medwizards", "courses", "Courses management"),
      s("medwizards", "enrollments", "Enrollments"),
    ],
    outcome: "The team runs the whole platform from one portal: content, students and activity, without asking a developer for every change.",
  },
  {
    key: "ethra",
    headline: "A research platform where academics discover, share and collaborate on medical research.",
    industry: "Academic research",
    location: "Saudi Arabia",
    type: "Web platform",
    services: ["Platform design", "Frontend", "Backend & API", "Accounts & roles"],
    overview:
      "Ethra (إثراء) is a digital platform for scientific and medical research. Researchers can search a categorised library, follow fields they care about, publish their work for review, and find people working on the same topics.",
    challenge:
      "Research was scattered and hard to find, and researchers had no simple way to share work in progress or find collaborators in the same field.",
    solution:
      "An Arabic-first platform with a searchable research library, keyword and category filters, academic accounts, a submission flow for review and publishing, and a way to connect researchers with shared interests.",
    features: [
      { title: "Research library", text: "Categorised research with smart search by keyword and field." },
      { title: "Academic accounts", text: "Registration and profiles for researchers, students and faculty." },
      { title: "Submit for review", text: "Researchers upload their work and send it through review to publication." },
      { title: "Collaboration", text: "Find and contact people working in the same field." },
    ],
    gallery: [
      s("ethra", "/img/work/ethra.jpg", "Home page", true),
      s("ethra", "library", "Research library with filters"),
      s("ethra", "research", "Research detail page"),
      s("ethra", "register", "Academic account sign-up"),
    ],
    outcome: "Researchers get one trusted place to find, publish and discuss research, in Arabic and built for the way academics actually work.",
  },
  {
    key: "stars",
    headline: "A shipping company website with live tracking, built to turn visitors into shipments.",
    industry: "Logistics & international shipping",
    location: "Kuwait",
    type: "Company website + dashboard",
    services: ["Web design", "Frontend", "Tracking system", "Admin dashboard"],
    overview:
      "Stars Gold Logistics ships from Kuwait to more than 50 countries by air, sea and land. The website presents their services, lets customers track a shipment by number, and is managed from its own dashboard.",
    challenge:
      "Customers kept calling to ask where their parcel was, and the old presence didn't explain the services or the merchant offers clearly.",
    solution:
      "A bilingual, dark-and-gold site that matches the brand: clear service pages (air, sea, land, customs), merchant offers, news, one-tap WhatsApp and call buttons, and a tracking page that shows a shipment's status instantly.",
    features: [
      { title: "Shipment tracking", text: "Customers enter a tracking number and see where their shipment is." },
      { title: "Service pages", text: "Air, sea and land freight, customs clearance and insurance, each explained." },
      { title: "Merchant offers", text: "Dedicated pricing for merchants to bring in repeat business." },
      { title: "Admin dashboard", text: "The team manages content, news and shipments from one panel." },
      { title: "Arabic & English", text: "Full bilingual site with a language switch." },
    ],
    gallery: [
      s("stars", "/img/work/stars.jpg", "Home page", true),
      s("stars", "tracking", "Track your shipment"),
      s("stars", "services", "Services"),
      s("stars", "dashboard", "Admin dashboard"),
    ],
    outcome: "Customers can answer \"where is my shipment?\" themselves, and the site now sells the services instead of just listing a phone number.",
  },

  // ───────────────────────── E-COMMERCE ─────────────────────────
  {
    key: "luma",
    headline: "A premium fashion store with its own dashboard, built for a brand that sells \"quiet luxury\".",
    industry: "Fashion retail",
    location: "Egypt",
    type: "Custom online store",
    services: ["Store design", "Frontend", "Backend & dashboard", "Bilingual"],
    overview:
      "Luma Wear sells modern, refined womenswear. The brand wanted a store that feels as premium as the clothes: calm, editorial and fast, with a dashboard the team can run without a platform subscription.",
    challenge:
      "Template stores looked generic and cluttered next to the brand's photography, and the team needed full control over products, sizes and orders.",
    solution:
      "A custom store with editorial product pages, size selection, favourites, cart and buy-now, quick filters by category, Arabic and English, and an admin dashboard for products and orders.",
    features: [
      { title: "Editorial product pages", text: "Large imagery, clear sizes and a one-tap buy-now button." },
      { title: "Shop & filters", text: "Filter by category, sort by newest, and search across products." },
      { title: "Favourites & cart", text: "Save pieces for later and check out in a few steps." },
      { title: "Own dashboard", text: "Products, stock, sizes and orders managed by the team." },
      { title: "Arabic & English", text: "A language switch across the whole store." },
    ],
    gallery: [
      s("luma", "/img/work/luma.jpg", "Home page", true),
      s("luma", "shop", "Shop with category filters"),
      s("luma", "product", "Product page"),
      s("luma", "dashboard", "Store dashboard"),
    ],
    outcome: "A store that matches the brand's look and is fully owned by the brand, from the product pages to the orders.",
  },
  {
    key: "glamour",
    headline: "A full fashion store for Egypt: hundreds of styles, cash on delivery, 14-day exchanges.",
    industry: "Fashion & accessories retail",
    location: "Egypt",
    type: "Custom online store",
    services: ["Store design", "Frontend", "Backend & API", "Catalogue setup"],
    overview:
      "Glamour Aura sells fashion, accessories and SHEIN picks across Egypt. The catalogue is wide, from dresses and modest wear to home and phone accessories, so the store had to make browsing easy and buying feel safe.",
    challenge:
      "A very large catalogue with many sub-categories, and customers who need reassurance before ordering online: delivery times, cash on delivery and exchanges.",
    solution:
      "A clean, feminine store with a mega-menu for every category, category pages with filters by size, price and stock, product pages that answer delivery and exchange questions up front, and a help centre for shipping and returns.",
    features: [
      { title: "Mega-menu catalogue", text: "Dozens of categories and sub-categories, one click away." },
      { title: "Filters that matter", text: "Size, price and in-stock filters, sorted by best selling." },
      { title: "Trust on every product", text: "Delivery time, cash on delivery and 14-day exchanges shown next to Add to bag." },
      { title: "Help centre", text: "Order tracking, shipping, returns and policies in one place." },
    ],
    gallery: [
      s("glamour", "/img/work/glamour.jpg", "Home page", true),
      s("glamour", "categories", "Shop by category & new arrivals"),
      s("glamour", "category", "Category page with filters"),
      s("glamour", "product", "Product page"),
      s("glamour", "help-centre", "Help centre"),
    ],
    outcome: "Customers find what they want quickly and get their questions answered before they ask, which is what turns a browser into an order.",
  },
  {
    key: "lunora",
    headline: "A playful women's fashion store that talks like its customers.",
    industry: "Fashion & beauty retail",
    location: "Egypt",
    type: "Custom online store",
    services: ["Store design", "Frontend", "Backend & API"],
    overview:
      "Lunora sells clothes, homewear, bags, shoes, accessories and makeup to women across Egypt. The brand voice is warm and Egyptian, so the store speaks the same way, from the hero to the cart.",
    challenge:
      "The brand needed a store that felt personal, not corporate, with discounts and new arrivals front and centre.",
    solution:
      "A soft pink, Arabic-first store with category tabs, search, discount badges and old/new prices on every product, favourites and a quick add-to-cart, plus a WhatsApp button for questions.",
    features: [
      { title: "Arabic-first, Egyptian voice", text: "Copy written the way customers talk." },
      { title: "Deals up front", text: "Discount badges and old vs new price on every product." },
      { title: "Category tabs & search", text: "Clothes, homewear, bags, shoes, accessories and makeup." },
      { title: "Favourites & quick add", text: "Save items or add to cart straight from the grid." },
    ],
    gallery: [
      s("lunora", "/img/work/lunora.jpg", "Home page", true),
      s("lunora", "shop", "Shop with category tabs"),
      s("lunora", "product", "Product page"),
    ],
    outcome: "A store that feels like the brand's Instagram, with offers that are impossible to miss.",
  },
  {
    key: "kaya",
    headline: "A boutique store with an editorial look for a womenswear label.",
    industry: "Fashion boutique",
    location: "Egypt",
    type: "Online store",
    services: ["Store design", "Theme customisation", "Catalogue setup"],
    overview:
      "KAYA Boutique makes coats, jackets and considered womenswear in soft fabrics. Their store needed to feel like a lookbook while still selling: sizes, sale prices and cash on delivery included.",
    challenge:
      "Strong photography and a small, seasonal collection that a busy template would bury.",
    solution:
      "An elegant serif-led store with collection pages, product pages that put the photos first, size guide, FAQ and contact pages, sale prices and a delivery bar announcing free shipping and exchanges.",
    features: [
      { title: "Lookbook product pages", text: "Large photo galleries next to price, size and Add to cart." },
      { title: "Collections", text: "Winter collection, coats, jackets, blouses and skirts." },
      { title: "Size guide & FAQ", text: "Answers that reduce returns before they happen." },
      { title: "Sale pricing", text: "Old and new prices shown clearly across the store." },
    ],
    gallery: [
      s("kaya", "/img/work/kaya.jpg", "Home page", true),
      s("kaya", "collection", "Collection page"),
      s("kaya", "product", "Product page"),
    ],
    outcome: "A small label with a store that looks like a big one, and lets the clothes do the selling.",
  },

  // ───────────────────────── WEBSITES ─────────────────────────
  {
    key: "imtiaz",
    headline: "The website of Saudi Arabia's first institutional-excellence consultancy.",
    industry: "Management consulting",
    location: "Saudi Arabia",
    type: "Corporate website + dashboard",
    services: ["Web design", "Frontend", "Content dashboard", "Bilingual"],
    overview:
      "Imtiaz Al Arabia helps government and private organisations prepare for national and international excellence awards. Its founder led the development of the national excellence model, so the website had to carry that authority.",
    challenge:
      "A long list of specialised consulting services and a strong track record that needed to read as credible to senior decision makers.",
    solution:
      "A bilingual corporate site with a dedicated page for every service, the founder's story, vision and values, partners, a blog, and a content dashboard so the team can publish without a developer.",
    features: [
      { title: "Service pages", text: "Awards qualification, quality systems, maturity assessment and more, one page each." },
      { title: "Founder & credibility", text: "Leadership, track record and partners presented clearly." },
      { title: "Blog", text: "Articles that show expertise and bring in search traffic." },
      { title: "Content dashboard", text: "The team updates services, posts and partners themselves." },
    ],
    gallery: [
      s("imtiaz", "/img/work/imtiaz.jpg", "Home page", true),
      s("imtiaz", "service", "Service page"),
      s("imtiaz", "about", "About & values"),
      s("imtiaz", "dashboard", "Content dashboard"),
    ],
    outcome: "A site that matches the firm's reputation and gives every service its own page to rank and to be shared.",
  },
  {
    key: "qualiexce",
    headline: "A consultancy website for quality systems, ISO and governance in the Gulf.",
    industry: "Quality & ISO consulting",
    location: "Saudi Arabia",
    type: "Corporate website",
    services: ["Web design", "Frontend", "Backend & API"],
    overview:
      "Qualiexce designs and implements management systems for Gulf organisations: quality, ISO certification and corporate governance. The site introduces the firm, its founder and its approach, and pushes visitors to book a consultation.",
    challenge: "Explaining a technical service in a way that feels premium and trustworthy, not like a certificate shop.",
    solution:
      "A modern Arabic site with a strong hero, vision and mission, the founder's message, a clear \"why us\" section, areas of excellence, a light/dark switch and a WhatsApp consultation button on every screen.",
    features: [
      { title: "Consultation-first", text: "\"Get a consultation\" and WhatsApp buttons on every screen." },
      { title: "Why us", text: "Custom systems, local expertise and global standards explained simply." },
      { title: "Founder's message", text: "A personal note that builds trust with decision makers." },
      { title: "Light & dark mode", text: "A theme switch for comfortable reading." },
    ],
    gallery: [
      s("qualiexce", "/img/work/qualiexce.jpg", "Home page", true),
      s("qualiexce", "about", "Vision, mission & values"),
      s("qualiexce", "why", "Why Qualiexce"),
    ],
    outcome: "A website that positions the firm as a long-term partner and turns visits into consultation requests.",
  },
  {
    key: "see",
    headline: "A premium website for a Saudi elevator company, with online installation and maintenance requests.",
    industry: "Elevators & escalators",
    location: "Saudi Arabia",
    type: "Corporate website",
    services: ["Web design", "Frontend", "Request forms", "Bilingual"],
    overview:
      "SEE (Saudi Elevator & Escalator Co.) designs, imports, installs and maintains elevators for towers, hotels, hospitals and homes across Makkah, Jeddah and Riyadh.",
    challenge: "Show high-end products to developers and owners, and capture installation and maintenance requests directly from the site.",
    solution:
      "A luxurious bilingual site with product pages and technical specs for each elevator type, services, projects, and two clear calls to action in the header: request installation and request maintenance.",
    features: [
      { title: "Product range", text: "Panoramic, residential, medical and freight elevators, each with specs." },
      { title: "Request installation", text: "A form that captures project details straight from the header." },
      { title: "Request maintenance", text: "Existing clients book maintenance in a few steps." },
      { title: "Projects", text: "Completed work that proves the company's capacity." },
    ],
    gallery: [
      s("see", "/img/work/see.jpg", "Home page", true),
      s("see", "product", "Product page with specs"),
      s("see", "services", "Services"),
      s("see", "request", "Installation request"),
    ],
    outcome: "The site does the first sales conversation: it shows the range, proves the experience and collects requests 24/7.",
  },
  {
    key: "touchone",
    headline: "A painting & renovation company website that sells with its portfolio.",
    industry: "Painting, decor & renovation",
    location: "Saudi Arabia",
    type: "Corporate website",
    services: ["Web design", "Frontend", "Projects & blog"],
    overview:
      "Touch One does interior and exterior painting, gypsum decor, facade restoration, insulation and renovation in Saudi Arabia. Their work is visual, so the website is built around it.",
    challenge: "Turn a services list into something a homeowner trusts enough to request a quote.",
    solution:
      "A dark, golden site with service detail pages, project case pages (villas, offices, apartments), a blog, experience counters and a quote request on every page, plus WhatsApp.",
    features: [
      { title: "Service pages", text: "Six services, each with its own detail page and quote button." },
      { title: "Project gallery", text: "Real projects in Riyadh, Jeddah and Khobar." },
      { title: "Quote requests", text: "\"Request a quote\" and site visit buttons everywhere." },
      { title: "Blog", text: "Content that answers customers' questions and helps SEO." },
    ],
    gallery: [
      s("touchone", "/img/work/touchone.jpg", "Home page", true),
      s("touchone", "services", "Services"),
      s("touchone", "project", "Project page"),
    ],
    outcome: "A site that lets the work speak and makes asking for a quote the obvious next step.",
  },
  {
    key: "ansary",
    headline: "Luxury transport for pilgrims and VIP guests, bookable online.",
    industry: "Transport & hospitality",
    location: "Saudi Arabia",
    type: "Booking website",
    services: ["Web design", "Frontend", "Booking flow", "Bilingual"],
    overview:
      "Ansary provides premium transport for pilgrims, Umrah visitors and VIP guests: airport pickups in Jeddah, Madinah and Taif, trips between cities, and guided visits to Islamic and historic sites.",
    challenge: "International guests need to trust a company they've never met and book a car before they land.",
    solution:
      "A warm, cinematic bilingual site showing the services, the fleet and the trips, with FAQ, clear policies and a booking request on every section, plus phone and WhatsApp buttons.",
    features: [
      { title: "Airport service", text: "Pickups from Jeddah, Madinah and Taif airports, timed to flights." },
      { title: "Fleet", text: "The vehicles guests can choose, presented clearly." },
      { title: "Trips & visits", text: "Intercity trips and guided visits in Makkah, Madinah, Jeddah and Taif." },
      { title: "Policies & FAQ", text: "Cancellation, terms and privacy that answer questions before booking." },
    ],
    gallery: [
      s("ansary", "/img/work/ansary.jpg", "Home page", true),
      s("ansary", "fleet", "Fleet"),
      s("ansary", "services", "Services"),
    ],
    outcome: "Guests can understand the service, trust it and request a booking before they travel.",
  },
  {
    key: "kmfilms",
    headline: "A cinematic website for a wedding films studio.",
    industry: "Wedding films & photography",
    location: "Egypt",
    type: "Portfolio & booking website",
    services: ["Web design", "Frontend", "Films & packages", "Bilingual"],
    overview:
      "KM Films shoots cinematic wedding films across Egypt. Couples choose a studio by feeling, so the site had to feel like one of their films.",
    challenge: "Show the films beautifully, explain the packages and get couples to book a date.",
    solution:
      "A black-and-white, film-like site with a films library and a page per couple, packages with direct booking links, the studio's story and process, and Arabic and English versions.",
    features: [
      { title: "Films library", text: "Every wedding has its own page with the film and the story." },
      { title: "Packages", text: "Classic, Signature and Cinema, each with a booking button." },
      { title: "How we work", text: "The process from the first call to delivering the film." },
      { title: "Arabic & English", text: "Bilingual for couples in Egypt and abroad." },
    ],
    gallery: [
      s("kmfilms", "/img/work/kmfilms.jpg", "Home page", true),
      s("kmfilms", "films", "Films library"),
      s("kmfilms", "film", "Single film page"),
      s("kmfilms", "packages", "Packages"),
    ],
    outcome: "A site that feels like the studio's films and moves couples from watching to booking.",
  },
  {
    key: "mal",
    headline: "A finance and business news platform built for reading.",
    industry: "Media & publishing",
    location: "Middle East",
    type: "Content platform",
    services: ["Web design", "Frontend", "CMS", "SEO structure"],
    overview:
      "Mal & Aamal (مال وأعمال) publishes analysis on markets, macroeconomics, entrepreneurship and fintech for Arabic readers who want to make smarter money decisions.",
    challenge: "Make dense financial content easy to browse and comfortable to read, and easy for editors to publish.",
    solution:
      "A clean Arabic reading platform with categories, article cards showing date and reading time, a full article page, author bylines, and a CMS for the editorial team.",
    features: [
      { title: "Categories", text: "Markets, macroeconomics, entrepreneurship, fintech and real estate." },
      { title: "Reading-first articles", text: "Comfortable typography, reading time and author on every post." },
      { title: "CMS", text: "Editors publish and organise articles without a developer." },
      { title: "SEO-ready", text: "Clean URLs and structure for search engines." },
    ],
    gallery: [
      s("mal", "/img/work/mal.jpg", "Home page", true),
      s("mal", "articles", "Articles"),
      s("mal", "article", "Article page"),
    ],
    outcome: "A publication that is pleasant to read and simple to run, built to grow with every article.",
  },
  {
    key: "almadhi",
    headline: "The official website of a family, preserving generations of history.",
    industry: "Heritage & community",
    location: "Saudi Arabia",
    type: "Content website",
    services: ["Web design", "Frontend", "Content structure"],
    overview:
      "The Al-Madhi family's official site tells the family's story from the 11th century AH to today: its scholars, its annual gathering, its academic excellence award, its family tree and its landmarks in Najd.",
    challenge: "Organise centuries of history, biographies and events into something the youngest generation will actually explore.",
    solution:
      "A dignified green-and-gold site with sections for history, biographies, the annual camp archive by year, the excellence award, a documented family tree, landmarks and a photo gallery.",
    features: [
      { title: "History", text: "The family's story told across the centuries." },
      { title: "Biographies", text: "Profiles of the family's scholars and figures." },
      { title: "Annual camp archive", text: "Thirty years of gatherings, organised by year." },
      { title: "Family tree", text: "A documented lineage linking generations." },
      { title: "Gallery", text: "Photos that keep the memory of every occasion." },
    ],
    gallery: [
      s("almadhi", "/img/work/almadhi.jpg", "Home page", true),
      s("almadhi", "history", "History"),
      s("almadhi", "tree", "Family tree"),
      s("almadhi", "gallery", "Photo gallery"),
    ],
    outcome: "A living archive that keeps the family's memory in one place for every generation.",
  },
  {
    key: "techflow",
    headline: "The website of a digital agency that builds websites, stores and brands.",
    industry: "Digital agency",
    location: "Saudi Arabia",
    type: "Agency website",
    services: ["Web design", "Frontend", "Portfolio & blog"],
    overview:
      "Tech Flow is a digital agency offering web design, e-commerce, mobile apps, branding, SEO and digital marketing for businesses in Saudi Arabia.",
    challenge: "Sell the agency's process and results, not just a list of services.",
    solution:
      "A fresh, mint-toned site with a services section, results counters, a step-by-step journey of how projects run, a works portfolio, testimonials, a blog and a \"start your project\" call to action throughout.",
    features: [
      { title: "Services", text: "Websites, stores, apps, branding, SEO and marketing explained." },
      { title: "The journey", text: "Six stages from discovery to growth, with timelines." },
      { title: "Portfolio", text: "A works page that shows real client projects." },
      { title: "Blog & testimonials", text: "Proof and content that build trust." },
    ],
    gallery: [
      s("techflow", "/img/work/techflow.jpg", "Home page", true),
      s("techflow", "works", "Works portfolio"),
      s("techflow", "blog", "Blog"),
    ],
    outcome: "An agency site that explains how the work gets done and invites the next client to start.",
  },
];
