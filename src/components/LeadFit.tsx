"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Widest rendered line of an element's text, in px. */
function widestLine(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const lines = new Map<number, { l: number; r: number }>();
  for (const r of Array.from(range.getClientRects())) {
    if (!r.width) continue;
    const key = Math.round(r.top / 4);
    const line = lines.get(key);
    lines.set(key, line ? { l: Math.min(line.l, r.left), r: Math.max(line.r, r.right) } : { l: r.left, r: r.right });
  }
  let widest = 0;
  lines.forEach((line) => (widest = Math.max(widest, line.r - line.l)));
  return Math.ceil(widest);
}

/**
 * Keeps every section's body text no wider than its heading: the paragraph after each h1/h2 is capped at the
 * heading's widest line. Re-measured once fonts load and whenever the window resizes, on every page.
 */
export function LeadFit() {
  const pathname = usePathname();

  useEffect(() => {
    const pairs = Array.from(document.querySelectorAll<HTMLElement>("h1, h2"))
      .map((h) => {
        let next = h.nextElementSibling as HTMLElement | null;
        while (next && next.tagName !== "P") next = next.nextElementSibling as HTMLElement | null;
        return next ? ([h, next] as const) : null;
      })
      .filter((p): p is readonly [HTMLElement, HTMLElement] => !!p);

    let frame = 0;
    const fit = () => {
      frame = 0;
      // Measure everything first with the caps off, then apply, so the page lays out only once
      pairs.forEach(([, lead]) => (lead.style.maxWidth = ""));
      const widths = pairs.map(([heading, lead]) => {
        // Never loosen a narrower limit the stylesheet already sets
        const own = parseFloat(getComputedStyle(lead).maxWidth);
        const head = widestLine(heading);
        return Number.isFinite(own) ? Math.min(own, head) : head;
      });
      pairs.forEach(([, lead], i) => {
        if (widths[i]) lead.style.maxWidth = `${widths[i]}px`;
      });
    };
    const refit = () => {
      if (!frame) frame = requestAnimationFrame(fit);
    };

    fit();
    document.fonts?.ready.then(refit);
    window.addEventListener("resize", refit);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", refit);
    };
  }, [pathname]);

  return null;
}
