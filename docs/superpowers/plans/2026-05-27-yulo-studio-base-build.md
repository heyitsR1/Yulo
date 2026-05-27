# Yulo Studio Base Build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static base of the Yulo Studio single-page portfolio site matching the Figma design at 1920px, with basic mobile fallback.

**Architecture:** Next.js 15 App Router with a single `page.tsx` composing 7 section components. All content lives in a centralized `data/content.ts` file. Assets exported from Figma into `public/images/`. Tailwind CSS for styling with design tokens mapped to the Tailwind config.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Vercel deployment

**Spec:** `docs/superpowers/specs/2026-05-27-yulo-studio-site-design.md`

**Figma:** `https://www.figma.com/design/7vJcpuzhifGxyQhEADrXlf/Untitled--Copy-?node-id=1-1562`

---

## File Structure

```
yulo-studio/                      # Next.js project root (inside /Users/aarohan/Yulo/)
├── app/
│   ├── layout.tsx                # Root layout: metadata, font setup, body wrapper
│   ├── page.tsx                  # Single page composing all sections
│   └── globals.css               # Tailwind v4 imports + custom properties
├── components/
│   ├── Navbar.tsx                # Fixed nav with glass pills, anchor links
│   ├── HeroSection.tsx           # Full-viewport hero with gradient bg
│   ├── ClickScrollSection.tsx    # Large text + floating 3D shape composition
│   ├── ServicesSection.tsx       # Services header + 4 service blocks
│   ├── ServiceCard.tsx           # Reusable: title + description + image strip
│   ├── WorkCTA.tsx               # Giant "Work" text + folder illustration
│   ├── CTACard.tsx               # Gray rounded card with "Let's talk"
│   └── Footer.tsx                # Large branding text + tech list
├── data/
│   └── content.ts               # All text content, image paths, link hrefs
├── public/
│   └── images/
│       ├── shapes/               # 3D geometric shape PNGs (circles, pill, hex, square)
│       ├── services/             # Portfolio thumbnail JPGs
│       ├── work/                 # Folder illustration layers (back, content, front)
│       └── blue-accents/         # Small blue SVG accent shapes
├── tailwind.config.ts            # Design tokens extended into Tailwind theme
├── next.config.ts                # Next.js config (images, etc.)
├── tsconfig.json                 # TypeScript config
└── package.json
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `yulo-studio/` (entire project scaffold via `create-next-app`)
- Modify: `yulo-studio/tailwind.config.ts` (add design tokens)
- Modify: `yulo-studio/app/globals.css` (custom properties)
- Modify: `yulo-studio/app/layout.tsx` (font, metadata, body class)

- [ ] **Step 1: Initialize Next.js with Tailwind**

Run from `/Users/aarohan/Yulo/`:

```bash
npx create-next-app@latest yulo-studio --typescript --tailwind --eslint --app --src=false --import-alias="@/*" --use-npm
```

Select defaults when prompted (no Turbopack needed).

- [ ] **Step 2: Verify it runs**

```bash
cd yulo-studio && npm run dev
```

Open `http://localhost:3000` — should see the default Next.js page.
Kill the dev server after confirming.

- [ ] **Step 3: Configure Tailwind with design tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-warm": "#FAF6EF",
        peach: "#FFBC95",
        "peach-warm": "#FAB68E",
        blue: "#2E54FE",
        "text-muted": "#96908C",
        "gray-mid": "#A8A6A5",
      },
      fontFamily: {
        sans: [
          "Arial",
          "Helvetica Neue",
          "Helvetica",
          "sans-serif",
        ],
      },
      spacing: {
        "page-x": "76.8px",
      },
      maxWidth: {
        content: "1766px",
      },
      borderRadius: {
        pill: "90px",
        card: "96px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Set up global CSS**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-warm: #FAF6EF;
  --peach: #FFBC95;
  --peach-warm: #FAB68E;
  --blue: #2E54FE;
  --text-muted: #96908C;
  --gray-mid: #A8A6A5;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-warm);
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  color: var(--text-muted);
  overflow-x: hidden;
}
```

- [ ] **Step 5: Set up root layout**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yulo Studio — Your Design Studio",
  description:
    "A Nepal-based brand transformation studio working across strategy, design, and digital.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-warm antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create directory structure and placeholder page**

```bash
mkdir -p components data public/images/{shapes,services,work,blue-accents}
```

Replace `app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <p className="p-10 text-text-muted text-lg font-bold">
        Yulo Studio — scaffold ready
      </p>
    </main>
  );
}
```

- [ ] **Step 7: Verify tokens work**

```bash
npm run dev
```

Open `http://localhost:3000`. Should see "Yulo Studio — scaffold ready" in muted gray on warm cream background. Kill the dev server.

- [ ] **Step 8: Commit**

```bash
git add yulo-studio/
git commit -m "Scaffold Next.js project with Tailwind design tokens"
```

---

## Task 2: Content Data File + Asset Download

**Files:**
- Create: `yulo-studio/data/content.ts`
- Create: `yulo-studio/public/images/` (multiple asset files)

- [ ] **Step 1: Create the content data file**

Create `data/content.ts`:

```typescript
export const siteContent = {
  nav: {
    brand: { name: "Yulo", suffix: "Studios" },
    links: [
      { label: "About", href: "#services" },
      { label: "Work", href: "#work" },
    ],
    social: [
      { label: "Email", href: "mailto:hello@yulostudio.com" },
      { label: "in", href: "https://linkedin.com" },
      { label: "x", href: "https://x.com" },
    ],
  },
  hero: {
    heading: "Transforming Brands,\nBuilding Futures",
    subtitle:
      "A Nepal-based brand transformation studio working across strategy, design, and digital.",
  },
  clickScroll: {
    line1: "We are",
    line2: "making users",
    line3_pre: "click",
    line3_mid: "and",
    line3_post: "scroll",
    line4: "our designs",
  },
  services: {
    label: "Design Expert",
    headline: "We help companies to succeed on projects like:",
    items: [
      {
        title: "Websites &\nLanding pages",
        description:
          "Creating high-end and beautiful websites built to perform and convert.",
        images: [
          "/images/services/home-work1.jpg",
          "/images/services/video-placeholder.jpg",
          "/images/services/home-work2.jpg",
          "/images/services/video-placeholder.jpg",
          "/images/services/home-work3.jpg",
        ],
      },
      {
        title: "Visual Branding",
        description:
          "Helping brands find a distinctive visual language that truly stands out.",
        images: [
          "/images/services/video-placeholder.jpg",
          "/images/services/home-work7.jpg",
          "/images/services/video-placeholder.jpg",
          "/images/services/home-work8.jpg",
          "/images/services/home-work9.jpg",
        ],
      },
      {
        title: "Product Design\nEnhancement",
        description:
          "Bringing fresh ideas to turn complex products into intuitive experiences with an elevated visual layer.",
        images: [
          "/images/services/home-work4.jpg",
          "/images/services/video-placeholder.jpg",
          "/images/services/home-work5.jpg",
          "/images/services/home-work6.jpg",
          "/images/services/video-placeholder.jpg",
        ],
      },
      {
        title: "Webflow &\nFramer",
        description:
          "Building elegant and responsive projects featuring creative micro-interactions and seamless CMS hand-off.",
        images: [],
      },
    ],
  },
  workCta: {
    preText: "Curious?... Check out my",
    postText: "Or keep scrolling",
    folderHref: "#",
  },
  cta: {
    heading: "Let's build\nsomething people\nremember",
    subtitle: "from global tech companies to growing startups.",
    ctaText: "Let's talk",
    ctaHref: "mailto:hello@yulostudio.com",
  },
  footer: {
    brandLeft: "Yulo",
    brandRight: "Studio",
    subtitleLeft: "Your Tech Partner",
    subtitleRight: "Your Design Studio",
    techList: ["Figma", "Next.js", "GSAP", "Tailwind CSS", "Lenis Scroll"],
  },
};
```

- [ ] **Step 2: Download assets from Figma MCP**

Use the Figma MCP to download all available raster assets. The agent should:

1. Download the 3D shape PNGs from the Click & Scroll section into `public/images/shapes/`:
   - `big-circle-scroll1.png`, `big-circle-scroll2.png`, `big-circle-scroll3.png`
   - `big-pill-scroll1.png`, `big-hexagon-scroll1.png`, `big-square-scroll1.png`

2. Download the portfolio images from the Services section into `public/images/services/`:
   - `home-work1.jpg` through `home-work9.jpg`
   - `video-placeholder.jpg` (the juan-video-loading.jpg repeated thumbnail)

3. Download the folder illustration layers into `public/images/work/`:
   - `folder-icon-back.png`, `projects-folder.png`, `folder-icon-front.png`

4. Download the CTA arrow icon into `public/images/`:
   - `arrow-icon.svg` (or extract from Figma as SVG)

For any asset that cannot be pulled from Figma MCP (expired URLs or non-exportable), create a placeholder:
- For JPGs: a 346x277 solid `#d4cfc9` rectangle
- For PNGs: a transparent PNG at the expected dimensions
- Flag each missing asset so the user can manually export from Figma

- [ ] **Step 3: Commit**

```bash
git add yulo-studio/data/ yulo-studio/public/images/
git commit -m "Add content data file and download Figma assets"
```

---

## Task 3: Navbar Component

**Files:**
- Create: `yulo-studio/components/Navbar.tsx`
- Modify: `yulo-studio/app/page.tsx` (add Navbar)

- [ ] **Step 1: Build the Navbar component**

Create `components/Navbar.tsx`:

```tsx
"use client";

import { siteContent } from "@/data/content";

const { nav } = siteContent;

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-page-x py-5">
      {/* Left: Brand */}
      <div className="flex-1 flex items-center">
        <a href="#" className="flex items-center gap-[4.8px] px-4 py-2">
          <span className="text-white text-[21.7px] font-bold tracking-[-0.64px] leading-5">
            {nav.brand.name}
          </span>
          <span className="w-[6.4px] h-[6.4px] rounded-full bg-blue" />
          <span className="text-white text-[22.4px] font-bold tracking-[-0.64px] leading-5">
            {nav.brand.suffix}
          </span>
        </a>
      </div>

      {/* Center: Nav links */}
      <div className="flex-1 flex items-center justify-center gap-0">
        <a
          href={nav.links[0].href}
          className="px-4 py-3 rounded-pill backdrop-blur-[5.5px] bg-white/[0.08] text-peach text-[14.2px] font-bold leading-4"
        >
          {nav.links[0].label}
        </a>
        {/* Center logo/icon placeholder */}
        <div className="w-11 h-[67px] mx-0" />
        <a
          href={nav.links[1].href}
          className="px-4 py-3 rounded-pill backdrop-blur-[5.5px] bg-white/[0.08] text-peach text-[14.2px] font-bold leading-4"
        >
          {nav.links[1].label}
        </a>
      </div>

      {/* Right: Social links */}
      <div className="flex-1 flex items-center justify-end">
        {nav.social.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="px-[15px] py-[10px] rounded-[80px] text-peach text-[14.2px] font-bold leading-5"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add Navbar to page**

Replace `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Temporary dark section to see nav text */}
      <section className="h-screen bg-gray-mid" />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Should see the navbar with white/peach text over the gray section. Verify: brand text left, nav links center, social links right. Kill dev server.

- [ ] **Step 4: Commit**

```bash
git add yulo-studio/components/Navbar.tsx yulo-studio/app/page.tsx
git commit -m "Add Navbar component with glass pill links"
```

---

## Task 4: Hero Section

**Files:**
- Create: `yulo-studio/components/HeroSection.tsx`
- Modify: `yulo-studio/app/page.tsx`

- [ ] **Step 1: Build the Hero component**

Create `components/HeroSection.tsx`:

```tsx
import { siteContent } from "@/data/content";

const { hero } = siteContent;

export default function HeroSection() {
  return (
    <section className="relative h-[984px] w-full overflow-hidden">
      {/* Background — placeholder gradient until real image provided */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#c4a882] via-[#d4b896] to-bg-warm" />

      {/* Top glow overlay */}
      <div className="absolute top-0 left-0 right-0 h-[108px] bg-gradient-to-b from-bg-warm/60 to-transparent backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-page-x">
        <h1 className="text-white text-[136.6px] font-bold leading-[157.65px] tracking-[-6.72px] text-center whitespace-pre-line max-w-[1200px]">
          {hero.heading}
        </h1>
        <p className="mt-6 text-white/70 text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px] text-center max-w-[700px]">
          {hero.subtitle}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open browser. Should see warm gradient hero with large white heading text and navbar floating on top. Kill dev server.

- [ ] **Step 4: Commit**

```bash
git add yulo-studio/components/HeroSection.tsx yulo-studio/app/page.tsx
git commit -m "Add Hero section with gradient placeholder background"
```

---

## Task 5: Click & Scroll Section

**Files:**
- Create: `yulo-studio/components/ClickScrollSection.tsx`
- Modify: `yulo-studio/app/page.tsx`

- [ ] **Step 1: Build the Click & Scroll component**

Create `components/ClickScrollSection.tsx`:

```tsx
"use client";

import Image from "next/image";
import { siteContent } from "@/data/content";

const { clickScroll } = siteContent;

export default function ClickScrollSection() {
  return (
    <section className="relative w-full bg-bg-warm">
      {/* Sticky text zone */}
      <div className="h-[2246px] overflow-clip pt-[250px]">
        <div className="sticky top-0 mx-auto w-[960px] max-w-[90vw]">
          <div className="relative">
            <h2 className="text-text-muted text-[136.6px] font-bold leading-[157.65px] tracking-[-6.72px]">
              <span className="block">{clickScroll.line1}</span>
              <span className="block">{clickScroll.line2}</span>
              <span className="block relative">
                {/* "click" in peach pill */}
                <span className="relative inline-block">
                  <span className="absolute -left-[42px] top-1/2 -translate-y-1/2 w-[384px] h-[163px] bg-peach rounded-full" />
                  <span className="relative z-10 text-bg-warm">
                    {clickScroll.line3_pre}
                  </span>
                </span>
                <span className="text-text-muted">
                  {"   "}
                  {clickScroll.line3_mid}{" "}
                </span>
                <span className="text-peach">{clickScroll.line3_post}</span>
              </span>
              <span className="block">{clickScroll.line4}</span>
            </h2>
          </div>
        </div>

        {/* Floating shapes zone */}
        <div className="relative w-full h-[1174px] mt-[-200px]">
          {/* Large circle — left */}
          <div className="absolute left-[165px] -top-[363px] w-[1102px] h-[1102px] rotate-[59.82deg]">
            <Image
              src="/images/shapes/big-circle-scroll1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Pill shape — upper center */}
          <div className="absolute left-[403px] top-[241px] w-[499px] h-[434px]">
            <Image
              src="/images/shapes/big-pill-scroll1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Large circle — center-right */}
          <div className="absolute left-[1136px] top-[264px] w-[892px] h-[892px] rotate-[59.82deg]">
            <Image
              src="/images/shapes/big-circle-scroll2.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Hexagon — far right, partially clipped */}
          <div className="absolute left-[1782px] -top-[217px] w-[1069px] h-[1038px] rotate-[59.95deg]">
            <Image
              src="/images/shapes/big-hexagon-scroll1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Small circle — far right */}
          <div className="absolute left-[1695px] top-[485px] w-[401px] h-[401px] rotate-[79.93deg]">
            <Image
              src="/images/shapes/big-circle-scroll3.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Square/cube — lower left */}
          <div className="absolute left-[365px] top-[647px] w-[384px] h-[338px]">
            <Image
              src="/images/shapes/big-square-scroll1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Small blue accent — circle */}
          <div className="absolute left-[417px] top-[510px] w-[79px] h-[79px]">
            <svg viewBox="0 0 58 58" fill="none" className="w-full h-full rotate-[59.82deg]">
              <circle cx="29" cy="29" r="29" fill="#2E54FE" />
            </svg>
          </div>

          {/* Small blue accent — pill */}
          <div className="absolute left-[1224px] top-[83px] w-[95px] h-[110px]">
            <svg viewBox="0 0 96 54" fill="none" className="w-full h-full rotate-[59.82deg]">
              <rect x="0" y="0" width="96" height="54" rx="27" fill="#2E54FE" />
            </svg>
          </div>

          {/* Small blue accent — hexagon */}
          <div className="absolute left-[1355px] top-[658px] w-[54px] h-[53px]">
            <svg viewBox="0 0 54 53" fill="none" className="w-full h-full rotate-[59.82deg]">
              <polygon
                points="27,0 51,13 51,40 27,53 3,40 3,13"
                fill="#2E54FE"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open browser. Scroll past hero — should see large "We are making users click and scroll our designs" text with the peach pill behind "click", peach-colored "scroll", and 3D shapes positioned below. Shapes may show as broken images if assets aren't downloaded yet — that's expected, layout matters. Kill dev server.

- [ ] **Step 4: Commit**

```bash
git add yulo-studio/components/ClickScrollSection.tsx yulo-studio/app/page.tsx
git commit -m "Add Click & Scroll section with shapes layout"
```

---

## Task 6: Services Section

**Files:**
- Create: `yulo-studio/components/ServiceCard.tsx`
- Create: `yulo-studio/components/ServicesSection.tsx`
- Modify: `yulo-studio/app/page.tsx`

- [ ] **Step 1: Build the ServiceCard component**

Create `components/ServiceCard.tsx`:

```tsx
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  images: string[];
}

export default function ServiceCard({
  title,
  description,
  images,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center gap-[30px] w-full px-page-x pb-[30px]">
      {/* Title + description */}
      <div className="flex flex-col items-center gap-[28px] w-[530px] max-w-full">
        <h3 className="text-text-muted text-[73px] font-bold leading-[69.12px] tracking-[-2.88px] text-center whitespace-pre-line">
          {title}
        </h3>
        <p className="text-text-muted text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px] text-center max-w-[430px]">
          {description}
        </p>
      </div>

      {/* Image strip */}
      {images.length > 0 && (
        <div className="flex gap-[9.6px] w-full h-[276px]">
          {images.map((src, i) => (
            <div
              key={i}
              className="flex-1 relative rounded overflow-hidden bg-[#d4cfc9]"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Build the ServicesSection component**

Create `components/ServicesSection.tsx`:

```tsx
import { siteContent } from "@/data/content";
import ServiceCard from "./ServiceCard";

const { services } = siteContent;

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-bg-warm">
      {/* Header */}
      <div className="px-page-x">
        <p className="text-text-muted text-[20px] font-bold leading-5">
          {services.label}
        </p>
        <h2 className="mt-[19px] text-[156.5px] font-bold leading-[146.88px] tracking-[-7.68px]">
          <span className="text-text-muted">
            We help companies to succeed on projects{" "}
          </span>
          <span className="text-peach-warm">like:</span>
        </h2>
      </div>

      {/* Service blocks */}
      <div className="mt-[333px] flex flex-col">
        {services.items.map((service, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-end ${
              i === services.items.length - 1 ? "h-[638px]" : "h-[883px]"
            }`}
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              images={service.images}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to page**

Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
      <ServicesSection />
    </main>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Open browser. Scroll to services. Should see "Design Expert" label, huge headline with "like:" in peach, then 4 service blocks stacked — each with centered title, description, and a row of 5 image thumbnails (may be gray placeholders). Last service (Webflow & Framer) should have no image strip. Kill dev server.

- [ ] **Step 5: Commit**

```bash
git add yulo-studio/components/ServiceCard.tsx yulo-studio/components/ServicesSection.tsx yulo-studio/app/page.tsx
git commit -m "Add Services section with 4 service cards and image strips"
```

---

## Task 7: Work CTA Section

**Files:**
- Create: `yulo-studio/components/WorkCTA.tsx`
- Modify: `yulo-studio/app/page.tsx`

- [ ] **Step 1: Build the WorkCTA component**

Create `components/WorkCTA.tsx`:

```tsx
import Image from "next/image";
import { siteContent } from "@/data/content";

const { workCta } = siteContent;

export default function WorkCTA() {
  return (
    <section
      id="work"
      className="relative w-full h-[1210px] flex items-center justify-center overflow-hidden bg-bg-warm"
    >
      {/* Giant "Work" background text */}
      <span className="absolute text-peach/30 text-[825.6px] font-bold leading-[825.6px] tracking-[-19.2px] select-none pointer-events-none whitespace-nowrap left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Work
      </span>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center gap-0 w-[461px]">
        <p className="text-text-muted text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px]">
          {workCta.preText}
        </p>

        {/* Folder illustration */}
        <a
          href={workCta.folderHref}
          className="relative w-[461px] h-[384px] mt-[82px] block"
        >
          {/* Back layer */}
          <div className="absolute bottom-0 left-0 right-0 h-[394px]">
            <Image
              src="/images/work/folder-icon-back.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          {/* Content layer */}
          <div className="absolute top-[54px] left-[5px] w-[452px] h-[115px] z-10">
            <Image
              src="/images/work/projects-folder.png"
              alt="Portfolio"
              fill
              className="object-contain"
            />
          </div>
          {/* Front layer */}
          <div className="absolute bottom-0 -left-[14px] -right-[14px] h-[314px] z-20">
            <Image
              src="/images/work/folder-icon-front.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </a>

        <p className="mt-[58px] text-text-muted text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px]">
          {workCta.postText}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";
import ServicesSection from "@/components/ServicesSection";
import WorkCTA from "@/components/WorkCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
      <ServicesSection />
      <WorkCTA />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open browser. Scroll to the Work section. Should see giant faded "Work" text behind a centered folder illustration with "Curious? Check out my" above and "Or keep scrolling" below. Kill dev server.

- [ ] **Step 4: Commit**

```bash
git add yulo-studio/components/WorkCTA.tsx yulo-studio/app/page.tsx
git commit -m "Add Work CTA section with folder illustration"
```

---

## Task 8: CTA Card Section

**Files:**
- Create: `yulo-studio/components/CTACard.tsx`
- Modify: `yulo-studio/app/page.tsx`

- [ ] **Step 1: Build the CTACard component**

Create `components/CTACard.tsx`:

```tsx
import { siteContent } from "@/data/content";

const { cta } = siteContent;

export default function CTACard() {
  return (
    <section className="w-full bg-gray-mid py-[96px] flex items-center justify-center">
      <div className="w-full max-w-content mx-auto rounded-card border border-peach overflow-hidden">
        {/* Top zone — heading */}
        <div className="px-[96px] pt-[172px] pb-[172px]">
          <h2 className="text-white text-[110.8px] font-bold leading-[115.2px] tracking-[-5.76px] whitespace-pre-line">
            {cta.heading}
          </h2>
          <p className="mt-[19px] text-white text-[27.3px] font-bold leading-[46px] tracking-[0.48px]">
            {cta.subtitle}
          </p>
        </div>

        {/* Bottom strip — CTA */}
        <div className="bg-peach px-[96px] h-[269px] flex items-center justify-between">
          {/* Arrow icon */}
          <div className="w-[115px] h-[115px] rounded-full border border-text-muted/0 flex items-center justify-center">
            <svg
              width="68"
              height="57"
              viewBox="0 0 68 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 28.5h62m0 0L40 4m23 24.5L40 53"
                stroke="#96908C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* "Let's talk" */}
          <a
            href={cta.ctaHref}
            className="text-blue text-[109.8px] font-bold leading-[107.14px] tracking-[-5.76px]"
          >
            {cta.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";
import ServicesSection from "@/components/ServicesSection";
import WorkCTA from "@/components/WorkCTA";
import CTACard from "@/components/CTACard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
      <ServicesSection />
      <WorkCTA />
      <CTACard />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open browser. Scroll to CTA section. Should see a gray area with a large rounded card — white heading on gray top, peach strip on bottom with arrow left and "Let's talk" in blue right. Kill dev server.

- [ ] **Step 4: Commit**

```bash
git add yulo-studio/components/CTACard.tsx yulo-studio/app/page.tsx
git commit -m "Add CTA card section with Let's talk link"
```

---

## Task 9: Footer

**Files:**
- Create: `yulo-studio/components/Footer.tsx`
- Modify: `yulo-studio/app/page.tsx`

- [ ] **Step 1: Build the Footer component**

Create `components/Footer.tsx`:

```tsx
import { siteContent } from "@/data/content";

const { footer } = siteContent;

export default function Footer() {
  return (
    <footer className="relative w-full h-[1200px] overflow-hidden">
      {/* Background — placeholder gradient until video/image provided */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-warm via-[#e8ddd0] to-[#d6cabb]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-content mx-auto pb-page-x">
        {/* Tech list — right aligned */}
        <div className="flex justify-end mb-[77px]">
          <div className="flex flex-col items-end gap-12">
            <p className="text-peach text-[14.4px] font-normal leading-[14.4px] opacity-[0.54]">
              Website made using:
            </p>
            <ul className="flex flex-col items-end gap-4">
              {footer.techList.map((tech) => (
                <li
                  key={tech}
                  className="text-peach text-[14px] font-bold leading-[14.4px]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large split branding */}
        <div className="flex items-center justify-between gap-[230px] mb-[10px]">
          <div className="w-[768px]">
            <div className="overflow-hidden h-[245px] pt-[14px]">
              <span className="text-peach text-[313.3px] font-bold leading-[244.8px] tracking-[-13.44px]">
                {footer.brandLeft}
              </span>
            </div>
          </div>
          <div className="w-[768px] flex flex-col items-end">
            <div className="overflow-hidden h-[245px] pt-[26px]">
              <span className="text-peach text-[326.4px] font-bold leading-[244.8px] tracking-[-13.44px]">
                {footer.brandRight}
              </span>
            </div>
          </div>
        </div>

        {/* Subtitles */}
        <div className="flex items-center justify-between">
          <span className="text-peach text-[24.6px] font-bold leading-[25.6px] ml-[162px]">
            {footer.subtitleLeft}
          </span>
          <span className="text-peach text-[24.4px] font-bold leading-[25.6px]">
            {footer.subtitleRight}
          </span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add to page (final composition)**

Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";
import ServicesSection from "@/components/ServicesSection";
import WorkCTA from "@/components/WorkCTA";
import CTACard from "@/components/CTACard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
      <ServicesSection />
      <WorkCTA />
      <CTACard />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verify full page**

```bash
npm run dev
```

Open browser. Scroll through the entire page top to bottom:
1. Navbar visible over hero
2. Hero with gradient + white heading
3. Click & Scroll with large text + shapes
4. Services with 4 blocks + image strips
5. Work CTA with giant faded text + folder
6. CTA card with gray/peach split
7. Footer with giant "Yulo" / "Studio" and tech list

Kill dev server.

- [ ] **Step 4: Commit**

```bash
git add yulo-studio/components/Footer.tsx yulo-studio/app/page.tsx
git commit -m "Add Footer and complete full page composition"
```

---

## Task 10: Basic Mobile Responsiveness

**Files:**
- Modify: `yulo-studio/components/Navbar.tsx`
- Modify: `yulo-studio/components/HeroSection.tsx`
- Modify: `yulo-studio/components/ClickScrollSection.tsx`
- Modify: `yulo-studio/components/ServicesSection.tsx`
- Modify: `yulo-studio/components/ServiceCard.tsx`
- Modify: `yulo-studio/components/WorkCTA.tsx`
- Modify: `yulo-studio/components/CTACard.tsx`
- Modify: `yulo-studio/components/Footer.tsx`

- [ ] **Step 1: Responsive Navbar**

Update `components/Navbar.tsx` — add responsive classes. On mobile, hide center nav and social links, show only brand:

Replace the outermost `<nav>` className and structure:

```tsx
"use client";

import { siteContent } from "@/data/content";

const { nav } = siteContent;

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-page-x py-5">
      {/* Left: Brand */}
      <div className="flex-1 flex items-center">
        <a href="#" className="flex items-center gap-[4.8px] px-4 py-2">
          <span className="text-white text-base md:text-[21.7px] font-bold tracking-[-0.64px] leading-5">
            {nav.brand.name}
          </span>
          <span className="w-[6.4px] h-[6.4px] rounded-full bg-blue" />
          <span className="text-white text-base md:text-[22.4px] font-bold tracking-[-0.64px] leading-5">
            {nav.brand.suffix}
          </span>
        </a>
      </div>

      {/* Center: Nav links — hidden on mobile */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-0">
        <a
          href={nav.links[0].href}
          className="px-4 py-3 rounded-pill backdrop-blur-[5.5px] bg-white/[0.08] text-peach text-[14.2px] font-bold leading-4"
        >
          {nav.links[0].label}
        </a>
        <div className="w-11 h-[67px] mx-0" />
        <a
          href={nav.links[1].href}
          className="px-4 py-3 rounded-pill backdrop-blur-[5.5px] bg-white/[0.08] text-peach text-[14.2px] font-bold leading-4"
        >
          {nav.links[1].label}
        </a>
      </div>

      {/* Right: Social links — hidden on mobile */}
      <div className="hidden md:flex flex-1 items-center justify-end">
        {nav.social.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="px-[15px] py-[10px] rounded-[80px] text-peach text-[14.2px] font-bold leading-5"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Responsive Hero**

Update `components/HeroSection.tsx` heading classes:

```tsx
import { siteContent } from "@/data/content";

const { hero } = siteContent;

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[984px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#c4a882] via-[#d4b896] to-bg-warm" />
      <div className="absolute top-0 left-0 right-0 h-[108px] bg-gradient-to-b from-bg-warm/60 to-transparent backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-page-x">
        <h1 className="text-white text-[40px] md:text-[80px] xl:text-[136.6px] font-bold leading-[1.15] md:leading-[157.65px] tracking-[-2px] md:tracking-[-6.72px] text-center whitespace-pre-line max-w-[1200px]">
          {hero.heading}
        </h1>
        <p className="mt-4 md:mt-6 text-white/70 text-sm md:text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px] text-center max-w-[700px]">
          {hero.subtitle}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Responsive Click & Scroll**

Update `components/ClickScrollSection.tsx` — on mobile, reduce text size and hide shapes:

Replace the section's outermost content:

```tsx
"use client";

import Image from "next/image";
import { siteContent } from "@/data/content";

const { clickScroll } = siteContent;

export default function ClickScrollSection() {
  return (
    <section className="relative w-full bg-bg-warm">
      <div className="md:h-[2246px] overflow-clip pt-[100px] md:pt-[250px]">
        <div className="sticky top-0 mx-auto w-[90vw] md:w-[960px]">
          <div className="relative">
            <h2 className="text-text-muted text-[40px] md:text-[80px] xl:text-[136.6px] font-bold leading-[1.15] md:leading-[157.65px] tracking-[-2px] md:tracking-[-6.72px]">
              <span className="block">{clickScroll.line1}</span>
              <span className="block">{clickScroll.line2}</span>
              <span className="block relative">
                <span className="relative inline-block">
                  <span className="absolute -left-3 md:-left-[42px] top-1/2 -translate-y-1/2 w-[120px] md:w-[384px] h-[50px] md:h-[163px] bg-peach rounded-full" />
                  <span className="relative z-10 text-bg-warm">
                    {clickScroll.line3_pre}
                  </span>
                </span>
                <span className="text-text-muted">
                  {"   "}
                  {clickScroll.line3_mid}{" "}
                </span>
                <span className="text-peach">{clickScroll.line3_post}</span>
              </span>
              <span className="block">{clickScroll.line4}</span>
            </h2>
          </div>
        </div>

        {/* Floating shapes — hidden on mobile */}
        <div className="hidden md:block relative w-full h-[1174px] mt-[-200px]">
          <div className="absolute left-[165px] -top-[363px] w-[1102px] h-[1102px] rotate-[59.82deg]">
            <Image src="/images/shapes/big-circle-scroll1.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[403px] top-[241px] w-[499px] h-[434px]">
            <Image src="/images/shapes/big-pill-scroll1.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[1136px] top-[264px] w-[892px] h-[892px] rotate-[59.82deg]">
            <Image src="/images/shapes/big-circle-scroll2.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[1782px] -top-[217px] w-[1069px] h-[1038px] rotate-[59.95deg]">
            <Image src="/images/shapes/big-hexagon-scroll1.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[1695px] top-[485px] w-[401px] h-[401px] rotate-[79.93deg]">
            <Image src="/images/shapes/big-circle-scroll3.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[365px] top-[647px] w-[384px] h-[338px]">
            <Image src="/images/shapes/big-square-scroll1.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[417px] top-[510px] w-[79px] h-[79px]">
            <svg viewBox="0 0 58 58" fill="none" className="w-full h-full rotate-[59.82deg]">
              <circle cx="29" cy="29" r="29" fill="#2E54FE" />
            </svg>
          </div>
          <div className="absolute left-[1224px] top-[83px] w-[95px] h-[110px]">
            <svg viewBox="0 0 96 54" fill="none" className="w-full h-full rotate-[59.82deg]">
              <rect x="0" y="0" width="96" height="54" rx="27" fill="#2E54FE" />
            </svg>
          </div>
          <div className="absolute left-[1355px] top-[658px] w-[54px] h-[53px]">
            <svg viewBox="0 0 54 53" fill="none" className="w-full h-full rotate-[59.82deg]">
              <polygon points="27,0 51,13 51,40 27,53 3,40 3,13" fill="#2E54FE" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Responsive ServiceCard**

Update `components/ServiceCard.tsx`:

```tsx
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  images: string[];
}

export default function ServiceCard({
  title,
  description,
  images,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 md:gap-[30px] w-full px-6 md:px-page-x pb-[30px]">
      <div className="flex flex-col items-center gap-4 md:gap-[28px] w-full md:w-[530px]">
        <h3 className="text-text-muted text-[32px] md:text-[52px] xl:text-[73px] font-bold leading-[1] md:leading-[69.12px] tracking-[-1px] md:tracking-[-2.88px] text-center whitespace-pre-line">
          {title}
        </h3>
        <p className="text-text-muted text-sm md:text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px] text-center max-w-[430px]">
          {description}
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-[9.6px] w-full md:h-[276px]">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[5/4] md:aspect-auto md:flex-1 rounded overflow-hidden bg-[#d4cfc9]"
            >
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Responsive ServicesSection**

Update `components/ServicesSection.tsx`:

```tsx
import { siteContent } from "@/data/content";
import ServiceCard from "./ServiceCard";

const { services } = siteContent;

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-bg-warm">
      <div className="px-6 md:px-page-x">
        <p className="text-text-muted text-base md:text-[20px] font-bold leading-5">
          {services.label}
        </p>
        <h2 className="mt-4 md:mt-[19px] text-[40px] md:text-[80px] xl:text-[156.5px] font-bold leading-[1] md:leading-[146.88px] tracking-[-2px] md:tracking-[-7.68px]">
          <span className="text-text-muted">
            We help companies to succeed on projects{" "}
          </span>
          <span className="text-peach-warm">like:</span>
        </h2>
      </div>

      <div className="mt-[100px] md:mt-[333px] flex flex-col gap-16 md:gap-0">
        {services.items.map((service, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-end ${
              i === services.items.length - 1
                ? "md:h-[638px]"
                : "md:h-[883px]"
            }`}
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              images={service.images}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Responsive WorkCTA**

Update `components/WorkCTA.tsx`:

```tsx
import Image from "next/image";
import { siteContent } from "@/data/content";

const { workCta } = siteContent;

export default function WorkCTA() {
  return (
    <section
      id="work"
      className="relative w-full h-[500px] md:h-[1210px] flex items-center justify-center overflow-hidden bg-bg-warm"
    >
      <span className="absolute text-peach/30 text-[200px] md:text-[500px] xl:text-[825.6px] font-bold leading-none tracking-[-8px] md:tracking-[-19.2px] select-none pointer-events-none whitespace-nowrap left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Work
      </span>

      <div className="relative z-10 flex flex-col items-center w-[300px] md:w-[461px]">
        <p className="text-text-muted text-sm md:text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px]">
          {workCta.preText}
        </p>

        <a
          href={workCta.folderHref}
          className="relative w-[250px] md:w-[461px] h-[200px] md:h-[384px] mt-8 md:mt-[82px] block"
        >
          <div className="absolute bottom-0 left-0 right-0 h-full">
            <Image src="/images/work/folder-icon-back.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute top-[28px] md:top-[54px] left-[3px] md:left-[5px] w-[244px] md:w-[452px] h-[60px] md:h-[115px] z-10">
            <Image src="/images/work/projects-folder.png" alt="Portfolio" fill className="object-contain" />
          </div>
          <div className="absolute bottom-0 -left-2 md:-left-[14px] -right-2 md:-right-[14px] h-[65%] z-20">
            <Image src="/images/work/folder-icon-front.png" alt="" fill className="object-contain" />
          </div>
        </a>

        <p className="mt-6 md:mt-[58px] text-text-muted text-sm md:text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px]">
          {workCta.postText}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Responsive CTACard**

Update `components/CTACard.tsx`:

```tsx
import { siteContent } from "@/data/content";

const { cta } = siteContent;

export default function CTACard() {
  return (
    <section className="w-full bg-gray-mid py-10 md:py-[96px] px-4 md:px-0 flex items-center justify-center">
      <div className="w-full max-w-content mx-auto rounded-[24px] md:rounded-card border border-peach overflow-hidden">
        <div className="px-6 md:px-[96px] py-12 md:pt-[172px] md:pb-[172px]">
          <h2 className="text-white text-[36px] md:text-[70px] xl:text-[110.8px] font-bold leading-[1.05] md:leading-[115.2px] tracking-[-2px] md:tracking-[-5.76px] whitespace-pre-line">
            {cta.heading}
          </h2>
          <p className="mt-4 md:mt-[19px] text-white text-base md:text-[27.3px] font-bold leading-[1.6] md:leading-[46px] tracking-[0.48px]">
            {cta.subtitle}
          </p>
        </div>

        <a
          href={cta.ctaHref}
          className="bg-peach px-6 md:px-[96px] h-[100px] md:h-[269px] flex items-center justify-between"
        >
          <div className="w-[50px] md:w-[115px] h-[50px] md:h-[115px] flex items-center justify-center">
            <svg
              width="68"
              height="57"
              viewBox="0 0 68 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 md:w-auto h-auto"
            >
              <path
                d="M1 28.5h62m0 0L40 4m23 24.5L40 53"
                stroke="#96908C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-blue text-[32px] md:text-[70px] xl:text-[109.8px] font-bold leading-none tracking-[-2px] md:tracking-[-5.76px]">
            {cta.ctaText}
          </span>
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Responsive Footer**

Update `components/Footer.tsx`:

```tsx
import { siteContent } from "@/data/content";

const { footer } = siteContent;

export default function Footer() {
  return (
    <footer className="relative w-full h-[600px] md:h-[1200px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-warm via-[#e8ddd0] to-[#d6cabb]" />

      <div className="relative z-10 flex flex-col justify-end h-full max-w-content mx-auto px-6 md:px-0 pb-6 md:pb-page-x">
        {/* Tech list */}
        <div className="flex justify-end mb-8 md:mb-[77px]">
          <div className="flex flex-col items-end gap-6 md:gap-12">
            <p className="text-peach text-xs md:text-[14.4px] font-normal leading-[14.4px] opacity-[0.54]">
              Website made using:
            </p>
            <ul className="flex flex-col items-end gap-2 md:gap-4">
              {footer.techList.map((tech) => (
                <li
                  key={tech}
                  className="text-peach text-xs md:text-[14px] font-bold leading-[14.4px]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large split branding */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-0 md:gap-[230px] mb-2 md:mb-[10px]">
          <div className="md:w-[768px]">
            <div className="overflow-hidden h-[80px] md:h-[245px] pt-1 md:pt-[14px]">
              <span className="text-peach text-[100px] md:text-[200px] xl:text-[313.3px] font-bold leading-[0.78] tracking-[-4px] md:tracking-[-13.44px]">
                {footer.brandLeft}
              </span>
            </div>
          </div>
          <div className="md:w-[768px] md:flex md:flex-col md:items-end">
            <div className="overflow-hidden h-[80px] md:h-[245px] pt-1 md:pt-[26px]">
              <span className="text-peach text-[100px] md:text-[200px] xl:text-[326.4px] font-bold leading-[0.75] tracking-[-4px] md:tracking-[-13.44px]">
                {footer.brandRight}
              </span>
            </div>
          </div>
        </div>

        {/* Subtitles */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <span className="text-peach text-base md:text-[24.6px] font-bold leading-[25.6px] md:ml-[162px]">
            {footer.subtitleLeft}
          </span>
          <span className="text-peach text-base md:text-[24.4px] font-bold leading-[25.6px]">
            {footer.subtitleRight}
          </span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 9: Verify responsiveness**

```bash
npm run dev
```

Open browser at `http://localhost:3000`. Test at:
- 1920px (desktop) — should match Figma closely
- 1280px (laptop) — content narrower, headings smaller
- 768px (tablet) — images in 2-col grid, headings scaled down
- 375px (mobile) — single column, shapes hidden, text readable

Kill dev server.

- [ ] **Step 10: Commit**

```bash
git add yulo-studio/components/
git commit -m "Add responsive breakpoints for tablet and mobile"
```

---

## Task 11: Polish & Build Verification

**Files:**
- Modify: `yulo-studio/app/layout.tsx` (SEO metadata)
- Modify: `yulo-studio/next.config.ts` (image config)
- Create: `yulo-studio/.gitignore` additions if needed

- [ ] **Step 1: Update next.config.ts for images**

Replace `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Update metadata in layout.tsx**

In `app/layout.tsx`, update the metadata export:

```tsx
export const metadata: Metadata = {
  title: "Yulo Studio — Transforming Brands, Building Futures",
  description:
    "A Nepal-based brand transformation studio working across strategy, design, and digital. We help companies succeed with websites, branding, and product design.",
  keywords: [
    "design studio",
    "brand design",
    "web design",
    "Nepal",
    "Yulo Studio",
  ],
  openGraph: {
    title: "Yulo Studio — Transforming Brands, Building Futures",
    description:
      "A Nepal-based brand transformation studio working across strategy, design, and digital.",
    type: "website",
  },
};
```

- [ ] **Step 3: Run production build**

```bash
cd /Users/aarohan/Yulo/yulo-studio && npm run build
```

Should complete without errors. Review the output for any warnings.

- [ ] **Step 4: Test production build locally**

```bash
npm run start
```

Open `http://localhost:3000`. Scroll through entire page. Verify all sections render, no hydration errors in console. Kill the server.

- [ ] **Step 5: Final commit**

```bash
git add yulo-studio/
git commit -m "Add SEO metadata and verify production build"
```

- [ ] **Step 6: Push to remote**

```bash
git push origin main
```
