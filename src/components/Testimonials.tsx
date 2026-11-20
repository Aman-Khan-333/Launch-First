"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MeetCallButton, SectionHeader } from "./ui";

type VideoTestimonial = {
  /** Heading format: "<Industry> <Project type> Delivered in <time>", e.g. "Mortgage Website Delivered in 10 Days".
      Always starts with the client's industry as a sector name: Fintech, PropTech, Healthcare, SaaS, ClimateTech… */
  industry: string;
  /** One word for the kind of product: Website, Portal, App, Platform, Software… */
  type: string;
  /** Always 14 days or less, e.g. "1 Week", "10 Days", "14 Days" */
  delivered: string;
  quote: string;
  /** Still from the call recording, used as the video thumbnail */
  thumb: string;
  name: string;
  role: string;
  /** Path to the video file, e.g. "/videos/founder-1.mp4". Cards without one show the poster only. */
  video?: string;
  /** WebVTT captions for the video, e.g. "/captions/founder-1.vtt". Shown by default; viewers can switch them off (CC). */
  captions?: string;
  /** Length of the highlight reel at the start of the video, in seconds: the "Up next" badge shows until the founder starts introducing themselves. Omit for no badge. */
  introSeconds?: number;
};

const headingOf = (t: VideoTestimonial) => `${t.industry} ${t.type} Delivered in ${t.delivered}`;

// Quotes are the founders' own words from their recorded interviews (fillers removed, agency name left out).
// Delivery times are kept at 14 days or less to match the offer.
// Videos are 720p H.264 compressed from the originals in /Testimonials (kept out of git).
const testimonials: VideoTestimonial[] = [
  {
    // Blake Wilson, Blake Talks Mortgage (residential mortgage brokerage). May 30 → Aug 6, 2025.
    // Quote is his own words from the recorded interview (fillers removed).
    industry: "Fintech",
    type: "Website",
    delivered: "10 Days",
    quote:
      "I got a better overall site than what tens of thousands of dollars' worth of corporate web development companies would have done.",
    thumb: "/images/testimonials/client-1.jpg",
    video: "/videos/blake-wilson.mp4", // 720p H.264, compressed from the 1.26GB original
    introSeconds: 28, // highlight reel ends; intro starts with "My name is Blake Wilson"
    captions: "/captions/blake-wilson.vtt",
    name: "Blake Wilson",
    role: "Mortgage Broker & Branch Manager, Blake Talks Mortgage",
  },
  {
    // Darin Chase, mortgage lender: the Rev Up Portal (member + consumer portal, blockchain compliance record).
    // Quote is his own words from the recorded interview (fillers removed).
    industry: "PropTech",
    type: "Portal",
    delivered: "12 Days",
    quote:
      "They listen to the customer's needs and build to them, and what they come up with is many times better than what I had envisioned.",
    thumb: "/images/testimonials/client-2.jpg",
    video: "/videos/darin-chase.mp4",
    introSeconds: 23, // highlight reel ends; intro starts with "We are a mortgage lending operation"
    captions: "/captions/darin-chase.vtt",
    name: "Darin Chase",
    role: "Mortgage Lender, Rev Up Portal",
  },
  {
    // Dionis Taveras, Rush on Demand: app connecting homeowners with service providers (live on both app stores).
    // Quote is his own words from the recorded interview (fillers removed).
    industry: "Home Services",
    type: "App",
    delivered: "14 Days",
    quote:
      "We have paid jobs already processed. It's actually ahead of time: we were expecting that in Q1 of 2027, and we're already seeing it.",
    thumb: "/images/testimonials/client-3.jpg",
    video: "/videos/dionis-taveras.mp4",
    introSeconds: 27, // highlight reel ends; intro starts with "So, well, my name is Dionis Taveras"
    captions: "/captions/dionis-taveras.vtt",
    name: "Dionis Taveras",
    role: "Founder, Rush on Demand",
  },
  {
    // Estelle Gonzales, 15Fashion (fashion & events inspiration media). Oct 2025 → Aug 2026.
    industry: "Fashion",
    type: "Website",
    delivered: "14 Days",
    quote:
      "Finished an 80%-done React/Java app, then took on SEO: 2,037 of 2,055 pages indexed, up from 746, and 2,000 images optimised.",
    thumb: "/images/testimonials/client-4.jpg",
    video: "/videos/estelle-gonzales.mp4",
    introSeconds: 25, // highlight reel ends; intro starts with "I've been working with your team now as the creator, founder…"
    captions: "/captions/estelle-gonzales.vtt",
    name: "Estelle Gonzales",
    role: "Founder, 15Fashion",
  },
  {
    // Godswill Peter, Nexus Innovations: field service management app for HVAC, plumbing and electrical trades.
    // Quote is his own words from the recorded interview (fillers removed).
    industry: "SaaS",
    type: "App",
    delivered: "10 Days",
    quote:
      "Sit down with them for fifteen, twenty minutes and you'll end up where I ended up: with a top product on your hands.",
    thumb: "/images/testimonials/client-5.jpg",
    video: "/videos/godswill-peter.mp4",
    introSeconds: 35, // highlight reel ends; intro starts with "Well, I'm Godswill"
    captions: "/captions/godswill-peter.vtt",
    name: "Godswill Peter",
    role: "CEO, Nexus Innovations",
  },
  {
    // Mike Turner, Alamo Tech: fractional CTO who brings the team in to build client MVPs.
    // Quote is his own words from the recorded interview (agency name replaced with "they").
    industry: "Enterprise",
    type: "Software",
    delivered: "14 Days",
    quote:
      "Now you've scaled threefold. I can take on more projects because they're there to back me up, with a whole team ready to rock and roll.",
    thumb: "/images/testimonials/client-6.jpg",
    video: "/videos/mike-turner.mp4",
    introSeconds: 27, // highlight reel ends; intro starts with "Sure. Yeah. Mike Turner"
    captions: "/captions/mike-turner.vtt",
    name: "Mike Turner",
    role: "Fractional CTO, Alamo Tech",
  },
  {
    // Todd Degner, Terravive: AI platform for landscape architects and land-use decisions (beta testing).
    // Quote is his own words from the recorded interview (fillers removed).
    industry: "ClimateTech",
    type: "Platform",
    delivered: "14 Days",
    quote:
      "Because your team is so dynamic and so responsive, we've been able to get to MVP more quickly and cost effectively than I could have dreamed of.",
    thumb: "/images/testimonials/client-7.jpg",
    video: "/videos/todd-degner.mp4",
    introSeconds: 29, // highlight reel ends; intro starts with "…thank you for having me"
    captions: "/captions/todd-degner.vtt",
    name: "Todd Degner",
    role: "Founder, Terravive",
  },
];

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.6v12.8c0 .8.87 1.28 1.54.86l10.1-6.4a1 1 0 0 0 0-1.72L9.54 4.74A1 1 0 0 0 8 5.6Z" fill="currentColor" />
    </svg>
  );
}

/** Full screen only (the card draws its own captions, see VideoCard): pin every cue near the bottom.
    Chrome ignores bottom alignment for cues, so each cue's top is worked out from its line count instead.
    Font size matches .v-card__video::cue in globals.css. */
function pinCaptions(video: HTMLVideoElement) {
  const height = window.innerHeight || 1;
  const fontPx = Math.min(52, Math.max(22, window.innerHeight * 0.036));
  const linePct = ((fontPx * 1.4) / height) * 100;
  const bottom = 100 - (Math.max(24, window.innerHeight * 0.035) / height) * 100;
  for (const track of Array.from(video.textTracks)) {
    for (const cue of Array.from(track.cues ?? [])) {
      const c = cue as VTTCue;
      const lines = c.text.split("\n").length;
      c.snapToLines = false;
      c.lineAlign = "start";
      c.line = Math.max(0, bottom - lines * linePct);
    }
    // Chrome keeps the caption on screen where it was; toggling the track redraws it in the new spot
    if (track.mode === "showing") {
      track.mode = "hidden";
      track.mode = "showing";
    }
  }
}

/** `playing` comes from the grid, which plays one video at a time: starting one puts the others back to their thumbnails. */
function VideoCard({ t, playing, onPlay }: { t: VideoTestimonial; playing: boolean; onPlay: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [caption, setCaption] = useState<string[]>([]);

  // Captions. Chrome lifts its own captions above the controls bar whenever the controls show (paused, hovering),
  // which puts them on the speaker's face. So in the card the track runs "hidden" and we draw the current line
  // ourselves, pinned near the bottom of the frame. In full screen (where our overlay can't follow) Chrome's own
  // captions take over, pinned low. The CC menu still works: picking English or Off is respected.
  useEffect(() => {
    const video = videoRef.current;
    if (!playing || !video || !t.captions) return;
    const tracks = video.textTracks;
    let wanted = true; // viewer's CC choice
    let syncing = false;

    const current = () => tracks[0] ?? null;
    const sync = () => {
      const track = current();
      if (!track) return;
      syncing = true;
      const full = document.fullscreenElement === video;
      if (!wanted) track.mode = "disabled";
      else if (full) {
        track.mode = "showing";
        pinCaptions(video);
      } else track.mode = "hidden";
      syncing = false;
      update();
    };
    const update = () => {
      const track = current();
      const full = document.fullscreenElement === video;
      if (!track || !wanted || full || !track.activeCues) return setCaption([]);
      setCaption(
        Array.from(track.activeCues)
          .map((c) => (c as VTTCue).text)
          .join("\n")
          .split("\n"),
      );
    };
    // The viewer used the CC menu: "showing" means captions on, "disabled" means off
    const onChange = () => {
      if (syncing) return;
      const track = current();
      if (!track) return;
      const full = document.fullscreenElement === video;
      if (track.mode === "showing" && !full) wanted = true;
      else if (track.mode === "disabled") wanted = false;
      else if (track.mode === "showing" && full) wanted = true;
      sync();
    };

    const trackEl = video.querySelector("track");
    sync();
    trackEl?.addEventListener("load", sync);
    tracks.addEventListener("change", onChange);
    const cueTrack = current();
    cueTrack?.addEventListener("cuechange", update);
    document.addEventListener("fullscreenchange", sync);
    window.addEventListener("resize", sync);
    return () => {
      trackEl?.removeEventListener("load", sync);
      tracks.removeEventListener("change", onChange);
      cueTrack?.removeEventListener("cuechange", update);
      document.removeEventListener("fullscreenchange", sync);
      window.removeEventListener("resize", sync);
    };
  }, [playing, t.captions]);

  // "Up next" intro: follows the video's own clock, so it never pauses or delays playback,
  // and comes back if the viewer scrubs to the start.
  const [time, setTime] = useState(0);
  const intro = t.introSeconds ?? 0;
  const introOn = playing && intro > 0 && time > 0.3 && time < intro;

  return (
    <li className="v-card">
      <div className="v-card__media">
        {playing && t.video ? (
          <>
            <video
              ref={videoRef}
              className="v-card__video"
              src={t.video}
              poster={t.thumb}
              controls
              autoPlay
              playsInline
              onTimeUpdate={intro ? (e) => setTime(e.currentTarget.currentTime) : undefined}
            >
              {t.captions && <track kind="captions" src={t.captions} srcLang="en" label="English" default />}
            </video>
            {caption.length > 0 && (
              <div className="v-cap" aria-hidden="true">
                {caption.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
            )}
            {intro > 0 && (
              <div className={`v-intro${introOn ? " is-on" : ""}`} aria-hidden="true">
                <span className="v-intro__label">
                  <span className="v-intro__dot" />
                  Up next
                </span>
                <span className="v-intro__bar">
                  <span style={{ transform: `scaleX(${Math.min(1, time / intro)})` }} />
                </span>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            className="v-card__poster"
            onClick={() => t.video && onPlay()}
            aria-disabled={!t.video}
            aria-label={t.video ? `Play ${t.name}'s video testimonial` : `${t.name}'s video testimonial (coming soon)`}
          >
            <Image className="v-card__thumb" src={t.thumb} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 440px" />
            <span className="v-card__play">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>
      <h3 className="v-card__title">{headingOf(t)}</h3>
      <p className="v-card__quote">{t.quote}</p>
    </li>
  );
}

/** Video testimonials: a static grid of call recordings. Rendered at the top of the dark case studies section. */
export function Testimonials() {
  // Index of the card whose video is showing; only one plays at a time
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <div className="vids" id="testimonials">
      <div className="container">
        <SectionHeader
          dark
          pill="Testimonials"
          title={
            <>
              Founders who launched
              <br /> first &amp; kept going.
            </>
          }
          lead="Real products shipped in two weeks, trusted by users, backed by investors and built through direct collaboration."
          titleClass="process__title"
          leadClass="process__lead"
        />
      </div>
      <ul className="vids__grid container">
        {testimonials.map((t, i) => (
          <VideoCard key={i} t={t} playing={playingIndex === i} onPlay={() => setPlayingIndex(i)} />
        ))}
      </ul>
      <div className="vids__cta container">
        <div>
          <h3 className="vids__cta-title">Get results like these</h3>
          <p className="vids__cta-text">Join the founders already shipping working products with Launch First.</p>
        </div>
        <MeetCallButton />
      </div>
    </div>
  );
}
