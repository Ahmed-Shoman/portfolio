# Shoman Portfolio (Next.js)

1:1 rebuild of the Montgomery portfolio design in Next.js (App Router, TypeScript).

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Edit content

Everything (texts, stack, stats, projects, email) is in `data/content.ts`.
Lines marked `TODO` need your real data:

- `site.email` — your email
- `hero.photo` — your portrait, 2:3 (put it in `public/img/`)
- `beforeAfter.before/after` — two 3:2 images
- `beforeAfter.stats` — your real numbers

## Structure

- `app/globals.css` — the full design CSS (colors, fonts, animations, responsive)
- `app/page.tsx` — all sections
- `components/Header.tsx` — sticky header + active nav on scroll
- `components/Effects.tsx` — scroll reveal + number counters
- `components/ProjectsRail.tsx` — horizontal projects rail + dots

Deploy: push to GitHub and import on Vercel.
