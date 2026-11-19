import { HourglassIcon, PackageIcon, ScanSearchIcon, TrendDownIcon, UnlinkIcon } from "./icons";
import Image from "next/image";
import { FearLine } from "./FearLine";
import { SectionHeader } from "./ui";

const stats = [
  { value: "14 days", label: "To a live product" },
  { value: "$9,999", label: "Fixed, capped price" },
  { value: "100%", label: "Code & IP ownership" },
  { value: "1 team", label: "Dedicated · direct access" },
];

// Each concern: a two-word heading, then the concern in the founder's own voice.
const concerns = [
  {
    Icon: HourglassIcon,
    title: "Time pressure",
    text: (
      <>
        I need a working product in front of my customers in weeks, not months.
      </>
    ),
  },
  {
    Icon: ScanSearchIcon,
    title: "Hidden quality",
    text: (
      <>
        I can&apos;t tell whether what I&apos;m handed is solid underneath, or just looks finished.
      </>
    ),
  },
  {
    Icon: PackageIcon,
    title: "No prototypes",
    text: (
      <>
        I want real, working software, not a stripped-down prototype I can&apos;t ship.
      </>
    ),
  },
  {
    Icon: UnlinkIcon,
    title: "Broken trust",
    text: (
      <>
        My last agency blew the budget, missed the deadline and went dark mid-build.
      </>
    ),
  },
  {
    Icon: TrendDownIcon,
    title: "Burning runway",
    text: (
      <>
        I&apos;m weighing $50–80k quotes and 2–6 month timelines while my runway burns.
      </>
    ),
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
      <div className="concerns__bg" aria-hidden="true" />
      <SectionHeader
        pill="Founder Concerns"
        titleClass="concerns__title"
        title={
          <>
            You have the funding and the idea.
            <br /> What you don&apos;t have is{" "}
            <span className="concerns__mark">
              <Image className="concerns__swash" src="/images/swash.png" alt="" width={230} height={60} />
              certainty.
            </span>
          </>
        }
        lead={
          <>
            If you&apos;ve raised capital to build a product, you already know these. They&apos;re exactly what
            stops you from signing off the build.
          </>
        }
      />
      <ol className="concerns__grid container">
        {concerns.map(({ Icon, title, text }, i) => (
          <li key={i} className="concern">
            <div className="concern__top">
              <span className="concern__icon">
                <Icon />
              </span>
              <span className="concern__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="concern__body">
              <h3 className="concern__title">{title}</h3>
              <p className="concern__text">{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <FearLine />
    </section>
  );
}
