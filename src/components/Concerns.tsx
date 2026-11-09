import { AlertIcon, ClockIcon, EyeOffIcon, FlameIcon, LockIcon, WireframeIcon } from "./icons";
import { SectionHeader } from "./ui";

const stats = [
  { value: "14 days", label: "To a live product" },
  { value: "$9,999", label: "Fixed, capped price" },
  { value: "100%", label: "Code & IP ownership" },
  { value: "1 team", label: "Dedicated · direct access" },
];

const concerns = [
  { Icon: ClockIcon, text: "I want a working digital product built in weeks, not months for my existing customers." },
  { Icon: EyeOffIcon, text: "I have no way to check whether what gets handed to me is solid underneath, or just looks finished." },
  { Icon: WireframeIcon, text: "I want working software, not a stripped-down prototype, ready to put in front of customers." },
  { Icon: AlertIcon, text: "A previous agency ran over budget, missed the deadline, or went dark mid-build." },
  { Icon: FlameIcon, text: "I'm weighing $50–80k quotes over 2–6 months while my runway keeps ticking down." },
  {
    Icon: LockIcon,
    text: "I'm worried I won't truly own the code, and every change after launch will mean going back to the same agency.",
  },
];

export function Stats() {
  return (
    <section className="stats">
      <dl className="stats__list">
        {stats.map((s) => (
          <div key={s.label} className="stats__item">
            <dt className="stats__value">{s.value}</dt>
            <dd className="stats__label">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Concerns() {
  return (
    <section className="concerns">
      <SectionHeader
        pill="Founder Concerns"
        title={
          <>
            You have the funding and the idea. What
            <br /> you don&apos;t have is certainty.
          </>
        }
        lead={
          <>
            If you&apos;ve raised capital to build a product, you already know these and they&apos;re
            <br /> exactly what stops you from signing off the build
          </>
        }
      />
      <ul className="concerns__grid container">
        {concerns.map(({ Icon, text }) => (
          <li key={text} className="concern">
            <span className="concern__icon">
              <Icon />
            </span>
            <p className="concern__text">{text}</p>
          </li>
        ))}
      </ul>
      <p className="concerns__closing">
        The <strong>fear</strong> was never whether it can be built. It&apos;s whether you can trust what you get and
        what it will really <strong>cost</strong>. We <strong>remove both.</strong>
      </p>
    </section>
  );
}
