"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Headings that reveal word by word. The home hero's h1 is left out on purpose (see ScrollReveal: hiding it
    until the loader lifts would make the headline paint late and hurt LCP). */
const HEADINGS = "h1.h1, h2.h2, .vids__cta-title";

/** Seconds between one word and the next. */
const WORD_STAGGER = 0.07;

/** Wrap every word inside `el` in a span, keeping spaces, line breaks and inline elements where they are. */
function splitWords(el: HTMLElement) {
  let i = 0;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  while (walker.nextNode()) texts.push(walker.currentNode as Text);
  for (const node of texts) {
    const parts = (node.textContent ?? "").split(/(\s+)/);
    if (parts.every((p) => !p.trim())) continue;
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (!part) continue;
      if (!part.trim()) {
        frag.appendChild(document.createTextNode(part));
        continue;
      }
      const span = document.createElement("span");
      span.className = "word";
      span.style.setProperty("--i", String(i++));
      span.textContent = part;
      frag.appendChild(span);
    }
    node.replaceWith(frag);
  }
}

/**
 * Blur-in, word by word: when a heading scrolls into view its words go from blurred and transparent to sharp,
 * one after another (styles in globals.css). Runs on every page; skipped for reduced-motion users.
 */
export function HeadingWords() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const headings = Array.from(document.querySelectorAll<HTMLElement>(HEADINGS)).filter(
      (h) => !h.closest(".hero") && !h.dataset.words,
    );
    headings.forEach((h) => {
      splitWords(h);
      h.dataset.words = "1";
      h.style.setProperty("--word-stagger", `${WORD_STAGGER}s`);
      h.classList.add("words");
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("words-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.2 },
    );
    headings.forEach((h) => io.observe(h));
    // Tell LeadFit the headings changed shape, so it re-measures body widths
    window.dispatchEvent(new Event("resize"));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
