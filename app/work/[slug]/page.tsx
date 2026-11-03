/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import Arrow from "@/components/Arrow";
import Effects from "@/components/Effects";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";
import Gallery from "@/components/Gallery";
import { getContent } from "@/data/content";
import { cases } from "@/data/cases";

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.key }));
}

function find(slug: string) {
  const c = getContent("en");
  const i = c.work.findIndex((w) => w.key === slug);
  const raw = cases.find((x) => x.key === slug);
  if (i < 0 || !raw) return null;
  // Skip screens whose image file hasn't been added yet
  const study = {
    ...raw,
    gallery: raw.gallery.filter((g) => fs.existsSync(path.join(process.cwd(), "public", g.src))),
  };
  const list = c.work.filter((w) => cases.some((x) => x.key === w.key));
  const j = list.findIndex((w) => w.key === slug);
  return {
    c,
    item: c.work[i],
    study,
    num: j + 1,
    total: list.length,
    prev: list[(j - 1 + list.length) % list.length],
    next: list[(j + 1) % list.length],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = find(slug);
  if (!d) return {};
  return {
    title: `${d.item.name} — case study · SHOMAN®`,
    description: d.study.headline,
    openGraph: { images: [d.item.img] },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = find(slug);
  if (!d) notFound();
  const { c, item, study, num, total, prev, next } = d;
  const s = c.shared;
  const host = item.url.replace(/^https?:\/\//, "");
  const wa = s.whatsapp
    ? `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Hi Ahmed, I saw ${item.name} in your portfolio and I'd like something similar.`)}`
    : "#contact";

  return (
    <div className="site" dir="ltr" lang="en">
      {/* ═══ HEADER ═══ */}
      <header className="header is-solid case-header">
        <a className="header__logo" href="/">
          {s.logo}
          <sup>®</sup>
        </a>
        <a className="case-back" href="/#work">
          <span aria-hidden="true">←</span> All projects
        </a>
        <a className="pill pill--lime" href="#contact">
          {c.sayHello} <Arrow />
        </a>
      </header>

      <main>
        {/* ═══ HERO ═══ */}
        <section className="case-hero">
          <div className="case-hero__meta">
            <span>// case study</span>
            <span>
              №{pad(num)} / {pad(total)}
            </span>
            <span>{c.workUi.cats[item.cat]}</span>
          </div>
          <h1 className="case-hero__name">{item.name}</h1>
          <p className="case-hero__headline">{study.headline}</p>

          <dl className="case-facts">
            <div>
              <dt>Industry</dt>
              <dd>{study.industry}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{study.location}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{study.type}</dd>
            </div>
            <div>
              <dt>Delivered</dt>
              <dd>{study.services.join(" · ")}</dd>
            </div>
          </dl>

          <div className="case-hero__cta">
            <a className="pill pill--lime pill--big" href={item.url} target="_blank" rel="noreferrer">
              Visit live site <Arrow />
            </a>
            <a className="pill pill--ghost pill--big" href={wa} target={s.whatsapp ? "_blank" : undefined} rel="noreferrer">
              I want one like this
            </a>
          </div>

          <figure className="case-cover shot__frame">
            <div className="shot__bar">
              <i />
              <i />
              <i />
              <span>{host}</span>
            </div>
            <img src={study.gallery[0]?.src ?? item.img} alt={`${item.name} home page`} />
          </figure>
        </section>

        {/* ═══ OVERVIEW ═══ */}
        <section className="case-overview">
          <p className="manifest__note">// overview</p>
          <p className="case-overview__text reveal">{study.overview}</p>
        </section>

        {/* ═══ CHALLENGE / SOLUTION ═══ */}
        <section className="case-cs">
          <article className="case-cs__col reveal" data-reveal="left">
            <span className="case-cs__tag mk mk--gold">The challenge</span>
            <p>{study.challenge}</p>
          </article>
          <article className="case-cs__col reveal" data-reveal="right">
            <span className="case-cs__tag mk mk--mint">The solution</span>
            <p>{study.solution}</p>
          </article>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section className="stack case-features">
          <div className="section-head">
            <span className="section-head__idx">(01)</span>
            <h2 className="section-head__title">What&apos;s inside</h2>
            <span className="section-head__note">// key features</span>
          </div>
          {study.features.map((f, i) => (
            <div className="stack__row case-feature reveal" key={f.title}>
              <span className="stack__idx">{pad(i + 1)}</span>
              <div className="stack__main">
                <h3>{f.title}</h3>
              </div>
              <p className="case-feature__text">{f.text}</p>
            </div>
          ))}
        </section>

        {/* ═══ GALLERY (cover screen is shown above, so start from the 2nd) ═══ */}
        {study.gallery.length > 1 && (
        <section className="case-gallery">
          <div className="section-head">
            <span className="section-head__idx">(02)</span>
            <h2 className="section-head__title">Screens</h2>
            <span className="section-head__note">// click to enlarge</span>
          </div>
          <Gallery shots={study.gallery.slice(1)} host={host} name={item.name} />
        </section>
        )}

        {/* ═══ OUTCOME / CTA ═══ */}
        <section className="case-cta">
          <p className="manifest__note">// the result</p>
          <p className="case-cta__outcome">{study.outcome}</p>
          <h2 className="case-cta__title">
            Need a <mark className="mk mk--lime">{{ Systems: "system", "E-commerce": "store", Websites: "website" }[item.cat]}</mark> like this?
          </h2>
          <div className="case-hero__cta">
            <a className="pill pill--lime pill--big" href={wa} target={s.whatsapp ? "_blank" : undefined} rel="noreferrer">
              Talk on WhatsApp <Arrow />
            </a>
            <a className="pill pill--ghost pill--big case-cta__ghost" href="/#work">
              See all projects
            </a>
          </div>
        </section>

        {/* ═══ PREV / NEXT ═══ */}
        <nav className="case-nav" aria-label="More projects">
          <a className="case-nav__item" href={`/work/${prev.key}`}>
            <span>← Previous</span>
            <strong>{prev.name}</strong>
          </a>
          <a className="case-nav__item case-nav__item--next" href={`/work/${next.key}`}>
            <span>Next →</span>
            <strong>{next.name}</strong>
          </a>
        </nav>
      </main>

      <SiteFooter c={c} />
      <WhatsAppFab number={s.whatsapp} label={c.fab} />
      <Effects />
    </div>
  );
}
