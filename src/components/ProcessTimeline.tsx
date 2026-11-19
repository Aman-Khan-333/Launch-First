"use client";

import { useEffect, useRef } from "react";

type Step = { n: string; title: string; body: string };

/** Where the timeline is "read", as a fraction of the viewport height: the green fill reaches whatever sits here. */
const READ_LINE = 0.6;

/**
 * The 14-day steps as a scroll-driven timeline: a rail runs through the numbered nodes, a green fill grows
 * down it as the page scrolls, and each step lights up once the fill reaches its node. When the fill reaches
 * the last node, a green glow rises along the bottom of the section.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>(".step"));
    const nodes = items.map((li) => li.querySelector<HTMLElement>(".step__num")!);
    const section = list.closest<HTMLElement>(".process");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = list.getBoundingClientRect();
      // Node centres, measured from the top of the list
      const centres = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return r.top + r.height / 2 - box.top;
      });
      const start = centres[0];
      const length = centres[centres.length - 1] - start;
      list.style.setProperty("--rail-top", `${start}px`);
      list.style.setProperty("--rail-len", `${length}px`);
      // How far down the rail the reading line has got
      const reached = reduced ? length : Math.min(length, Math.max(0, window.innerHeight * READ_LINE - box.top - start));
      list.style.setProperty("--fill", `${reached}px`);
      items.forEach((li, i) => li.classList.toggle("is-on", centres[i] - start <= reached + 1));
      // Line has reached the last node: its glowing tip fades and the section's bottom glow comes up
      const complete = reached >= length - 1;
      list.classList.toggle("is-complete", complete);
      section?.classList.toggle("is-launched", complete);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="process__steps">
      <span className="process__rail" aria-hidden="true">
        <span className="process__fill" />
        <span className="process__head" />
      </span>
      <ol className="process__list">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={s.n} className={last ? "step step--launch" : "step"}>
              <span className="step__num">
                {s.n.replace(".", "")}
              </span>
              <div className="step__content">
                <h3 className="step__title">
                  {s.title}
                  {last && (
                    <span className="step__live">
                      <i />
                      Live
                    </span>
                  )}
                </h3>
                <p className="step__body">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
