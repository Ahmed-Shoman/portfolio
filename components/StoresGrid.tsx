"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import type { Store, StorePlatform } from "@/data/content";

type Ui = {
  all: string;
  platforms: Record<StorePlatform, string>;
  visit: string;
  more: string;
  shotAlt: string;
  filterAria: string;
};
type Filter = "all" | StorePlatform;

const PAGE = 24;
const FILTERS: Filter[] = ["all", "salla", "zid", "shopify"];

export default function StoresGrid({ stores, ui }: { stores: Store[]; ui: Ui }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(PAGE);

  const count = (f: Filter) => (f === "all" ? stores.length : stores.filter((s) => s.platform === f).length);
  const items = filter === "all" ? stores : stores.filter((s) => s.platform === filter);
  const visible = items.slice(0, shown);

  const pick = (f: Filter) => {
    setFilter(f);
    setShown(PAGE);
  };

  return (
    <>
      <div className="work__filters" role="tablist" aria-label={ui.filterAria}>
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`work__filter${filter === f ? " is-active" : ""}`}
            onClick={() => pick(f)}
          >
            {f === "all" ? ui.all : ui.platforms[f]} <sup>{count(f)}</sup>
          </button>
        ))}
      </div>

      <div className="stores__grid">
        {visible.map((s) => {
          const host = new URL(s.url).hostname.replace(/^www\./, "");
          return (
            <a className="shot store" key={s.domain} href={s.url} target="_blank" rel="noreferrer">
              <figure className="shot__frame">
                <div className="shot__bar" dir="ltr">
                  <i />
                  <i />
                  <i />
                  <span>{host}</span>
                </div>
                <img src={s.img} alt={`${s.name} — ${ui.shotAlt}`} loading="lazy" width={960} height={600} />
              </figure>
              <div className="shot__head">
                <h3 className="shot__name">{s.name}</h3>
                <span className={`shot__cat store__chip store__chip--${s.platform}`}>{ui.platforms[s.platform]}</span>
              </div>
              <div className="shot__foot">
                <span className="shot__tags">{s.type}</span>
                <span className="shot__visit">{ui.visit}</span>
              </div>
            </a>
          );
        })}
      </div>

      {items.length > shown && (
        <div className="stores__more">
          <button type="button" className="pill pill--ghost" onClick={() => setShown((n) => n + PAGE)}>
            {ui.more} <sup>{items.length - shown}</sup>
          </button>
        </div>
      )}
    </>
  );
}
