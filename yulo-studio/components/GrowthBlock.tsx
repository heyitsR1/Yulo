"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteContent } from "@/data/content";

const { growth } = siteContent.services;

/**
 * Block 02. No product screenshots on purpose — the previous version repeated
 * the same cards under every heading. Growth work is shown as the thing the
 * client actually cares about: a search result, and the list that gets it there.
 */
export default function GrowthBlock() {
  const rootRef = useRef<HTMLElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".gr-head > *", {
        yPercent: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 74%" },
      });

      // Query types itself out, then the results drop in underneath it
      const query = growth.serp.query;
      const target = { chars: 0 };
      const queryEl = root.querySelector<HTMLElement>(".gr-query");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".gr-serp", start: "top 76%" },
      });

      tl.from(".gr-serp", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      if (queryEl) {
        queryEl.textContent = "";
        tl.to(
          target,
          {
            chars: query.length,
            duration: 1.1,
            ease: "none",
            onUpdate: () => {
              queryEl.textContent = query.slice(0, Math.round(target.chars));
            },
          },
          "-=0.35"
        );
      }

      tl.to(caretRef.current, { opacity: 0, duration: 0.2 });
      tl.from(
        ".gr-result",
        {
          y: 22,
          opacity: 0,
          stagger: 0.14,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.1"
      );

      gsap.from(".gr-check", {
        x: -18,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gr-list", start: "top 82%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="w-full px-[4vw]">
      <div className="gr-head max-w-[52ch]">
        <p className="text-[clamp(12px,1.1vw,17px)] font-semibold tracking-[0.14em] text-blue uppercase">
          {growth.eyebrow}
        </p>
        <h3 className="mt-[3vw] text-[clamp(30px,4.6vw,80px)] lg:mt-[1.2vw] leading-[1.02] font-semibold tracking-[-0.045em]">
          <span className="text-grey-dark/70">{growth.titlePlain} </span>
          <span className="text-peach-deep/85">{growth.titleAccent}</span>
        </h3>
        <p className="mt-[4vw] max-w-[46ch] lg:mt-[1.6vw] text-[clamp(14px,1.15vw,19px)] leading-[1.5] font-semibold text-grey">
          {growth.description}
        </p>
      </div>

      <div className="mt-[6vw] flex flex-col items-start gap-[4vw] lg:flex-row lg:gap-[5vw]">
        {/* Mock search results page */}
        <div className="gr-serp w-full rounded-[14px] border border-grey/15 bg-white/70 p-[5vw] shadow-[0_1vw_3vw_rgba(70,58,46,0.09)] lg:w-[58%] lg:p-[2vw]">
          <div className="flex items-center gap-[0.9vw] rounded-full border border-grey/20 bg-bg-warm/60 px-[4vw] py-[2.6vw] lg:px-[1.4vw] lg:py-[0.9vw]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-[1.2vw] max-h-[18px] min-h-[13px] w-[1.2vw] max-w-[18px] min-w-[13px] shrink-0 stroke-grey"
              fill="none"
              strokeWidth={2.2}
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5 21 21" />
            </svg>
            <span className="text-[clamp(12px,1.05vw,17px)] font-semibold text-text-dark">
              <span className="gr-query">{growth.serp.query}</span>
              <span
                ref={caretRef}
                className="ml-[2px] inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-peach-deep align-middle"
              />
            </span>
          </div>

          <div className="mt-[5vw] flex flex-col gap-[5vw] lg:mt-[2vw] lg:gap-[2vw]">
            {growth.serp.results.map((r) => (
              <div key={r.url} className="gr-result">
                <div className="flex items-center gap-[2vw] lg:gap-[0.7vw]">
                  <span className="relative h-[1.6vw] max-h-[24px] min-h-[17px] w-[1.6vw] max-w-[24px] min-w-[17px] shrink-0 overflow-hidden rounded-[24%]">
                    <Image
                      src={r.favicon}
                      alt=""
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </span>
                  <span className="min-w-0 text-[clamp(10px,0.85vw,14px)] leading-tight font-semibold">
                    <span className="block truncate text-text-dark">
                      {r.site}
                    </span>
                    <span className="block truncate text-grey">{r.url}</span>
                  </span>
                </div>
                <p className="mt-[2vw] text-[clamp(14px,1.35vw,22px)] lg:mt-[0.7vw] leading-[1.25] font-semibold tracking-[-0.02em] text-[#1a41c9]">
                  {r.title}
                </p>
                <p className="mt-[1.4vw] max-w-[62ch] lg:mt-[0.4vw] text-[clamp(12px,1vw,16px)] leading-[1.45] font-semibold text-grey">
                  {r.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What actually gets shipped */}
        <ul className="gr-list w-full lg:w-[42%]">
          {growth.checklist.map((line) => (
            <li
              key={line}
              className="gr-check flex items-start gap-[3vw] border-b border-grey/20 py-[3.5vw] first:border-t lg:gap-[1.1vw] lg:py-[1.4vw]"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="mt-[0.25em] h-[1.2vw] max-h-[20px] min-h-[14px] w-[1.2vw] max-w-[20px] min-w-[14px] shrink-0 stroke-peach-deep"
                fill="none"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12.5 9.5 18 20 6" />
              </svg>
              <span className="text-[clamp(14px,1.2vw,20px)] leading-[1.4] font-semibold text-grey-dark">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
