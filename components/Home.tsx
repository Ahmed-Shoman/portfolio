/* eslint-disable @next/next/no-img-element */
import Header from "./Header";
import Effects from "./Effects";
import ProjectsRail from "./ProjectsRail";
import WorkGrid from "./WorkGrid";
import ContactForm from "./ContactForm";
import WhatsAppFab from "./WhatsAppFab";
import Arrow from "./Arrow";
import HtmlLang from "./HtmlLang";
import type { SiteContent } from "@/data/content";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home({ c }: { c: SiteContent }) {
  const s = c.shared;
  return (
    <div className="site" dir={c.dir} lang={c.lang}>
      <HtmlLang lang={c.lang} dir={c.dir} />
      {/* ═══ TICKER ═══ */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...c.ticker, ...c.ticker].map((t, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span>{t}</span>
              <i className="ast">✳</i>
            </span>
          ))}
        </div>
      </div>

      <Header logo={s.logo} nav={c.nav} sayHello={c.sayHello} />

      <main id="top">
        {/* ═══ HERO ═══ */}
        <section className="hero">
          <div className="hero__meta">
            {c.hero.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <h1 className="hero__word">
            <span className="hero__line hero__line--left">{c.hero.first}</span>
            <span className="hero__line hero__line--right">{c.hero.last}</span>
          </h1>
          <div className="hero__circle" aria-hidden="true">
            <span>{c.hero.circle}</span>
          </div>
          <figure className="hero__photo reveal in" data-reveal="right">
            <img src={s.photo} alt={c.hero.photoAlt} />
            <figcaption>{c.hero.caption}</figcaption>
          </figure>
          <div className="hero__cta">
            <a className="pill pill--lime pill--big" href="#contact">
              {c.hero.ctaMain} <Arrow />
            </a>
            <a className="pill pill--ghost pill--big" href="#doposle">
              {c.hero.ctaSecond}
            </a>
          </div>
        </section>

        {/* ═══ MANIFEST ═══ */}
        <section className="manifest">
          <p className="manifest__note">{c.manifest.note}</p>
          <h2 className="manifest__lines">
            {c.manifest.lines.map((l) => (
              <span className="reveal" key={l.mark}>
                {l.pre} <mark className={`mk mk--${l.color}`}>{l.mark}</mark>
              </span>
            ))}
          </h2>
          <p className="manifest__sub">{c.manifest.sub}</p>
        </section>

        {/* ═══ STACK ═══ */}
        <section className="stack" id="stack">
          <div className="section-head">
            <span className="section-head__idx">(01)</span>
            <h2 className="section-head__title">{c.stackHead.title}</h2>
            <span className="section-head__note">{c.stackHead.note}</span>
          </div>
          {c.stack.map((st, i) => (
            <div className="stack__row reveal" key={st.title}>
              <span className="stack__idx">{pad(i + 1)}</span>
              <div className="stack__main">
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </div>
              <div className="stack__tags">
                {st.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ═══ BEFORE / AFTER ═══ */}
        <section className="ba" id="doposle">
          <div className="ba__word" aria-hidden="true">
            <span className="ba__line ba__line--left">{c.beforeAfter.before}</span>
            <div className="ba__circle">
              <span>&amp;</span>
            </div>
            <span className="ba__line ba__line--right">{c.beforeAfter.after}</span>
          </div>
          <p className="ba__note">{c.beforeAfter.note}</p>
          <div className="ba__photos">
            {[
              { ...c.beforeAfter.beforeImg, dir: "left" },
              { ...c.beforeAfter.afterImg, dir: "right" },
            ].map((ph) => (
              <figure className="ba__photo reveal" data-reveal={ph.dir} key={ph.dir}>
                <img src={ph.src} alt={ph.alt} />
                <figcaption>{ph.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="ba__stats">
            {c.stats.map((st) => (
              <div className="stat reveal" key={st.label}>
                <span className="stat__label">{st.label}</span>
                <span className="stat__before">{st.before}</span>
                <span className="stat__arrow">{c.beforeAfter.arrow}</span>
                <span className="stat__after" dir="ltr">
                  {st.prefix && <i>{st.prefix}</i>}
                  <b className="count" data-to={st.to} data-dec={st.dec}>
                    0
                  </b>
                  {st.suffix && <i>{st.suffix}</i>}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section className="projects" id="projects">
          <div className="section-head">
            <span className="section-head__idx">(02)</span>
            <h2 className="section-head__title">{c.projectsHead.title}</h2>
            <span className="section-head__note">{c.projectsHead.note}</span>
          </div>
          <ProjectsRail projects={c.projectsFull} />
        </section>

        {/* ═══ ALL WORK ═══ */}
        <section className="work" id="work">
          <div className="section-head">
            <span className="section-head__idx">(03)</span>
            <h2 className="section-head__title">{c.workHead.title}</h2>
            <span className="section-head__note">
              // {c.work.length} {c.workHead.note}
            </span>
          </div>
          <WorkGrid work={c.work} cats={c.workCats} ui={c.workUi} />
        </section>

        {/* ═══ PROCESS ═══ */}
        <section className="process" id="process">
          <div className="section-head">
            <span className="section-head__idx">(04)</span>
            <h2 className="section-head__title">{c.processHead.title}</h2>
            <span className="section-head__note">{c.processHead.note}</span>
          </div>
          <ol className="process__steps">
            {c.process.map((p, i) => (
              <li className="reveal" key={p.title}>
                <span className="process__num">{pad(i + 1)}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      {/* ═══ FOOTER + CONTACT ═══ */}
      <footer className="footer" id="contact">
        <p className="footer__note">{c.footer.note}</p>
        <a className="footer__cta" href={s.whatsapp ? `https://wa.me/${s.whatsapp}` : `mailto:${s.email}`}>
          {c.footer.cta} <Arrow />
        </a>
        <ContactForm t={c.contact} whatsapp={s.whatsapp} email={s.email} />
        <div className="footer__meta">
          <span>{s.email}</span>
          {s.whatsapp && <span dir="ltr">WhatsApp: +{s.whatsapp}</span>}
          <a href={`https://github.com/${s.github}`} target="_blank" rel="noreferrer">
            GitHub: @{s.github}
          </a>
          <span>{c.location}</span>
          <span>
            © {s.year} {s.logo}®
          </span>
        </div>
      </footer>

      <WhatsAppFab number={s.whatsapp} label={c.fab} />
      <Effects />
    </div>
  );
}
