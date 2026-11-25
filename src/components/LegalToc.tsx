"use client";

import { useEffect, useState } from "react";

/** How far below the top of the screen a section counts as "being read", in px (clears the fixed nav). */
const READ_LINE = 160;

/** "On this page" list for the legal pages: highlights the section you're reading as you scroll. */
export function LegalToc({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
      // At the very bottom the last sections can't reach the read line, so the last one wins
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = els[0]?.id ?? "";
      if (atBottom && els.length) current = els[els.length - 1].id;
      else for (const el of els) if (el.getBoundingClientRect().top <= READ_LINE) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav className="legal__toc" aria-label="On this page">
      <p className="legal__toc-title">On this page</p>
      <ol>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? "is-active" : undefined} aria-current={active === s.id ? "location" : undefined}>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
