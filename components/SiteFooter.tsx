import Arrow from "./Arrow";
import ContactForm from "./ContactForm";
import type { SiteContent } from "@/data/content";

export default function SiteFooter({ c }: { c: SiteContent }) {
  const s = c.shared;
  return (
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
  );
}
