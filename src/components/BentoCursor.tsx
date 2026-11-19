"use client";

import { useEffect, useRef, useState } from "react";

/** How quickly the cursor catches up with the mouse each frame (0–1): lower is floatier. */
const EASE = 0.22;

type Kind = "product" | "price" | "days" | "chat" | "code" | "tz";

/** Each card's cursor: its own look, matching the card's graphic. */
function CursorBody({ kind }: { kind: Kind }) {
  switch (kind) {
    case "product":
      return (
        <>
          Ship it <span aria-hidden="true">↗</span>
        </>
      );
    case "price":
      return (
        <>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          $9,999 fixed
        </>
      );
    case "days":
      return <>14d</>;
    case "chat":
      return (
        <>
          Ask a dev
          <span className="bento-cursor__dots">
            <i />
            <i />
            <i />
          </span>
        </>
      );
    case "code":
      return (
        <>
          &lt;/&gt;
          <span className="bento-cursor__block" />
        </>
      );
    case "tz":
      return (
        <>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          9am–6pm ET
        </>
      );
  }
}

/**
 * Custom cursor for the Our Approach cards: inside a card the arrow is replaced by a small follower styled for
 * that card. Mouse and trackpad only; touch screens and reduced-motion users keep the normal cursor.
 */
export function BentoCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [kind, setKind] = useState<Kind | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const grid = document.querySelector<HTMLElement>(".bento");
    const el = ref.current;
    if (!grid || !el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const root = document.documentElement;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let known = false; // seen the mouse at least once
    let placed = false; // cursor already showing at the pointer
    let frame = 0;
    let check = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * EASE;
      pos.y += (target.y - pos.y) * EASE;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    // Which card (if any) is under the pointer right now. Run on mouse moves AND on scroll, so a card that
    // scrolls under a still mouse switches the cursor on, and one that scrolls away switches it off.
    const update = () => {
      check = 0;
      if (!known) return;
      const hit = document.elementFromPoint(target.x, target.y);
      const card = hit && grid.contains(hit) ? hit.closest<HTMLElement>("[data-cursor]") : null;
      const next = card ? (card.dataset.cursor as Kind) : null;
      if (next && !placed) {
        // Appear right at the pointer instead of flying in from where it was last
        pos.x = target.x;
        pos.y = target.y;
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      placed = !!next;
      root.classList.toggle("bento-cursor-on", !!next); // hides the normal arrow while ours shows
      setKind(next);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      known = true;
      update();
      if (placed && !frame) frame = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!check) check = requestAnimationFrame(update);
    };
    const onOut = (e: MouseEvent) => {
      // Pointer left the window
      if (!e.relatedTarget) {
        known = false;
        placed = false;
        root.classList.remove("bento-cursor-on");
        setKind(null);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(check);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onOut);
      root.classList.remove("bento-cursor-on");
    };
  }, []);

  // Keep the last style while it shrinks away, so it doesn't change shape on the way out
  const [shown, setShown] = useState<Kind>("product");
  useEffect(() => {
    if (kind) setShown(kind);
  }, [kind]);

  return (
    <div ref={ref} className="bento-cursor" aria-hidden="true" hidden={!enabled}>
      <div className={`bento-cursor__body bento-cursor--${shown}${kind ? " is-on" : ""}`}>
        <CursorBody kind={shown} />
      </div>
    </div>
  );
}
