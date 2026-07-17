"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface TitleSegment {
  text: string;
  accent?: boolean;
}

interface ServiceBlockProps {
  index: number;
  lines: TitleSegment[][];
  selection?: { plain: string; amp: string; accent: string };
  description: string;
  images: string[];
}

/**
 * One service: centered two-tone title + copy, then a strip of five cards
 * that lie flat in perspective and rotate up into a row as you scroll.
 * The selection variant renders design-tool selection boxes around the
 * title words instead of an image strip.
 */
export default function ServiceBlock({
  lines,
  selection,
  description,
  images,
}: ServiceBlockProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".svc-title, .svc-copy", {
        yPercent: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });

      if (!selection) {
        const cards = root.querySelectorAll(".svc-card");
        gsap.fromTo(
          cards,
          {
            rotateX: -88,
            yPercent: 30,
            scale: 1.15,
            opacity: 0.95,
          },
          {
            rotateX: 0,
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            stagger: { each: 0.035, from: "center" },
            scrollTrigger: {
              trigger: ".svc-strip",
              start: "top 98%",
              end: "top 42%",
              scrub: 0.4,
            },
          }
        );
      } else {
        gsap.from(".svc-selection", {
          opacity: 0,
          scale: 0.85,
          transformOrigin: "top left",
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.15,
          scrollTrigger: { trigger: root, start: "top 60%" },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [selection]);

  return (
    <div ref={rootRef} className="flex w-full flex-col items-center pb-[13vw]">
      <div className="flex w-full flex-col items-center px-[4vw] text-center">
        {selection ? (
          <h3 className="svc-title text-[4.8vw] leading-[1.12] font-semibold tracking-[-0.04em]">
            <span className="svc-selection relative inline-block border border-blue/50 px-[1.2vw]">
              <span className="absolute -top-[1vw] left-[-1px] h-[0.8vw] w-[2vw] rounded-[0.3vw] bg-blue" />
              <span className="absolute -top-[0.3vw] -left-[0.3vw] h-[0.55vw] w-[0.55vw] border border-blue/50 bg-bg-warm" />
              <span className="absolute -right-[0.3vw] -bottom-[0.3vw] h-[0.55vw] w-[0.55vw] border border-blue/50 bg-bg-warm" />
              <span className="text-grey-dark/70">{selection.plain}</span>
            </span>{" "}
            <span className="text-grey-dark/45">{selection.amp}</span>
            <br />
            <span className="svc-selection relative mt-[0.5vw] inline-block border border-[#7eb2f7]/70 px-[1.2vw]">
              <span className="absolute top-1/2 -left-[2.6vw] flex h-[1.6vw] w-[1.6vw] -translate-y-1/2 items-center justify-center">
                <span className="h-full w-[46%] rounded-l-full bg-[#2f7df6]" />
                <span className="ml-[8%] h-full w-[46%] rounded-r-full bg-[#2f7df6]" />
              </span>
              <span className="text-peach/85">{selection.accent}</span>
            </span>
          </h3>
        ) : (
          <h3 className="svc-title text-[4.8vw] leading-[0.98] font-semibold tracking-[-0.04em]">
            {lines.map((segments, i) => (
              <span key={i} className="block">
                {segments.map((seg, j) => (
                  <span
                    key={j}
                    className={
                      seg.accent ? "text-peach/85" : "text-grey-dark/70"
                    }
                  >
                    {seg.text}
                  </span>
                ))}
              </span>
            ))}
          </h3>
        )}
        <p className="svc-copy mt-[1.8vw] max-w-[430px] text-[clamp(13px,1.1vw,17px)] leading-[1.5] font-semibold tracking-[0.02em] text-grey">
          {description}
        </p>
      </div>

      {!selection && (
        <div
          className="svc-strip mt-[5vw] w-full px-[4vw]"
          style={{ perspective: "1600px" }}
        >
          <div className="flex w-full gap-[0.9vw]">
            {images.map((src, i) => (
              <div
                key={i}
                className="svc-card relative aspect-[5/4] flex-1 overflow-hidden rounded-[6px] bg-[#d4cfc9] will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center bottom",
                }}
              >
                <Image
                  src={src}
                  alt="Selected project"
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
