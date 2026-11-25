import type { Metadata } from "next";
import Image from "next/image";
import { CaseList } from "@/components/CaseList";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { MeetCallButton } from "@/components/ui";
import { cases } from "@/data/cases";

export const metadata: Metadata = {
  title: "Case Studies — Launch First",
  description: "Web platforms, mobile apps and AI products we've shipped for founders, each one built, owned and live.",
};

export default function CaseStudiesPage() {
  const mobile = cases.filter((c) => c.kind.includes("mobile")).length;
  return (
    <>
      <Nav />
      <main>
        {/* Same green glow as the home page hero, top right */}
        <div className="cs-top">
          <Image className="hero__glow" src="/images/hero-corner-glow.webp" alt="" width={1200} height={1010} sizes="1000px" priority unoptimized />
          <header className="cs2-intro container">
            <h1 className="cs2-intro__title">
              Case
              <br /> Studies.
            </h1>
            <div className="cs2-intro__side">
              <span className="cs2-intro__count">
                ({cases.length} products · {mobile} mobile apps)
              </span>
              <p className="cs2-intro__lead">
                Real products, already in users&apos; hands. Web platforms, mobile apps and AI products we&apos;ve
                shipped for founders, each one built, owned by its founders and live.
              </p>
            </div>
          </header>
        </div>

        <section className="cs2-list container" aria-label="All case studies">
          <CaseList cases={cases} />
        </section>

        <section className="cases-section cs2-cta" data-nav-dark>
          <div className="vids__cta container">
            <div>
              <h2 className="vids__cta-title">Your product could be next</h2>
              <p className="vids__cta-text">A working product live in 14 days, at a fixed price of $9,999 only.</p>
            </div>
            <MeetCallButton />
          </div>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
