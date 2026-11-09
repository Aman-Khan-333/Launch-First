import Link from "next/link";
import { ChevronRight, GoogleMeetLogo } from "./icons";

/** Booking page for the free scope call; every "Book a call" CTA opens it in a new tab. */
export const BOOKING_URL = "https://cal.launchfirst.com/widget/booking/nSvYccJOPeRIOPtDVT3Q";

export function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={dark ? "pill pill--dark" : "pill"}>{children}</span>;
}

export function SectionHeader({
  pill,
  title,
  lead,
  titleClass = "",
  leadClass = "",
  dark = false,
}: {
  pill: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  titleClass?: string;
  leadClass?: string;
  dark?: boolean;
}) {
  return (
    <div className="section-header">
      <Pill dark={dark}>{pill}</Pill>
      <h2 className={`h2 ${titleClass}`}>{title}</h2>
      {lead && <p className={`lead ${leadClass}`}>{lead}</p>}
    </div>
  );
}

/** Black CTA with the green chevron square. */
export function PrimaryButton({
  children,
  href = "#get-pricing",
  className = "",
  icon = <ChevronRight />,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  const content = (
    <>
      <span className="btn-primary__icon">{icon}</span>
      <span className="btn-primary__label">{children}</span>
    </>
  );
  // Links to other pages navigate client-side; in-page anchors stay plain so the smooth scroll handles them;
  // external links open in a new tab.
  if (href.startsWith("http")) {
    return (
      <a href={href} className={`btn-primary ${className}`} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return href.startsWith("/") ? (
    <Link href={href} className={`btn-primary ${className}`}>
      {content}
    </Link>
  ) : (
    <a href={href} className={`btn-primary ${className}`}>
      {content}
    </a>
  );
}

/** "Book a free scope call" CTA: black button with the Google Meet logo and the moving Meet-colour glow. */
export function MeetCallButton({
  children = "Book a free scope call",
  href = BOOKING_URL,
  className = "",
  wrapClassName = "",
}: {
  children?: React.ReactNode;
  href?: string;
  className?: string;
  wrapClassName?: string;
}) {
  return (
    <span className={`meet-glow ${wrapClassName}`}>
      <PrimaryButton href={href} className={`btn-primary--meet ${className}`} icon={<GoogleMeetLogo />}>
        {children}
      </PrimaryButton>
    </span>
  );
}
