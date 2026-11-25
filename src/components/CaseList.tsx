"use client";

import Link from "next/link";
import { useState } from "react";
import { KINDS, type CaseStudy, type Kind } from "@/data/cases";
import { CaseScene } from "./CaseScene";
import { ChevronRight } from "./icons";

/** One project on /case-studies: a white name bar over its presentation scene. */
function CaseTile({ c }: { c: CaseStudy }) {
  return (
    <li className="tile">
      <Link href={`/case-studies/${c.slug}`} className="tile__link">
        <div className="tile__bar">
          <h2 className="tile__name">{c.name}</h2>
          <span className="tile__tag">/ {c.tag}</span>
          <span className="tile__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="tile__media">
          <CaseScene c={c} variant="tile" />
          <span className="tile__view" aria-hidden="true">
            View case study
            <ChevronRight />
          </span>
        </div>
      </Link>
    </li>
  );
}

/** Every project, two to a row, with filters for the kind of product. */
export function CaseList({ cases }: { cases: CaseStudy[] }) {
  const [kind, setKind] = useState<Kind | "all">("all");
  const shown = kind === "all" ? cases : cases.filter((c) => c.kind.includes(kind));
  const options = [{ value: "all" as const, label: "All work" }, ...KINDS];

  return (
    <>
      <div className="cs2-filters" role="group" aria-label="Filter case studies">
        {options.map((o) => {
          const count = o.value === "all" ? cases.length : cases.filter((c) => c.kind.includes(o.value)).length;
          return (
            <button
              key={o.value}
              type="button"
              className={`cs2-chip${kind === o.value ? " is-active" : ""}`}
              aria-pressed={kind === o.value}
              onClick={() => setKind(o.value)}
            >
              {o.label}
              <span className="cs2-chip__count">{count}</span>
            </button>
          );
        })}
      </div>
      <ul className="cs2-grid">
        {shown.map((c) => (
          <CaseTile key={c.slug} c={c} />
        ))}
      </ul>
    </>
  );
}
