"use client";

import { useRef, type ReactNode } from "react";

/** Speed while the pointer is over the strip, as a share of the normal speed. */
const HOVER_RATE = 0.7;
/** How long the slow-down and speed-up take, in ms. */
const EASE_MS = 500;

/**
 * The hero's project strip. The marquee itself is a CSS animation (globals.css); on hover this eases its
 * playback rate down, and back up on leave, so the cards slow to a gentle drift instead of stopping dead.
 * Only on devices with a real hover (mouse or trackpad); touch screens keep the normal speed.
 */
export function StripHover({ children }: { children: ReactNode }) {
  const frame = useRef(0);

  const easeTo = (el: HTMLElement, target: number) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    // Look the animation up each time: switching between the desktop and phone layouts replaces it
    const anim = el.querySelector<HTMLElement>(".strip__track")?.getAnimations()[0];
    if (!anim) return;
    cancelAnimationFrame(frame.current);
    const from = anim.playbackRate;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / EASE_MS);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out
      // updatePlaybackRate keeps the cards where they are while the speed changes
      anim.updatePlaybackRate(from + (target - from) * eased);
      if (t < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  };

  return (
    <div
      className="strip"
      aria-hidden="true"
      onPointerEnter={(e) => easeTo(e.currentTarget, HOVER_RATE)}
      onPointerLeave={(e) => easeTo(e.currentTarget, 1)}
    >
      {children}
    </div>
  );
}
