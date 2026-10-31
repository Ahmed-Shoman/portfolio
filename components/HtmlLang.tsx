"use client";
import { useEffect } from "react";

/** Sets <html lang/dir> for the current language (the root layout is shared by / and /ar). */
export default function HtmlLang({ lang, dir }: { lang: string; dir: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);
  return null;
}
