import type { Metadata } from "next";
import Home from "@/components/Home";
import { getContent } from "@/data/content";

const c = getContent("ar");

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { languages: { en: "/", ar: "/ar" } },
};

export default function Page() {
  return <Home c={c} />;
}
