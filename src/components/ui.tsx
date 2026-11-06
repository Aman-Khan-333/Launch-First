import { ChevronRight } from "./icons";

export function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={dark ? "pill pill--dark" : "pill"}>{children}</span>;
}

export function SectionHeader({
  pill,
  title,
  lead,
  titleClass = "",
  leadClass = "",
}: {
  pill: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  titleClass?: string;
  leadClass?: string;
}) {
  return (
    <div className="section-header">
      <Pill>{pill}</Pill>
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
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a href={href} className={`btn-primary ${className}`}>
      <span className="btn-primary__icon">
        <ChevronRight />
      </span>
      <span className="btn-primary__label">{children}</span>
    </a>
  );
}

/** Text link with the light chevron square. */
export function GhostButton({
  children,
  href = "#get-pricing",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a href={href} className={`btn-ghost ${className}`}>
      <span className="btn-ghost__icon">
        <ChevronRight />
      </span>
      {children}
    </a>
  );
}
