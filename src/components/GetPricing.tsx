"use client";

import { useState } from "react";
import { Check, ChevronRight, Mail } from "./icons";
import { Select } from "./Select";
import { MeetCallButton, Pill } from "./ui";

// Submissions are emailed to this inbox through FormSubmit (formsubmit.co). The very first submission makes
// FormSubmit send an activation email to this address; once that link is clicked, every request is delivered.
const INBOX = "info@launchfirst.com";
const ENDPOINT = `https://formsubmit.co/ajax/${INBOX}`;

const stages = [
  { value: "business", label: "Business doing $500k+ revenue" },
  { value: "funded", label: "Funded startup" },
  { value: "pre-seed", label: "Pre-seed founder" },
  { value: "other", label: "Something else" },
];

// "sent" shows the thank-you straight away while the email goes out in the background (FormSubmit can be slow);
// if delivery fails the form comes back, still filled in, with an error.
type Status = "idle" | "sent" | "error";
type Draft = { name: string; email: string; stage: string; idea: string };
// FormSubmit can take ~30s to answer (measured while the inbox was still unactivated), so allow plenty of time.
const TIMEOUT_MS = 60000;

const points = [
  "Fixed scope & price, locked before any code",
  "100% code & IP ownership senior-engineer reviewed",
  "Delivered in 14 days or we keep building, free",
];

export function GetPricing() {
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState<Draft>({ name: "", email: "", stage: "business", idea: "" });
  const [errorDetail, setErrorDetail] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("_honey")) return; // bot filled the hidden field
    const next: Draft = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      stage: String(data.get("stage") ?? "business"),
      idea: String(data.get("idea") ?? "").trim(),
    };
    const { name, email, idea } = next;
    const stage = stages.find((s) => s.value === next.stage)?.label ?? next.stage;

    setDraft(next);
    setStatus("sent");
    setErrorDetail("");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Full name": name,
          email, // FormSubmit sets this as the reply-to address
          "Which best describes you": stage,
          "What they want to build": idea,
          _subject: `New pricing request from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json: { success?: boolean | string; message?: string } = await res.json().catch(() => ({}));
      const ok = res.ok && json.success !== false && json.success !== "false";
      if (!ok) {
        // Until INBOX clicks FormSubmit's one-time "Activate Form" email, entries are accepted but not delivered.
        if (/activat/i.test(json.message ?? "")) {
          console.warn(`Pricing form: FormSubmit needs activating. Click the "Activate Form" email sent to ${INBOX}.`);
          return;
        }
        throw new Error(json.message || `FormSubmit returned ${res.status}`);
      }
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setErrorDetail(aborted ? "the email service took too long to respond" : err instanceof Error ? err.message : "");
      setStatus("error");
      console.error("Pricing form failed to send:", err);
    } finally {
      window.clearTimeout(timer);
    }
  };

  return (
    <section className="get-pricing" id="get-pricing">
      <div className="get-pricing__inner container">
        <div className="get-pricing__intro">
          <Pill>Get Pricing</Pill>
          <h2 className="h2 get-pricing__title">
            See exactly what it costs before
            <br /> you talk to anyone.
          </h2>
          <p className="lead get-pricing__lead">
            Answer a few quick questions and get the full pricing, process, and a fixed-price proposal.
          </p>
          <ul className="get-pricing__points">
            {points.map((p) => (
              <li key={p}>
                <Check className="get-pricing__check" />
                {p}
              </li>
            ))}
          </ul>
          <a className="mail-link" href="mailto:info@launchfirst.com">
            <span className="mail-link__icon">
              <Mail />
            </span>
            info@launchfirst.com
          </a>
        </div>

        {status === "sent" ? (
          <div className="form form--done" role="status">
            <span className="form__done-icon" aria-hidden="true">
              <Check />
            </span>
            <h3 className="form__done-title">Thanks{draft.name ? `, ${draft.name.split(" ")[0]}` : ""}. Your request is in.</h3>
            <p className="form__done-text">
              We&apos;ll send the full pricing, process and a fixed-price proposal to{" "}
              <strong>{draft.email}</strong>. Want to talk it through sooner?
            </p>
            <MeetCallButton />
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {/* Honeypot: hidden from people, filled in by spam bots */}
            <input type="text" name="_honey" className="form__honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form__row">
              <label className="field">
                <span className="field__label">Full name</span>
                <input
                  className="field__control"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  defaultValue={draft.name}
                  required
                />
              </label>
              <label className="field">
                <span className="field__label">Work email</span>
                <input
                  className="field__control"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                  defaultValue={draft.email}
                  required
                />
              </label>
            </div>
            <Select name="stage" label="Which best describe you?" defaultValue={draft.stage} options={stages} />
            <label className="field">
              <span className="field__label">What do you want to build?</span>
              <textarea
                className="field__control field__control--area"
                name="idea"
                placeholder="A sentence or two about your product idea..."
                defaultValue={draft.idea}
                required
              />
            </label>
            <button type="submit" className="btn-primary btn-primary--form">
              <span className="btn-primary__icon">
                <ChevronRight />
              </span>
              <span className="btn-primary__label">
                {status === "error" ? "Try again" : "Get the pricing & process"}
              </span>
            </button>
            {status === "error" && (
              <p className="form__error" role="alert">
                Sorry, your details didn&apos;t go through{errorDetail ? ` (${errorDetail})` : ""}. Please try again,
                or email us at <a href={`mailto:${INBOX}`}>{INBOX}</a>.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
