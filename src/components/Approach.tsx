import { BentoCursor } from "./BentoCursor";
import { BentoReveal } from "./BentoReveal";
import { SectionHeader } from "./ui";

/* Our approach as a bento grid. Each card pairs the promise with a small animated graphic built in HTML/CSS
   (no images), so it stays sharp and light. The animations only run once the section has scrolled in
   (.approach.is-active, set by ScrollReveal) and stop for reduced-motion users. */

/** Live product: a browser window with a dashboard that keeps updating, a Live badge and a deploy toast. */
function ProductGraphic() {
  return (
    <div className="bx-app" aria-hidden="true">
      <div className="bx-app__bar">
        <span className="bx-app__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="bx-app__url">app.yourproduct.com</span>
        <span className="bx-live">
          <i />
          Live
        </span>
      </div>
      <div className="bx-app__body">
        <div className="bx-app__side">
          <span className="bx-app__logo" />
          <i className="is-on" />
          <i />
          <i />
          <i />
        </div>
        <div className="bx-app__main">
          <div className="bx-app__stats">
            <div>
              <small>Active users</small>
              <b>2,481</b>
              <em>+18%</em>
            </div>
            <div>
              <small>Sign-ups today</small>
              <b>146</b>
              <em>+32%</em>
            </div>
            <div>
              <small>Uptime</small>
              <b>99.9%</b>
              <em>Healthy</em>
            </div>
          </div>
          <div className="bx-app__chart">
            {[38, 52, 44, 66, 58, 74, 62, 86, 72, 94, 80, 100].map((h, i) => (
              <span key={i} style={{ "--h": `${h}%`, "--i": i } as React.CSSProperties} />
            ))}
          </div>
        </div>
      </div>
      <div className="bx-toast">
        <span className="bx-toast__icon">✓</span>
        <span>
          <b>Deployed to production</b>
          <small>Day 14 · v1.0 is live</small>
        </span>
      </div>
    </div>
  );
}

/** Fixed price: the number, locked, with the agreed scope ticking off underneath. */
function PriceGraphic() {
  return (
    <div className="bx-price" aria-hidden="true">
      <div className="bx-price__head">
        <span className="bx-price__label">Fixed price</span>
        <span className="bx-price__lock">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Locked
        </span>
      </div>
      <div className="bx-price__num">$9,999</div>
      <ul className="bx-price__scope">
        {["Scope agreed", "Day-by-day plan", "No hourly billing"].map((s, i) => (
          <li key={s} style={{ "--i": i } as React.CSSProperties}>
            <span className="bx-check" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 14 days: a two-week calendar filling in, ending on launch day. */
function CalendarGraphic() {
  return (
    <div className="bx-cal" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className={i === 13 ? "is-launch" : undefined} style={{ "--i": i } as React.CSSProperties}>
          {i === 13 ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
            </svg>
          ) : (
            i + 1
          )}
        </span>
      ))}
    </div>
  );
}

/** Direct access: founder asks, developer answers, no middleman. */
function ChatGraphic() {
  return (
    <div className="bx-chat" aria-hidden="true">
      <div className="bx-msg bx-msg--you">
        <span className="bx-avatar">You</span>
        <p>Can we add Google sign-in before launch?</p>
      </div>
      <div className="bx-msg bx-msg--dev">
        <p>Yes, it&apos;s in today&apos;s build. Preview link in an hour.</p>
        <span className="bx-avatar bx-avatar--dev">Dev</span>
      </div>
      <div className="bx-typing">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

/** Ownership: a terminal handing over the repository. */
function CodeGraphic() {
  return (
    <div className="bx-term" aria-hidden="true">
      <div className="bx-term__bar">
        <i />
        <i />
        <i />
        <span>handover.sh</span>
      </div>
      <div className="bx-term__body">
        <p style={{ "--i": 0 } as React.CSSProperties}>
          <span className="bx-term__prompt">$</span> git transfer --to <span className="bx-term__hl">you</span>
        </p>
        <p style={{ "--i": 1 } as React.CSSProperties}>
          <span className="bx-term__ok">✓</span> Source code <span className="bx-term__dim">100%</span>
        </p>
        <p style={{ "--i": 2 } as React.CSSProperties}>
          <span className="bx-term__ok">✓</span> IP &amp; design assets
        </p>
        <p style={{ "--i": 3 } as React.CSSProperties}>
          <span className="bx-term__ok">✓</span> Cloud &amp; admin access
        </p>
        <p style={{ "--i": 4 } as React.CSSProperties}>
          owner: <span className="bx-term__hl">you</span>
          <span className="bx-term__cursor" />
        </p>
      </div>
    </div>
  );
}

/** Time zone: a working day with the US business-hours band and a "now" marker sweeping across it. */
function TimezoneGraphic() {
  const hours = ["6am", "9am", "12pm", "3pm", "6pm", "9pm"];
  return (
    <div className="bx-tz" aria-hidden="true">
      <div className="bx-tz__track">
        <span className="bx-tz__band">
          <b>Your team, online</b>
        </span>
        <span className="bx-tz__now">
          <i />
        </span>
      </div>
      <div className="bx-tz__hours">
        {hours.map((h, i) => (
          // 6am to 10pm is 16 hours, and the labels are 3 hours apart
          <span key={h} style={{ left: `${(i * 3 * 100) / 16}%` }}>
            {h}
          </span>
        ))}
      </div>
      <div className="bx-tz__zones">
        {["ET", "CT", "MT", "PT"].map((z) => (
          <span key={z}>{z}</span>
        ))}
        <em>Same-day answers</em>
      </div>
    </div>
  );
}

const cards = [
  {
    key: "product",
    title: "A full working product",
    body: "Not a prototype or a clickable mockup you throw away. Production-ready software you can ship to real users on day 14.",
    Graphic: ProductGraphic,
  },
  {
    key: "price",
    title: "Fixed scope & fixed price",
    body: "Agreed before a single line of code. Extra features add to the price, never to the deadline.",
    Graphic: PriceGraphic,
  },
  {
    key: "days",
    title: "Delivered in 14 days",
    body: "A dedicated team builds to a locked timeline. When scope grows, we add developers to hold the date.",
    Graphic: CalendarGraphic,
  },
  {
    key: "chat",
    title: "Direct developer access",
    body: "You talk to the people building your product. No account managers, no relay through middlemen.",
    Graphic: ChatGraphic,
  },
  {
    key: "code",
    title: "100% code & IP ownership",
    body: "Everything we build is yours. Senior engineers own architecture, security and QA.",
    Graphic: CodeGraphic,
  },
  {
    key: "tz",
    title: "A team in your time zone",
    body: "We work US business hours, so questions get answered the same day and nothing waits overnight for a distant team.",
    Graphic: TimezoneGraphic,
  },
];

export function Approach() {
  return (
    <section className="approach" id="approach">
      <SectionHeader
        pill="Our Approach"
        title={
          <>
            A real product. A fixed number.
            <br /> No moving parts.
          </>
        }
        lead={
          <>
            Everything is agreed before work starts so there is nothing left to negotiate once the build begins.
          </>
        }
      />
      <ul className="bento">
        {cards.map(({ key, title, body, Graphic }) => (
          <li key={key} className={`feature bento__card bento__card--${key}`} data-cursor={key}>
            <div className="bento__art">
              <Graphic />
            </div>
            <div className="bento__text">
              <h3 className="bento__title">{title}</h3>
              <p className="bento__body">{body}</p>
            </div>
          </li>
        ))}
      </ul>
      <BentoReveal />
      <BentoCursor />
    </section>
  );
}
