import Image from "next/image";
import { Check } from "./icons";
import { MeetCallButton } from "./ui";

// Product cards in design order; the marquee loops through three copies of this set.
const cards = ["invenci", "visuali", "beneficiary", "flightpath", "safetynexus", "terraive"];
const marquee = [0, 1, 2].flatMap((copy) => cards.map((name) => ({ key: `${copy}-${name}`, name, copy })));

const promises = [
  "Fixed scope, fixed price",
  "locked before any code starts.",
  "The number you agree to is the number you pay.",
];

export function Hero() {
  return (
    <>
      <section className="hero">
        <Image className="hero__glow" src="/images/hero-glow.png" alt="" width={580} height={676} priority />

        <div className="hero__content">
          <h1 className="h1">
            Not a prototype. A working product live in{" "}
            <span className="hero__mark">
              <Image className="hero__swash" src="/images/swash.png" alt="" width={230} height={60} priority />
              <span>14 days.</span>
            </span>
          </h1>
          <p className="lead hero__lead">
            A production-ready product you can put in front of users and investors. Fixed scope and price under
            $10,000, built by a dedicated team. You own 100% of the code and IP.
          </p>
          <div className="hero__actions">
            <MeetCallButton />
          </div>
        </div>

        <div className="strip" aria-hidden="true">
          <div className="strip__track">
            {marquee.map((c) => (
              <Image
                key={c.key}
                className="strip__card"
                src={`/images/hero/${c.name}.png`}
                alt=""
                width={850}
                height={844}
                sizes="426px"
                priority={c.copy === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="band">
        <ul className="band__list container">
          {promises.map((p) => (
            <li key={p}>
              <Check className="band__check" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
