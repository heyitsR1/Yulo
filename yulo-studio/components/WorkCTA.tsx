"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { siteContent } from "@/data/content";

const { workCta } = siteContent;

const PAPERS = [
  "/images/work/markee/hero.jpg",
  "/images/work/hithx/hero.jpg",
  "/images/work/tailsgate/hero.jpg",
];

export default function WorkCTA() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Giant background word slides sideways with scroll
      gsap.fromTo(
        ".work-bg-word",
        { xPercent: 12 },
        {
          xPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Papers rise out of the folder as it approaches mid-viewport
      gsap.fromTo(
        ".work-paper",
        { yPercent: 60 },
        {
          yPercent: 0,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".work-folder",
            start: "top 90%",
            end: "top 45%",
            scrub: 0.4,
          },
        }
      );

      // Microcopy fills word by word
      root.querySelectorAll(".work-fill").forEach((el) => {
        const split = new SplitText(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.35 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });

      // Folder hover: papers peek up
      const folder = root.querySelector(".work-folder");
      if (folder) {
        const onEnter = () =>
          gsap.to(".work-paper", { y: "-8%", duration: 0.45, ease: "power2.out", stagger: 0.04 });
        const onLeave = () =>
          gsap.to(".work-paper", { y: "0%", duration: 0.5, ease: "power2.inOut", stagger: 0.04 });
        folder.addEventListener("mouseenter", onEnter);
        folder.addEventListener("mouseleave", onLeave);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={rootRef}
      className="relative flex min-h-[95vh] w-full flex-col items-center justify-center overflow-clip bg-bg-warm py-[6vw]"
    >
      <span className="work-bg-word pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[36vw] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap text-peach/40 select-none">
        {workCta.bgWord}
      </span>

      <p className="work-fill relative z-10 text-[clamp(13px,1.1vw,17px)] font-semibold tracking-[0.02em] text-grey">
        {workCta.pre}
      </p>

      <Link
        href={workCta.href}
        className="work-folder relative z-10 mt-[3.5vw] block w-[24vw] max-w-[460px] min-w-[240px]"
        aria-label="Open our work"
      >
        {/* folder back */}
        <div className="relative">
          <Image
            src="/images/work/folder-icon-back.png"
            alt=""
            width={904}
            height={740}
            className="h-auto w-full"
          />
          {/* papers rising out of the folder mouth */}
          <div className="absolute inset-x-[5%] top-[6%] bottom-[42%]">
            {PAPERS.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={src}
                src={src}
                alt=""
                className="work-paper absolute rounded-t-[8px] border border-black/10 bg-white object-cover object-top shadow-[0_-4px_14px_rgba(0,0,0,0.12)]"
                style={{
                  left: `${4 + i * 4}%`,
                  right: `${4 + (2 - i) * 4}%`,
                  top: `${i * 9}%`,
                  height: "100%",
                  zIndex: 3 - i,
                }}
              />
            ))}
          </div>
          {/* folder front */}
          <div className="absolute inset-x-[-3%] bottom-[-2%] z-20">
            <Image
              src="/images/work/folder-front-clean.png"
              alt=""
              width={782}
              height={542}
              className="h-auto w-full"
            />
          </div>
        </div>
      </Link>

      <p className="work-fill relative z-10 mt-[3.5vw] text-[clamp(13px,1.1vw,17px)] font-semibold tracking-[0.02em] text-grey">
        {workCta.post}
      </p>
    </section>
  );
}
