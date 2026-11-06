"use client";

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
  // stats + founder concerns
  ".stats__item",
  ".concerns__stage",
  // reality check
  ".compare__link",
  ".compare__stage",
  // pricing + testimonials
  ".price-card",
  ".testimonials__viewport",
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

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Sections with their own choreographed sequence (timings live in CSS); the general reveal skips them.
    const SEQUENCED = [".approach", ".process"];
    const sequenced = SEQUENCED.map((s) => document.querySelector<HTMLElement>(s)).filter((s): s is HTMLElement => !!s);
    const els = [...document.querySelectorAll<HTMLElement>(SELECTOR)].filter((el) => !sequenced.some((s) => s.contains(el)));
    els.forEach((el) => el.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        entering.forEach((el, i) => {
          const delay = Math.min(i, MAX_STEPS) * STAGGER;
          el.style.setProperty("--d", `${delay.toFixed(2)}s`);
          el.classList.add("is-revealed");
          io.unobserve(el);
          // Once settled, drop the reveal styles so the element's own transitions (hovers etc.) apply again.
          window.setTimeout(() => {
            el.classList.remove("reveal", "is-revealed");
            el.style.removeProperty("--d");
          }, (delay + DURATION) * 1000 + 50);
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
      window.removeEventListener("loader:exit", start);
    };
  }, []);

  return null;
}
