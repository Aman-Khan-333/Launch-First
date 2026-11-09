// Shipped products shown on the home page, /case-studies and /case-studies/[slug].
// TODO: the summary / challenge / built / outcome copy is placeholder written from each product's category;
// replace it with the real project details (and add real results once the client approves them).

export type CaseStudy = {
  slug: string;
  name: string;
  tag: string;
  /** File name in public/images/hero (850×844 product screenshot) */
  image: string;
  summary: string;
  challenge: string;
  built: string[];
  outcome: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "invenci",
    name: "Invenci",
    tag: "AI infrastructure",
    image: "invenci",
    summary: "An AI infrastructure platform taken from a funded idea to a working product its first customers could log into.",
    challenge:
      "The founders had raised to build an AI infrastructure product, but every agency quote ran for months before anyone could use it. They needed something real in customers' hands while the round was still fresh.",
    built: [
      "Customer-facing web app with secure sign-up and team accounts",
      "Dashboard for managing workloads and usage",
      "Admin tools for the founding team",
      "Production hosting, monitoring and handover docs",
    ],
    outcome:
      "A live product shipped inside the 14-day window at the agreed fixed price, with the full codebase and IP handed over to the founders.",
  },
  {
    slug: "visuali",
    name: "Visuali",
    tag: "Retail · AI",
    image: "visuali",
    summary: "An AI-powered retail product built to put visual tools in front of shoppers and store teams fast.",
    challenge:
      "Visuali needed to prove its AI retail idea with real users, not a click-through prototype, before committing to a long build.",
    built: [
      "Responsive web app for shoppers and store teams",
      "AI-driven visual features wired into the core flow",
      "Product catalogue and account management",
      "Analytics to track how users engage from day one",
    ],
    outcome:
      "A working product live in 14 days, ready to demo to retailers and investors, owned 100% by the founders.",
  },
  {
    slug: "beneficiary-platform",
    name: "Beneficiary Platform",
    tag: "Insurance",
    image: "beneficiary",
    summary: "A platform for managing insurance beneficiaries, built to be clear, secure and easy to use.",
    challenge:
      "Insurance products live or die on trust. The team needed a product that felt solid from the first screen, with data handled properly underneath.",
    built: [
      "Secure accounts and role-based access",
      "Beneficiary records with guided forms",
      "Document upload and status tracking",
      "Admin views for the operations team",
    ],
    outcome:
      "A production-ready platform delivered at a fixed price and on the agreed date, ready to put in front of real policyholders.",
  },
  {
    slug: "flightpath",
    name: "Flightpath",
    tag: "Cybersecurity",
    image: "flightpath",
    summary: "A cybersecurity product that turns complex security data into something teams can act on.",
    challenge:
      "Flightpath's founders knew their market but needed a working product to win early customers, without months of spend before the first demo.",
    built: [
      "Web app with secure authentication",
      "Dashboards that surface the issues that matter",
      "Reporting views teams can share",
      "Hardened hosting and deployment setup",
    ],
    outcome:
      "A live product shipped in two weeks, with the founders owning every line of code and free to keep building on it.",
  },
  {
    slug: "safetynexus",
    name: "SafetyNexus",
    tag: "Social care",
    image: "safetynexus",
    summary: "A safety and compliance product for social care teams, designed around how carers actually work.",
    challenge:
      "Social care teams have little time for clunky software. SafetyNexus needed a product simple enough to adopt straight away, and reliable enough to trust with care records.",
    built: [
      "Mobile-friendly web app for care staff",
      "Incident and safety reporting flows",
      "Manager overview and team management",
      "Secure data handling and access controls",
    ],
    outcome:
      "A working product in front of care teams within the 14-day build, at the price agreed before any code was written.",
  },
  {
    slug: "terraive",
    name: "Terraive",
    tag: "Land & planning",
    image: "terraive",
    summary: "A land and planning product that brings site information into one clear place.",
    challenge:
      "Land and planning work is spread across documents, maps and emails. Terraive needed a product that pulled it together and was ready for real projects, fast.",
    built: [
      "Web app for managing sites and projects",
      "Map-based views of land and planning data",
      "Document storage tied to each site",
      "Team accounts and sharing",
    ],
    outcome:
      "A live product launched in 14 days at a fixed price, fully owned by the founders and ready for their first customers.",
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
