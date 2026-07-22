export type Project = {
  slug: string;
  name: string;
  /** Short label used on cards and the work index */
  tagline: string;
  /** One-liner for the case-study hero */
  intro: string;
  year: string;
  role: string[];
  liveUrl: string;
  liveLabel: string;
  /** Accent lifted from the product's own brand, used for card tinting */
  accent: string;
  /** Dark products get light type over the cover shot */
  coverDark: boolean;
  images: {
    hero: string;
    mid: string;
    mobile: string;
    full: string;
    sec1: string;
    sec2: string;
  };
  stack: string[];
  /** Headline numbers — all pulled from the shipped product */
  stats: { value: string; label: string }[];
  brief: string;
  approach: { title: string; body: string }[];
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "hithx",
    name: "HithX",
    tagline: "Tech media platform for Nepal",
    intro:
      "A publishing platform for gadget reviews, launch news and buying guides — built to load fast on Nepali mobile networks and rank for local search.",
    year: "2026",
    role: ["Web development", "Design system", "SEO"],
    liveUrl: "https://hithxstudio.com/",
    liveLabel: "hithxstudio.com",
    accent: "#9ee84a",
    coverDark: true,
    images: {
      hero: "/images/work/hithx/hero.jpg",
      mid: "/images/work/hithx/mid.jpg",
      mobile: "/images/work/hithx/mobile.jpg",
      full: "/images/work/hithx/full.jpg",
      sec1: "/images/work/hithx/sec-1.jpg",
      sec2: "/images/work/hithx/sec-2.jpg",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel"],
    stats: [
      { value: "7", label: "content categories" },
      { value: "2", label: "themes, light & dark" },
      { value: "<1s", label: "time to first byte" },
    ],
    brief:
      "Nepal has a huge appetite for phone and gadget coverage, but most of it lives in Facebook posts and YouTube descriptions. HithX needed a real publication — one that could hold reviews, news, guides and a product database, stay readable on a mid-range Android over patchy data, and actually show up when somebody searches “Nothing Phone price in Nepal”.",
    approach: [
      {
        title: "An editorial grid, not a blog template",
        body:
          "The home page leads with a hero feature and a stacked rail of secondary stories, then breaks into Reviews, Trending and What's Hot. Every card carries its category, read time and freshness, so the page reads like a newsroom instead of a reverse-chronological feed.",
      },
      {
        title: "Built for the device people actually use",
        body:
          "Images are served responsively and lazily, type is set at comfortable mobile sizes, and the whole thing is statically generated so a story is delivered from the edge. A light and dark theme ship together, with the toggle persisted per reader.",
      },
      {
        title: "Search visibility designed in from day one",
        body:
          "Category and product taxonomies map onto clean URLs, every article carries article schema and proper Open Graph tags, and titles are written around the terms Nepali buyers actually search — price, specs, first look, full list.",
      },
    ],
    outcome:
      "HithX now runs as a working publication with a growing archive across smartphones, audio, cameras and accessories, and a structure that lets the editorial team add categories without touching code.",
  },
  {
    slug: "markee",
    name: "Markee",
    tagline: "Chrome Web Store screenshot generator",
    intro:
      "A SaaS product that turns an extension's listing URL into every store asset it needs — screenshots, promo tile and marquee — in minutes rather than a lost weekend.",
    year: "2026",
    role: ["Product design", "Web app", "Billing", "SEO"],
    liveUrl: "https://markee.app/",
    liveLabel: "markee.app",
    accent: "#f5b23d",
    coverDark: true,
    images: {
      hero: "/images/work/markee/hero.jpg",
      mid: "/images/work/markee/mid.jpg",
      mobile: "/images/work/markee/mobile.jpg",
      full: "/images/work/markee/full.jpg",
      sec1: "/images/work/markee/sec-1.jpg",
      sec2: "/images/work/markee/sec-2.jpg",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Image pipeline"],
    stats: [
      { value: "10", label: "free credits on signup" },
      { value: "3", label: "asset sizes generated" },
      { value: "$4.99", label: "entry price, no subscription" },
    ],
    brief:
      "Extension developers spend months on a product and then get judged on six screenshots. The existing options are Figma, Canva, or paying a designer — all slow, all overkill for a fixed set of store-mandated sizes. Markee had to make that entire job disappear behind one pasted link.",
    approach: [
      {
        title: "A theatre marquee as the whole brand",
        body:
          "The name earns its identity: a bulb-lit marquee sign, a warm spotlight raking down a dark stage, and a lights on/off toggle the visitor can actually flip. It gives a utility product a personality, and it makes the promise legible before a word is read.",
      },
      {
        title: "Show the output, immediately",
        body:
          "Rather than describing quality, the page displays generated kits for real extensions and lets you click any one to inspect it at full size — with a clear note that they're concept redesigns, not affiliated listings. Proof does the selling.",
      },
      {
        title: "Pricing that doesn't demand commitment",
        body:
          "A one-off $4.99 pack sits alongside monthly and annual plans, credits never expire on packs, and edits are free. The tier table states exactly how many kits each plan buys, so nobody has to reverse-engineer credit maths.",
      },
      {
        title: "Written for the search that precedes the need",
        body:
          "A dedicated FAQ answers the queries developers type before they know Markee exists — official image sizes, how to make a 1280×800 without Figma, whether screenshots move installs — plus comparison and guide pages that carry the same answers.",
      },
    ],
    outcome:
      "Markee ships as a complete product: free trial credits, three paid tiers, a live gallery, and an FAQ layer that doubles as its own acquisition channel.",
  },
  {
    slug: "whop-video-downloader",
    name: "Whop Video Downloader",
    tagline: "Chrome extension with 2,400+ users",
    intro:
      "A browser extension that saves any Whop course video to disk as an MP4, paired with a landing page built to convert cold search traffic into installs.",
    year: "2026",
    role: ["Extension development", "Landing page", "SEO"],
    liveUrl: "https://freewhopdownloader.com/",
    liveLabel: "freewhopdownloader.com",
    accent: "#ff6b1a",
    coverDark: false,
    images: {
      hero: "/images/work/whop/hero.jpg",
      mid: "/images/work/whop/mid.jpg",
      mobile: "/images/work/whop/mobile.jpg",
      full: "/images/work/whop/full.jpg",
      sec1: "/images/work/whop/sec-1.jpg",
      sec2: "/images/work/whop/sec-2.jpg",
    },
    stack: [
      "Chrome Extension (MV3)",
      "TypeScript",
      "Stream muxing",
      "Next.js",
      "Stripe",
    ],
    stats: [
      { value: "2,400+", label: "users" },
      { value: "100%", label: "local processing" },
      { value: "v1.4.1", label: "and shipping" },
    ],
    brief:
      "People buy Whop courses and then lose access when a community closes. They wanted their videos offline. The tooling that existed was sketchy, capped, or asked for an account before it did anything — so trust was the real product problem, not the download.",
    approach: [
      {
        title: "Free tier generous enough to be believed",
        body:
          "Three downloads a week forever, no length limits even on free, audio-only and video-only always free, and no account required to start. The free plan is the demo, which removes the leap of faith the category normally asks for.",
      },
      {
        title: "Processing stays on the machine",
        body:
          "The extension detects the player, fetches the best available quality and merges the streams into an MP4 locally — nothing routes through a server. That's stated plainly on the page, because for this audience it's the deciding feature.",
      },
      {
        title: "A page that answers objections in order",
        body:
          "Four numbered steps, a full demo video, then the reviews — real ones, named and dated, including several about support response time. The layout follows the actual sequence of doubts a visitor has before installing.",
      },
      {
        title: "Ranking for the query, not the brand",
        body:
          "Nobody searches for the product name. The page targets how the problem is described — download Whop course videos, save Whop videos offline — with matching titles, descriptions and on-page copy.",
      },
    ],
    outcome:
      "Past 2,400 users on a v1.4.1 build, with a review wall that repeatedly credits both the tool and the turnaround on support requests.",
  },
  {
    slug: "tailsgate",
    name: "Tailsgate",
    tagline: "MVP studio, idea to launch in 30 days",
    intro:
      "The site for a build studio that takes founders from idea to shipped product in a month — structured so the process itself is the pitch.",
    year: "2025",
    role: ["Brand", "Web development", "Copy"],
    liveUrl: "https://tailsgate.com/",
    liveLabel: "tailsgate.com",
    accent: "#ff5b23",
    coverDark: true,
    images: {
      hero: "/images/work/tailsgate/hero.jpg",
      mid: "/images/work/tailsgate/mid.jpg",
      mobile: "/images/work/tailsgate/mobile.jpg",
      full: "/images/work/tailsgate/full.jpg",
      sec1: "/images/work/tailsgate/sec-1.jpg",
      sec2: "/images/work/tailsgate/sec-2.jpg",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Vercel"],
    stats: [
      { value: "30", label: "days, idea to launch" },
      { value: "5", label: "step delivery method" },
      { value: "15", label: "days support included" },
    ],
    brief:
      "Founders shopping for a development partner are mostly trying to work out whether they'll be left holding a half-built product. Tailsgate needed a site that answered that anxiety directly — what happens, in what order, and what it costs — without collapsing into a generic agency template.",
    approach: [
      {
        title: "One word, held for a full screen",
        body:
          "The hero is the word “ship.” over a dark rippling field, with idea · execution · mvp beneath it. It commits to a single idea instead of hedging across three value propositions, and it sets a tone the rest of the page keeps.",
      },
      {
        title: "The process, numbered and specific",
        body:
          "Five steps from a free discovery call through blueprint, build, launch-ready delivery and post-launch support — each with what the founder actually receives. Daily progress updates and the 15-day support window are named, not implied.",
      },
      {
        title: "Real work, linked out",
        body:
          "The featured projects section points to live, running products rather than mockups, and the pricing block states a range up front with a 50/50 payment split, so budget qualification happens before the call rather than during it.",
      },
    ],
    outcome:
      "Tailsgate reads as an operating studio rather than a landing page — process, proof and pricing all visible before anyone books a call.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
