"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { siteContent } from "@/data/content";

const { cta, email } = siteContent;

export default function CTACard() {
  const rootRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll(".cta-fill").forEach((el) => {
        const split = new SplitText(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.3 },
          {
            opacity: 1,
            stagger: 0.08,
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

      gsap.from(".cta-card", {
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative z-10 w-full rounded-b-[3vw] bg-[#a8a6a5] px-[4vw] py-[6vw]"
    >
      <div className="cta-card overflow-hidden rounded-[3vw] border border-peach/70">
        <div className="px-[5vw] pt-[8vw] pb-[7vw]">
          <h2 className="cta-fill max-w-[70vw] text-[7.2vw] leading-[1.02] font-semibold tracking-[-0.045em] text-white">
            {cta.headline}
          </h2>
          <p className="cta-fill mt-[2.5vw] text-[1.8vw] font-semibold tracking-[0.01em] text-white/90">
            {cta.sub}
          </p>
        </div>

        <a
          href={`mailto:${email}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex h-[16.5vw] items-center justify-between bg-peach px-[5vw]"
        >
          <span
            className="flex h-[6vw] w-[6vw] items-center justify-center transition-transform duration-500"
            style={{ transform: hovered ? "translateX(1vw)" : "none" }}
          >
            <svg viewBox="0 0 68 57" fill="none" className="h-auto w-[4.2vw]">
              <path
                d="M1 28.5h62m0 0L40 4m23 24.5L40 53"
                stroke="#96908C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="relative overflow-hidden text-right">
            <span
              className="block text-[7vw] leading-[1.05] font-semibold tracking-[-0.045em] text-blue transition-transform duration-500"
              style={{
                transform: hovered ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              {cta.action}
            </span>
            <span
              className="absolute inset-0 flex items-center justify-end text-[3.4vw] font-semibold tracking-[-0.02em] text-blue transition-transform duration-500"
              style={{
                transform: hovered ? "translateY(0)" : "translateY(100%)",
              }}
            >
              {email}
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
