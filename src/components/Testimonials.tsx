import Image from "next/image";
import { Star } from "./icons";
import { SectionHeader } from "./ui";

const testimonials = [
  {
    quote:
      "We went from a Figma file to paying users in two weeks. Then they kept going. The competitor analysis and growth estimators shaped every call we made after launch.",
    avatar: "/images/avatar-1.png",
  },
  {
    quote:
      "A fixed scope meant they cared about the outcome, not the hours. They held the date, and the product held up under real traffic from day one.",
    avatar: "/images/avatar-2.png",
  },
  {
    quote:
      "The performance work paid for itself. Our load times dropped, conversion climbed, and we finally had analytics we could trust.",
    avatar: "/images/avatar-3.png",
  },
  {
    quote:
      "Fastest, cleanest build we have ever commissioned. Fourteen days later we were demoing to investors on a live product.",
    avatar: "/images/avatar-4.png",
  },
  {
    quote:
      "Reliable, transparent and easy to work with. The team shipped high-quality code and helped us accelerate our whole roadmap.",
    avatar: "/images/avatar-5.png",
  },
];

export function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <SectionHeader
        pill="Testimonials"
        title="Founders who launched first & kept going."
        lead={
          <>
            Real products. Shipped in two weeks. Trusted by users, backed by investors, and
            <br /> built through direct collaboration.
          </>
        }
      />
      <div className="testimonials__viewport container">
        <ul className="testimonials__track">
          {/* Two copies for a seamless loop; the second is hidden from assistive tech. */}
          {[0, 1].flatMap((copy) => testimonials.map((t, i) => ({ t, i, copy }))).map(({ t, i, copy }) => (
            <li key={`${copy}-${i}`} className="t-card" aria-hidden={copy === 1 || undefined}>
              <div className="t-card__stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} />
                ))}
              </div>
              <p className="t-card__quote">{t.quote}</p>
              <div className="t-card__author">
                <Image src={t.avatar} alt="" width={83} height={83} />
                <div>
                  <p className="t-card__name">David Thompson</p>
                  <p className="t-card__role">SAAS Owner</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
