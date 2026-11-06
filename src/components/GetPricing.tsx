"use client";

import { Check, Mail } from "./icons";
import { Select } from "./Select";
import { Pill, PrimaryButton } from "./ui";

const points = [
  "Fixed scope & price, locked before any code",
  "100% code & IP ownership senior-engineer reviewed",
  "Delivered in 14 days or we keep building, free",
];

export function GetPricing() {
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
          <a className="mail-link" href="mailto:info@launchfirst.studio">
            <span className="mail-link__icon">
              <Mail />
            </span>
            info@launchfirst.studio
          </a>
        </div>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__row">
            <label className="field">
              <span className="field__label">Full name</span>
              <input className="field__control" name="name" placeholder="Jane Smith" autoComplete="name" />
            </label>
            <label className="field">
              <span className="field__label">Work email</span>
              <input
                className="field__control"
                name="email"
                type="email"
                placeholder="jane@gmail.com"
                autoComplete="email"
              />
            </label>
          </div>
          <Select
            name="stage"
            label="Which best describe you?"
            defaultValue="business"
            options={[
              { value: "business", label: "Business doing $500k+ revenue" },
              { value: "funded", label: "Funded startup" },
              { value: "pre-seed", label: "Pre-seed founder" },
              { value: "other", label: "Something else" },
            ]}
          />
          <label className="field">
            <span className="field__label">What do you want to build?</span>
            <textarea
              className="field__control field__control--area"
              name="idea"
              placeholder="A sentence or two about your product idea..."
            />
          </label>
          <PrimaryButton href="#" className="btn-primary--form">
            Get the pricing &amp; process
          </PrimaryButton>
        </form>
      </div>
    </section>
  );
}
