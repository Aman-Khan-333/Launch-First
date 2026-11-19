"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const LEAD =
  "The fear was never whether it can be built. It's whether you can trust what you get and what it will really cost.";
const PAYOFF = "We remove both.";

/** Where the reading runs, as fractions of the viewport height: words start filling in when the line's middle
    reaches `START` and are all black by the time it reaches `END`. */
const START = 0.9;
const END = 0.45;

/**
 * Closing line of the founder concerns: each word goes from pale grey to black as it scrolls up the screen,
 * and once the last word is in, the green swash draws itself under "We remove both."
 */
export function FearLine() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".fear__word"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.classList.add("is-lit"));
      el.classList.add("is-done");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const mid = r.top + r.height / 2;
      const progress = Math.min(1, Math.max(0, (vh * START - mid) / (vh * (START - END))));
      const lit = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
      el.classList.toggle("is-done", lit >= words.length);
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
  }, []);

  const split = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={i} className="fear__word">
        {w}{" "}
      </span>
    ));

  return (
    <p ref={ref} className="concerns__closing">
      {split(LEAD)}
      <span className="concerns__closing-mark">
        <Image className="concerns__closing-swash" src="/images/swash.png" alt="" width={230} height={60} />
        {PAYOFF.split(" ").map((w, i, all) => (
          <span key={i} className="fear__word">
            {w}
            {i < all.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </p>
  );
}
