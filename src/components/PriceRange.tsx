"use client";

import { useEffect, useRef } from "react";

/**
 * Price range bar on the pricing card: when the card scrolls into view the bar fills from the $4,000 start to
 * the $9,999 cap, and the cap label locks in green. Replays every time the card comes back into view;
 * reduced-motion users see it already filled.
 */
export function PriceRange() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    // Fill whenever the card comes into view (from above or below); once it has fully left the screen, snap
    // back to empty without animating, so it plays again on the next visit.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          el.classList.remove("is-reset");
          el.classList.add("is-in");
        } else if (!entry.isIntersecting) {
          el.classList.add("is-reset");
          el.classList.remove("is-in");
        }
      },
      { threshold: [0, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="price-range" aria-hidden="true">
      <div className="price-range__track">
        <span className="price-range__fill" />
        <span className="price-range__knob" />
      </div>
      <div className="price-range__labels">
        <span>
          <b>$4,000</b> start
        </span>
        <span className="price-range__cap">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.6">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <b>$9,999</b> capped
        </span>
      </div>
    </div>
  );
}
