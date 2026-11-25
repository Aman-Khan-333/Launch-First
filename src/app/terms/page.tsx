import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Launch First",
  description: "The terms that apply when you use the Launch First website and request our services.",
};

const EMAIL = "info@launchfirst.com";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <>
        <p>
          These Terms of Service govern your use of launchfirst.com (the &quot;website&quot;) and any pricing request,
          scope call or other contact you make through it. By using the website, you agree to these terms. If you use it
          on behalf of a company, you confirm you have authority to accept these terms for that company.
        </p>
        <p>
          If you do not agree, please do not use the website. You must be at least 18 years old to request our
          services.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Our services and project agreements",
    body: (
      <>
        <p>
          LaunchFirst designs and builds software products, typically minimum viable products (MVPs), for founders and
          businesses. The website describes our standard offer for information only.
        </p>
        <p>
          A project starts only when we both sign a written proposal or agreement (the &quot;Project
          Agreement&quot;) setting out the agreed scope, deliverables, price, timeline and payment terms. If anything in
          the Project Agreement conflicts with these terms or the website, the Project Agreement takes priority.
        </p>
      </>
    ),
  },
  {
    id: "pricing",
    title: "Pricing, scope and delivery",
    body: (
      <ul>
        <li>
          <strong>Fixed price.</strong> Our standard 14-day build is priced between $4,000 and $9,999. Your exact price
          is fixed against the scope we agree in your requirements session, before any code is written, and is stated in
          your Project Agreement.
        </li>
        <li>
          <strong>Scope changes.</strong> Work outside the agreed scope is quoted separately and only goes ahead with
          your written approval. Added features change the price, not the agreed delivery date.
        </li>
        <li>
          <strong>14-day delivery.</strong> Delivery is counted from the start date in your Project Agreement and
          depends on you providing timely feedback, approvals, content and access. If we miss the agreed date for
          reasons within our control, we keep building at no extra cost until the agreed scope is delivered.
        </li>
        <li>
          <strong>Quotes and estimates.</strong> Pricing shown on the website or sent before a Project Agreement is an
          estimate, not a binding offer.
        </li>
      </ul>
    ),
  },
  {
    id: "calls",
    title: "Scope calls and pricing requests",
    body: (
      <p>
        Scope calls and pricing requests are free and carry no obligation on either side. We may decline any request.
        We are happy to sign a mutual NDA before discussing your idea in detail; until one is signed, please share only
        what you are comfortable sharing.
      </p>
    ),
  },
  {
    id: "ownership",
    title: "Ownership of what we build",
    body: (
      <>
        <p>
          Under our standard Project Agreement, you own 100% of the code, designs and other deliverables created
          specifically for your project, delivered in repositories you control. Your own materials, ideas and data
          remain yours at all times.
        </p>
        <p>
          We keep ownership of our pre-existing tools, libraries, know-how and general techniques, and grant you a
          licence to any that are built into your deliverables so you can use them freely. Third-party and open-source
          components remain subject to their own licences. Unless you tell us otherwise, we may name you as a client and
          show non-confidential examples of the work in our portfolio.
        </p>
      </>
    ),
  },
  {
    id: "website-use",
    title: "Using the website",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for anything unlawful, misleading or harmful.</li>
          <li>Submit false information or impersonate anyone.</li>
          <li>Send spam, malware or automated submissions through our forms.</li>
          <li>Try to break, overload, scrape or gain unauthorised access to the website or its systems.</li>
          <li>Copy or reuse our content in ways not allowed by these terms.</li>
        </ul>
      </>
    ),
  },
  {
    id: "our-content",
    title: "Our content",
    body: (
      <p>
        The website, including its text, design, graphics, logos, case studies and videos, belongs to LaunchFirst or is
        used with permission from its owners, such as clients who appear in our testimonials. You may view and share
        links to it for personal or internal business purposes, but you may not copy, modify or republish it without
        our written permission. &quot;LaunchFirst&quot; and our logo are our trademarks.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    body: (
      <p>
        The website uses third-party services, such as our booking calendar, form delivery and analytics, and may link
        to other websites. Those services are governed by their own terms and privacy policies, and we are not
        responsible for their content or practices.
      </p>
    ),
  },
  {
    id: "results",
    title: "Results and testimonials",
    body: (
      <p>
        Case studies and testimonials describe real client experiences, but every project is different. We do not
        guarantee any particular business outcome, such as revenue, users, fundraising or investment, from using our
        services.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: (
      <p>
        The website and its content are provided &quot;as is&quot; and &quot;as available&quot;, without warranties of
        any kind, whether express or implied, including fitness for a particular purpose and non-infringement. We work
        to keep the website accurate and available, but we do not guarantee it will be error-free or uninterrupted.
        Warranties for project work, if any, are set out only in your Project Agreement.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, LaunchFirst is not liable for any indirect, incidental, special,
          consequential or punitive damages, or for lost profits, revenue, data or business opportunities, arising from
          your use of the website.
        </p>
        <p>
          Our total liability for any claim relating to the website is limited to US $100. Our liability for project
          work is set out in your Project Agreement and, unless it says otherwise, is limited to the fees you paid for
          that project. Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to indemnify LaunchFirst against claims, losses and costs arising from your misuse of the website,
        your breach of these terms, or materials you provide to us that infringe someone else&apos;s rights.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. The &quot;Last updated&quot; date at the top shows when they last
        changed. Continuing to use the website after a change means you accept the updated terms. Changes do not affect
        a Project Agreement already signed.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <p>
        These terms are governed by the laws of the United States and the state in which LaunchFirst is registered,
        without regard to conflict-of-law rules. Before starting any formal proceedings, we both agree to try to resolve
        a dispute informally by contacting each other in writing. If any part of these terms is found unenforceable,
        the rest remains in effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these terms? Email {mail}. To learn how we handle your information, read our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      updated="November 25, 2026"
      intro={
        <p>
          Welcome to LaunchFirst. These terms are written to be clear and fair. Please read them before using the
          website or requesting our services.
        </p>
      }
      sections={sections}
    />
  );
}
