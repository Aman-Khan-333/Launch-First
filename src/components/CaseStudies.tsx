import Image from "next/image";
import Link from "next/link";
import { cases, type CaseStudy } from "@/data/cases";
import { Testimonials } from "./Testimonials";
import { PrimaryButton, SectionHeader } from "./ui";

/** Screenshot card linking to the project's case study. Used on the home page, /case-studies and the detail pages. */
export function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <li className="case">
      <Link href={`/case-studies/${c.slug}`} className="case__link">
        <div className="case__frame">
          <div className="case__shot">
            <Image
              src={`/images/hero/${c.image}.png`}
              alt={`${c.name} product screenshot`}
              width={850}
              height={844}
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 440px"
            />
          </div>
        </div>
        <div className="case__head">
          <h3 className="case__name">{c.name}</h3>
          <span className="case__tag">{c.tag}</span>
        </div>
      </Link>
    </li>
  );
}

// Listed on /case-studies but left off the home page selection.
const HIDDEN_ON_HOME = ["beneficiary-platform", "flightpath"];
const homeCases = cases.filter((c) => !HIDDEN_ON_HOME.includes(c.slug)).slice(0, 6);

export function CaseStudies() {
  return (
    <section className="cases-section" data-nav-dark>
      <Testimonials />
      <div className="cases" id="case-studies">
        <div className="container">
          <SectionHeader
            dark
            pill="Case Studies"
            title="Real products, already in users' hands."
            lead="A few of the working products we've shipped for founders, each one built, owned and live."
            titleClass="process__title"
            leadClass="process__lead"
          />
        </div>
        <ul className="cases__grid container">
          {/* Home page shows six; every project is on /case-studies ("View all case studies") */}
          {homeCases.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </ul>
        <div className="cases__more">
          <PrimaryButton href="/case-studies" className="btn-primary--light">
            View all case studies
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
