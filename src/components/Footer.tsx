import Image from "next/image";
import Link from "next/link";
import { Mail } from "./icons";

const links = [
  { label: "What you get", href: "#approach" },
  { label: "how it works", href: "#process" },
  { label: "case studies", href: "/case-studies" },
  { label: "pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/** `base` is "/" on pages other than home so the section links point back to the home page. */
export function Footer({ base = "" }: { base?: string }) {
  return (
    <footer className="footer container">
      <div className="footer__card" data-nav-dark>
        <div className="footer__brand">
          <Image src="/images/logo-white.png" alt="launch first." width={1000} height={173} />
          <p className="footer__desc">
            A real, working product in 14 days fixed scope, fixed price of $9,999 only, agreed before a single line of
            code. You own 100% of the code and IP.
          </p>
          <a className="mail-link mail-link--dark" href="mailto:info@launchfirst.com">
            <span className="mail-link__icon">
              <Mail />
            </span>
            info@launchfirst.com
          </a>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <p className="footer__heading">The offer</p>
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("#") && !base ? (
                  <a href={l.href}>{l.label}</a>
                ) : (
                  <Link href={l.href.startsWith("#") ? base + l.href : l.href}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="footer__bottom">
        <p>© 2026 LaunchFirst. All rights reserved.</p>
        <p>A working product in 14 days.</p>
      </div>
    </footer>
  );
}
