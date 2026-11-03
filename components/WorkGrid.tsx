"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import type { WorkCat } from "@/data/content";

type Item = { key: string; name: string; cat: WorkCat; url: string; img: string; desc: string; tags: string[] };
type Ui = { all: string; cats: Record<WorkCat, string>; visit: string; shotAlt: string; filterAria: string };
type Filter = "All" | WorkCat;

export default function WorkGrid({ work, cats, ui }: { work: Item[]; cats: WorkCat[]; ui: Ui }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...cats];
  const count = (f: Filter) => (f === "All" ? work.length : work.filter((w) => w.cat === f).length);
  const label = (f: Filter) => (f === "All" ? ui.all : ui.cats[f]);
  const items = filter === "All" ? work : work.filter((w) => w.cat === filter);

  return (
    <>
      <div className="work__filters" role="tablist" aria-label={ui.filterAria}>
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            data-cat={f}
            aria-selected={filter === f}
            className={`work__filter${filter === f ? " is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {label(f)} <sup>{count(f)}</sup>
          </button>
        ))}
      </div>
      <div className="work__grid">
        {items.map((w) => {
          const host = w.url.replace(/^https?:\/\//, "");
          return (
            <a className="shot" key={w.key} data-cat={w.cat} href={`/work/${w.key}`}>
              <figure className="shot__frame">
                <div className="shot__bar" dir="ltr">
                  <i />
                  <i />
                  <i />
                  <span>{host}</span>
                </div>
                <img src={w.img} alt={`${w.name} — ${ui.shotAlt}`} loading="lazy" />
              </figure>
              <div className="shot__head">
                <h3 className="shot__name">{w.name}</h3>
                <span className="shot__cat">{ui.cats[w.cat]}</span>
              </div>
              <p className="shot__desc">{w.desc}</p>
              <div className="shot__foot">
                <span className="shot__tags">{w.tags.join(" · ")}</span>
                <span className="shot__visit">{ui.visit}</span>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
