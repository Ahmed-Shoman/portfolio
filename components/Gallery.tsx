"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import type { Shot } from "@/data/cases";

/** Screenshot grid with a simple lightbox (Esc / arrows / click outside to close). */
export default function Gallery({ shots, host, name }: { shots: Shot[]; host: string; name: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % shots.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shots.length]);

  return (
    <>
      <div className="gallery">
        {shots.map((s, i) => (
          <button
            key={s.src}
            className={`gallery__item reveal${s.wide || (shots.length % 2 === 1 && i === shots.length - 1) ? " gallery__item--wide" : ""}`}
            onClick={() => setOpen(i)}
            aria-label={`Enlarge: ${s.caption}`}
          >
            <figure className="shot__frame">
              <div className="shot__bar">
                <i />
                <i />
                <i />
                <span>{host}</span>
              </div>
              <img src={s.src} alt={`${name} — ${s.caption}`} loading="lazy" />
            </figure>
            <span className="gallery__cap">
              <b>{String(i + 1).padStart(2, "0")}</b> {s.caption}
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dlg}
        className="lightbox"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
      >
        {open !== null && (
          <figure className="lightbox__fig">
            <img src={shots[open].src} alt={`${name} — ${shots[open].caption}`} />
            <figcaption>
              <span>
                {String(open + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")} — {shots[open].caption}
              </span>
              <span className="lightbox__btns">
                <button onClick={() => setOpen((open - 1 + shots.length) % shots.length)} aria-label="Previous screen">
                  ←
                </button>
                <button onClick={() => setOpen((open + 1) % shots.length)} aria-label="Next screen">
                  →
                </button>
                <button onClick={() => setOpen(null)} aria-label="Close">
                  ✕
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
