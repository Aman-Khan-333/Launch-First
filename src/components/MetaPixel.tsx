"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { PIXEL_ID, track, trackCustom } from "@/lib/pixel";
import { BOOKING_URL } from "./ui";

// The calendar widget tells the page a booking went through with this message.
const BOOKING_COMPLETE = "msgsndr-booking-complete";
const BOOKING_ORIGIN = new URL(BOOKING_URL).origin;

/** Where on the page a click happened: the section's id, else its first class name. */
const sectionOf = (el: Element) => {
  const withId = el.closest("section[id]");
  if (withId) return withId.id;
  const part = el.closest("section, header, footer, nav, dialog, main");
  return part?.classList[0] || part?.tagName.toLowerCase() || "page";
};

const labelOf = (el: Element) =>
  (el.getAttribute("aria-label") || (el as HTMLElement).innerText || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);

/**
 * Meta pixel: the base code (PageView), plus the events the ads are measured on.
 * - PageView on every page, including client-side navigations
 * - ViewContent on a case study
 * - Lead when the pricing form is sent (fired in GetPricing)
 * - Schedule when a scope call is booked in the calendar
 * - Contact when the email address is clicked
 * - BookCallClick when a "Book a call" button opens the calendar
 * - Click for every other button and link, with its label, link and section
 */
export function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  // The base code sends the first PageView; later navigations happen without a page load.
  useEffect(() => {
    if (first.current) first.current = false;
    else track("PageView");
    const slug = pathname.match(/^\/case-studies\/([^/]+)/)?.[1];
    if (slug) track("ViewContent", { content_type: "case_study", content_name: slug });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a[href], button");
      if (!el) return;
      // Form fields and the dropdown are not clicks worth reporting; the form's own send is the Lead event.
      if (el.closest("form")) return;
      const section = sectionOf(el);
      const label = labelOf(el);
      const href = el instanceof HTMLAnchorElement ? el.href : "";
      if (href === BOOKING_URL) {
        trackCustom("BookCallClick", { label, section, page: pathname });
        return;
      }
      if (href.startsWith("mailto:")) {
        track("Contact", { method: "email", section });
        return;
      }
      trackCustom("Click", { label, href: href || undefined, section, page: pathname });
    };

    let booked = false;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== BOOKING_ORIGIN || !Array.isArray(e.data) || e.data[0] !== BOOKING_COMPLETE) return;
      if (booked) return; // one booking, one event
      booked = true;
      track("Schedule", { content_name: "Free scope call" });
    };

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("message", onMessage);
    };
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
