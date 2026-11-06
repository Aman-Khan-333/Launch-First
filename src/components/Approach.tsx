import { CalendarCheckIcon, ChatIcon, ClockIcon, RocketIcon, ShieldKeyIcon, TagIcon } from "./icons";
import { SectionHeader } from "./ui";

const features = [
  {
    Icon: RocketIcon,
    title: "A full working product",
    body: "Not a prototype or a clickable mockup you throw away production-ready software you can ship to real users on day 14.",
  },
  {
    Icon: TagIcon,
    title: "Fixed scope & fixed price",
    body: "Agreed before a single line of code, with a day-by-day feature breakdown. Extra features add to the price never to the deadline.",
  },
  {
    Icon: CalendarCheckIcon,
    title: "Delivered in 14 days",
    body: "A dedicated team builds to a locked timeline. When scope grows, we add developers to hold the date we never cut corners.",
  },
  {
    Icon: ChatIcon,
    title: "Direct developer access",
    body: "You talk to the people building your product. No account managers, no relay through non-technical middlemen.",
  },
  {
    Icon: ShieldKeyIcon,
    title: "100% code & IP ownership",
    body: "Everything we build is yours. AI-assisted tooling is used for speed; senior engineers own architecture, security and QA.",
  },
  {
    Icon: ClockIcon,
    title: "A team in your time zone",
    body: "We work US business hours, so questions get answered the same day and nothing waits overnight for a distant team.",
  },
];

export function Approach() {
  return (
    <section className="approach" id="approach">
      <SectionHeader
        pill="Our Approach"
        title={
          <>
            A real product. A fixed number. No
            <br /> moving parts.
          </>
        }
        lead={
          <>
            Everything is agreed before work starts so there is nothing left to negotiate
            <br /> once the build begins.
          </>
        }
      />
      <ul className="approach__grid">
        {features.map((f) => (
          <li key={f.title} className="feature">
            <span className="feature__icon">
              <f.Icon />
            </span>
            <h3 className="feature__title">{f.title}</h3>
            <p className="feature__body">{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
