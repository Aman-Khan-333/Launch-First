import { ProcessTimeline } from "./ProcessTimeline";
import { Pill } from "./ui";

const steps = [
  {
    n: "01.",
    title: "Days 1–3 · Scope & price",
    body: "A live requirements session captures exactly what you want and benchmarks it against competitors. You get a fixed-price, fixed-scope proposal and an NDA.",
  },
  {
    n: "02.",
    title: "Days 4–6 · Design & prototype",
    body: "We design the product and build a working prototype so you see the real thing taking shape, not a slide deck.",
  },
  {
    n: "03.",
    title: "Days 7–13 · Build & QA",
    body: "The dedicated team builds and hardens your product AI-assisted for speed, senior-engineer-reviewed for quality.",
  },
  {
    n: "04.",
    title: "Day 14 · Ship it's yours",
    body: "A live, production-ready product in your hands, with 100% of the code and IP. Ready for users, investors, or revenue.",
  },
];

export function Process() {
  return (
    <section className="process" id="process" data-nav-dark>
      <div className="process__inner container">
        <div className="process__intro">
          <Pill dark>14-Day Process</Pill>
          <h2 className="h2 process__title">
            From idea to a live
            <br /> product in 14 days.
          </h2>
          <p className="lead process__lead">
            A clear, low-risk path where the price and scope are settled before the build even starts.
          </p>
        </div>
        <ProcessTimeline steps={steps} />
      </div>
    </section>
  );
}
