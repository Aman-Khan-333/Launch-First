import Image from "next/image";
import { Check } from "./icons";
import { MeetCallButton, SectionHeader } from "./ui";

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
      <Image className="pricing__bg" src="/images/pricing-bg-v2.png" alt="" width={2580} height={1388} />
      {/* Same dashed grid as the comparison table, above the glow and behind the card */}
      <div className="pricing__grid" aria-hidden="true" />
      <SectionHeader
        pill="Fixed Cost"
        title="One fixed number. Agreed up front."
        lead="No hourly surprises, no scope creep. You see the price before you commit to anything."
      />
      <div className="price-card">
        <div className="price-card__main">
          <p className="price-card__under">Under</p>
          <p className="price-card__amount">
            $9,999 <span>(only)</span>
          </p>
          <p className="price-card__desc">
            A full 14-day build starting at $4,000, capped at $9,999. The exact number is set with you before any
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
          <MeetCallButton wrapClassName="price-card__cta" className="btn-primary--block" />
        </div>
      </div>
    </section>
  );
}
