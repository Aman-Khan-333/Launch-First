import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Launch First",
  description: "How Launch First collects, uses and protects your personal information.",
};

const EMAIL = "info@launchfirst.com";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We only collect what we need to answer you and run this website.</p>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Pricing request form:</strong> your full name, email address, which option best describes you (for
            example, funded startup or pre-seed founder) and what you want to build.
          </li>
          <li>
            <strong>Booking a scope call:</strong> the details you enter in our calendar, such as your name, email
            address and any notes you add, plus the time you choose.
          </li>
          <li>
            <strong>Emails and calls:</strong> anything you choose to share when you contact us, including project
            details and documents.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Usage and device data:</strong> pages you visit, buttons you click, the page you came from, and your
            browser, device type, IP address and approximate location.
          </li>
          <li>
            <strong>Cookies and similar technologies:</strong> see <a href="#cookies">Cookies and tracking</a> below.
          </li>
        </ul>
        <p>
          We do not ask for, and ask you not to send us, sensitive personal information such as health, financial
          account or government ID details through this website.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <ul>
        <li>To reply to your pricing request and send you pricing, our process and a fixed-price proposal.</li>
        <li>To schedule and hold scope calls, and to follow up afterwards.</li>
        <li>To scope, quote for and deliver projects you engage us for.</li>
        <li>To understand how the website is used and improve it.</li>
        <li>To measure our advertising and show our ads to people likely to be interested.</li>
        <li>To keep the website secure, prevent spam and abuse, and meet our legal obligations.</li>
      </ul>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing",
    body: (
      <>
        <p>Where data protection laws such as the GDPR or UK GDPR apply, we rely on:</p>
        <ul>
          <li>
            <strong>Steps before a contract</strong> when you ask for pricing or book a call, and{" "}
            <strong>performance of a contract</strong> once you engage us.
          </li>
          <li>
            <strong>Legitimate interests</strong> in running, securing and improving our website and business, and in
            following up on enquiries you start.
          </li>
          <li>
            <strong>Consent</strong> for non-essential cookies and advertising tracking where the law requires it. You
            can withdraw consent at any time.
          </li>
          <li>
            <strong>Legal obligation</strong> where we must keep or share information by law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    body: (
      <>
        <p>
          We do not sell your personal information, and we do not share it for cross-context behavioural advertising
          except through the Meta Pixel described below. We share information only with service providers who help us
          run our business, under terms that limit how they can use it:
        </p>
        <ul>
          <li>
            <strong>FormSubmit</strong>, which delivers pricing form submissions to our inbox.
          </li>
          <li>
            <strong>Our project studio</strong> (app.launchfirst.com), where pricing requests are recorded as leads so we
            can prepare your estimate.
          </li>
          <li>
            <strong>LeadConnector</strong>, which powers our booking calendar.
          </li>
          <li>
            <strong>Meta Platforms</strong>, through the Meta Pixel, for ad measurement and targeting.
          </li>
          <li>
            <strong>Vercel</strong>, which hosts this website and processes basic request logs.
          </li>
          <li>Email, video calling and productivity tools we use to communicate with you and deliver projects.</li>
        </ul>
        <p>
          We may also disclose information if required by law, to protect our rights or the safety of others, or as
          part of a merger, acquisition or sale of our business, in which case this policy will continue to apply.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    body: (
      <>
        <p>
          This website uses the <strong>Meta Pixel</strong>, which sets cookies and records events such as page views,
          button and link clicks, pricing form submissions (without the content you type) and booked calls. Meta may
          combine this with information it holds about you under its own privacy policy. Our booking calendar and
          hosting provider may also set cookies needed for them to work.
        </p>
        <p>You can control cookies by:</p>
        <ul>
          <li>Blocking or deleting cookies in your browser settings.</li>
          <li>
            Adjusting your ad preferences in your Meta account, or using an industry opt-out such as{" "}
            <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">
              optout.aboutads.info
            </a>
            .
          </li>
          <li>Using a browser or extension that blocks trackers.</li>
        </ul>
        <p>
          Blocking cookies will not stop the website from working, though the booking calendar may need its own cookies
          to load.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: (
      <p>
        We keep enquiry and booking details for as long as needed to respond and follow up, and generally no longer than
        24 months after our last contact unless you become a client. Client information is kept for the life of our
        engagement and afterwards as long as needed for legal, tax and accounting purposes. Analytics data is kept
        according to Meta&apos;s and our providers&apos; retention settings.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use reputable providers, encrypted connections (HTTPS) and access controls to protect your information. No
        method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we work to
        protect your data and will act promptly on any incident.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you and get a copy.</li>
          <li>Correct inaccurate information, or ask us to delete it.</li>
          <li>Object to or restrict certain processing, including direct marketing.</li>
          <li>Withdraw consent you have given, without affecting earlier processing.</li>
          <li>Receive your information in a portable format.</li>
          <li>
            Opt out of the &quot;sale&quot; or &quot;sharing&quot; of personal information, or targeted advertising,
            under US state privacy laws such as California&apos;s CCPA/CPRA.
          </li>
          <li>Complain to your local data protection authority.</li>
        </ul>
        <p>
          To use any of these rights, email {mail}. We will respond within the time the law requires (usually 30 to 45
          days) and will not treat you differently for exercising them. We may need to confirm your identity first.
        </p>
      </>
    ),
  },
  {
    id: "international",
    title: "International transfers",
    body: (
      <p>
        We and our providers may process information in the United States and other countries whose data protection
        laws may differ from yours. Where required, we rely on appropriate safeguards such as the European
        Commission&apos;s Standard Contractual Clauses.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        This website and our services are for businesses and adults. We do not knowingly collect information from
        anyone under 16. If you believe a child has sent us personal information, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date at the top shows when it last
        changed, and significant changes will be highlighted on this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about this policy or your information? Email {mail}. See also our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      updated="November 25, 2026"
      intro={
        <p>
          This Privacy Policy explains how LaunchFirst (&quot;LaunchFirst&quot;, &quot;we&quot;, &quot;us&quot;)
          collects, uses and shares information when you visit launchfirst.com, request pricing, book a call or
          otherwise contact us. By using the website, you agree to the practices described here.
        </p>
      }
      sections={sections}
    />
  );
}
