import Image from "next/image";
import { Asterisk } from "./icons";
import { MeetCallButton } from "./ui";
import { StripHover } from "./StripHover";

// Projects in order; the marquee loops through three copies of this set. Each project shows one name.
// Products with a web and a mobile app show both screens side by side (the phone card is narrower) under one name.
// One screen per project, every card the same width (images fill it from the top-left).
// Images named "-card" (with an optional "-v2" version suffix, so caches never serve an old file) are already framed at the card's shape (1440 × 972, 2× the card: tinted background, inset window).
const projects = [
  { name: "Fade", type: "Web & mobile app", images: ["fade-web"] },
  { name: "Kynos", type: "Web app", images: ["kynos"] },
  { name: "ATS Seminar", type: "Dashboard", images: ["ats-seminar-card-v2"] },
  { name: "Fresh Pass", type: "Web & mobile app", images: ["fresh-pass-web"] },
  { name: "Data Capture", type: "Dashboard", images: ["data-capture"] },
  { name: "Wedding Realm", type: "Web app", images: ["wedding-realm-card-v2"] },
  { name: "Prime Roster", type: "Dashboard", images: ["prime-roaster"] },
  { name: "Home Delivery", type: "Dashboard", images: ["home-delivery-card-v2"] },
  { name: "Terravive", type: "Web app", images: ["terravive"] },
];
const marquee = [0, 1, 2].flatMap((copy) => projects.map((p, i) => ({ ...p, key: `${copy}-${p.name}`, copy, i })));
// The marquee opens on the 2nd copy; only its first few projects are on screen at load.
const VISIBLE_AT_LOAD = 4;

// Source image size and the card widths it is shown at (desktop / under 640px), per card shape
const CARD = {
  web: { w: 850, h: 844, sizes: "(max-width: 640px) 424px, 720px" },
  mobile: { w: 390, h: 847, sizes: "(max-width: 640px) 132px, 224px" },
  card: { w: 1440, h: 972, sizes: "(max-width: 640px) 424px, 720px" },
};

const promises = [
  "Fixed scope, fixed price",
  "locked before any code starts.",
  "The number you agree to is the number you pay.",
];

export function Hero() {
  return (
    <>
      <section className="hero">
        {/* Decorative: loads after the headline and fonts instead of competing with them */}
        <Image className="hero__glow" src="/images/hero-corner-glow.webp" alt="" width={1200} height={1010} sizes="1000px" loading="eager" fetchPriority="low" unoptimized />

        <div className="hero__content">
          <h1 className="h1">
            From Idea to Investor&#8209;Ready MVP in Just{" "}
            <span className="hero__mark">
              <Image className="hero__swash" src="/images/swash.png" alt="" width={230} height={60} priority />
              <span>14 Days</span>
            </span>
            .
          </h1>
          <p className="lead hero__lead">
            A production-ready product you can put in front of users and investors. Fixed scope and price of
            $9,999 only, built by a dedicated team. You own 100% of the code and IP.
          </p>
          <div className="hero__actions">
            <MeetCallButton />
          </div>
        </div>

        <StripHover>
          <div className="strip__track">
            {marquee.map((p) => (
              <div key={p.key} className="strip__item">
                <div className="strip__shots">
                  {p.images.map((img) => {
                    const mobile = img.endsWith("-mobile");
                    const kind = mobile ? CARD.mobile : /-card(-v\d+)?$/.test(img) ? CARD.card : CARD.web;
                    return (
                      <Image
                        key={img}
                        className={mobile ? "strip__card strip__card--mobile" : "strip__card"}
                        src={`/images/hero/${img}.png`}
                        alt=""
                        width={kind.w}
                        height={kind.h}
                        // Card widths from globals.css (smaller under 640px), so phones get phone-sized files
                        sizes={kind.sizes}
                        // First cards load straight away, but without high priority: they sit under the loading
                        // screen, so the headline and fonts get the bandwidth first.
                        loading={p.copy === 1 && p.i < VISIBLE_AT_LOAD ? "eager" : "lazy"}
                      />
                    );
                  })}
                </div>
                <div className="strip__meta">
                  <span className="strip__name">{p.name}</span>
                  <span className="strip__tag">{p.type}</span>
                </div>
              </div>
            ))}
          </div>
        </StripHover>
      </section>

      <div className="band">
        <ul className="band__list container">
          {promises.map((p) => (
            <li key={p}>
              <Asterisk className="band__check" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
