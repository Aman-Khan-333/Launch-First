"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/** Framer-style eased page scrolling (wheel/trackpad); touch keeps native scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      autoRaf: true,
      anchors: true, // in-page links (#pricing, #faq…) glide too
    });

    // Hold the page still while the loading screen is up.
    if (document.documentElement.classList.contains("is-loading")) {
      lenis.stop();
      window.addEventListener("loader:done", () => lenis.start(), { once: true });
    }

    return () => lenis.destroy();
  }, []);

  return null;
}
