"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMeetLogo } from "./icons";
import { BOOKING_URL } from "./ui";

const CLOSE_MS = 250; // matches the .booking exit transition in globals.css

/**
 * Booking popup. Any click on a link to the booking page opens the calendar here instead of a new tab
 * (Ctrl/⌘/middle-click still open it in a tab). The calendar iframe loads on first open and stays mounted.
 */
export function BookingModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false); // iframe added on first open
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false); // drives the enter/exit animation

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
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.href !== BOOKING_URL) return;
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
            <p className="booking__lead">Pick a time that suits you. We&apos;ll scope your product and lock the price.</p>
          </div>
          <button
            type="button"
            className="booking__close"
            aria-label="Close"
            onClick={() => window.dispatchEvent(new Event("booking:close"))}
            autoFocus
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className="booking__body">
          {!loaded && (
            <div className="booking__loading" role="status">
              <span className="booking__spinner" aria-hidden="true" />
              Loading the calendar…
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
