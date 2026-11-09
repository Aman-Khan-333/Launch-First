"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronRight } from "./icons";
import { BOOKING_URL } from "./ui";

// Home page menu. The white pill follows the reader: each section's link lights up once the section
// reaches SPY_LINE (a fraction of the viewport height from the top); above them all, Home is lit.
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Pricing", href: "#pricing" },
];
const SPY_LINE = 0.4;

// On the case study pages the menu is just these two.
const caseStudyLinks = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
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
  const pathname = usePathname();
  const onHome = pathname === "/";
  const links = onHome ? navLinks : caseStudyLinks;
  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`);
  const [dark, setDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [spied, setSpied] = useState("#"); // home page: link of the section in view
  const activeHref = onHome ? spied : (caseStudyLinks.find((l) => l.href !== "/" && pathname.startsWith(l.href))?.href ?? "/");

  // Slide the white pill under the active link.
  const menuRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  useLayoutEffect(() => {
    const place = () => {
      const el = menuRef.current?.querySelector<HTMLElement>(".nav__link.is-active");
      setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [activeHref, pathname]);

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

      if (pathname === "/") {
        const line = window.innerHeight * SPY_LINE;
        let current = "#";
        for (const l of navLinks) {
          const section = l.href.length > 1 ? document.querySelector(l.href) : null;
          if (section && section.getBoundingClientRect().top <= line) current = l.href;
        }
        setSpied(current);
      }
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
  }, [pathname]); // re-check the dark sections after moving to another page

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
        <Link href="/" className="nav__logo" aria-label="Launch First home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav__logo-img nav__logo-img--dark" src="/images/logo-black.png" alt="launch first." width={1000} height={173} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav__logo-img nav__logo-img--light" src="/images/logo-white.png" alt="" width={1000} height={173} />
        </Link>
        <nav ref={menuRef} className="nav__menu" aria-label="Main">
          {pill && (
            <span
              className="nav__pill"
              aria-hidden="true"
              style={{ width: pill.w, transform: `translate(${pill.x}px, -50%)` }}
            />
          )}
          {links.map((l) => {
            const className = l.href === activeHref ? "nav__link is-active" : "nav__link";
            return l.href.startsWith("#") && onHome ? (
              <a key={l.label} href={l.href} className={className}>
                {l.label}
              </a>
            ) : (
              <Link key={l.label} href={l.href.startsWith("#") ? sectionHref(l.href) : l.href} className={className}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav__cta">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
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
