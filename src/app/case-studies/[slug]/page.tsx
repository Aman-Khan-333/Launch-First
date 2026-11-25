import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/CaseStudies";
import { CaseScene, Phone, Window } from "@/components/CaseScene";
import { Footer } from "@/components/Footer";
import { Asterisk, Check, ChevronRight } from "@/components/icons";
import { Nav } from "@/components/Nav";
import { MeetCallButton, SectionHeader } from "@/components/ui";
import { cases, getCase, phoneScreens, platformsOf } from "@/data/cases";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  return { title: `${c.name} case study — Launch First`, description: c.summary };
}

/** Section label on the left: "✳ Introduction" */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="cs2-label">
      <span className="cs2-label__icon" aria-hidden="true">
        <Asterisk />
      </span>
      {children}
    </p>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();

  // The next three projects, wrapping round to the start of the list.
  const index = cases.indexOf(c);
  const more = [1, 2, 3].map((step) => cases[(index + step) % cases.length]);

  const facts = [
    { label: "Industry", value: c.tag },
    { label: "Platforms", value: platformsOf(c) },
    ...(c.stack ? [{ label: "Built with", value: c.stack.join(" / ") }] : []),
    ...(c.timeline === null ? [] : [{ label: "Timeline", value: c.timeline ?? "14 days" }]),
    { label: "Pricing", value: "Fixed scope & price" },
    { label: "Ownership", value: "100% code & IP" },
  ];

  // The scrolling strip: interface close-ups, else the extra web screenshots.
  const strip =
    c.details?.map((d) => ({ ...d, src: `/images/case-studies/${d.src}.webp` })) ??
    (c.gallery && c.galleryStyle !== "phones"
      ? c.gallery.map((g) => ({ src: `/images/case-studies/${g.src}.jpg`, alt: g.alt, width: 1600, height: 960 }))
      : []);
  const appScreen = c.mobile ? phoneScreens(c)[0] : null;
  // Designed app screens get their own strip, each in a device frame.
  const phones = c.screens ? phoneScreens(c) : [];

  return (
    <>
      <Nav />
      <main className="cs2">
        <div className="cs-top">
          <Image className="hero__glow" src="/images/hero-corner-glow.webp" alt="" width={1200} height={1010} sizes="1000px" priority unoptimized />
          <div className="cs2-back container">
            <Link href="/case-studies" className="cs-back">
              <span className="cs-back__icon" aria-hidden="true">
                <ChevronRight />
              </span>
              All case studies
            </Link>
          </div>
          <div className="cs2-banner container">
            <CaseScene c={c} variant="hero" priority />
          </div>
        </div>

        <header className="cs2-head container">
          <h1 className="cs2-head__title">{c.name}</h1>
        </header>

        <section className="cs2-row container">
          <Label>Introduction</Label>
          <div className="cs2-row__body">
            <p className="cs2-lede">{c.summary}</p>
            {c.background && <p className="cs2-copy">{c.background}</p>}
            <dl className="cs2-facts">
              {facts.map((f) => (
                <div key={f.label} className="cs2-facts__row">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="cs2-row container">
          <Label>Challenges</Label>
          <div className="cs2-row__body">
            <p className="cs2-statement">{c.challenge}</p>
          </div>
        </section>

        {phones.length > 0 && (
          <section className="cs2-strip cs2-strip--phones" aria-label={`${c.name} app screens`}>
            <div className="cs2-strip__track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="cs2-strip__set" aria-hidden={copy === 1 || undefined}>
                  {[...phones, ...phones].map((s, i) => (
                    <li key={`${s.src}-${i}`} className="cs2-strip__phone">
                      <Phone screen={{ ...s, alt: copy === 0 && i < phones.length ? s.alt : "" }} sizes="(max-width: 640px) 46vw, 260px" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </section>
        )}

        {phones.length === 0 && strip.length > 0 && (
          <section className="cs2-strip" aria-label={`${c.name} interface details`}>
            <div className="cs2-strip__track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="cs2-strip__set" aria-hidden={copy === 1 || undefined}>
                  {strip.map((s) => (
                    <li key={s.src} className="cs2-strip__item">
                      <Image
                        src={s.src}
                        alt={copy === 0 ? s.alt : ""}
                        width={s.width}
                        height={s.height}
                        sizes="(max-width: 640px) 80vw, 640px"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </section>
        )}

        <section className="cs2-row container">
          <Label>What we built</Label>
          <div className="cs2-row__body">
            <ol className="cs2-built">
              {c.built.map((item, i) => (
                <li key={item}>
                  <span className="cs2-built__num">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Web + mobile products whose banner shows the app: the web dashboard, whole, in its own section */}
        {c.image && c.screens && c.kind.includes("web") && (
          <section className="cs2-web container">
            <div className="cs2-web__stage">
              <div className="cs2-web__text">
                <Label>Web dashboard</Label>
                <h2 className="cs2-app__title">The {c.name} dashboard</h2>
                <p className="cs2-copy">
                  The web side of {c.name}, where the business runs the day: everything the app books and sells, in
                  one place.
                </p>
              </div>
              <div className="cs2-web__frame" style={{ "--t1": c.tint[0], "--t2": c.tint[1] } as React.CSSProperties}>
                <Window c={c} sizes="(max-width: 1100px) 100vw, 600px" priority={false} />
              </div>
            </div>
          </section>
        )}

        {/* Web + mobile products: the app gets its own stage, in a device frame */}
        {c.mobile && appScreen && (
          <section className="cs2-app container">
            <div className="cs2-app__stage" style={{ "--t1": c.tint[0], "--t2": c.tint[1] } as React.CSSProperties}>
              <Phone screen={appScreen} sizes="(max-width: 640px) 60vw, 300px" className="phone--stage" />
            </div>
            <div className="cs2-app__text">
              <Label>Mobile app</Label>
              <h2 className="cs2-app__title">The {c.name} mobile app</h2>
              <p className="cs2-copy">{c.mobile.summary}</p>
              <ul className="cs2-ticks">
                {c.mobile.features.map((f) => (
                  <li key={f}>
                    <Check className="cs2-ticks__icon" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {c.howItWorks && (
          <section className="cs2-row container">
            <Label>How it works</Label>
            <div className="cs2-row__body">
              <p className="cs2-copy cs2-copy--large">{c.howItWorks}</p>
            </div>
          </section>
        )}

        {c.results && (
          <section className="cs2-row container">
            <Label>What changed</Label>
            <ul className="cs2-row__body cs2-results">
              {c.results.map((r) => (
                <li key={r.label} className="cs2-results__item">
                  <span className="cs2-results__value">{r.value}</span>
                  <span className="cs2-results__label">{r.label}</span>
                  {r.detail && <span className="cs2-results__detail">{r.detail}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="cs2-outcome container">
          <div className="cs2-outcome__panel" style={{ "--t1": c.tint[0], "--t2": c.tint[1] } as React.CSSProperties}>
            <Label>The outcome</Label>
            <p className="cs2-outcome__text">{c.outcome}</p>
          </div>
        </section>

        <section className="cases-section cs-more" data-nav-dark>
          <div className="cases">
            <div className="container">
              <SectionHeader dark pill="More work" title="More products we've shipped." titleClass="process__title" />
            </div>
            <ul className="cases__grid container">
              {more.map((m) => (
                <CaseCard key={m.slug} c={m} />
              ))}
            </ul>
            <div className="vids__cta container">
              <div>
                <h2 className="vids__cta-title">Want results like {c.name}?</h2>
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
