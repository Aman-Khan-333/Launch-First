"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "./icons";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#approach" },
  { label: "Work", href: "#case-studies" },
  { label: "Pricing", href: "#pricing" },
];


/** Fixed top nav. Switches to its light-on-dark look while it sits over a [data-nav-dark] section. */
export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = ref.current;
      if (!nav) return;
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header ref={ref} className={dark ? "nav-bar is-dark" : "nav-bar"}>
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
