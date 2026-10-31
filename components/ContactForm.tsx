"use client";

import { useState } from "react";
import Arrow from "./Arrow";

type T = {
  title: string;
  sub: string;
  name: string;
  namePh: string;
  type: string;
  types: string[];
  budget: string;
  budgets: string[];
  msg: string;
  msgPh: string;
  send: string;
  noNumber: string;
  waIntro: string;
  waName: string;
  waType: string;
  waBudget: string;
  waMsg: string;
};

/** Builds a WhatsApp message from the form and opens wa.me with it prefilled. */
export default function ContactForm({ t, whatsapp, email }: { t: T; whatsapp: string; email: string }) {
  const [missing, setMissing] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!whatsapp) {
      setMissing(true);
      return;
    }
    const text = [
      t.waIntro,
      `${t.waName}: ${f.get("name") || "-"}`,
      `${t.waType}: ${f.get("type")}`,
      `${t.waBudget}: ${f.get("budget")}`,
      `${t.waMsg}: ${f.get("msg") || "-"}`,
    ].join("\n");
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <form className="cform" onSubmit={onSubmit}>
      <div className="cform__head">
        <h3>{t.title}</h3>
        <p>{t.sub}</p>
      </div>
      <label className="cform__field">
        <span>{t.name}</span>
        <input id="cf-name" name="name" required placeholder={t.namePh} autoComplete="name" />
      </label>
      <label className="cform__field">
        <span>{t.type}</span>
        <select id="cf-type" name="type">
          {t.types.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="cform__field">
        <span>{t.budget}</span>
        <select id="cf-budget" name="budget">
          {t.budgets.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="cform__field cform__field--wide">
        <span>{t.msg}</span>
        <textarea id="cf-msg" name="msg" rows={4} placeholder={t.msgPh} />
      </label>
      <div className="cform__foot">
        <button className="pill pill--lime pill--big" type="submit">
          {t.send} <Arrow />
        </button>
        {missing && (
          <p className="cform__note" role="status">
            {t.noNumber} <span dir="ltr">{email}</span>
          </p>
        )}
      </div>
    </form>
  );
}
