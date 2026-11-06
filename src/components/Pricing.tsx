import Image from "next/image";
import { Check } from "./icons";
import { PrimaryButton, SectionHeader } from "./ui";

const included = [
  "A full, production-ready working product in 14 days",
  "Fixed scope & price, locked before a single line of code",
  "Direct access to the developers building it",
  "100% code & IP ownership, senior-engineer reviewed",
  "Add-ons add to the price, never to the 14-day deadline",
];

export function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <Image className="pricing__bg" src="/images/pricing-bg.png" alt="" width={2580} height={1388} />
      <SectionHeader
        pill="Fixed Cost"
        title="One fixed number. Agreed up front."
        lead="No hourly surprises, no scope creep. You see the price before you commit to anything."
      />
      <div className="price-card">
        <div className="price-card__main">
          <p className="price-card__under">Under</p>
          <p className="price-card__amount">
            $10k <span>(fixed)</span>
          </p>
          <p className="price-card__desc">
            A full 14-day build starting at $4,000, capped under $10,000. The exact number is set with you before any
            code.
          </p>
          <div className="price-card__note">
            <h3>Your exact price, on the call</h3>
            <p>
              A live requirements session turns your idea into a fixed-price, fixed-scope proposal the same day, with
              an NDA. so you know the number before you commit.
            </p>
          </div>
        </div>
        <div className="price-card__panel">
          <ul className="price-card__list">
            {included.map((i) => (
              <li key={i}>
                <Check className="price-card__check" />
                {i}
              </li>
            ))}
          </ul>
          <PrimaryButton className="btn-primary--block">Book a free scope call</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
