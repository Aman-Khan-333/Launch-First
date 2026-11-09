type IconProps = { className?: string };

export function ChevronRight({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Six-armed asterisk: three rounded bars crossing at the centre (promise band bullets) */
export function Asterisk({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="currentColor">
        <rect x="9.6" y="1.5" width="4.8" height="21" rx="2.4" />
        <rect x="9.6" y="1.5" width="4.8" height="21" rx="2.4" transform="rotate(60 12 12)" />
        <rect x="9.6" y="1.5" width="4.8" height="21" rx="2.4" transform="rotate(-60 12 12)" />
      </g>
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 10.5 7.75 14.5 16.5 5.75" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Mail({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.5 5.2c0-.94.76-1.7 1.7-1.7h11.6c.94 0 1.7.76 1.7 1.7v.24L10 9.9 2.5 5.44V5.2Z" fill="currentColor" />
      <path d="M2.5 7.2 9.5 11.4a1 1 0 0 0 1 0l7-4.2v7.6c0 .94-.76 1.7-1.7 1.7H4.2c-.94 0-1.7-.76-1.7-1.7V7.2Z" fill="currentColor" />
    </svg>
  );
}

export function Star({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 .9 8.86 4.9l4.38.5-3.25 2.98.88 4.32L7 10.5l-3.87 2.2.88-4.32L.76 5.4l4.38-.5L7 .9Z" fill="currentColor" />
    </svg>
  );
}

/* ---------- Filled feature icons (24 grid, details cut out with evenodd) ---------- */

function FilledIcon({ d, className }: IconProps & { d: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

/** Rocket – a full working product, ready to launch */
export function RocketIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M12 1.8c3.4 2.1 5.2 5.6 5.2 9.6v3.4l1.9 1.9c.3.3.45.75.35 1.2l-.75 3.3a.65.65 0 0 1-1.08.32L15.2 19.1H8.8l-2.42 2.42a.65.65 0 0 1-1.08-.32l-.75-3.3c-.1-.45.05-.9.35-1.2l1.9-1.9v-3.4c0-4 1.8-7.5 5.2-9.6ZM12 7.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM10.2 20.3h3.6L12 23.2l-1.8-2.9Z"
    />
  );
}

/** Price tag – fixed scope & fixed price */
export function TagIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M2.8 4.3c0-.83.67-1.5 1.5-1.5h7.05c.4 0 .78.16 1.06.44l8.85 8.85c.59.58.59 1.53 0 2.12l-7.05 7.05c-.59.59-1.54.59-2.12 0L3.24 12.4a1.5 1.5 0 0 1-.44-1.06V4.3ZM7.6 5.6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
    />
  );
}

/** Calendar with a check – delivered in 14 days */
export function CalendarCheckIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M8 1.9c.55 0 1 .45 1 1V4h6V2.9a1 1 0 1 1 2 0V4h.6A2.9 2.9 0 0 1 20.5 6.9v11.7a2.9 2.9 0 0 1-2.9 2.9H6.4a2.9 2.9 0 0 1-2.9-2.9V6.9A2.9 2.9 0 0 1 6.4 4H7V2.9c0-.55.45-1 1-1ZM15.4 10.8l-4.3 4.3-2.5-2.5-1.4 1.4 3.9 3.9 5.7-5.7-1.4-1.4Z"
    />
  );
}

/** Chat bubbles – direct developer access */
export function ChatIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M4.2 3h10.6c1.21 0 2.2.99 2.2 2.2v6.6c0 1.21-.99 2.2-2.2 2.2H9.3l-3.6 3.05a.55.55 0 0 1-.9-.42V14h-.6A2.2 2.2 0 0 1 2 11.8V5.2C2 3.99 2.99 3 4.2 3Zm2.3 4.6a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm3 0a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm3 0a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM18.9 7.6h.9c1.21 0 2.2.99 2.2 2.2v6.6c0 1.21-.99 2.2-2.2 2.2h-.6v2.63a.55.55 0 0 1-.9.42L14.7 18.6h-4.5c-.9 0-1.67-.54-2.02-1.31h6.62a4.1 4.1 0 0 0 4.1-4.1V7.6Z"
    />
  );
}

/** Shield with a keyhole – 100% code & IP ownership */
export function ShieldKeyIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M11.6 2.1c.26-.1.54-.1.8 0l7.2 2.75c.42.16.7.57.7 1.02v5.4c0 4.7-3.15 8.95-7.68 10.55-.4.14-.84.14-1.24 0C6.85 20.22 3.7 15.97 3.7 11.27v-5.4c0-.45.28-.86.7-1.02L11.6 2.1ZM12 7.6a2.2 2.2 0 0 0-.95 4.19V15a.95.95 0 0 0 1.9 0v-3.21A2.2 2.2 0 0 0 12 7.6Z"
    />
  );
}

/** Clock – a team in your time zone */
export function ClockIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M12 2.2a9.8 9.8 0 1 1 0 19.6 9.8 9.8 0 0 1 0-19.6Zm0 3.6a1 1 0 0 0-1 1v5.6c0 .27.1.52.29.7l3.3 3.3a1 1 0 0 0 1.42-1.41L13 11.98V6.8a1 1 0 0 0-1-1Z"
    />
  );
}

/** Google Meet logo (brand colours) – marks the scope call as a Meet call */
export function GoogleMeetLogo({ className }: IconProps) {
  return (
    <svg className={className} width="21" height="17" viewBox="0 0 87.5 72" aria-hidden="true">
      <path fill="#00832d" d="M49.5 36l8.53 9.75 11.47 7.33 2-17.02-2-16.64-11.69 6.44z" />
      <path fill="#0066da" d="M0 51.5V66c0 3.315 2.685 6 6 6h14.5l3-10.96-3-9.54-9.95-3z" />
      <path fill="#e94235" d="M20.5 0L0 20.5l10.55 3 9.95-3 2.95-9.41z" />
      <path fill="#2684fc" d="M20.5 20.5H0v31h20.5z" />
      <path
        fill="#00ac47"
        d="M82.6 8.68L69.5 19.42v33.66l13.16 10.79c1.97 1.54 4.85.135 4.85-2.37V11c0-2.535-2.945-3.925-4.91-2.32zM49.5 36v15.5h-29V72h43c3.315 0 6-2.685 6-6V53.08z"
      />
      <path fill="#ffba00" d="M63.5 0h-43v20.5h29V36l20-16.57V6c0-3.315-2.685-6-6-6z" />
    </svg>
  );
}

/* ---------- Filled concern icons ---------- */

/** Crossed-out eye – can't see the quality underneath */
export function EyeOffIcon({ className }: IconProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 4.5c5.6 0 9.3 4.6 10.4 6.7.27.5.27 1.1 0 1.6-1.1 2.1-4.8 6.7-10.4 6.7S2.7 14.9 1.6 12.8a1.7 1.7 0 0 1 0-1.6C2.7 9.1 6.4 4.5 12 4.5Zm0 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
      />
      <path d="m3.5 3.5 17 17" stroke="var(--concern-bg, #fff)" strokeWidth="4.4" strokeLinecap="round" />
      <path d="m3.5 3.5 17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Wireframe window – a stripped-down prototype */
export function WireframeIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 6v10h14V9H5Zm2 2.2h6v2H7v-2Zm0 3.6h4v2H7v-2Z"
    />
  );
}

/** Warning triangle – agency let-downs */
export function AlertIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M10.27 3.8a2 2 0 0 1 3.46 0l8.12 14a2 2 0 0 1-1.73 3H3.88a2 2 0 0 1-1.73-3l8.12-14ZM11 9v5h2V9h-2Zm0 6.6v2.1h2v-2.1h-2Z"
    />
  );
}

/** Flame – runway burning */
export function FlameIcon({ className }: IconProps) {
  return (
    <FilledIcon
      className={className}
      d="M12 22c-4.2 0-7-2.9-7-6.7 0-3.2 2.1-5.5 3.6-7.4.3-.4.9-.2 1 .3.3 1.2.9 2 1.7 2.5.2-2.9 1.9-5.8 4.1-7.6.4-.3.9-.1 1 .4.3 2.8 1.3 4.3 2.4 5.8 1 1.5 1.7 2.9 1.7 5 0 4.6-3.3 7.7-8.5 7.7Zm0-1.8c1.7 0 3-1.5 3-3.5 0-1.1-.5-1.8-.9-2.9-.8.6-1.4 1.5-1.6 2.6-.6-.1-1.1-.5-1.4-1.3-.7.9-1.6 1.8-1.6 3 0 1.2 1.1 2.1 2.5 2.1Z"
    />
  );
}
