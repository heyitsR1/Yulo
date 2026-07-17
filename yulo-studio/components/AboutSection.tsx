"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { siteContent } from "@/data/content";

const { manifesto, about } = siteContent;

export default function AboutSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Background photo fades in behind the type as you move through
      gsap.fromTo(
        ".about-photo",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "top -20%",
            scrub: true,
          },
        }
      );

      // Manifesto lines drift laterally while their words fill with color
      gsap.fromTo(
        ".mani-a",
        { xPercent: 6 },
        {
          xPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-manifesto",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        ".mani-b",
        { xPercent: -3 },
        {
          xPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-manifesto",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      root.querySelectorAll(".about-fill").forEach((el) => {
        const split = new SplitText(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.25 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });

      // Checklist rows: divider draws, check + text fade in
      root.querySelectorAll(".about-point").forEach((row) => {
        gsap.from(row.querySelector(".point-line"), {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            end: "top 70%",
            scrub: true,
          },
        });
      });

      gsap.from(".about-cta", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-cta", start: "top 92%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      data-nav-dark
      className="relative w-full overflow-clip"
    >
      {/* dark photography backdrop */}
      <div
        className="about-photo grain absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${about.photo})` }}
      >
        <div className="absolute inset-0 bg-[#3a2415]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#8a5c38]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-warm via-transparent to-bg-warm" />
      </div>

      {/* Manifesto */}
      <div className="about-manifesto relative flex min-h-[160vh] flex-col items-center justify-center py-[14vw]">
        <h2 className="w-full text-[10.5vw] leading-[1.02] font-semibold tracking-[-0.045em] whitespace-nowrap text-peach">
          <span className="mani-a about-fill block pl-[6vw]">
            {manifesto.lineA}
          </span>
          <span className="mani-b about-fill block pl-[26vw]">
            {manifesto.lineB}
          </span>
        </h2>
        <div className="mt-[4vw] h-px w-[56vw] bg-peach/40" />
        <p className="about-fill mt-[3.5vw] text-[3vw] font-semibold tracking-[-0.02em] text-peach-deep">
          {manifesto.lineC}
        </p>
      </div>

      {/* Perspective + checklist */}
      <div className="relative px-[4vw] pb-[10vw]">
        <p className="about-fill text-[2vw] font-semibold text-peach-deep">
          {about.intro}
        </p>
        <h3 className="about-fill mt-[0.5vw] text-[8vw] leading-[0.98] font-semibold tracking-[-0.045em] text-peach">
          {about.heading[0]}
          <br />
          {about.heading[1]}
        </h3>
        <div className="mt-[3vw] h-px w-full bg-peach/50" />

        <ul className="mt-[3vw] max-w-[46vw] min-w-[320px]">
          {about.points.map((point) => (
            <li key={point} className="about-point relative py-[1.8vw]">
              <div className="flex items-start gap-[1.2vw]">
                <svg
                  className="mt-[0.4vw] h-[1.3vw] w-[1.3vw] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 12.5 L9.5 18 L20 6.5"
                    stroke="#f2c4a2"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="about-fill text-[clamp(16px,1.7vw,26px)] leading-[1.35] font-semibold text-peach">
                  {point}
                </p>
              </div>
              <span className="point-line absolute bottom-0 left-0 h-px w-full bg-peach/35" />
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="about-cta group mt-[4vw] inline-flex items-center gap-[10px]"
        >
          <span className="rounded-full bg-[rgba(120,114,108,0.55)] px-[22px] py-[14px] text-[14px] font-semibold text-white/90 backdrop-blur-sm transition-colors duration-300 group-hover:bg-[rgba(90,84,78,0.7)]">
            {about.cta}
          </span>
          <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-peach transition-transform duration-300 group-hover:translate-x-1">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path
                d="M1 7h15M11 1.5 16.5 7 11 12.5"
                stroke="#8c6f5a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
