"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// The whole sequence runs in CSS from the moment the page first paints, so it never waits for
// JavaScript to download (that wait used to push back LCP and Speed Index on slow phones):
//   hold – HOLD_MS with the logo on the green screen
//   exit – the screen splits into COLUMNS that slide up one by one from the right (easy ease),
//          STAGGER_MS apart, each taking COLUMN_MS.
// These numbers must match --loader-hold and the column timings in globals.css.
const HOLD_MS = 900;
const COLUMNS = 6;
const COLUMN_MS = 700;
const STAGGER_MS = 70;
const EXIT_MS = COLUMN_MS + STAGGER_MS * (COLUMNS - 1);

export function Loader() {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    window.scrollTo(0, 0);
    // Hold the page at the top while the loader is up (keys, scrollbar drag) without hiding the scrollbar.
    const holdTop = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", holdTop);

    // How far the CSS sequence has already run (it started at first paint, before this script).
    const anim = ref.current?.getAnimations({ subtree: true })[0];
    const elapsed = typeof anim?.currentTime === "number" ? anim.currentTime : HOLD_MS;

    let doneTimer: number | undefined;
    const exitTimer = window.setTimeout(() => {
      window.removeEventListener("scroll", holdTop);
      root.classList.add("is-entering");
      root.classList.remove("is-loading");
      window.dispatchEvent(new Event("loader:exit"));
      doneTimer = window.setTimeout(() => {
        setDone(true);
        root.classList.remove("is-entering");
        window.dispatchEvent(new Event("loader:done"));
      }, Math.max(0, EXIT_MS - Math.max(0, elapsed - HOLD_MS)));
    }, Math.max(0, HOLD_MS - elapsed));

    return () => {
      window.removeEventListener("scroll", holdTop);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="loader" aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, i) => (
        <span
          key={i}
          className="loader__col"
          style={{
            ["--i" as string]: i,
            left: `${(i / COLUMNS) * 100}%`,
            // rightmost column leaves first
            animationDelay: `calc(var(--loader-hold) + ${(COLUMNS - 1 - i) * STAGGER_MS}ms)`,
            animationDuration: `${COLUMN_MS}ms`,
          }}
        />
      ))}
      <div className="loader__logo">
        <Image src="/images/logo-on-green.png" alt="" width={1000} height={173} priority />
      </div>
    </div>
  );
}
