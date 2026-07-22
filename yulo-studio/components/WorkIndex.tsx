"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { projects } from "@/data/projects";

/**
 * The /work index. Desktop shows a typographic list whose rows raise a
 * cursor-tracking preview of the live site; below a certain width the same
 * data collapses into stacked cards with the cover always visible.
 */
export default function WorkIndex() {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const title = root.querySelector(".work-title");
      if (title) {
        const split = new SplitText(title, { type: "chars" });
        gsap.from(split.chars, {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.045,
          delay: 0.1,
        });
      }

      gsap.from(".work-lede", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.45,
      });

      root.querySelectorAll(".work-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 92%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Preview follows the pointer on the desktop list
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 190);
      yTo(e.clientY - 120);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.9 : 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <section ref={rootRef} className="relative w-full bg-bg-warm">
      {/* floating cursor preview — desktop only */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-[80] hidden h-[240px] w-[380px] overflow-hidden rounded-[10px] opacity-0 shadow-[0_20px_50px_rgba(60,40,25,0.28)] lg:block"
      >
        {projects.map((project, i) => (
          <Image
            key={project.slug}
            src={project.images.hero}
            alt=""
            fill
            sizes="380px"
            className="object-cover object-top transition-opacity duration-300"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </div>

      {/* header */}
      <header className="px-[4vw] pt-[22vh] pb-[6vw]">
        <p className="text-[clamp(13px,1.1vw,17px)] font-semibold tracking-[0.02em] text-grey">
          Selected projects — {projects.length} live products
        </p>
        <h1 className="mt-[1vw] overflow-hidden text-[17vw] leading-[0.82] font-semibold tracking-[-0.05em] text-peach">
          <span className="work-title block">Work</span>
        </h1>
        <p className="work-lede mt-[3vw] max-w-[640px] text-[clamp(15px,1.5vw,23px)] leading-[1.45] font-semibold text-grey-dark/80">
          Everything below is running in production with real users. Open any
          one of them — the live site is one click away on each case study.
        </p>
      </header>

      {/* list */}
      <div className="border-t border-grey/25">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="work-row group relative block border-b border-grey/25 px-[4vw] py-[3vw] transition-colors duration-500 hover:bg-[#f2ece2]"
          >
            {/* accent wash on hover */}
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, ${project.accent}22, transparent 55%)`,
              }}
            />

            <div className="relative flex flex-col gap-[2vw] lg:flex-row lg:items-center lg:gap-[3vw]">
              <span className="text-[clamp(12px,1vw,15px)] font-semibold text-grey/70 tabular-nums lg:w-[4vw]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <h2 className="text-[clamp(30px,5.4vw,96px)] leading-[0.95] font-semibold tracking-[-0.045em] text-grey-dark/85 transition-transform duration-500 group-hover:translate-x-[1vw]">
                  {project.name}
                </h2>
                <p className="mt-[0.8vw] text-[clamp(14px,1.25vw,19px)] font-semibold text-grey">
                  {project.tagline}
                </p>
              </div>

              {/* inline cover for small screens */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px] lg:hidden">
                <Image
                  src={project.images.hero}
                  alt={`${project.name} home page`}
                  fill
                  sizes="92vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-[0.5vw] lg:w-[26vw] lg:justify-end">
                {project.role.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-grey/35 px-[12px] py-[7px] text-[clamp(11px,0.85vw,13px)] font-semibold text-grey"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <span className="text-[clamp(12px,1vw,15px)] font-semibold text-grey/70 tabular-nums lg:w-[3vw] lg:text-right">
                {project.year}
              </span>

              <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-peach transition-transform duration-500 group-hover:translate-x-[6px]">
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
