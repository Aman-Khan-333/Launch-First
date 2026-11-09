import Image from "next/image";
import { Check, Cross } from "./icons";
import { PrimaryButton, SectionHeader } from "./ui";

const rows = [
  { label: "Timeline", agency: "2–6 months before anything ships", us: "14 days to a live, working product" },
  { label: "Price", agency: "$50k–$80k — and it grows mid-build", us: "Fixed at $9,999, locked before code" },
  { label: "What you get", agency: 'A prototype, or an endless "phase 1"', us: "A real, production-ready product" },
  { label: "Who you talk to", agency: "Account managers who hide the devs", us: "The developers building your product" },
  { label: "Ownership", agency: 'Unclear and "AI wrapper" fears', us: "100% code & IP, senior-reviewed" },
  { label: "The scope", agency: 'Moves "unexpected work" appears', us: "Fixed before a single line of code" },
];

export function Comparison() {
  return (
    <section className="compare">
      <SectionHeader
        pill="Reality Check"
        title="The usual build vs. Launch First."
        lead="The two things that keep founders from committing timeline and trust handled before you start."
      />
      <div className="compare__link">
        <PrimaryButton href="#pricing">
          See the exact pricing &amp; process
        </PrimaryButton>
      </div>

      <div className="compare__stage">
        <span className="compare__circle compare__circle--tl" aria-hidden="true" />
        <span className="compare__circle compare__circle--br" aria-hidden="true" />
        <span className="compare__grain" aria-hidden="true" />
        <div className="compare__table">
          <ul className="compare__labels">
            {rows.map((r) => (
              <li key={r.label}>{r.label}</li>
            ))}
          </ul>

          <div className="compare__col compare__col--agency">
            <div className="compare__head">The usual agency</div>
            <ul className="compare__cells">
              {rows.map((r) => (
                <li key={r.label}>
                  <span className="compare__check">
                    <Cross />
                  </span>
                  {r.agency}
                </li>
              ))}
            </ul>
          </div>

          <div className="compare__col compare__col--us">
            <div className="compare__head">
              <Image src="/images/logo-white.png" alt="Launch First" width={1000} height={173} />
            </div>
            <ul className="compare__cells">
              {rows.map((r) => (
                <li key={r.label}>
                  <span className="compare__check">
                    <Check />
                  </span>
                  {r.us}
                </li>
              ))}
            </ul>
        </div>
        </div>
      </div>
    </section>
  );
}
