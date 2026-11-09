"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Space to leave above a section when jumping to it: its CSS scroll-margin-top (Lenis ignores it). */
const marginTop = (el: HTMLElement) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;

/** Framer-style eased page scrolling (wheel/trackpad); touch keeps native scrolling. */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      autoRaf: true,
    });
    lenisRef.current = lenis;

    // In-page links (#pricing, #faq…) glide to their section.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash) return;
      e.preventDefault();
      const target = hash === "#" ? null : document.querySelector<HTMLElement>(hash);
      lenis.scrollTo(target ?? 0, { offset: target ? -marginTop(target) : 0 });
      history.pushState(null, "", hash === "#" ? window.location.pathname : hash);
    };
    document.addEventListener("click", onClick);

    // Hold the page still while the loading screen is up.
    if (document.documentElement.classList.contains("is-loading")) {
      lenis.stop();
      window.addEventListener("loader:done", () => lenis.start(), { once: true });
    }

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // After moving to another page, start at its top, or at the linked section (e.g. /#pricing).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const lenis = lenisRef.current;
    if (!lenis) return;
    const frame = requestAnimationFrame(() => {
      lenis.resize();
      const target = window.location.hash ? document.querySelector<HTMLElement>(window.location.hash) : null;
      lenis.scrollTo(target ?? 0, { offset: target ? -marginTop(target) : 0, immediate: true, force: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
