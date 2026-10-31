"use client";

import { useEffect } from "react";

/** Scroll reveal (.reveal → .in) and number counters (.stat .count), same as the reference site. */
export default function Effects() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.classList.add("in");
            reveal.unobserve(e.target);
          }
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

    const animate = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.to || "0");
      const dec = parseInt(el.dataset.dec || "0", 10);
      const dur = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (to * eased).toFixed(dec);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const counters = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>(".count").forEach(animate);
            counters.unobserve(e.target);
          }
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll(".stat").forEach((el) => counters.observe(el));

    return () => {
      reveal.disconnect();
      counters.disconnect();
    };
  }, []);

  return null;
}
