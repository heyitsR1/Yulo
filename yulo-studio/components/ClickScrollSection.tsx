"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap";
import { siteContent } from "@/data/content";

const { clickScroll } = siteContent;

/** Floating shape definitions: image, position, size, parallax speed */
const SHAPES = [
  { src: "/images/shapes/big-circle-scroll1.png", cls: "left-[-13vw] top-[2vw] w-[42vw]", speed: -3, rot: 0 },
  { src: "/images/shapes/big-pill-scroll1.png", cls: "left-[19vw] top-[9vw] w-[28vw]", speed: -7, rot: 0 },
  { src: "/images/shapes/big-circle-scroll2.png", cls: "left-[35vw] top-[21vw] w-[34vw]", speed: -5, rot: 0 },
  { src: "/images/shapes/big-hexagon-scroll1.png", cls: "left-[69vw] top-[1vw] w-[32vw]", speed: -9, rot: 0 },
  { src: "/images/shapes/big-circle-scroll3.png", cls: "left-[72vw] top-[36vw] w-[18vw]", speed: -13, rot: 0 },
  { src: "/images/shapes/big-square-scroll1.png", cls: "left-[18.5vw] top-[35vw] w-[19vw]", speed: -11, rot: 0 },
];

// Only the small round accents get looped by the thread — the big blurry
// blobs are just background the line drifts past, like the reference.
const ACCENTS = [
  { posCls: "left-[60.5vw] top-[13vw] h-[2.7vw] w-[4.7vw]", shapeCls: "rounded-full bg-blue", speed: -15, ball: true },
  { posCls: "left-[20vw] top-[31.5vw] h-[3vw] w-[3vw]", shapeCls: "rounded-full bg-blue", speed: -8, ball: true },
  {
    posCls: "left-[69vw] top-[42vw] h-[2.4vw] w-[2.4vw]",
    shapeCls: "bg-blue [clip-path:polygon(50%_0,100%_38%,82%_100%,18%_100%,0_38%)]",
    speed: -18,
    ball: false,
  },
];

/**
 * The drawn thread that ran from the "ll" of "scroll" down through the shape
 * field read as visual noise, so it's switched off. Everything below is kept
 * intact behind this flag in case we want to revisit the idea.
 */
const ENABLE_NOODLE = false;

/**
 * A loose, hand-drawn-feeling lasso loop around (cx, cy): ~300° of an arc
 * (not a closed circle, so it reads as "wrapped around" rather than a
 * perfect ring) starting up-left of the ball and exiting down-left of it,
 * ready to continue toward the next point.
 */
function lassoLoop(cx: number, cy: number, r: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const pt = (deg: number) => ({ x: cx + r * Math.cos(toRad(deg)), y: cy + r * Math.sin(toRad(deg)) });
  const startDeg = 205;
  const sweepDeg = 300;
  const start = pt(startDeg);
  const mid = pt(startDeg + sweepDeg / 2);
  const end = pt(startDeg + sweepDeg);
  return {
    start,
    end,
    d: `A ${r} ${r} 0 0 1 ${mid.x} ${mid.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y} `,
  };
}

export default function ClickScrollSection() {
  const rootRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const lastBarRef = useRef<HTMLSpanElement>(null);
  const shapeElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const accentElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const noodleSvgRef = useRef<SVGSVGElement>(null);
  const noodlePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const shapesEl = shapesRef.current;
    if (!root || !shapesEl) return;

    let cleanupNoodle: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // The noodle path-builder is defined up front so the heading entrance
      // tween (below) can trigger a rebuild once it settles — the "ll" bars
      // sit inside a split line that animates in with a translateY, and
      // getBoundingClientRect includes that transform, so measuring too
      // early anchors the thread to the bars' pre-animation position.
      const svg = noodleSvgRef.current;
      const path = noodlePathRef.current;
      const lastBar = lastBarRef.current;
      let buildPath: (() => void) | null = null;

      // Thread/noodle disabled — the drawn line read as visual noise.
      // Kept in place (behind `false`) in case we want to revisit it.
      if (ENABLE_NOODLE && svg && path && lastBar) {
        buildPath = () => {
          const rootRect = root.getBoundingClientRect();
          const toLocal = (r: DOMRect) => ({
            x: r.left + r.width / 2 - rootRect.left,
            y: r.top + r.height / 2 - rootRect.top,
          });

          const barRect = lastBar.getBoundingClientRect();
          const start = {
            x: barRect.left + barRect.width / 2 - rootRect.left,
            y: barRect.bottom - rootRect.top,
          };

          const ballPoints: { x: number; y: number; r: number }[] = [];
          accentElRefs.current.forEach((el, i) => {
            if (!el || !ACCENTS[i].ball) return;
            const r = el.getBoundingClientRect();
            const c = toLocal(r);
            // loosely orbits the ball rather than hugging it
            ballPoints.push({ x: c.x, y: c.y, r: (Math.min(r.width, r.height) / 2) * 1.9 });
          });
          ballPoints.sort((a, b) => a.y - b.y);

          let d = `M ${start.x} ${start.y} `;
          let cursor = start;
          ballPoints.forEach((p, i) => {
            const loop = lassoLoop(p.x, p.y, p.r);
            // a lightly wavy approach into the loop, not a straight line
            const bow = i % 2 === 0 ? 1 : -1;
            const c1 = { x: cursor.x + (loop.start.x - cursor.x) * 0.35 + bow * 18, y: cursor.y + (loop.start.y - cursor.y) * 0.3 };
            const c2 = { x: cursor.x + (loop.start.x - cursor.x) * 0.7 - bow * 12, y: cursor.y + (loop.start.y - cursor.y) * 0.75 };
            d += `C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${loop.start.x} ${loop.start.y} `;
            d += loop.d;
            cursor = loop.end;
          });
          // tail off past the last ball
          const tail = { x: cursor.x - 30, y: cursor.y + 110 };
          d += `C ${cursor.x} ${cursor.y + 40}, ${tail.x} ${tail.y - 50}, ${tail.x} ${tail.y} `;

          path.setAttribute("d", d);

          const shapesRect = shapesEl.getBoundingClientRect();
          const height = shapesRect.bottom - rootRect.top + 100;
          svg.setAttribute("viewBox", `0 0 ${rootRect.width} ${height}`);
          svg.style.height = `${height}px`;

          const strokeWidth = Math.max(2.5, window.innerWidth * 0.0042);
          path.setAttribute("stroke-width", String(strokeWidth));

          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

          ScrollTrigger.getById("noodle")?.kill();
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              id: "noodle",
              trigger: root,
              start: "top 60%",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
          ScrollTrigger.refresh();
        };
      }

      // Heading lines rise in as the section enters
      const split = new SplitText(".cs-heading", { type: "lines" });
      gsap.from(split.lines, {
        yPercent: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 65%" },
        onComplete: () => buildPath?.(),
      });

      gsap.from(".cs-pill", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.7,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root, start: "top 55%" },
      });

      // "ll" bars — dashed pattern flows downward as the page scrolls
      gsap.to(".cs-scroll-bar", {
        backgroundPositionY: "+=54vw",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Shape field — continuous parallax drift
      root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.to(el, {
          y: `${speed}vw`,
          ease: "none",
          scrollTrigger: {
            trigger: shapesEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Gravity fall — each shape drops in and settles with a bounce as it
      // enters view, independent of the parallax drift above (separate inner
      // element so the two transforms don't stomp on each other).
      gsap.utils.toArray<HTMLElement>(".cs-shape-inner").forEach((inner, i) => {
        gsap.from(inner, {
          y: -70 - (i % 3) * 20,
          opacity: 0,
          duration: 1,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: inner,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Subtle tumble while falling/drifting, for physicality
      shapeElRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          rotate: i % 2 === 0 ? 10 : -10,
          ease: "none",
          scrollTrigger: {
            trigger: shapesEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      if (buildPath) {
        const build = buildPath;
        // Build once layout has settled (works even in a backgrounded tab,
        // unlike requestAnimationFrame which browsers can suspend entirely),
        // and again once the heading's entrance transform completes (above).
        build();
        const t1 = setTimeout(build, 300);
        const t2 = setTimeout(build, 1200);
        document.fonts?.ready?.then(build);
        window.addEventListener("resize", build);
        cleanupNoodle = () => {
          clearTimeout(t1);
          clearTimeout(t2);
          window.removeEventListener("resize", build);
        };
      }
    }, root);

    return () => {
      cleanupNoodle?.();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative w-full overflow-clip bg-bg-warm">
      <div className="mx-auto w-fit pt-[16vw] pb-[6vw]">
        <h2 className="cs-heading text-[8.9vw] leading-[1.06] font-semibold tracking-[-0.045em] text-[#b3a89d]">
          <span className="block pl-[0.5vw]">{clickScroll.line1}</span>
          <span className="block">{clickScroll.line2}</span>
          <span className="block">
            <span className="relative mr-[2.2vw] inline-block px-[3vw]">
              <span className="cs-pill absolute inset-0 rounded-full bg-peach" />
              <span className="relative z-10 text-bg-warm">
                {clickScroll.click}
              </span>
            </span>
            <span>{clickScroll.mid} </span>
            <span className="text-[#f5b48d]">{clickScroll.scroll}</span>
            <span className="ml-[1.2vw] inline-flex translate-y-[0.6vw] gap-[0.6vw]">
              <span className="cs-scroll-bar inline-block h-[6.2vw] w-[0.5vw] overflow-hidden rounded-full" />
              <span ref={lastBarRef} className="cs-scroll-bar inline-block h-[6.2vw] w-[0.5vw] overflow-hidden rounded-full" />
            </span>
          </span>
          <span className="block">{clickScroll.line4}</span>
        </h2>
      </div>

      {/* Floating 3D shape field */}
      <div ref={shapesRef} className="cs-shapes relative h-[58vw] w-full">
        {SHAPES.map((s, i) => (
          <div
            key={s.src}
            ref={(el) => {
              shapeElRefs.current[i] = el;
            }}
            data-speed={s.speed}
            className={`absolute ${s.cls}`}
            style={{ rotate: `${s.rot}deg` }}
          >
            <div className="cs-shape-inner">
              <Image
                src={s.src}
                alt=""
                width={900}
                height={900}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        ))}
        {ACCENTS.map((a, i) => (
          <div
            key={i}
            ref={(el) => {
              accentElRefs.current[i] = el;
            }}
            data-speed={a.speed}
            className={`absolute ${a.posCls}`}
          >
            <div className={`cs-shape-inner h-full w-full ${a.shapeCls}`} />
          </div>
        ))}
      </div>

      {/* Thread (disabled — see ENABLE_NOODLE) */}
      {ENABLE_NOODLE && (
        <svg
          ref={noodleSvgRef}
          className="pointer-events-none absolute top-0 left-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            ref={noodlePathRef}
            d=""
            fill="none"
            stroke="#f99e76"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </section>
  );
}
