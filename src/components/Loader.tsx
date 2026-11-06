"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Timeline (whole sequence stays under 3s):
//   hold – at least MIN_HOLD, until the page has loaded, but never longer than MAX_HOLD
//   exit – the screen splits into COLUMNS that slide up one by one from the right (easy ease),
//          STAGGER_MS apart, each taking COLUMN_MS.
const MIN_HOLD = 1100;
const MAX_HOLD = 1500;
const COLUMNS = 6;
const COLUMN_MS = 700;
const STAGGER_MS = 70;
const EXIT_MS = COLUMN_MS + STAGGER_MS * (COLUMNS - 1);

type Phase = "show" | "exit" | "done";

export function Loader() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    const root = document.documentElement;
    window.scrollTo(0, 0);
    // Hold the page at the top while the loader is up (keys, scrollbar drag) without hiding the scrollbar.
    const holdTop = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", holdTop);
    const start = performance.now();
    let exitTimer: number | undefined;
    let doneTimer: number | undefined;

    const beginExit = () => {
      if (exitTimer !== undefined) return;
      const wait = Math.max(0, MIN_HOLD - (performance.now() - start));
      exitTimer = window.setTimeout(() => {
        setPhase("exit");
        window.removeEventListener("scroll", holdTop);
        root.classList.add("is-entering");
        root.classList.remove("is-loading");
        window.dispatchEvent(new Event("loader:exit"));
        doneTimer = window.setTimeout(() => {
          setPhase("done");
          root.classList.remove("is-entering");
          window.dispatchEvent(new Event("loader:done"));
        }, EXIT_MS);
      }, wait);
    };

    if (document.readyState === "complete") beginExit();
    else window.addEventListener("load", beginExit, { once: true });
    const cap = window.setTimeout(beginExit, MAX_HOLD);

    return () => {
      window.removeEventListener("load", beginExit);
      window.removeEventListener("scroll", holdTop);
      window.clearTimeout(cap);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={phase === "exit" ? "loader is-exiting" : "loader"} aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, i) => (
        <span
          key={i}
          className="loader__col"
          style={{
            ["--i" as string]: i,
            left: `${(i / COLUMNS) * 100}%`,
            // rightmost column leaves first
            animationDelay: `${(COLUMNS - 1 - i) * STAGGER_MS}ms`,
            animationDuration: `${COLUMN_MS}ms`,
          }}
        />
      ))}
      <div className="loader__logo">
        <Image src="/images/logo-on-green.png" alt="" width={321} height={63} priority />
      </div>
    </div>
  );
}
