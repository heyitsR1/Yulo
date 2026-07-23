"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteContent } from "@/data/content";

const { statement } = siteContent;

/**
 * A single large statement that fills in word by word as the section crosses
 * the viewport, followed by a slow stack ticker. Deliberately quiet — it sits
 * between the busy hero and the services showcase and gives the page a beat.
 */
export default function StatementSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.to(".st-word", {
        opacity: 1,
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: ".st-copy",
          start: "top 78%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });

      gsap.from(".st-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-clip bg-bg-warm pt-[16vw] pb-[10vw]"
    >
      <div className="px-[4vw]">
        <p className="text-[clamp(12px,1.1vw,17px)] font-semibold tracking-[0.14em] text-grey uppercase">
          {statement.label}
        </p>
        <span className="st-rule mt-[1.4vw] block h-px w-full bg-grey/25" />

        <p className="st-copy mt-[4vw] max-w-[76vw] text-[clamp(26px,4.6vw,86px)] leading-[1.14] font-semibold tracking-[-0.04em]">
          {statement.words.map((w, i) => (
            <span key={i} className="inline-block">
              <span
                className={`st-word inline-block opacity-[0.16] ${
                  w.accent ? "text-peach-deep" : "text-text-dark"
                }`}
              >
                {w.text}
              </span>
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </p>
      </div>

      {/* Stack ticker — duplicated once so the loop has no seam */}
      <div className="mt-[7vw] flex w-full overflow-hidden border-y border-grey/20 py-[1.6vw] select-none">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="st-ticker flex shrink-0 items-center gap-[3vw] pr-[3vw]"
          >
            {statement.ticker.map((item) => (
              <span
                key={item}
                className="flex shrink-0 items-center gap-[3vw] text-[clamp(13px,1.5vw,24px)] font-semibold tracking-[-0.01em] whitespace-nowrap text-grey-dark/60"
              >
                {item}
                <span className="h-[0.45vw] w-[0.45vw] shrink-0 rounded-full bg-peach-deep" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
