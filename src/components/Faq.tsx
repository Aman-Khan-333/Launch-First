"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "./icons";
import { SectionHeader } from "./ui";

const faqs = [
  {
    q: "Is this a real product or a prototype?",
    a: "A full, production-ready product not a throwaway prototype or clickable mockup. It's built to go in front of real users and to scale, and you own 100% of the code and IP.",
  },
  {
    q: "How can the price be fixed before you know the scope?",
    a: "We set the scope first. A live requirements session turns your idea into a day-by-day feature breakdown, and the price is fixed against that before any code is written.",
  },
  {
    q: "14 days isn't that just cutting corners?",
    a: "No. A dedicated team works to a locked timeline with AI-assisted tooling for speed, and senior engineers own architecture, security and QA. If scope grows, we add developers rather than cut quality.",
  },
  {
    q: "Do I own the code?",
    a: "Yes. You own 100% of the code and IP from day one, delivered in your own repositories.",
  },
  {
    q: "What if it isn't delivered in 14 days?",
    a: "We keep building, free, until what was agreed is live. The number you agreed to is still the number you pay.",
  },
  {
    q: "Who do I actually work with?",
    a: "The developers building your product. No account managers and no relay through non-technical middlemen, during US business hours.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  // Reserve the list's tallest state (all closed + the longest answer open) so the
  // content below never shifts when questions open or close.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      list.style.minHeight = "";
      const items = [...list.querySelectorAll<HTMLElement>(".faq__item")];
      const extra = items.map((item) => {
        const q = item.querySelector<HTMLElement>(".faq__q")!;
        const inner = item.querySelector<HTMLElement>(".faq__panel-inner")!;
        const cs = getComputedStyle(q);
        const padNow = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        const isOpen = item.classList.contains("is-open");
        // Height an item adds when open = its answer + the extra open padding.
        return { isOpen, inner, padNow };
      });
      const closedPad = 2 * 19.67; // .faq__q closed padding (top + bottom)
      const openPad = 21.5 + 20.5; // .faq__item.is-open .faq__q padding (top + bottom)
      const deltas = extra.map((e) => e.inner.scrollHeight + (openPad - closedPad));
      const currentExtra = extra.reduce((sum, e) => sum + (e.isOpen ? e.inner.offsetHeight + (e.padNow - closedPad) : 0), 0);
      const closedHeight = list.offsetHeight - currentExtra;
      list.style.minHeight = `${closedHeight + Math.max(...deltas)}px`;
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="faq" id="faq">
      <SectionHeader pill="FAQs" title="Questions, answered" />
      <ul className="faq__list" ref={listRef}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className={isOpen ? "faq__item is-open" : "faq__item"}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>
                  <span className="faq__question">{f.q}</span>
                  <span className="faq__panel" aria-hidden={!isOpen}>
                    <span className="faq__panel-inner">
                      <span className="faq__a">{f.a}</span>
                    </span>
                  </span>
                </span>
                <span className="faq__toggle">
                  <ChevronDown />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
