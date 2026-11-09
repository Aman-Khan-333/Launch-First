import Image from "next/image";
import { Testimonials } from "./Testimonials";
import { PrimaryButton, SectionHeader } from "./ui";

// Products we've shipped; screenshots are shared with the hero strip.
const cases = [
  {
    image: "invenci",
    name: "Invenci",
    tag: "AI infrastructure",
  },
  {
    image: "visuali",
    name: "Visuali",
    tag: "Retail · AI",
  },
  {
    image: "beneficiary",
    name: "Beneficiary Platform",
    tag: "Insurance",
  },
  {
    image: "flightpath",
    name: "Flightpath",
    tag: "Cybersecurity",
  },
  {
    image: "safetynexus",
    name: "SafetyNexus",
    tag: "Social care",
  },
  {
    image: "terraive",
    name: "Terraive",
    tag: "Land & planning",
  },
];

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
          {cases.map((c) => (
            <li key={c.name} className="case">
              <div className="case__frame">
                <div className="case__shot">
                  <Image src={`/images/hero/${c.image}.png`} alt={`${c.name} product screenshot`} width={850} height={844} sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 440px" />
                </div>
              </div>
              <div className="case__head">
                <h3 className="case__name">{c.name}</h3>
                <span className="case__tag">{c.tag}</span>
              </div>
            </li>
          ))}
        </ul>
        {/* TODO: point at the full case studies page once it exists. */}
        <div className="cases__more">
          <PrimaryButton href="#case-studies" className="btn-primary--light">
            View all case studies
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
