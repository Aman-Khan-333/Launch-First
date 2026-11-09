import type { Metadata } from "next";
import Image from "next/image";
import { CaseCard } from "@/components/CaseStudies";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { MeetCallButton, Pill } from "@/components/ui";
import { cases } from "@/data/cases";

export const metadata: Metadata = {
  title: "Case Studies — Launch First",
  description: "Working products we've shipped for founders in 14 days, each one built, owned and live.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Same green glow as the home page hero, top right */}
        <div className="cs-top">
          <Image className="hero__glow" src="/images/hero-glow.png" alt="" width={580} height={676} priority />
          <header className="cs-hero cs-hero--center container">
            <Pill>Case Studies</Pill>
            <h1 className="h1 cs-hero__title">Real products, already in users&apos; hands.</h1>
            <p className="lead cs-hero__lead">
              Every product here went from a funded idea to a working product in 14 days, at a fixed price agreed
              before a single line of code. Each one built, owned by its founders and live.
            </p>
          </header>
        </div>

        <section className="cases-section cs-list" data-nav-dark>
          <div className="cases">
            <ul className="cases__grid container">
              {cases.map((c) => (
                <CaseCard key={c.slug} c={c} />
              ))}
            </ul>
            <div className="vids__cta container">
              <div>
                <h2 className="vids__cta-title">Your product could be next</h2>
                <p className="vids__cta-text">A working product live in 14 days, at a fixed price of $9,999 only.</p>
              </div>
              <MeetCallButton />
            </div>
          </div>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
