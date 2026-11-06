"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./ui";

type VideoTestimonial = {
  title: string;
  quote: string;
  avatar: string;
  name: string;
  role: string;
  /** Path to the video file, e.g. "/videos/founder-1.mp4". Cards without one show the poster only. */
  video?: string;
};

// TODO: add each founder's video file (public/videos/...) and real name/role.
const testimonials: VideoTestimonial[] = [
  {
    title: "Paying users in two weeks",
    quote: "We went from a Figma file to paying users in two weeks, and they kept going long after launch.",
    avatar: "/images/avatar-1.png",
    name: "David Thompson",
    role: "SAAS Owner",
  },
  {
    title: "They held the date",
    quote: "A fixed scope meant they cared about the outcome, not the hours. They held the date and the product held up.",
    avatar: "/images/avatar-2.png",
    name: "David Thompson",
    role: "SAAS Owner",
  },
  {
    title: "The build paid for itself",
    quote: "The performance work paid for itself: faster load times, higher conversion and analytics we finally trust.",
    avatar: "/images/avatar-3.png",
    name: "David Thompson",
    role: "SAAS Owner",
  },
  {
    title: "Demo-ready for investors",
    quote: "Fastest, cleanest build we've ever commissioned. Fourteen days later we were demoing a live product to investors.",
    avatar: "/images/avatar-4.png",
    name: "David Thompson",
    role: "SAAS Owner",
  },
  {
    title: "A faster roadmap",
    quote: "Reliable, transparent and easy to work with. They shipped high-quality code and sped up our whole roadmap.",
    avatar: "/images/avatar-5.png",
    name: "David Thompson",
    role: "SAAS Owner",
  },
];

const SPEED = 40; // px per second
const RESUME_AFTER = 1200; // ms of no interaction before auto-scroll picks up again

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.6v12.8c0 .8.87 1.28 1.54.86l10.1-6.4a1 1 0 0 0 0-1.72L9.54 4.74A1 1 0 0 0 8 5.6Z" fill="currentColor" />
    </svg>
  );
}

/* Meet-style control icons (simplified) */
function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" />
    </svg>
  );
}

function CamIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4Z" />
    </svg>
  );
}

function CaptionsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 10h2v2H6v-2Zm0 4h8v2H6v-2Zm12 2h-2v-2h2v2Zm0-4h-8v-2h8v2Z" />
    </svg>
  );
}

function EndCallIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85a1 1 0 0 1-1.41-.02L.29 13.08a1 1 0 0 1 0-1.41C3.34 8.77 7.46 7 12 7s8.66 1.77 11.71 4.67a1 1 0 0 1 0 1.41l-2.48 2.48a1 1 0 0 1-1.41.02 11.27 11.27 0 0 0-2.67-1.85 1 1 0 0 1-.56-.9v-3.1A15.9 15.9 0 0 0 12 9Z" />
    </svg>
  );
}

/** Poster styled as a Google Meet call: founder and Launch First team tiles above Meet's control bar. */
function MeetThumbnail({ t }: { t: VideoTestimonial }) {
  return (
    <span className="meet" aria-hidden="true">
      <span className="meet__tiles">
        <span className="meet__tile meet__tile--speaking">
          <span className="meet__avatar">
            <Image src={t.avatar} alt="" width={83} height={83} />
          </span>
          <span className="meet__bars">
            <i />
            <i />
            <i />
          </span>
          <span className="meet__label">{t.name}</span>
        </span>
        <span className="meet__tile">
          <span className="meet__avatar meet__avatar--brand">lf.</span>
          <span className="meet__label">Launch First</span>
        </span>
      </span>
      <span className="meet__bar">
        <span className="meet__meta">Founder call</span>
        <span className="meet__controls">
          <span className="meet__btn">
            <MicIcon />
          </span>
          <span className="meet__btn">
            <CamIcon />
          </span>
          <span className="meet__btn">
            <CaptionsIcon />
          </span>
          <span className="meet__btn meet__btn--end">
            <EndCallIcon />
          </span>
        </span>
        <span className="meet__meta meet__meta--right">{t.role}</span>
      </span>
    </span>
  );
}

function VideoCard({ t, hidden, dragged }: { t: VideoTestimonial; hidden: boolean; dragged: () => boolean }) {
  const [playing, setPlaying] = useState(false);

  return (
    <li className="v-card" aria-hidden={hidden || undefined}>
      <div className="v-card__media">
        {playing && t.video ? (
          <video className="v-card__video" src={t.video} controls autoPlay playsInline />
        ) : (
          <button
            type="button"
            className="v-card__poster"
            tabIndex={hidden ? -1 : undefined}
            onClick={() => !dragged() && t.video && setPlaying(true)}
            aria-disabled={!t.video}
            aria-label={t.video ? `Play ${t.name}'s video testimonial` : `${t.name}'s video testimonial (coming soon)`}
          >
            <MeetThumbnail t={t} />
            <span className="v-card__play">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>
      <h3 className="v-card__title">{t.title}</h3>
      <p className="v-card__quote">&ldquo;{t.quote}&rdquo;</p>
    </li>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const draggedRef = useRef(false);

  // Endless auto-scroll over three copies of the set (we stay within the middle one), with
  // mouse drag and native touch / trackpad scrolling. Any interaction pauses it briefly.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let setWidth = 0;
    let pos = 0; // float position; scrollLeft alone would round away slow speeds
    let last = performance.now();
    let idleUntil = 0;
    let frame = 0;
    let drag: { x: number; start: number; id: number } | null = null;

    const measure = () => {
      const cards = track.children;
      const n = testimonials.length;
      if (cards.length < n * 2) return;
      setWidth = (cards[n] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    };
    const wrap = () => {
      if (!setWidth) return;
      if (pos < setWidth * 0.5) pos += setWidth;
      else if (pos >= setWidth * 1.5) pos -= setWidth;
    };
    const apply = () => {
      wrap();
      track.scrollLeft = pos;
    };
    const pause = () => {
      idleUntil = performance.now() + RESUME_AFTER;
    };
    // Only sideways wheel / trackpad gestures count; vertical wheel just scrolls the page past.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) pause();
    };

    measure();
    pos = setWidth;
    apply();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const videoPlaying = Array.from(track.querySelectorAll("video")).some((v) => !v.paused);
      if (!reduced && !drag && !videoPlaying && now > idleUntil) {
        pos += SPEED * dt;
        apply();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Native scrolling (touch, trackpad) moves scrollLeft directly: follow it.
    const onScroll = () => {
      if (Math.abs(track.scrollLeft - pos) > 1) {
        pos = track.scrollLeft;
        wrap();
        if (pos !== track.scrollLeft) track.scrollLeft = pos;
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      pause();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, start: pos, id: e.pointerId };
      draggedRef.current = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 5 && !draggedRef.current) {
        draggedRef.current = true;
        track.setPointerCapture(e.pointerId);
        track.classList.add("is-dragging");
      }
      if (draggedRef.current) {
        pos = drag.start - dx;
        apply();
        drag.start = pos + dx; // keep the anchor consistent after a wrap
      }
    };
    const onPointerUp = () => {
      if (!drag) return;
      drag = null;
      track.classList.remove("is-dragging");
      pause();
      // Let the click that follows a drag see draggedRef, then reset.
      window.setTimeout(() => (draggedRef.current = false), 0);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("wheel", onWheel, { passive: true });
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchmove", pause, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchmove", pause);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="testimonials" id="testimonials">
      <SectionHeader
        pill="Testimonials"
        title="Founders who launched first & kept going."
        lead={
          <>
            Real products. Shipped in two weeks. Trusted by users, backed by investors, and
            <br /> built through direct collaboration.
          </>
        }
      />
      <div className="testimonials__viewport">
        <ul ref={trackRef} className="testimonials__track">
          {/* Three copies for a seamless loop; only the middle one is exposed to assistive tech. */}
          {[0, 1, 2].flatMap((copy) =>
            testimonials.map((t, i) => (
              <VideoCard key={`${copy}-${i}`} t={t} hidden={copy !== 1} dragged={() => draggedRef.current} />
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
