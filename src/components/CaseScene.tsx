import Image from "next/image";
import { cardImage, phoneScreens, type CaseStudy } from "@/data/cases";

type Screen = { src: string; alt: string; width: number; height: number };

/** A phone drawn in CSS around a real app screen: bezel, island and side buttons. Sized by --w on the parent. */
export function Phone({ screen, sizes, priority = false, className = "" }: {
  screen: Screen;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone__screen">
        <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}

/** Browser window with the product screenshot, floating on the scene's backdrop. */
function Window({ c, sizes, priority }: { c: CaseStudy; sizes: string; priority: boolean }) {
  const img = cardImage(c);
  return (
    <div className="scene__window">
      <div className="scene__bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <Image src={img.src} alt={`${c.name} product screenshot`} width={img.width} height={img.height} sizes={sizes} priority={priority} />
    </div>
  );
}

/**
 * The project's presentation scene: its own colour backdrop with the product placed on it.
 * - a finished mockup (web + phone composites) fills the scene
 * - three phone screens stand side by side in device frames
 * - a web product with an app: the browser window with the phone in front of it
 * - a web product: the browser window, running off the bottom edge
 * "tile" is the card on /case-studies; "hero" is the banner at the top of a case study.
 */
export function CaseScene({ c, variant, priority = false }: { c: CaseStudy; variant: "tile" | "hero"; priority?: boolean }) {
  const phones = phoneScreens(c);
  const hero = variant === "hero";
  const winSizes = hero ? "(max-width: 900px) 100vw, 1000px" : "(max-width: 760px) 100vw, 640px";
  const phoneSizes = hero ? "(max-width: 900px) 30vw, 260px" : "(max-width: 760px) 30vw, 180px";
  // Web + mobile products show the dashboard with the app in front of it; app-only products, their phones.
  const webAndApp = !!c.image && phones.length > 0 && c.kind.includes("web");
  const layout = c.mockup ? "mockup" : webAndApp ? "combo" : phones.length >= 3 ? "phones" : phones.length ? "combo" : "web";
  const style = { "--t1": c.tint[0], "--t2": c.tint[1] } as React.CSSProperties;

  return (
    <div className={`scene scene--${variant} scene--${layout}`} style={style}>
      <div className="scene__inner">
        {layout === "mockup" && (
          <Image
            className="scene__mockup"
            src={cardImage(c).src}
            alt={`${c.name} on web and mobile`}
            width={1490}
            height={730}
            sizes={hero ? "(max-width: 1400px) 100vw, 1360px" : "(max-width: 760px) 100vw, 680px"}
            priority={priority}
          />
        )}
        {layout === "phones" && (
          <div className="scene__phones">
            {phones.slice(0, 3).map((s, i) => (
              <Phone key={s.src} screen={s} sizes={phoneSizes} priority={priority} className={`phone--${["left", "mid", "right"][i]}`} />
            ))}
          </div>
        )}
        {(layout === "combo" || layout === "web") && <Window c={c} sizes={winSizes} priority={priority} />}
        {layout === "combo" && <Phone screen={phones[0]} sizes={phoneSizes} priority={priority} className="phone--float" />}
      </div>
    </div>
  );
}
