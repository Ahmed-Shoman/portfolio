import type { Metadata } from "next";
import "./globals.css";
import { getContent } from "@/data/content";

const c = getContent("en");

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Arabic font files only download on pages that contain Arabic text (unicode-range). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=JetBrains+Mono:wght@400;700&family=Alexandria:wght@600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
