"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Everything that slides up into place when its section scrolls into view.
const SELECTOR = [
  // hero
  ".h1",
  ".hero__lead",
  ".hero__actions",
  ".strip",
  // shared section headers
  ".pill",
  ".h2",
  ".lead",
  // founder concerns
  ".concern",
  ".concerns__closing",
  // reality check
  ".compare__link",
  ".compare__stage",
  // case studies (home + case study pages)
  ".case",
  ".cs-hero > *",
  ".cs-meta",
  ".cs-body__text > *",
  ".cs-body__media",
  // pricing + testimonials
  ".price-card",
  ".v-card",
  ".vids__cta",
  // get pricing
  ".get-pricing__points li",
  ".get-pricing .mail-link",
  ".form__row",
  ".form > .field",
  ".btn-primary--form",
  // faq + footer
  ".faq__item",
  ".footer__card",
  ".footer__bottom",
].join(",");

const STAGGER = 0.08; // seconds between items that enter together, in page order
const MAX_STEPS = 6;
const DURATION = 0.65; // matches the .reveal transition in globals.css

// Reveal speed follows scroll speed: slow scrolling stretches the animation (up to SLOWEST×),
// fast scrolling shortens it (down to FASTEST×). Velocities are in px per second.
const SLOWEST = 1.25;
const FASTEST = 0.3;
const FAST_VELOCITY = 2400;

function speedFactor(velocity: number) {
  const f = SLOWEST - (velocity / FAST_VELOCITY) * (SLOWEST - FASTEST);
  return Math.min(SLOWEST, Math.max(FASTEST, f));
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Smoothed scroll velocity, decaying once scrolling stops.
    let velocity = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    const trackVelocity = () => {
      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) {
        const instant = (Math.abs(window.scrollY - lastY) / dt) * 1000;
        velocity = dt > 120 ? instant : velocity * 0.6 + instant * 0.4;
      }
      lastY = window.scrollY;
      lastT = now;
    };
    const currentVelocity = () => velocity * Math.exp(-(performance.now() - lastT) / 250);
    window.addEventListener("scroll", trackVelocity, { passive: true });

    // Sections with their own choreographed sequence (timings live in CSS); the general reveal skips them.
    const SEQUENCED = [".stats", ".approach", ".process"];
    const sequenced = SEQUENCED.map((s) => document.querySelector<HTMLElement>(s)).filter((s): s is HTMLElement => !!s);
    // The case studies live inside .process but reveal on their own as they scroll in.
    const els = [...document.querySelectorAll<HTMLElement>(SELECTOR)].filter(
      (el) => !sequenced.some((s) => s.contains(el)) || el.closest(".cases"),
    );
    els.forEach((el) => el.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        const rs = speedFactor(currentVelocity());
        entering.forEach((el, i) => {
          const delay = Math.min(i, MAX_STEPS) * STAGGER * rs;
          el.style.setProperty("--d", `${delay.toFixed(2)}s`);
          el.style.setProperty("--rs", rs.toFixed(2));
          el.classList.add("is-revealed");
          io.unobserve(el);
          // Once settled, drop the reveal styles so the element's own transitions (hovers etc.) apply again.
          window.setTimeout(() => {
            el.classList.remove("reveal", "is-revealed");
            el.style.removeProperty("--d");
            el.style.removeProperty("--rs");
          }, (delay + DURATION * rs) * 1000 + 50);
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.1 },
    );

    // Items at the very end of the page (pushed below it by their 40px start offset) can never
    // scroll into view, so reveal whatever is left once the bottom is reached.
    const onScroll = () => {
      if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 4) return;
      const rest = els.filter((el) => el.classList.contains("reveal") && !el.classList.contains("is-revealed"));
      rest.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 60) {
          el.classList.add("is-revealed");
          io.unobserve(el);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Sequenced sections: header first, then their items one by one.
    const sectionIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).style.setProperty("--rs", speedFactor(currentVelocity()).toFixed(2));
          entry.target.classList.add("is-active");
          sectionIo.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0 },
    );
    sequenced.forEach((s) => s.classList.add("will-reveal"));

    // Hold everything until the loading screen starts lifting, so the hero animates in view.
    const start = () => {
      els.forEach((el) => io.observe(el));
      sequenced.forEach((s) => sectionIo.observe(s));
    };
    if (document.documentElement.classList.contains("is-loading")) {
      window.addEventListener("loader:exit", start, { once: true });
    } else {
      start();
    }

    return () => {
      io.disconnect();
      sectionIo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", trackVelocity);
      window.removeEventListener("loader:exit", start);
    };
  }, [pathname]); // client-side navigation brings in new elements to reveal

  return null;
}
