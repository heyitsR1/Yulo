export const siteContent = {
  email: "hello@yulostudio.com",
  location: "Kathmandu, Nepal",
  nav: {
    brand: { name: "Yulo", suffix: "Studio" },
    links: [
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
    social: [
      { label: "Email", href: "mailto:hello@yulostudio.com" },
    ],
  },
  hero: {
    topLeft: ["Web & Product", "Studio in Kathmandu"],
    bottomRight: "Design & Development Partner",
    nameLeft: "Yulo",
    nameRight: "Studio",
    photo: "/images/hero/hero-photo.jpg",
    media: ["/images/hero/media-1.jpg", "/images/hero/media-2.jpg"],
  },
  statement: {
    label: "The short version",
    /** Rendered word by word; `accent` words fill peach as the line reveals */
    words: [
      { text: "Yulo" },
      { text: "is" },
      { text: "a" },
      { text: "small" },
      { text: "studio" },
      { text: "in" },
      { text: "Kathmandu." },
      { text: "We" },
      { text: "take" },
      { text: "one" },
      { text: "idea," },
      { text: "design", accent: true },
      { text: "it,", accent: true },
      { text: "build", accent: true },
      { text: "it,", accent: true },
      { text: "and" },
      { text: "put" },
      { text: "it" },
      { text: "in" },
      { text: "front" },
      { text: "of" },
      { text: "real" },
      { text: "users" },
      { text: "—" },
      { text: "in" },
      { text: "weeks," },
      { text: "not" },
      { text: "quarters." },
    ],
    ticker: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "GSAP",
      "Stripe",
      "Chrome MV3",
      "Vercel",
      "Technical SEO",
    ],
  },
  services: {
    label: "What we do",
    headlinePlain: "Two things, and we do",
    headlineAccent: "both of them properly:",
    software: {
      eyebrow: "01 — Software",
      titlePlain: "Sites, apps and",
      titleAccent: "extensions",
      description:
        "Marketing sites, full products with accounts and billing, browser extensions — designed, built and shipped live. Every one of these is running in production right now.",
      /** slug → the cover shot and the two lines of meta shown beside it */
      items: [
        {
          slug: "markee",
          logo: "/images/logos/markee.svg",
          kind: "Web app · Billing",
          stat: "Every store asset size generated from one pasted link",
        },
        {
          slug: "whop-video-downloader",
          logo: "/images/logos/whop.png",
          kind: "Chrome extension · Landing page",
          stat: "Streams merged to MP4 on the machine, nothing hits a server",
        },
        {
          slug: "hithx",
          logo: "/images/logos/hithx.png",
          kind: "Publishing platform · Design system",
          stat: "Sub-second TTFB, light and dark themes shipped together",
        },
        {
          slug: "tailsgate",
          logo: "/images/logos/tailsgate.png",
          kind: "Brand · Marketing site",
          stat: "Process, proof and pricing visible before anyone books a call",
        },
      ],
    },
    growth: {
      eyebrow: "02 — Growth",
      titlePlain: "Get found by the people",
      titleAccent: "already searching",
      description:
        "A product nobody can find is a hobby. We write the pages around what your buyers actually type, then wire up the technical layer so search engines agree.",
      /** Mock result used in the SERP illustration */
      serp: {
        query: "download whop course videos",
        results: [
          {
            favicon: "/images/logos/whop.png",
            site: "Whop Video Downloader",
            url: "freewhopdownloader.com",
            title: "Download any Whop video — free Chrome extension",
            snippet:
              "One click, best quality, straight to MP4. 3 free downloads a week forever, no account needed, 100% local processing.",
          },
          {
            favicon: "/images/logos/markee.svg",
            site: "Markee",
            url: "markee.app › guides",
            title: "Chrome Web Store screenshot sizes (2026 guide)",
            snippet:
              "The exact dimensions the store asks for — 1280×800 screenshots, 440×280 promo tile, 1400×560 marquee — and how to make them.",
          },
        ],
      },
      checklist: [
        "Keyword and intent research before a word is written",
        "Titles, descriptions and headings that match the query",
        "Schema, sitemaps, robots and canonical tags",
        "Core Web Vitals inside Google's thresholds",
        "Guides and comparison pages that earn their own traffic",
      ],
    },
  },
  workCta: {
    pre: "Curious?... Open the",
    post: "Or keep scrolling",
    tag: "Portfolio",
    bgWord: "Work",
    href: "/work",
  },
  manifesto: {
    lineA: "Shipped beats",
    lineB: "perfect",
    lineC: "and shipped well beats both",
  },
  about: {
    intro: "Teams work with us because we",
    heading: ["build it", "and launch it"],
    points: [
      "Senior hands on your project, at rates that don't assume a Series A.",
      "Every project in our portfolio is a live product with real users, not a concept or a mockup.",
      "We handle the whole path: design, build, deploy, and the SEO groundwork that makes launch day matter.",
      "You talk directly to the people writing the code, and you get clean, documented work you can take anywhere.",
    ],
    cta: "Start a project",
    ctaHref: "/contact",
    photo: "/images/about/about-photo.jpg",
  },
  cta: {
    headline: "Let's make something worth remembering",
    sub: "from first-time founders to established teams.",
    action: "Let's talk",
  },
  footer: {
    madeUsing: ["Next.js", "TypeScript", "Tailwind", "GSAP", "Lenis Scroll"],
    left: { word: "Yulo", sub: "Web & Product Studio", year: "2026" },
    right: { word: "Studio", sub: "Kathmandu, Nepal", tag: "[Worldwide]" },
    scene: "/images/footer/footer-scene.jpg",
  },
};
