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
      { label: "in", href: "https://linkedin.com" },
      { label: "x", href: "https://x.com" },
      { label: "Be", href: "https://behance.net" },
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
  clickScroll: {
    line1: "We ship",
    line2: "products people",
    click: "click",
    mid: "and",
    scroll: "scroll",
    line4: "every day",
  },
  services: {
    label: "What we do",
    headlinePlain: "We design and build",
    headlineAccent: "the thing you actually ship:",
    items: [
      {
        // each line is a list of segments; accented segments render peach
        lines: [
          [{ text: "Websites &" }],
          [{ text: "Landing pages", accent: true }],
        ],
        description:
          "Marketing sites and landing pages that load fast, read clearly, and turn visitors into signups.",
        images: [
          "/images/work/hithx/hero.jpg",
          "/images/work/tailsgate/hero.jpg",
          "/images/work/whop/hero.jpg",
          "/images/work/markee/hero.jpg",
          "/images/work/hithx/sec-2.jpg",
        ],
      },
      {
        lines: [[{ text: "Web apps &" }], [{ text: "Extensions", accent: true }]],
        description:
          "Full products — accounts, billing, dashboards, browser extensions — built end to end and shipped live.",
        images: [
          "/images/work/markee/sec-1.jpg",
          "/images/work/markee/sec-2.jpg",
          "/images/work/whop/sec-1.jpg",
          "/images/work/hithx/sec-1.jpg",
          "/images/work/tailsgate/sec-1.jpg",
        ],
      },
      {
        lines: [[{ text: "SEO &" }], [{ text: "Growth setup", accent: true }]],
        description:
          "Technical SEO, schema, sitemaps and page copy written around what your buyers actually search for.",
        images: [
          "/images/work/whop/sec-2.jpg",
          "/images/work/markee/mid.jpg",
          "/images/work/hithx/mid.jpg",
          "/images/work/tailsgate/sec-2.jpg",
          "/images/work/whop/mid.jpg",
        ],
      },
      {
        selection: { plain: "Next.js", amp: "&", accent: "TypeScript" },
        lines: [],
        description:
          "One stack, used properly. Static where it can be, dynamic where it has to be, deployed on Vercel with a clean hand-off.",
        images: [],
      },
    ],
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
      "We're a small studio in Kathmandu — senior hands on your project, at rates that don't assume a Series A.",
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
