import Image from "next/image";
import { SectionHeader } from "./ui";

const stats = [
  { value: "14 days", label: "To a live product" },
  { value: "$10k", label: "Fixed, capped price" },
  { value: "100%", label: "Code & IP ownership" },
  { value: "1 team", label: "Dedicated · direct access" },
];

// Left edge of each sticky note in the 1920px design frame.
const notes = [
  { x: 295.33, text: "I want a working digital product built in weeks, not months for my existing customers." },
  { x: 570.67, text: "I have no way to check whether what gets handed to me is solid underneath, or just looks finished." },
  { x: 846.17, text: "I want working software, not a stripped-down prototype, ready to put in front of customers." },
  { x: 1122, text: "A previous agency ran over budget, missed the deadline, or went dark mid-build." },
  { x: 1397.33, text: "I'm weighing $50–80k quotes over 2–6 months while my runway keeps ticking down." },
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
      <div className="concerns__stage">
        <Image className="concerns__bg" src="/images/concerns-bg.png" alt="" width={2280} height={777} />
        {notes.map((n) => (
          <blockquote key={n.x} className="concerns__note" style={{ left: `calc(50% + ${n.x + 25.33 - 960}px)` }}>
            {n.text}
          </blockquote>
        ))}
        <p className="concerns__closing">
          The <strong>fear</strong> was never whether it can be built. It&apos;s whether you can trust what you get and
          what it will really <strong>cost</strong>. We <strong>remove both.</strong>
        </p>
      </div>
    </section>
  );
}
