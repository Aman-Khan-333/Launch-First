import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/CaseStudies";
import { Footer } from "@/components/Footer";
import { Check, ChevronRight } from "@/components/icons";
import { Nav } from "@/components/Nav";
import { MeetCallButton, Pill, SectionHeader } from "@/components/ui";
import { cases, getCase } from "@/data/cases";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  return { title: `${c.name} case study — Launch First`, description: c.summary };
}

export default async function CaseStudyPage({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();

  // The next three projects, wrapping round to the start of the list.
  const index = cases.indexOf(c);
  const more = [1, 2, 3].map((step) => cases[(index + step) % cases.length]);

  const meta = [
    { label: "Industry", value: c.tag },
    { label: "Timeline", value: "14 days" },
    { label: "Pricing", value: "Fixed scope & price" },
    { label: "Ownership", value: "100% code & IP" },
  ];

  return (
    <>
      <Nav />
      <main>
        {/* Same green glow as the home page hero, top right */}
        <div className="cs-top">
          <Image className="hero__glow" src="/images/hero-glow.png" alt="" width={580} height={676} priority />
          <header className="cs-hero container">
            <Link href="/case-studies" className="cs-back">
              <span className="cs-back__icon" aria-hidden="true">
                <ChevronRight />
              </span>
              All case studies
            </Link>
            <Pill>{c.tag}</Pill>
            <h1 className="h1 cs-hero__title">{c.name}</h1>
            <p className="lead cs-hero__lead">{c.summary}</p>
          </header>

          <dl className="cs-meta container">
            {meta.map((m) => (
              <div key={m.label} className="cs-meta__item">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <section className="cs-body container">
          <div className="cs-body__text">
            <h2 className="cs-body__heading">The challenge</h2>
            <p className="cs-body__copy">{c.challenge}</p>

            <h2 className="cs-body__heading">What we built</h2>
            <ul className="cs-body__list">
              {c.built.map((item) => (
                <li key={item}>
                  <Check className="cs-body__check" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="cs-body__end">
              <h2 className="cs-body__heading">The outcome</h2>
              <p className="cs-body__copy">{c.outcome}</p>
            </div>
          </div>

          <div className="cs-body__media">
            <div className="cs-frame">
              <div className="cs-frame__shot">
                <Image
                  src={`/images/hero/${c.image}.png`}
                  alt={`${c.name} product screenshot`}
                  width={850}
                  height={844}
                  sizes="(max-width: 1100px) 100vw, 640px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Extra screenshots: the first runs full width, the rest sit two to a row */}
        {c.gallery && (
          <section className="cs-gallery container" aria-label={`${c.name} screenshots`}>
            {c.gallery.map((g) => (
              <div key={g.src} className="cs-gallery__item">
                <Image src={`/images/case-studies/${g.src}.jpg`} alt={g.alt} width={1600} height={980} sizes="(max-width: 640px) 100vw, (max-width: 1100px) 90vw, 1360px" />
              </div>
            ))}
          </section>
        )}

        {/* Web + mobile products: the mobile app gets its own section under the web screenshot */}
        {c.mobile && (
          <section className="cs-app container">
            <div className="cs-app__text">
              <Pill>Mobile app</Pill>
              <h2 className="cs-body__heading cs-app__title">The {c.name} mobile app</h2>
              <p className="cs-body__copy">{c.mobile.summary}</p>
              <ul className="cs-body__list">
                {c.mobile.features.map((f) => (
                  <li key={f}>
                    <Check className="cs-body__check" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cs-app__media">
              <div className="cs-app__phone">
                <Image
                  src={`/images/hero/${c.mobile.image}.png`}
                  alt={`${c.name} mobile app screenshot`}
                  width={390}
                  height={847}
                  sizes="(max-width: 640px) 60vw, 280px"
                />
              </div>
            </div>
          </section>
        )}

        <section className="cases-section cs-more" data-nav-dark>
          <div className="cases">
            <div className="container">
              <SectionHeader
                dark
                pill="More work"
                title="More products we've shipped."
                titleClass="process__title"
              />
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
