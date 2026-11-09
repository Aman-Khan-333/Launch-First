"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "./icons";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#approach" },
  { label: "Work", href: "#case-studies" },
  { label: "Pricing", href: "#pricing" },
];


// Scroll distance (px) in one direction before the bar hides or comes back, so tiny jitters don't toggle it.
const HIDE_AFTER = 8;
const SHOW_AFTER = 8;
// Always visible this close to the top of the page.
const TOP_ZONE = 120;

// Phones only: a small progressive blur behind the bar, strongest at the top edge and fading out below it.
const blurLayers = [0.5, 1, 2, 4];

/**
 * Fixed top nav. Hides while the reader scrolls down and slides back in as soon as they scroll up.
 * Switches to its light-on-dark look while it sits over a [data-nav-dark] section.
 */
export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    let travel = 0; // distance scrolled in the current direction
    const update = () => {
      frame = 0;
      const nav = ref.current;
      if (!nav) return;

      const scrollY = window.scrollY;
      const dy = scrollY - lastY;
      lastY = scrollY;
      if (dy !== 0) travel = Math.sign(dy) === Math.sign(travel) ? travel + dy : dy;
      if (scrollY < TOP_ZONE || nav.contains(document.activeElement)) setHidden(false);
      else if (travel > HIDE_AFTER) setHidden(true);
      else if (travel < -SHOW_AFTER) setHidden(false);

      // Probe the vertical middle of the bar.
      const y = nav.offsetHeight / 2 + 12;
      const overDark = Array.from(document.querySelectorAll("[data-nav-dark]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setDark(overDark);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Keyboard users tabbing into the nav always get it back.
    const nav = ref.current;
    const onFocus = () => setHidden(false);
    nav?.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      nav?.removeEventListener("focusin", onFocus);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header ref={ref} className={`nav-bar${dark ? " is-dark" : ""}${hidden ? " is-hidden" : ""}`}>
      <div className="nav-bar__blur" aria-hidden="true">
        {blurLayers.map((blur, i) => {
          const start = (i / blurLayers.length) * 100;
          const mask = `linear-gradient(to bottom, #000 ${start}%, transparent ${Math.min(100, start + 45)}%)`;
          return (
            <div
              key={blur}
              style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
            />
          );
        })}
      </div>
      <div className="nav container">
        <a href="#" className="nav__logo" aria-label="Launch First home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav__logo-img nav__logo-img--dark" src="/images/logo-black.png" alt="launch first." width={1000} height={173} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav__logo-img nav__logo-img--light" src="/images/logo-white.png" alt="" width={1000} height={173} />
        </a>
        <nav className="nav__menu" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className={l.active ? "nav__link is-active" : "nav__link"}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__cta">
          <a href="#get-pricing">
            <span className="nav__cta-icon" aria-hidden="true">
              <ChevronRight />
            </span>
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}
