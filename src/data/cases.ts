// Shipped products shown on the home page, /case-studies and /case-studies/[slug].
// Herd, My Focus 5 and the Food Prediction App come from the studio's portfolio write-ups.
// Terravive's copy comes from the founder's interview. TODO: the other entries are placeholder written from each
// product's screenshots; replace them with the real project details (and real results once the client approves).

export type CaseStudy = {
  slug: string;
  name: string;
  tag: string;
  /** File name in public/images/hero (850×844 product card; web screenshot for web + mobile products) */
  image?: string;
  /** Designed app screens in public/images/case-studies/screens (780×1688 .webp), shown in device frames */
  screens?: string[];
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

  /** What kind of product it is, for the filters on /case-studies */
  kind: Kind[];
  /** Backdrop of the project's presentation scene: two colours for a soft diagonal gradient */
  tint: [string, string];
  /** Shown in the details on the case study page; defaults to the platforms its kind implies */
  platforms?: string;
  stack?: string[];
  /** Left out (null) for projects whose build time we don't quote; defaults to 14 days */
  timeline?: string | null;
  /** Where the founder was coming from, under the introduction */
  background?: string;
  howItWorks?: string;
  /** Measured in the codebase: a figure, what it counts, and an optional before -> after */
  results?: { value: string; label: string; detail?: string }[];
  /** Finished mockup scene in public/images/case-studies (about 1490x730): used instead of the screenshot */
  mockup?: string;
  /** Close-ups of the interface in public/images/case-studies (.webp), for the scrolling strip */
  details?: { src: string; alt: string; width: number; height: number }[];
};

export type Kind = "mobile" | "web" | "ai";

export const KINDS: { value: Kind; label: string }[] = [
  { value: "mobile", label: "Mobile apps" },
  { value: "web", label: "Web platforms" },
  { value: "ai", label: "AI products" },
];

export const cases: CaseStudy[] = [
  {
    slug: "fade",
    screens: ["fade-1", "fade-2", "fade-3"],
    name: "Fade",
    tag: "Barber & salon booking",
    kind: ["mobile", "web"],
    tint: ["#efe7ff", "#d9ccff"],
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
    slug: "herd",
    name: "Herd",
    tag: "Group travel",
    kind: ["mobile"],
    tint: ["#fde9d9", "#fbf3c4"],
    screens: ["herd-1", "herd-2", "herd-3", "herd-4"],
    platforms: "iOS, Android and web",
    stack: ["React Native", "React", "Laravel", "MySQL", "Stripe"],
    timeline: null,
    summary:
      "A group-trip planner where the plan and the money live in the same place, so neither is settled in a group chat.",
    background:
      "Organising a trip for eight people fails in two places at once: nobody is certain what is booked, and nobody is certain who has paid. Both end up in a chat thread that has to be scrolled backwards to answer either question.",
    challenge:
      "The two halves are usually built as separate products, an itinerary app and a bill-splitter, which means entering every cost twice. Keeping them together means every event carries its own price and attendee list, and an unanswered invite has to be visible without turning the group into a scoreboard.",
    howItWorks:
      "The trip is a rail of days rather than a dashboard, because a trip is read in the order it happens. Costs attach to the thing they pay for, so the split is a consequence of the plan. Balances are settled by matching the largest debt to the largest credit, which clears a whole trip in a handful of transfers rather than one between every pair of people.",
    built: [
      "iOS and Android apps from one React Native codebase, plus a web planner",
      "A day-by-day trip plan where every event carries its price and who's going",
      "A shared Stripe wallet that splits each cost between the people going",
      "Settle-up that clears a whole trip in a handful of transfers",
      "Invites, RSVPs and nudges for the organiser",
    ],
    results: [
      { value: "17×", label: "fewer database queries to load every group's payments", detail: "250 → 15" },
      { value: "50×", label: "fewer queries for the home ledger of someone in many groups", detail: "200 → 4, estimated" },
      { value: "182", label: "API endpoints behind the apps" },
    ],
    outcome:
      "Live on the App Store, with the plan and the money for every trip in one place and a whole group settled in a few transfers.",
  },
  {
    slug: "my-focus-5",
    name: "My Focus 5",
    tag: "Productivity",
    kind: ["mobile"],
    tint: ["#dff7ee", "#d6f1fb"],
    screens: ["focus5-1", "focus5-2", "focus5-3", "focus5-4"],
    platforms: "iOS, Android and web",
    stack: ["React Native", "React", "TypeScript", "Laravel", "MySQL", "Node.js"],
    timeline: null,
    summary: "A cross-platform task app built around one constraint: five things, today, and nothing else.",
    background:
      "Productivity tools fail by accumulating. A list long enough to hold everything is a list nobody reads, and the user ends up maintaining the system instead of doing the work. The product's whole proposition is the number in its name.",
    challenge:
      "Holding a constraint is harder than adding features, especially with an assistant in the loop: an AI that can add tasks all day fills the five on the user's behalf and the number stops meaning anything. Syncing across iOS, Android and web usually argues for a flexible list, which is exactly what must not exist here.",
    howItWorks:
      "Five slots are the interface, at a size nothing else competes with. Suggestions arrive once in the morning and expire at noon, so the constraint stays the user's. The same constraint makes sync cheap: a conflict is always the small question of which task sits in slot three, resolved per slot without asking anyone.",
    built: [
      "iOS and Android apps from one React Native codebase, plus a web planner",
      "Five daily slots, carry-over and a weekly review",
      "AI suggestions that arrive in the morning and expire at noon",
      "Offline-first sync, resolved one slot at a time",
      "Subscriptions through App Store and Google Play billing",
    ],
    results: [
      { value: "5", label: "tasks a day, the same on phone, widget and web" },
      { value: "3", label: "platforms kept in sync: iOS, Android and web" },
      { value: "56", label: "API endpoints behind the apps" },
    ],
    outcome:
      "One plan that holds the same five things on phone, widget and web, and stays simple enough to open every morning.",
  },
  {
    slug: "food-prediction-app",
    name: "Food Prediction App",
    tag: "Health & nutrition",
    kind: ["mobile", "ai"],
    tint: ["#e2e8fb", "#e3dcfb"],
    screens: ["food-1", "food-2", "food-3", "food-4"],
    platforms: "iOS and Android",
    stack: ["React Native", "TensorFlow", "Keras", "Python"],
    timeline: null,
    summary:
      "Photograph a plate and get its glycaemic load: built for a diabetic deciding what to do at the table, not for cataloguing food.",
    background:
      "Estimating the glycaemic impact of a meal by eye is the part people get wrong, and the part a classifier is genuinely good at. The gap was never identifying the food. It was turning that into one decision small enough to make while the food is still in front of you.",
    challenge:
      "The hard cases are the pairs that look identical. White and brown rice are indistinguishable cooked and 23 GI points apart. Asking about every ambiguity kills the logging habit; asking about none gives confident, wrong advice to someone managing a real condition.",
    howItWorks:
      "The model asks only when a difference it cannot see would change the answer, and defaults to the higher GI when the user is unsure: guessing low and being wrong sends someone into a spike, while guessing high only over-cautions. Inference runs on the phone, so it works in the restaurants people actually eat in.",
    built: [
      "A snap-a-meal camera flow that finds every item on the plate",
      "A CNN food classifier trained with TensorFlow and Keras",
      "Glycaemic index lookup that adds the plate up to one load",
      "One quick question, only when a look-alike would change the advice",
      "On-device inference, so it works offline at the table",
    ],
    results: [
      { value: "4s", label: "from a photograph to a number you can act on" },
      { value: "87%", label: "top-1 accuracy, with a question when a look-alike matters" },
      { value: "612", label: "dishes recognised, 94 of them South Asian" },
    ],
    outcome:
      "A phone app that turns a photo of a meal into one clear decision at the table: eat it, halve it, or swap it.",
  },
  {
    slug: "eye-detect",
    name: "Eye-Detect",
    tag: "Health screening",
    kind: ["mobile", "ai"],
    tint: ["#dcf2f1", "#d6e5f4"],
    screens: ["eye-1", "eye-2", "eye-3", "eye-4"],
    platforms: "iOS and Android",
    stack: ["Vue", "Laravel", "Mobile WebView"],
    timeline: null,
    summary:
      "A screening aid that reads one photograph of an eye and says whether this person is worth testing, with the evidence for that answer attached.",
    background:
      "Screening queues need a cheap first filter. A photograph costs nothing and takes seconds, and the vessel pattern in the white of the eye carries signal a phone camera can resolve. The question was never whether a model could find a pattern; it was whether the answer could be shown without overstating itself.",
    challenge:
      "A tool like this fails in two directions, and only one of them is visible. A false positive costs one PCR test. A false negative costs the entire reason the tool exists, and arrives as a person who was told they were fine. The app also has to survive people reading a screening result as a diagnosis.",
    howItWorks:
      "The threshold is tuned for sensitivity over specificity, because those errors are not symmetric. Every result says what it does not mean, and no screen in the app ever says \"negative\". Matching runs on the phone against reference scans that each have a PCR result recorded within 48 hours; scans without one were left out rather than guessed.",
    built: [
      "Guided eye capture with live checks for light, distance and focus",
      "On-device matching against PCR-confirmed reference scans",
      "Results that show their evidence and never read as a negative",
      "Scan history, a test-centre finder and sharing with a doctor",
      "A Laravel API and Vue admin for the reference data and reporting",
    ],
    results: [
      { value: "1", label: "photograph of the eye is all a screening takes" },
      { value: "48h", label: "between every reference scan and its PCR result" },
      { value: "0", label: "screens that say \"negative\", by design" },
    ],
    outcome: "A screening aid that sends the right people for a test, and never tells anyone they're fine.",
  },
  {
    slug: "kynos",
    name: "Kynos",
    tag: "Mental wellness",
    kind: ["web"],
    tint: ["#e4f1ff", "#c9e2fb"],
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
    kind: ["web"],
    tint: ["#e3efe9", "#c4dccf"],
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
    screens: ["freshpass-1", "freshpass-2", "freshpass-3"],
    name: "Fresh Pass",
    tag: "Beauty & grooming",
    kind: ["mobile", "web"],
    tint: ["#f6f1df", "#e3dcbd"],
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
    kind: ["web"],
    tint: ["#fbf3e2", "#efdcb4"],
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
    kind: ["web"],
    tint: ["#fbe9e7", "#f0cbc5"],
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
    kind: ["web", "ai"],
    tint: ["#e2e9f3", "#c3d0e3"],
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
    kind: ["web"],
    tint: ["#e6f3ff", "#c4def6"],
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
    kind: ["web"],
    tint: ["#ecf5e3", "#cfe5bb"],
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
    kind: ["web"],
    tint: ["#ece4da", "#cdbba6"],
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
    screens: ["oyf-1", "oyf-2", "oyf-3"],
    name: "OYF",
    tag: "Personal finance",
    kind: ["mobile"],
    tint: ["#ece6ff", "#cdbff5"],
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
    kind: ["ai", "web"],
    tint: ["#f1e9ff", "#dccaf7"],
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
    kind: ["ai", "web"],
    tint: ["#f6e8f6", "#e4c7ea"],
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
    kind: ["ai", "web"],
    tint: ["#fff1e0", "#f7d9b0"],
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

/** The picture for a project's card and scene: the mockup when there is one, else the product screenshot. */
export function cardImage(c: CaseStudy) {
  return c.mockup
    ? { src: `/images/case-studies/${c.mockup}.webp`, width: 1490, height: 730 }
    : { src: `/images/hero/${c.image}.png`, width: 850, height: 844 };
}

/** Phone screens to put in device frames: the designed screens, a gallery of phone screens, or the app's screen. */
export function phoneScreens(c: CaseStudy) {
  if (c.screens)
    return c.screens.map((src, i) => ({
      src: `/images/case-studies/screens/${src}.webp`,
      alt: `${c.name} app screen ${i + 1}`,
      width: 780,
      height: 1688,
    }));
  if (c.galleryStyle === "phones" && c.gallery)
    return c.gallery.map((g) => ({ src: `/images/case-studies/${g.src}.jpg`, alt: g.alt, width: 780, height: 1690 }));
  if (c.mobile)
    return [{ src: `/images/hero/${c.mobile.image}.png`, alt: `${c.name} mobile app`, width: 390, height: 847 }];
  return [];
}

export function platformsOf(c: CaseStudy) {
  if (c.platforms) return c.platforms;
  const mobile = c.kind.includes("mobile");
  const web = c.kind.includes("web") || c.kind.includes("ai");
  return mobile && web ? "iOS, Android and web" : mobile ? "iOS and Android" : "Web";
}

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
