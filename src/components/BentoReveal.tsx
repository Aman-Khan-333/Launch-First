"use client";

import { useEffect } from "react";

/** Gap between cards that scroll in together, in seconds. */
const STAGGER = 0.12;

/**
 * Reveals each Our Approach bento card as it scrolls into view: the card fades up and sharpens, then its
 * graphic and text follow (timings in globals.css). Cards entering together are staggered left to right.
 * Nothing is hidden for reduced-motion users or before this runs.
 */
export function BentoReveal() {
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>(".bento");
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".bento__card"));
    grid.classList.add("will-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => cards.indexOf(a) - cards.indexOf(b))
          .forEach((card, i) => {
            card.style.setProperty("--d", `${(i * STAGGER).toFixed(2)}s`);
            card.classList.add("is-in");
            io.unobserve(card);
          });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return null;
}
