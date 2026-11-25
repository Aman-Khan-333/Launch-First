import { Footer } from "./Footer";
import { LegalToc } from "./LegalToc";
import { Nav } from "./Nav";
import { Pill } from "./ui";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

/** Shared layout for the Privacy Policy and Terms of Service: header, a contents list, then the sections. */
export function LegalPage({
  label,
  title,
  updated,
  intro,
  sections,
}: {
  label: string;
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />
      <main className="legal">
        <header className="legal__head container">
          <Pill>{label}</Pill>
          <h1 className="h2 legal__title">{title}</h1>
          <p className="legal__updated">Last updated: {updated}</p>
        </header>
        <div className="legal__body container">
          <LegalToc sections={sections.map(({ id, title }) => ({ id, title }))} />
          <article className="legal__content">
            <div className="legal__intro">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="legal__section">
                <h2>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer base="/" />
    </>
  );
}
