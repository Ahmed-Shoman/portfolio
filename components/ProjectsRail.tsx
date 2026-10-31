"use client";

import { useRef, useState } from "react";
import type { ProjColor } from "@/data/content";

type Proj = { idx: string; name: string; desc: string; role: string; color: ProjColor };

export default function ProjectsRail({ projects }: { projects: Proj[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const rail = railRef.current;
    const first = cardRefs.current[0];
    if (!rail || !first) return;
    // scrollLeft is negative in RTL, so use the absolute value
    const i = Math.round(Math.abs(rail.scrollLeft) / (first.offsetWidth + 32));
    setActive(Math.min(i, projects.length - 1));
  };

  return (
    <>
      <div className="projects__rail" id="rail" ref={railRef} onScroll={onScroll}>
        {projects.map((p, i) => (
          <article
            key={p.name}
            className={`proj proj--${p.color}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <span className="proj__idx">{p.idx}</span>
            <h3 className="proj__name">{p.name}</h3>
            <p className="proj__desc">{p.desc}</p>
            <span className="proj__role">{p.role}</span>
          </article>
        ))}
      </div>
      <div className="projects__dots" id="dots">
        {projects.map((p, i) => (
          <button
            key={p.name}
            aria-label={`${i + 1}`}
            className={i === active ? "is-active" : undefined}
            onClick={() =>
              cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
            }
          />
        ))}
      </div>
    </>
  );
}
