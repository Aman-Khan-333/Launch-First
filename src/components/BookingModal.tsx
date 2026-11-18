"use client";

import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { GoogleMeetLogo } from "./icons";
import { BOOKING_URL } from "./ui";

const CLOSE_MS = 250; // matches the .booking exit transition in globals.css

const isBookingLink = (target: EventTarget | null) => {
  const link = (target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
  return !!link && link.href === BOOKING_URL;
};

/**
 * Booking popup. Any click on a link to the booking page opens the calendar here instead of a new tab
 * (Ctrl/⌘/middle-click still open it in a tab).
 *
 * The calendar is a third-party widget (~4MB, ~5s cold), so it is loaded ahead of time, in the background:
 * shortly after the visitor first interacts with the page, or straight away when they hover or focus a
 * booking link. By the time they click, it is usually ready. Data-saver visitors only load it on intent.
 */
export function BookingModal() {
  // Open connections to the widget's servers early (cheap: no downloads until the preload starts)
  preconnect("https://cal.launchfirst.com");
  preconnect("https://stcdn.leadconnectorhq.com");
  preconnect("https://backend.leadconnectorhq.com");

  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false); // iframe added (preload or first open)
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false); // drives the enter/exit animation

  // Preload
  useEffect(() => {
    if (mounted) return;
    const load = () => setMounted(true);
    const onIntent = (e: Event) => {
      if (isBookingLink(e.target)) load();
    };
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let idle = 0;
    const onFirstInteraction = () => {
      window.removeEventListener("pointermove", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      idle = window.setTimeout(load, 1200); // let the page settle first
    };
    if (!saveData) {
      const opts = { passive: true, once: true } as const;
      window.addEventListener("pointermove", onFirstInteraction, opts);
      window.addEventListener("scroll", onFirstInteraction, opts);
      window.addEventListener("touchstart", onFirstInteraction, opts);
      window.addEventListener("keydown", onFirstInteraction, opts);
    }
    document.addEventListener("pointerover", onIntent);
    document.addEventListener("focusin", onIntent);
    document.addEventListener("touchstart", onIntent, { passive: true });
    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("pointermove", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
      document.removeEventListener("touchstart", onIntent);
    };
  }, [mounted]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    let closeTimer = 0;

    const show = () => {
      window.clearTimeout(closeTimer);
      setMounted(true);
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => setOpen(true));
      document.documentElement.classList.add("has-modal");
      window.dispatchEvent(new Event("modal:open")); // pauses the smooth scroll
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!isBookingLink(e.target)) return;
      e.preventDefault();
      show();
    };

    // Esc fires "cancel": animate out instead of closing instantly.
    const onCancel = (e: Event) => {
      e.preventDefault();
      hide();
    };
    const hide = () => {
      setOpen(false);
      closeTimer = window.setTimeout(() => {
        dialog.close();
        document.documentElement.classList.remove("has-modal");
        window.dispatchEvent(new Event("modal:close"));
      }, CLOSE_MS);
    };
    // Clicks on the dimmed area (the dialog element itself, outside the panel) close it.
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) hide();
    };
    const onHide = () => hide();

    document.addEventListener("click", onClick);
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("click", onBackdrop);
    window.addEventListener("booking:close", onHide);
    return () => {
      document.removeEventListener("click", onClick);
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("click", onBackdrop);
      window.removeEventListener("booking:close", onHide);
      window.clearTimeout(closeTimer);
    };
  }, []);

  return (
    <dialog ref={ref} className={`booking${open ? " is-open" : ""}`} aria-labelledby="booking-title" data-lenis-prevent>
      <div className="booking__panel">
        <header className="booking__head">
          <span className="booking__logo" aria-hidden="true">
            <GoogleMeetLogo />
          </span>
          <div className="booking__intro">
            <h2 id="booking-title" className="booking__title">
              Book a free scope call
            </h2>
            <ul className="booking__chips" aria-label="Call details">
              <li>30 min</li>
              <li>Google Meet</li>
              <li>Free, no commitment</li>
            </ul>
          </div>
          <button
            type="button"
            className="booking__close"
            aria-label="Close"
            onClick={() => window.dispatchEvent(new Event("booking:close"))}
            autoFocus
          >
            <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className="booking__body">
          {!loaded && (
            // Calendar-shaped placeholder while the widget loads
            <div className="booking__skeleton" role="status" aria-label="Loading the calendar">
              <div className="booking__sk-side">
                <span className="sk sk--logo" />
                <span className="sk sk--title" />
                <span className="sk sk--line" />
                <span className="sk sk--line sk--short" />
              </div>
              <div className="booking__sk-cal">
                <span className="sk sk--month" />
                <div className="booking__sk-days">
                  {Array.from({ length: 35 }, (_, i) => (
                    <span key={i} className="sk sk--day" />
                  ))}
                </div>
              </div>
              <div className="booking__sk-times">
                {Array.from({ length: 6 }, (_, i) => (
                  <span key={i} className="sk sk--time" />
                ))}
              </div>
            </div>
          )}
          {mounted && (
            <iframe
              className={`booking__frame${loaded ? " is-loaded" : ""}`}
              src={BOOKING_URL}
              title="Book a free scope call"
              onLoad={() => setLoaded(true)}
            />
          )}
        </div>
      </div>
    </dialog>
  );
}
