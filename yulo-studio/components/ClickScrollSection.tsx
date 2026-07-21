"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
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

const ACCENTS = [
  { cls: "left-[60.5vw] top-[13vw] h-[2.7vw] w-[4.7vw] rounded-full", speed: -15 },
  { cls: "left-[20vw] top-[31.5vw] h-[3vw] w-[3vw] rounded-full", speed: -8 },
  {
    cls: "left-[69vw] top-[42vw] h-[2.4vw] w-[2.4vw] [clip-path:polygon(50%_0,100%_38%,82%_100%,18%_100%,0_38%)]",
    speed: -18,
  },
];

export default function ClickScrollSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Heading lines rise in as the section enters
      const split = new SplitText(".cs-heading", { type: "lines" });
      gsap.from(split.lines, {
        yPercent: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 65%" },
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

      // Shape field parallax — each drifts upward at its own rate
      root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.to(el, {
          y: `${speed}vw`,
          ease: "none",
          scrollTrigger: {
            trigger: ".cs-shapes",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
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
              <span className="cs-scroll-bar inline-block h-[6.2vw] w-[0.5vw] overflow-hidden rounded-full" />
            </span>
          </span>
          <span className="block">{clickScroll.line4}</span>
        </h2>
      </div>

      {/* Floating 3D shape field */}
      <div className="cs-shapes relative h-[58vw] w-full">
        {SHAPES.map((s) => (
          <div
            key={s.src}
            data-speed={s.speed}
            className={`absolute ${s.cls}`}
            style={{ rotate: `${s.rot}deg` }}
          >
            <Image
              src={s.src}
              alt=""
              width={900}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
        {ACCENTS.map((a, i) => (
          <div
            key={i}
            data-speed={a.speed}
            className={`absolute bg-blue ${a.cls}`}
          />
        ))}

        {/* Cream rope curve weaving through the field */}
        <svg
          data-speed={-12}
          className="absolute left-[55vw] top-[-4vw] h-[52vw] w-[26vw]"
          viewBox="0 0 400 800"
          fill="none"
        >
          <path
            d="M300 -40 C 420 160, 180 300, 240 460 C 285 580, 180 660, 120 700"
            stroke="#f5e9dc"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
