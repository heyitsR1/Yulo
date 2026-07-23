"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import { getProject } from "@/data/projects";

const { software } = siteContent.services;

/**
 * Block 01. Four projects, each shown once, in alternating full-width rows:
 * the live site inside a browser frame on one side, its meta on the other.
 * Deliberately unlike the growth block below, which uses no product shots.
 */
export default function SoftwareShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".sw-head > *", {
        yPercent: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });

      gsap.utils.toArray<HTMLElement>(".sw-row").forEach((row) => {
        const frame = row.querySelector(".sw-frame");
        const meta = row.querySelectorAll(".sw-meta > *");

        if (frame) {
          gsap.from(frame, {
            yPercent: 12,
            scale: 0.94,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 82%" },
          });
        }

        gsap.from(meta, {
          y: 26,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 78%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="w-full px-[4vw]">
      <div className="sw-head max-w-[52ch]">
        <p className="text-[clamp(12px,1.1vw,17px)] font-semibold tracking-[0.14em] text-peach-deep uppercase">
          {software.eyebrow}
        </p>
        <h3 className="mt-[3vw] text-[clamp(30px,4.6vw,80px)] lg:mt-[1.2vw] leading-[1.02] font-semibold tracking-[-0.045em]">
          <span className="text-grey-dark/70">{software.titlePlain} </span>
          <span className="text-peach-deep/85">{software.titleAccent}</span>
        </h3>
        <p className="mt-[4vw] max-w-[46ch] lg:mt-[1.6vw] text-[clamp(14px,1.15vw,19px)] leading-[1.5] font-semibold text-grey">
          {software.description}
        </p>
      </div>

      <div className="mt-[6vw] flex flex-col gap-[7vw]">
        {software.items.map((item, i) => {
          const project = getProject(item.slug);
          if (!project) return null;
          const flipped = i % 2 === 1;

          return (
            <div
              key={item.slug}
              className={`sw-row flex flex-col items-center gap-[3vw] md:flex-row md:gap-[5vw] ${
                flipped ? "md:flex-row-reverse" : ""
              }`}
            >
              <Link
                href={`/work/${project.slug}`}
                aria-label={`View case study: ${project.name}`}
                className="sw-frame group/frame w-full md:w-[56%]"
              >
                {/* Browser chrome, so the shot reads as a live site not a tile */}
                <div className="overflow-hidden rounded-[10px] bg-[#e6e0d8] shadow-[0_1vw_3vw_rgba(70,58,46,0.13)] transition-[transform,box-shadow] duration-500 ease-out group-hover/frame:-translate-y-[0.5vw] group-hover/frame:shadow-[0_1.8vw_4vw_rgba(70,58,46,0.22)]">
                  <div className="flex items-center gap-[0.8vw] px-[1.1vw] py-[0.7vw]">
                    <span className="flex gap-[0.4vw]">
                      {["#e0b0a0", "#ddcda2", "#bacfb3"].map((c) => (
                        <span
                          key={c}
                          className="h-[0.6vw] max-h-[7px] min-h-[5px] w-[0.6vw] max-w-[7px] min-w-[5px] rounded-full"
                          style={{ background: c }}
                        />
                      ))}
                    </span>
                    <span className="flex-1 truncate rounded-full bg-bg-warm/70 px-[1vw] py-[0.25vw] text-center text-[clamp(9px,0.75vw,12px)] font-semibold text-grey">
                      {project.liveLabel}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={project.images.hero}
                      alt={`${project.name} — ${project.tagline}`}
                      fill
                      sizes="(max-width: 768px) 92vw, 56vw"
                      className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover/frame:scale-[1.03]"
                    />
                  </div>
                </div>
              </Link>

              <div className="sw-meta w-full md:w-[44%]">
                <div className="flex items-center gap-[3vw] lg:gap-[1vw]">
                  <span className="relative h-[2.6vw] max-h-[42px] min-h-[28px] w-[2.6vw] max-w-[42px] min-w-[28px] overflow-hidden rounded-[22%]">
                    <Image
                      src={item.logo}
                      alt=""
                      fill
                      sizes="42px"
                      className="object-contain"
                    />
                  </span>
                  <span className="text-[clamp(20px,2.4vw,42px)] leading-none font-semibold tracking-[-0.03em] text-text-dark">
                    {project.name}
                  </span>
                </div>

                <p className="mt-[3.5vw] max-w-[38ch] lg:mt-[1.4vw] text-[clamp(14px,1.15vw,19px)] leading-[1.5] font-semibold text-grey">
                  {project.tagline}. {item.stat}.
                </p>

                <p className="mt-[3.5vw] text-[clamp(11px,0.95vw,15px)] lg:mt-[1.4vw] font-semibold tracking-[0.1em] text-grey/80 uppercase">
                  {item.kind}
                </p>

                <div className="mt-[4.5vw] flex flex-wrap items-center gap-x-[4vw] gap-y-[2vw] lg:mt-[1.8vw] lg:gap-x-[1.6vw] lg:gap-y-[0.8vw] text-[clamp(12px,1vw,16px)] font-semibold">
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-text-dark underline decoration-peach-deep decoration-2 underline-offset-[0.5em] transition-colors hover:text-peach-deep"
                  >
                    Read the case study
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-grey transition-colors hover:text-text-dark"
                  >
                    Visit live <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
