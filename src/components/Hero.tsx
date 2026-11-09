import Image from "next/image";
import { Asterisk } from "./icons";
import { MeetCallButton } from "./ui";

// Projects in order; the marquee loops through three copies of this set. Each project shows one name.
// Products with a web and a mobile app show both screens side by side (the phone card is narrower) under one name.
const projects = [
  { name: "Fade", type: "Web & mobile app", images: ["fade-web", "fade-mobile"] },
  { name: "Kynos", type: "Web app", images: ["kynos"] },
  { name: "Beneficiary Platform", type: "Dashboard", images: ["beneficiary"] },
  { name: "Fresh Pass", type: "Web & mobile app", images: ["fresh-pass-web", "fresh-pass-mobile"] },
  { name: "Flightpath", type: "Dashboard", images: ["flightpath"] },
  { name: "Data Capture", type: "Dashboard", images: ["data-capture"] },
  { name: "SafetyNexus", type: "Web app", images: ["safetynexus"] },
  { name: "Prime Roster", type: "Dashboard", images: ["prime-roaster"] },
  { name: "Terravive", type: "Web app", images: ["terravive"] },
];
const marquee = [0, 1, 2].flatMap((copy) => projects.map((p, i) => ({ ...p, key: `${copy}-${p.name}`, copy, i })));
// The marquee opens on the 2nd copy; only its first few projects are on screen at load.
const VISIBLE_AT_LOAD = 4;

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
            A production-ready product you can put in front of users and investors. Fixed scope and price of
            $9,999 only, built by a dedicated team. You own 100% of the code and IP.
          </p>
          <div className="hero__actions">
            <MeetCallButton />
          </div>
        </div>

        <div className="strip" aria-hidden="true">
          <div className="strip__track">
            {marquee.map((p) => (
              <div key={p.key} className="strip__item">
                <div className="strip__shots">
                  {p.images.map((img) => {
                    const mobile = img.endsWith("-mobile");
                    return (
                      <Image
                        key={img}
                        className={mobile ? "strip__card strip__card--mobile" : "strip__card"}
                        src={`/images/hero/${img}.png`}
                        alt=""
                        width={mobile ? 390 : 850}
                        height={mobile ? 847 : 844}
                        sizes={mobile ? "195px" : "426px"}
                        priority={p.copy === 1 && p.i < VISIBLE_AT_LOAD}
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
        </div>
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
