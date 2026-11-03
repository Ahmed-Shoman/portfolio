"use client";

import { useEffect, useState } from "react";
import Arrow from "./Arrow";

type Props = {
  logo: string;
  nav: { href: string; label: string }[];
  sayHello: string;
};

export default function Header({ logo, nav, sayHello }: Props) {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    nav.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [nav]);

  return (
    <header className={`header${solid ? " is-solid" : ""}`} id="header">
      <a className="header__logo" href="#top" dir="ltr">
        {logo}
        <sup>®</sup>
      </a>
      <nav className="header__nav">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className={active === n.href ? "is-active" : undefined}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="header__actions">
        <a className="pill pill--lime" href="#contact">
          {sayHello} <Arrow />
        </a>
      </div>
    </header>
  );
}
