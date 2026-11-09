"use client";

import Image from "next/image";
import { useState } from "react";
import { MeetCallButton, SectionHeader } from "./ui";

type VideoTestimonial = {
  title: string;
  quote: string;
  /** Still from the call recording, used as the video thumbnail */
  thumb: string;
  name: string;
  role: string;
  /** Path to the video file, e.g. "/videos/founder-1.mp4". Cards without one show the poster only. */
  video?: string;
};

// TODO: add each founder's video file (public/videos/...), real name/role, and their own words for quote 6.
const testimonials: VideoTestimonial[] = [
  {
    title: "Paying users in two weeks",
    quote: "We went from a Figma file to paying users in two weeks, and they kept going long after launch.",
    thumb: "/images/testimonials/client-1.jpg",
    name: "Founder",
    role: "SAAS Owner",
  },
  {
    title: "They held the date",
    quote: "A fixed scope meant they cared about the outcome, not the hours. They held the date and the product held up.",
    thumb: "/images/testimonials/client-2.jpg",
    name: "Founder",
    role: "SAAS Owner",
  },
  {
    title: "The build paid for itself",
    quote: "The performance work paid for itself: faster load times, higher conversion and analytics we finally trust.",
    thumb: "/images/testimonials/client-3.jpg",
    name: "Founder",
    role: "SAAS Owner",
  },
  {
    title: "Demo-ready for investors",
    quote: "Fastest, cleanest build we've ever commissioned. Fourteen days later we were demoing a live product to investors.",
    thumb: "/images/testimonials/client-4.jpg",
    name: "Founder",
    role: "SAAS Owner",
  },
  {
    title: "A faster roadmap",
    quote: "Reliable, transparent and easy to work with. They shipped high-quality code and sped up our whole roadmap.",
    thumb: "/images/testimonials/client-5.jpg",
    name: "Founder",
    role: "SAAS Owner",
  },
  {
    title: "Straight to the developers",
    quote: "We spoke to the people building our product every day. No account managers, no relay, no surprises.",
    thumb: "/images/testimonials/client-6.jpg",
    name: "Founder",
    role: "SAAS Owner",
  },
];

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.6v12.8c0 .8.87 1.28 1.54.86l10.1-6.4a1 1 0 0 0 0-1.72L9.54 4.74A1 1 0 0 0 8 5.6Z" fill="currentColor" />
    </svg>
  );
}

function VideoCard({ t }: { t: VideoTestimonial }) {
  const [playing, setPlaying] = useState(false);

  return (
    <li className="v-card">
      <div className="v-card__media">
        {playing && t.video ? (
          <video className="v-card__video" src={t.video} controls autoPlay playsInline />
        ) : (
          <button
            type="button"
            className="v-card__poster"
            onClick={() => t.video && setPlaying(true)}
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
      <h3 className="v-card__title">{t.title}</h3>
      <p className="v-card__quote">{t.quote}</p>
    </li>
  );
}

/** Video testimonials: a static grid of call recordings. Rendered at the top of the dark case studies section. */
export function Testimonials() {
  return (
    <div className="vids" id="testimonials">
      <div className="container">
        <SectionHeader
          dark
          pill="Testimonials"
          title="Founders who launched first & kept going."
          lead="Real products shipped in two weeks, trusted by users, backed by investors and built through direct collaboration."
          titleClass="process__title"
          leadClass="process__lead"
        />
      </div>
      <ul className="vids__grid container">
        {testimonials.map((t, i) => (
          <VideoCard key={i} t={t} />
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
