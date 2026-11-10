// Shipped products shown on the home page, /case-studies and /case-studies/[slug] — the same projects, in the same
// order, as the hero marquee (Hero.tsx).
// Terravive's copy comes from the founder's interview. TODO: the other entries are placeholder written from each
// product's screenshots; replace them with the real project details (and real results once the client approves).

export type CaseStudy = {
  slug: string;
  name: string;
  tag: string;
  /** File name in public/images/hero (850×844 product card; web screenshot for web + mobile products) */
  image: string;
  /** Products with a mobile app too: shown in its own section under the web screenshot on the detail page */
  mobile?: {
    /** Phone screen in public/images/hero (390×847) */
    image: string;
    summary: string;
    features: string[];
  };
  /** Extra full screenshots for the detail page gallery (public/images/case-studies, 1600px wide) */
  gallery?: { src: string; alt: string }[];
  /** "phones": the gallery is phone screens (780×1690), shown side by side in one frame */
  galleryStyle?: "phones";
  summary: string;
  challenge: string;
  built: string[];
  outcome: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "fade",
    name: "Fade",
    tag: "Barber & salon booking",
    image: "fade-web",
    mobile: {
      image: "fade-mobile",
      summary:
        "Customers find and book barbers and stylists near them from their phone, with the web dashboard keeping providers and bookings in sync.",
      features: [
        "Location-aware search for services and barbers",
        "Booking filters for sort, distance and availability",
        "Saved favourites with ratings, prices and experience",
        "\"Nearest to you\" list and one-tap booking",
      ],
    },
    summary:
      "A booking platform for barbers and stylists, with a web dashboard for providers and a mobile app for their customers.",
    challenge:
      "Fade needed both sides of the market working on day one: providers managing services and bookings, and customers finding and booking them from their phone.",
    built: [
      "Mobile app for customers to find, save and book barbers nearby",
      "Web dashboard for providers, services and categories",
      "Booking calendar and service schedules",
      "Customer and provider management for the admin team",
    ],
    outcome:
      "A working web and mobile product in front of providers and customers, owned 100% by the founders.",
  },
  {
    slug: "kynos",
    name: "Kynos",
    tag: "Mental wellness",
    image: "kynos",
    summary:
      "A mental wellness web app that guides people through daily check-ins, practices and structured frameworks.",
    challenge:
      "Kynos needed a calm, simple experience people would come back to every day, with real progress tracking behind it rather than a static content library.",
    built: [
      "Daily check-in that matches practices to how the user feels",
      "Frameworks and multi-day journeys with progress tracking",
      "Journal, saved items and a personal story view",
      "Streaks, completion stats and a Pro upgrade path",
    ],
    outcome:
      "A live product ready for its first members, with the full codebase and IP handed to the founders.",
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
    slug: "fresh-pass",
    name: "Fresh Pass",
    tag: "Beauty & grooming",
    image: "fresh-pass-web",
    mobile: {
      image: "fresh-pass-mobile",
      summary:
        "The same marketplace in customers' pockets: browse shops by service, switch between subscriptions and single services, and book in a few taps.",
      features: [
        "Service categories from hair and barber to nails and brows",
        "Subscriptions list and individual services side by side",
        "Verified providers with reviews, offers and prices",
        "Booking, notifications and chat in one app",
      ],
    },
    summary:
      "A marketplace for barbershops, salons and spas, on the web and in a mobile app, with subscriptions and individual services.",
    challenge:
      "Fresh Pass needed to bring local shops and customers together in one place, with booking and subscription options that work just as well on a phone.",
    built: [
      "Website and mobile app for finding nearby shops by service",
      "Subscription and individual service listings",
      "Provider profiles with ratings, offers and pricing",
      "Booking, notifications and account management",
    ],
    outcome:
      "A working web and mobile marketplace in front of shops and customers, owned 100% by the founders.",
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
    slug: "data-capture",
    name: "Data Capture",
    tag: "Property & HOA",
    image: "data-capture",
    summary:
      "A data capture and review platform for property studies, tracking every component across organisations and sites.",
    challenge:
      "Inspection data was scattered across spreadsheets and site visits. The team needed one place to capture, review and report on the condition of every component.",
    built: [
      "Admin dashboard across organisations and studies",
      "Component capture and review workflow",
      "Condition, remaining life and cost-by-category reporting",
      "Inspector activity tracking",
    ],
    outcome:
      "A production-ready platform the team can put in front of clients, at a fixed price agreed before any code was written.",
  },
  {
    slug: "safetynexus",
    name: "SafetyNexus",
    tag: "Social care",
    image: "safetynexus-v2",
    summary:
      "An AI practice coach for child protection and social care teams: talk through cases, rehearse difficult conversations and map family violence patterns.",
    challenge:
      "Child protection practitioners rarely get time to think a case through or practise hard conversations before they happen. Leaders also had no clear view of how their practice model was really being used across teams.",
    built: [
      "AI coach for talking through cases and practice decisions",
      "Role-play to rehearse difficult conversations",
      "Mapping of family violence patterns",
      "Leader analytics on how the practice model is used across teams, with data kept in-region",
    ],
    outcome:
      "A working practice coach in front of child protection teams, with leaders seeing practice-model use team by team, owned 100% by the founders.",
  },
  {
    slug: "prime-roster",
    name: "Prime Roster",
    tag: "Recruitment",
    image: "prime-roaster",
    summary:
      "A recruitment dashboard that keeps every candidate, pipeline and interview in one clear view.",
    challenge:
      "Recruiters were juggling candidates across tools and inboxes. Prime Roster needed pipelines that show exactly where every role and candidate stands.",
    built: [
      "Recruiter dashboard with live hiring stats",
      "Role pipelines with stage-by-stage candidate boards",
      "Interview scheduling and upcoming interviews",
      "Talent hub, messages and shortlists",
    ],
    outcome:
      "A working product live for recruiters, with the founders owning every line of code.",
  },
  {
    slug: "terravive",
    name: "Terravive",
    tag: "Landscape design",
    image: "terravive",
    summary:
      "An AI platform that helps landscape architects and land-use teams make ecologically sound design decisions.",
    challenge:
      "Todd Degner, a non-technical founder with 30 years in landscape architecture, needed a team that could understand a complex industry and turn it into tools designers find simple.",
    built: [
      "3D site analysis with terrain, slope, heat and canopy layers",
      "Imports from Civil 3D, Revit, Autodesk Forma and SketchUp",
      "Ecological and regulatory intelligence for each project",
      "Export back to the source tool, PNG, JPEG and PDF",
    ],
    outcome:
      "Ready for beta testing with design firms that have signed letters of intent, built affordably enough for the founders to keep their equity.",
  },
  {
    slug: "imacitizen-theorist",
    name: "ImaCitizen Theorist",
    tag: "Gaming",
    image: "imacitizen",
    gallery: [
      { src: "imacitizen-3", alt: "ImaCitizen Theorist game in progress on the 3D board" },
      { src: "imacitizen-1", alt: "ImaCitizen Theorist welcome screen" },
      { src: "imacitizen-2", alt: "ImaCitizen Theorist new game setup" },
    ],
    summary:
      "A 3D chess game for two players on one device, with realistic boards and pieces, chess clocks and saved games.",
    challenge:
      "The founders wanted chess that feels like sitting at a real table: a believable 3D board, smooth controls and pass-and-play that just works between two people on one screen.",
    built: [
      "Realistic 3D board with camera controls and move highlights",
      "Pass-and-play games with player names and colour swap",
      "Chess clocks from bullet to classical, plus saved games",
      "Board and piece set choices, takebacks, draws and resigning",
    ],
    outcome:
      "A polished, playable game ready for players, with the full codebase and IP owned by the founders.",
  },
  {
    slug: "oyf",
    name: "OYF",
    tag: "Personal finance",
    image: "oyf-3up",
    galleryStyle: "phones",
    gallery: [
      { src: "oyf-1", alt: "OYF home screen with balance, bills and savings" },
      { src: "oyf-2", alt: "OYF virtual saving account with round-ups and transactions" },
      { src: "oyf-3", alt: "OYF daily and weekly money challenges with XP rewards" },
    ],
    summary:
      "An all-in-one personal finance app: loans, virtual cards and scheduled bills, arranged so that paying down debt is something you can see yourself finishing.",
    challenge:
      "Most finance apps show balances, not progress. OYF needed loans, cards and bills in one place, laid out so people can actually see their debt shrinking and stay motivated to finish it.",
    built: [
      "Mobile app with balance, savings, bills, expenses and income at a glance",
      "Loan tracking that shows progress towards paying debt off",
      "Virtual saving cards with automatic round-ups",
      "Daily and weekly money challenges with XP rewards",
      "Scheduled bills, connected accounts, goals and plans",
    ],
    outcome:
      "A working personal finance app ready for its first users, with the full codebase and IP owned by the founders.",
  },
  {
    slug: "invenci-ai-gateway",
    name: "Invenci AI Gateway",
    tag: "Enterprise AI",
    image: "invenci-gateway",
    summary:
      "A secure, multi-tenant enterprise AI platform that gives organisations one place to use leading models such as GPT, Claude and Gemini.",
    challenge:
      "Teams were using AI tools one by one, with no control over cost, data or safety. Invenci needed a single, secure gateway that organisations could roll out across every team and tenant.",
    built: [
      "One workspace for GPT, Claude, Gemini and more, with automatic model routing",
      "Chat over company documents",
      "Microsoft 365 integration",
      "Content safeguards and full cost tracking across organisations",
    ],
    outcome:
      "A production-ready enterprise platform with usage, savings and violations tracked per organisation, owned 100% by the founders.",
  },
  {
    slug: "govbeacon",
    name: "GovBeacon",
    tag: "Trading",
    image: "govbeacon-v3",
    summary:
      "A professional trading platform with real-time charts, order book depth, AI trade signals and portfolio analytics for active traders.",
    challenge:
      "Active traders need speed and clarity. GovBeacon had to bring live market data, signals and execution together without the clutter of traditional trading tools.",
    built: [
      "Real-time charts and order book depth",
      "AI trade signals and portfolio analytics",
      "Market indices tracking with sector-based breakdowns",
      "Fast trade execution",
    ],
    outcome:
      "A working trading platform ready for active traders, with the founders owning every line of code.",
  },
  {
    slug: "championship-life",
    name: "Championship Life AI",
    tag: "Personal growth",
    image: "championship-life",
    summary:
      "Empowering every life to find its direction: an AI platform that helps people discover themselves and grow with purpose.",
    challenge:
      "Many people feel lost in their potential, repeating efforts without clarity or direction. Championship Life needed to turn self-discovery into something guided, measurable and motivating.",
    built: [
      "Personalised insights and guided growth paths",
      "Charlie, an AI companion that guides and supports every step",
      "XP levels, streaks, badges and course progress",
      "Live coaching sessions, a content library and a community",
    ],
    outcome:
      "A working platform that turns self-discovery into confident, purposeful action, with the full codebase and IP owned by the founders.",
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
