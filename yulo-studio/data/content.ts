export const siteContent = {
  email: "hello@yulostudio.com",
  nav: {
    brand: { name: "Yulo", suffix: "Studio" },
    links: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
    ],
    social: [
      { label: "Email", href: "mailto:hello@yulostudio.com" },
      { label: "in", href: "https://linkedin.com" },
      { label: "x", href: "https://x.com" },
      { label: "Be", href: "https://behance.net" },
    ],
  },
  hero: {
    topLeft: ["Brand & Digital", "Design Studio"],
    bottomRight: "Creative Design Partner",
    nameLeft: "Yulo",
    nameRight: "Studio",
    photo: "/images/hero/hero-photo.jpg",
    media: ["/images/hero/media-1.jpg", "/images/hero/media-2.jpg"],
  },
  clickScroll: {
    line1: "8 years",
    line2: "making users",
    click: "click",
    mid: "and",
    scroll: "scroll",
    line4: "our designs",
  },
  services: {
    label: "Design Studio",
    headlinePlain: "We help companies",
    headlineAccent: "win with projects like:",
    items: [
      {
        // each line is a list of segments; accented segments render peach
        lines: [
          [{ text: "Websites &" }],
          [{ text: "Landing pages", accent: true }],
        ],
        description:
          "Crafting high-end, expressive websites engineered to perform and convert.",
        images: [
          "/images/services/web-1.jpg",
          "/images/services/web-2.jpg",
          "/images/services/web-3.jpg",
          "/images/services/web-4.jpg",
          "/images/services/web-5.jpg",
        ],
      },
      {
        lines: [[{ text: "Visual " }, { text: "Branding", accent: true }]],
        description:
          "Shaping distinctive visual languages that give brands a voice of their own.",
        images: [
          "/images/services/brand-1.jpg",
          "/images/services/brand-2.jpg",
          "/images/services/brand-3.jpg",
          "/images/services/brand-4.jpg",
          "/images/services/brand-5.jpg",
        ],
      },
      {
        lines: [
          [{ text: "Product " }, { text: "Design", accent: true }],
          [{ text: "Enhancement", accent: true }],
        ],
        description:
          "Turning complex products into intuitive experiences wrapped in an elevated visual layer.",
        images: [
          "/images/services/product-1.jpg",
          "/images/services/product-2.jpg",
          "/images/services/product-3.jpg",
          "/images/services/product-4.jpg",
          "/images/services/product-5.jpg",
        ],
      },
      {
        selection: { plain: "Next.js", amp: "&", accent: "Framer" },
        lines: [],
        description:
          "Shipping elegant, responsive builds full of creative micro-interactions and a clean hand-off.",
        images: [],
      },
    ],
  },
  workCta: {
    pre: "Curious?... Check out our",
    post: "Or keep scrolling",
    tag: "Portfolio",
    bgWord: "Work",
  },
  manifesto: {
    lineA: "Great design",
    lineB: "takes time",
    lineC: "and the right partner gives it back",
  },
  about: {
    intro: "Teams partner with us because of our",
    heading: ["clarity +", "bold instincts"],
    points: [
      "We bring a premium, distinctive visual direction that makes your brand stand out.",
      "We care about the craft, from first concept to final product.",
      "We define scalable design systems that keep your brand consistent.",
      "We align your goals with our experience to make the right design decisions.",
    ],
    cta: "Learn more about us",
    photo: "/images/about/about-photo.jpg",
  },
  cta: {
    headline: "Let's make something worth remembering",
    sub: "from early-stage startups to global brands.",
    action: "Let's talk",
  },
  footer: {
    madeUsing: ["Figma", "Next.js", "GSAP", "Tailwind", "Lenis Scroll"],
    left: { word: "Yulo", sub: "Creative Design Studio", year: "2026" },
    right: { word: "Studio", sub: "Yulo Labs", tag: "[Coming Soon]" },
    scene: "/images/footer/footer-scene.jpg",
  },
};
