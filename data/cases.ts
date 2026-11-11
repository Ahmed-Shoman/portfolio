// ─────────────────────────────────────────────────────────────
//  Case-study pages: /work/<key>
//  One entry per case in data/content.ts (same `key`).
//  Screens live in public/img/cases/<key>/ — a screen whose file
//  doesn't exist yet is skipped automatically.
//  All numbers are copied from the ads / Salla screenshots.
//  Campaign names, account names and store details are blurred.
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
  // ───────────────────────── SNAPCHAT ─────────────────────────
  {
    key: "snap-scale",
    headline: "SAR 27.6K on Snapchat turned into SAR 207.7K in sales: 940 purchases at a 7.51× ROAS.",
    industry: "Saudi e-commerce store",
    location: "Saudi Arabia",
    type: "Snapchat Ads · Mar – Aug 2026",
    services: ["Sales campaigns", "Creative testing", "Retargeting", "Scaling"],
    overview:
      "A Saudi online store that needed Snapchat to bring in sales, not views. From March to mid-August 2026 the account served 3,184,370 paid impressions and tracked 940 purchases worth SAR 207,763.14 from SAR 27,652.68 in spend.",
    challenge:
      "Snapchat is cheap to show ads on and expensive to waste money on. Results swing day to day, and one weak creative left running can eat a week of budget.",
    solution:
      "Short dated sales campaigns, each built around a fresh creative or offer, plus a retargeting line. Campaigns that didn't bring purchases were switched off quickly, and the budget went to the ones that did. The biggest campaign alone brought 111 purchases worth SAR 25,468.99.",
    features: [
      { title: "7.51× ROAS", text: "SAR 207,763.14 in purchase value from SAR 27,652.68 in spend." },
      { title: "940 purchases", text: "At an average cost of SAR 29.42 per purchase." },
      { title: "3.18M impressions", text: "3,184,370 paid impressions, about SAR 8.68 per 1,000." },
      { title: "Best campaigns", text: "10.03× (24 purchases), 10.36× and 12.03× ROAS on smaller budgets." },
    ],
    gallery: [
      s("snap-scale", "overview", "Account overview: spend, purchases, purchase value and ROAS", true),
      s("snap-scale", "campaigns", "Campaigns and totals (names hidden)", true),
    ],
    outcome:
      "From March to August the account returned SAR 7.51 for every riyal spent, with purchases costing SAR 29.42 on average.",
  },
  {
    key: "snap-launch",
    headline: "A short Snapchat push: SAR 3.67K spend, SAR 38.9K in sales, 10.6× ROAS.",
    industry: "Saudi e-commerce store",
    location: "Saudi Arabia",
    type: "Snapchat Ads · Apr – May 2026",
    services: ["Sales campaigns", "Offer campaigns", "Budget control"],
    overview:
      "A Saudi store running on a small budget around its offers and the Eid season. The campaigns ran from late April to around 20 May 2026 and brought 142 purchases worth SAR 38,931.91 from SAR 3,672.27 in spend.",
    challenge:
      "A small budget leaves no room for experiments that don't sell. Every riyal had to go into campaigns that could pay back within days.",
    solution:
      "Short campaigns tied to specific offers (a 50% sale, an Eid collection) with low daily budgets. Weak campaigns were stopped after a few riyals, and the winning offer got more budget. The best one brought 66 purchases worth SAR 17,941.88 from SAR 1,430.91.",
    features: [
      { title: "10.6× ROAS", text: "SAR 38,931.91 in purchase value from SAR 3,672.27 in spend." },
      { title: "142 purchases", text: "At an average cost of SAR 25.86 per purchase." },
      { title: "12.54× top campaign", text: "66 purchases from SAR 1,430.91 on one offer." },
      { title: "14.05× best ROAS", text: "19 purchases worth SAR 5,203.30 from SAR 370.42." },
    ],
    gallery: [
      s("snap-launch", "overview", "Account overview: 18 Mar – 6 Jun 2026", true),
      s("snap-launch", "campaigns", "Campaigns and totals (names hidden)", true),
    ],
    outcome:
      "A small budget earned back more than ten times its cost, and every purchase cost SAR 25.86 on average.",
  },

  // ───────────────────────── TIKTOK ─────────────────────────
  {
    key: "tiktok-longrun",
    headline: "91 TikTok campaigns, SAR 257K in sales, 1,179 purchases at a 6.81× return.",
    industry: "Saudi e-commerce store",
    location: "Saudi Arabia",
    type: "TikTok Ads · Oct 2024 – Aug 2026",
    services: ["Web purchase campaigns", "Creative testing", "Scaling winners"],
    overview:
      "A long-running TikTok account for a Saudi store. Across 91 campaigns it brought 1,179 website purchases worth SAR 257,176.96 from SAR 37,775.51 in spend, with an average order of SAR 218.13.",
    challenge:
      "On TikTok a creative wears out fast. What sells this week can stop selling next week, so the account needs a steady flow of new tests without burning the budget on them.",
    solution:
      "A cycle of short dated test campaigns. When a creative proved itself, it got its own campaign and a bigger budget. The three biggest live campaigns in the screenshot sit between 7.1× and 9.0× return.",
    features: [
      { title: "6.81× ROAS", text: "Payment-completion ROAS across all 91 campaigns." },
      { title: "1,179 purchases", text: "At an average cost of SAR 32.04 per purchase." },
      { title: "SAR 218 AOV", text: "Average order value of SAR 218.13." },
      { title: "9.0× winning creative", text: "46 purchases worth SAR 10,424 from SAR 1,157.30. Another campaign: 64 purchases at 8.91×." },
    ],
    gallery: [s("tiktok-longrun", "campaigns", "Campaigns and lifetime totals (names hidden)", true)],
    outcome:
      "SAR 257,176.96 in tracked sales, with the account returning SAR 6.81 for every riyal spent over its lifetime.",
  },
  {
    key: "tiktok-sprint",
    headline: "Ten weeks on TikTok: SAR 6.3K spend, SAR 45.9K in sales, and two campaigns doing the heavy lifting.",
    industry: "Saudi e-commerce store",
    location: "Saudi Arabia",
    type: "TikTok Ads · Mar – Jun 2026",
    services: ["Test campaigns", "Scaling", "Budget control"],
    overview:
      "A TikTok account for a Saudi store, 31 March to 6 June 2026. Eight campaigns brought 176 purchases worth SAR 45,877.46 from SAR 6,346.85 in spend.",
    challenge:
      "Find what sells quickly and spend as little as possible on what doesn't.",
    solution:
      "Small tests stayed small (SAR 1 to SAR 139 each), and the budget went to the two campaigns that sold: one brought 111 purchases worth SAR 29,127.89, the other 61 purchases worth SAR 16,024.57.",
    features: [
      { title: "7.23× ROAS", text: "SAR 45,877.46 in purchase value from SAR 6,346.85 in spend." },
      { title: "176 purchases", text: "At an average cost of SAR 36.06 per purchase." },
      { title: "98% from 2 campaigns", text: "172 of the 176 purchases came from the two scaled campaigns." },
      { title: "8.18× top campaign", text: "111 purchases from SAR 3,562.65." },
    ],
    gallery: [s("tiktok-sprint", "campaigns", "Campaigns and totals (names hidden)", true)],
    outcome:
      "Losing tests cost little, and the two winners turned SAR 5.9K into SAR 45K of sales.",
  },
  {
    key: "tiktok-september",
    headline: "One month on TikTok: SAR 10.3K spend, SAR 64K in sales, 314 purchases.",
    industry: "Saudi e-commerce store",
    location: "Saudi Arabia",
    type: "TikTok Ads · September 2026",
    services: ["Web purchase campaigns", "Checkout funnel", "Scaling"],
    overview:
      "A full month (1–30 September 2026) on TikTok for a Saudi store: 314 purchases worth SAR 64,042.01 from SAR 10,260.40 in spend.",
    challenge:
      "Keep a busy account profitable while it runs several campaigns at once, and watch the whole funnel instead of only the final sale.",
    solution:
      "Each campaign was tracked from checkout to payment. 1,491 people added payment info at SAR 6.88 each, and about 1 in 5 of them completed the purchase. The main campaign brought 147 purchases worth SAR 29,981.",
    features: [
      { title: "6.24× ROAS", text: "SAR 64,042.01 in purchase value from SAR 10,260.40 in spend." },
      { title: "314 purchases", text: "At an average cost of SAR 32.68 per purchase." },
      { title: "1,491 payment adds", text: "At SAR 6.88 each, with checkouts started at SAR 6.94." },
      { title: "13.6× best ROAS", text: "A smaller campaign: SAR 1,908 in sales from SAR 140.02." },
    ],
    gallery: [s("tiktok-september", "campaigns", "Campaigns, 1–30 Sep 2026 (names hidden)", true)],
    outcome: "SAR 64K in sales in 30 days, at SAR 6.24 back for every riyal spent.",
  },

  // ───────────────────────── GOOGLE ─────────────────────────
  {
    key: "google-shopping",
    headline: "Google Ads for a high-ticket store: SAR 7.93K cost, SAR 78.2K in conversion value, 985% ROAS.",
    industry: "Saudi e-commerce store (high order value)",
    location: "Saudi Arabia",
    type: "Google Ads · Oct – Nov 2026",
    services: ["Shopping campaigns", "Conversion tracking", "Budget management"],
    overview:
      "A store with expensive products, where each sale is worth a lot. From 1 October to 4 November 2026, Google Ads cost SAR 7.93K and brought SAR 78.2K in conversion value.",
    challenge:
      "With high-priced products, sales come in few and far between. A day without a sale is normal, and judging the campaign day by day leads to bad decisions.",
    solution:
      "Shopping campaigns that reach people already searching for the product. With few, large orders, results are read over weeks instead of single days.",
    features: [
      { title: "985% ROAS", text: "SAR 78.2K in conversion value from SAR 7.93K in cost (about 9.85×)." },
      { title: "~29 purchases", text: "28.6 purchases as Google counts them, about SAR 2.7K each." },
      { title: "Shopping", text: "Product ads shown to people searching for what the store sells." },
    ],
    gallery: [s("google-shopping", "overview", "Google Ads overview, 1 Oct – 4 Nov 2026 (campaign name hidden)", true)],
    outcome: "Every riyal spent on Google came back as about SAR 9.85 in conversion value.",
  },

  // ───────────────────────── STORE ─────────────────────────
  {
    key: "salla-growth",
    headline: "A Salla store goes from SAR 72.9K to SAR 100.5K a month and hits its 100K goal.",
    industry: "Saudi e-commerce store (Salla)",
    location: "Saudi Arabia",
    type: "Salla dashboard · May – Jul 2026",
    services: ["Paid ads", "Offers", "Monthly goals"],
    overview:
      "The store-side view: what the Salla dashboard shows month after month while the ads run. The numbers below are the store's own monthly summaries.",
    challenge:
      "Ad platforms report their own numbers. What matters to the owner is what shows up in the store: orders and sales.",
    solution:
      "Campaigns planned around the store's monthly sales goals in Salla. In May the store passed its SAR 50K goal before the month was over. In July it set a SAR 100K goal and reached it.",
    features: [
      { title: "May", text: "SAR 55,225.42 in sales and 240 orders before the month ended, above the SAR 50K goal." },
      { title: "June", text: "SAR 72,891 in sales, 320 orders, 18,938 visits." },
      { title: "July", text: "SAR 100,489.95 in sales, 443 orders, 26,004 visits. The SAR 100K goal was hit." },
      { title: "+38%", text: "Sales and orders from June to July, at about a 1.7% conversion rate." },
    ],
    gallery: [
      s("salla-growth", "july", "July 2026: SAR 100,489.95, 443 orders (store details hidden)", true),
      s("salla-growth", "june", "June 2026: SAR 72,891, 320 orders"),
      s("salla-growth", "may", "May 2026: SAR 55,225.42 by mid-month, above the 50K goal"),
    ],
    outcome: "From June to July, sales grew 38% and orders went from 320 to 443.",
  },
];
