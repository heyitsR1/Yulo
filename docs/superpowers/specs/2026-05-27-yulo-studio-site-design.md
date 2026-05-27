# Yulo Studio — Website Design Spec

## Overview

Single-page portfolio/agency website for Yulo Studio, built to attract business leads. Desktop-first showpiece with basic mobile fallback. Static content, no CMS. Deployed on Vercel.

**Stack:** Next.js 15 (App Router) + Tailwind CSS 4 + TypeScript

**Figma source:** `https://www.figma.com/design/7vJcpuzhifGxyQhEADrXlf/Untitled--Copy-?node-id=1-1562`

---

## Design Tokens

### Colors

| Token            | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| `bg-warm`        | `#FAF6EF` | Main page background           |
| `peach`          | `#FFBC95` | Primary accent, CTAs, highlights |
| `blue`           | `#2E54FE` | Secondary accent, folder, links |
| `text-muted`     | `#96908C` | Body text, headings             |
| `gray-mid`       | `#A8A6A5` | CTA card background             |
| `white`          | `#FFFFFF` | Hero text, CTA card text        |
| `text-muted-alt` | `#97908C` | Slight variation of muted       |
| `peach-warm`     | `#FAB68E` | "like:" accent word             |

### Typography

All text uses **Arial** (system font — no web font loading needed).

| Role              | Size     | Weight | Line Height | Letter Spacing |
|-------------------|----------|--------|-------------|----------------|
| Hero heading      | 136.6px  | Bold   | 157.65px    | -6.72px        |
| Section headline  | 156.5px  | Bold   | 146.88px    | -7.68px        |
| Service title     | 70-76px  | Bold   | 69.12px     | -2.88px        |
| CTA heading       | 110.8px  | Bold   | 115.2px     | -5.76px        |
| "Work" bg text    | 825.6px  | Bold   | 825.6px     | -19.2px        |
| Footer branding   | 313-326px| Bold   | 244.8px     | -13.44px       |
| Body copy         | 16-17px  | Bold   | 24.64px     | +0.48px        |
| Nav links         | 14.2px   | Bold   | 16-20px     | 0              |
| Footer small      | 14-14.4px| Regular/Bold | 14.4px | 0             |
| CTA subtitle      | 27.3px   | Bold   | 46px        | +0.48px        |
| "Let's talk"      | 109.8px  | Bold   | 107.14px    | -5.76px        |

### Spacing

- Page side padding: `76.8px` (4% of 1920)
- Content max-width: `1766.39px` (1920 - 2 * 76.8)
- Service image gap: `9.6px`
- Service block internal gap: ~`27-31px`
- CTA card border-radius: `96px`
- CTA card padding: `96px`
- Nav pill border-radius: `90px`

---

## Page Sections

### 1. Navbar

**Component:** `Navbar.tsx` (client component for scroll behavior)

- **Position:** Fixed top, full width, transparent background
- **Left:** "Yulo" + blue dot (6.4px, `#2E54FE`, rounded) + "Studios" — white text, ~21px Bold
- **Center:** "About" and "Work" as frosted glass pills (`backdrop-blur-[5.5px]`, `bg-[rgba(80,80,80,0.31)]`, `rounded-[90px]`), peach text. Center icon/logo between them.
- **Right:** "Email", "in", "x" as text links, peach color, same pill style but transparent bg
- **Behavior (base):** Static positioned. Anchor links scroll to sections.
- **Mobile:** Collapse to logo + hamburger or simplified layout.

### 2. Hero Section

**Component:** `HeroSection.tsx` (server component, static)

- **Height:** ~984px (viewport height)
- **Background:** Image with warm gradient overlay. Top glow effect with blur mask.
- **Content:** "Transforming Brands, Building Futures" — large white text centered
- **Subtitle:** Smaller text below the heading
- **Overlay:** Gradient/glow at top, blurred edge effect
- **Asset needed:** Hero background image (will use placeholder gradient initially)
- **Mobile:** Reduce heading size, maintain centered layout

### 3. Click & Scroll Section

**Component:** `ClickScrollSection.tsx` (client component for future animations)

- **Total height:** ~2246px
- **Structure:** Two zones stacked:
  1. **Sticky text zone** (~823px): Large text "We are making users click and scroll our designs"
     - "click" sits inside a peach pill (`#FFBC95`, rounded-full, 384x163px)
     - "scroll" in peach color inline
     - Text color: `#96908D` at 136.6px Bold
  2. **Floating shapes zone** (~1174px): Absolutely positioned 3D geometric shapes
     - `big-circle-scroll1.png` — large sphere, left side, rotated 59.82deg
     - `big-circle-scroll2.png` — large sphere, center-right
     - `big-circle-scroll3.png` — small sphere, far right
     - `big-pill-scroll1.png` — pill/capsule shape, upper center
     - `big-hexagon-scroll1.png` — hexagon, far right, partially clipped
     - `big-square-scroll1.png` — rounded square/cube, lower left
     - Small blue accent shapes (circle, pill, hexagon) in `#2E54FE`
     - Line illustration weaving through shapes
- **Assets:** All shape PNGs exportable from Figma. Blue accents are SVG components.
- **Mobile:** Stack vertically, reduce text size, shapes at reduced scale or hidden.

### 4. Services Section

**Component:** `ServicesSection.tsx` (server component) + `ServiceCard.tsx` (reusable)

- **Header:**
  - Label: "Design Expert" — 20px Bold, muted
  - Headline: "We help companies to succeed on projects like:" — 156.5px Bold, muted, "like:" in peach-warm (`#FAB68E`)
  - Large decorative gradient shadow/line behind services

- **Service blocks** (4 total, each ~883px tall except last at ~638px):

  | # | Title                        | Description                                                                                   |
  |---|------------------------------|-----------------------------------------------------------------------------------------------|
  | 1 | Websites & Landing pages     | Creating high-end and beautiful websites built to perform and convert.                        |
  | 2 | Visual Branding              | Helping brands find a distinctive visual language that truly stands out.                      |
  | 3 | Product Design Enhancement   | Bringing fresh ideas to turn complex products into intuitive experiences with an elevated visual layer. |
  | 4 | Webflow & Framer             | Building elegant and responsive projects featuring creative micro-interactions and seamless CMS hand-off. |

- **Each block layout:**
  - Centered title (70-76px Bold, muted) + body text (16-17px, centered, muted)
  - Horizontal image strip: 5 images per row, `gap-[9.6px]`, `rounded-[4px]`, equal flex widths
  - Some images are static JPGs, some are video placeholders (same loading thumbnail)

- **Service #4 (Webflow & Framer):** No image strip. Decorative SVG frames around "Webflow" and "Framer" text.

- **Portfolio images per service:**
  - Service 1: home-work1.jpg, video-placeholder, home-work2.jpg, video-placeholder, home-work3.jpg
  - Service 2: video-placeholder, home-work7.jpg, video-placeholder, home-work8.jpg, home-work9.jpg
  - Service 3: home-work4.jpg, video-placeholder, home-work5.jpg, home-work6.jpg, video-placeholder

- **Mobile:** Single column, images in 2-col grid or horizontal scroll.

### 5. Work CTA Section

**Component:** `WorkCTA.tsx` (server component)

- **Height:** ~1210px
- **Background text:** "Work" at 825.6px Bold, peach at 30% opacity, centered
- **Foreground content (centered):**
  - "Curious?... Check out my" — 16.8px body text
  - Folder illustration (3 layers stacked): `folder-icon-back.png`, `projects-folder.png`, `folder-icon-front.png`
  - "Or keep scrolling" — 16.8px body text
- **Folder is a link** (destination TBD — placeholder `#` for now)
- **Mobile:** Reduce "Work" text size, maintain folder illustration.

### 6. CTA Card Section

**Component:** `CTACard.tsx` (client component for hover interactions)

- **Container:** Gray background (`#A8A6A5`), 96px vertical padding
- **Card:** `rounded-[96px]`, peach border (1px), overflow hidden, width ~1766px
  - **Top zone:** White text on gray — "Let's build something people remember" (110.8px Bold) + "from global tech companies to growing startups." (27.3px)
  - **Bottom strip:** Peach background (`#FFBC95`), ~269px tall
    - Left: Arrow icon (circle border + arrow SVG)
    - Right: "Let's talk" in blue (`#2E54FE`, 109.8px Bold)
    - Hidden on hover: email "Juan@morable.co" (replace with actual Yulo email)
- **Behavior (base):** "Let's talk" is a `mailto:` link. Hover reveals email (future animation).
- **Mobile:** Reduce border-radius, shrink typography, stack layout.

### 7. Footer

**Component:** `Footer.tsx` (server component)

- **Height:** 1200px
- **Background:** Full-bleed image/video (placeholder dark gradient initially)
- **Content over background:**
  - **Right column:** "Website made using:" + list (Figma, Next.js, GSAP, Tailwind CSS, Lenis Scroll)
  - **Large split text:** "Yulo" left (313px) + "Studio" right (326px) in peach
  - **Subtitles:** "Your Tech Partner" left + "Your Design Studio" right (24-25px Bold)
- **Mobile:** Stack "Yulo" and "Studio" vertically, reduce sizes.

---

## Data Architecture

All content centralized in `data/content.ts`:

```typescript
export const siteContent = {
  nav: {
    brand: { name: "Yulo", suffix: "Studios" },
    links: [
      { label: "About", href: "#services" },
      { label: "Work", href: "#work" },
    ],
    social: [
      { label: "Email", href: "mailto:..." },
      { label: "in", href: "https://linkedin.com/..." },
      { label: "x", href: "https://x.com/..." },
    ],
  },
  hero: {
    heading: "Transforming Brands, Building Futures",
    subtitle: "...",
  },
  clickScroll: {
    // text content
  },
  services: {
    headline: "We help companies to succeed on projects like:",
    items: [ /* 4 service objects */ ],
  },
  workCta: { /* ... */ },
  cta: { /* ... */ },
  footer: { /* ... */ },
};
```

This makes future content changes a single-file edit.

---

## Asset Strategy

1. **Figma MCP export:** Download all raster assets (shape PNGs, portfolio JPGs, folder PNGs) from the Figma MCP asset URLs and save to `public/images/`.
2. **SVG components:** Small blue accent shapes and decorative frames are simple SVGs — extract and inline as React components.
3. **Placeholders:** Hero background and footer background will use CSS gradients until actual assets are provided.
4. **Image optimization:** Use Next.js `<Image>` component with proper `width`/`height` for all raster images. Static export means images are optimized at build time.

---

## Responsive Strategy

**Breakpoints:**
- `>= 1920px`: Full design fidelity (match Figma 1:1)
- `1280-1919px`: Scaled proportionally, content area narrows
- `768-1279px`: Tablet — reduce heading sizes ~60%, 2-col image grids
- `< 768px`: Mobile — single column, drastically reduced typography, shapes section simplified/hidden

**Approach:** Desktop-first. Use Tailwind responsive prefixes (`md:`, `lg:`, `xl:`) to scale down. Typography uses `clamp()` for fluid scaling on key headings.

---

## Phase Plan (Base Build)

**Phase 1 — Scaffold & Tokens**
- Initialize Next.js project with Tailwind
- Configure `tailwind.config.ts` with all design tokens
- Set up font (Arial system font), global CSS custom properties
- Create project structure (components/, data/, public/images/)

**Phase 2 — Static Sections (top to bottom)**
- Build each section component with hardcoded content
- Pull and save all available assets from Figma MCP
- Desktop layout only in this phase

**Phase 3 — Responsive**
- Add breakpoints for tablet and mobile
- Fluid typography with clamp()
- Test across viewport sizes

**Phase 4 — Polish & Deploy**
- Smooth scroll (Lenis or CSS `scroll-behavior: smooth`)
- Anchor link navigation
- SEO metadata, favicon, OG images
- Deploy to Vercel

**Phase 5 (Future) — Animations**
- GSAP scroll-triggered animations
- Parallax on 3D shapes
- Service card reveal animations
- Custom cursor
- Lottie integration (if assets provided)
- Hover interactions (folder, CTA email reveal)

---

## Out of Scope (Base Build)

- Scroll animations / GSAP / Lottie
- Custom cursor
- Video backgrounds / video embeds
- Parallax effects on shapes
- Dark mode
- Additional pages (About, Work detail)
- CMS integration
- Analytics / tracking
- Contact form
