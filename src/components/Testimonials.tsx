"use client";

import Image from "next/image";
import { useState } from "react";
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

function VideoCard({ t }: { t: VideoTestimonial }) {
  const [playing, setPlaying] = useState(false);

  return (
    <li className="v-card">
      <div className="v-card__media">
        {playing && t.video ? (
          <video className="v-card__video" src={t.video} poster={t.thumb} controls autoPlay playsInline />
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
      <h3 className="v-card__title">{headingOf(t)}</h3>
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
