"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import type { Project } from "@/data/projects";

/** A framed browser screenshot with a faux chrome bar carrying the live URL. */
function BrowserFrame({
  src,
  alt,
  url,
  priority,
  sizes = "92vw",
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-[10px] bg-[#e4ded4] shadow-[0_24px_60px_rgba(70,48,30,0.18)]">
      <div className="flex items-center gap-[8px] border-b border-black/10 bg-[#ded7cc] px-[14px] py-[10px]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#c9c0b3]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#c9c0b3]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#c9c0b3]" />
        <span className="ml-[10px] truncate rounded-full bg-[#efe9e0] px-[12px] py-[4px] text-[11px] font-semibold text-grey">
          {url}
        </span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}

export default function CaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const title = root.querySelector(".cs-title");
      if (title) {
        const split = new SplitText(title, { type: "chars" });
        gsap.from(split.chars, {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
          delay: 0.1,
        });
      }

      gsap.from(".cs-meta > *", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.4,
      });

      // Cover lifts as the page settles
      gsap.from(".cs-cover", {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Body copy fills word by word on scroll
      root.querySelectorAll(".cs-fill").forEach((el) => {
        const split = new SplitText(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.28 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      root.querySelectorAll(".cs-rise").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 44,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Stat counters
      root.querySelectorAll<HTMLElement>(".cs-stat").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={rootRef} className="w-full bg-bg-warm">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="px-[4vw] pt-[20vh] pb-[4vw]">
        <Link
          href="/work"
          className="inline-flex items-center gap-[8px] text-[clamp(12px,1vw,15px)] font-semibold text-grey transition-opacity hover:opacity-65"
        >
          <span aria-hidden>←</span> All work
        </Link>

        <h1 className="mt-[2vw] overflow-hidden text-[clamp(44px,11vw,220px)] leading-[0.85] font-semibold tracking-[-0.05em] text-peach">
          <span className="cs-title block">{project.name}</span>
        </h1>

        <p className="cs-fill mt-[3vw] max-w-[820px] text-[clamp(16px,1.9vw,30px)] leading-[1.35] font-semibold text-grey-dark/85">
          {project.intro}
        </p>

        {/* meta grid */}
        <dl className="cs-meta mt-[5vw] grid grid-cols-2 gap-y-[2.5vw] border-t border-grey/25 pt-[2.5vw] md:grid-cols-4">
          <div>
            <dt className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase">
              Year
            </dt>
            <dd className="mt-[6px] text-[clamp(14px,1.2vw,19px)] font-semibold text-grey-dark/85">
              {project.year}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase">
              Scope
            </dt>
            <dd className="mt-[6px] text-[clamp(14px,1.2vw,19px)] font-semibold text-grey-dark/85">
              {project.role.join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase">
              Stack
            </dt>
            <dd className="mt-[6px] text-[clamp(14px,1.2vw,19px)] font-semibold text-grey-dark/85">
              {project.stack.join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase">
              Live
            </dt>
            <dd className="mt-[6px]">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-[6px] text-[clamp(14px,1.2vw,19px)] font-semibold text-blue"
              >
                {project.liveLabel}
                <span className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]">
                  ↗
                </span>
              </a>
            </dd>
          </div>
        </dl>
      </header>

      {/* ── Cover ────────────────────────────────────────────── */}
      <div className="cs-cover px-[4vw] pt-[2vw]">
        <BrowserFrame
          src={project.images.hero}
          alt={`${project.name} home page`}
          url={project.liveUrl}
          priority
          sizes="92vw"
        />
      </div>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section
        className="mt-[8vw] px-[4vw] py-[5vw]"
        style={{ backgroundColor: `${project.accent}1f` }}
      >
        <div className="grid grid-cols-1 gap-[3vw] md:grid-cols-3">
          {project.stats.map((stat) => (
            <div key={stat.label} className="cs-stat">
              <p className="text-[clamp(38px,6vw,110px)] leading-[0.9] font-semibold tracking-[-0.05em] text-grey-dark/85">
                {stat.value}
              </p>
              <p className="mt-[1vw] text-[clamp(13px,1.15vw,18px)] font-semibold text-grey">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brief ────────────────────────────────────────────── */}
      <section className="px-[4vw] py-[9vw]">
        <div className="flex flex-col gap-[3vw] lg:flex-row lg:gap-[6vw]">
          <h2 className="shrink-0 text-[clamp(26px,4.4vw,72px)] leading-[0.98] font-semibold tracking-[-0.045em] text-peach lg:w-[26vw]">
            The brief
          </h2>
          <p className="cs-fill max-w-[820px] text-[clamp(16px,1.6vw,26px)] leading-[1.45] font-semibold text-grey-dark/80">
            {project.brief}
          </p>
        </div>
      </section>

      {/* ── Approach, alternating with imagery ───────────────── */}
      <section className="px-[4vw] pb-[6vw]">
        <h2 className="text-[clamp(26px,4.4vw,72px)] leading-[0.98] font-semibold tracking-[-0.045em] text-peach">
          How we built it
        </h2>

        <div className="mt-[4vw] flex flex-col gap-[7vw]">
          {project.approach.map((step, i) => {
            const shot = [
              project.images.sec1,
              project.images.mid,
              project.images.sec2,
              project.images.full,
            ][i % 4];

            return (
              <div
                key={step.title}
                className="cs-rise grid grid-cols-1 items-start gap-[3vw] lg:grid-cols-12 lg:gap-[4vw]"
              >
                <div
                  className={`lg:col-span-5 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <span className="text-[clamp(12px,1vw,15px)] font-semibold text-grey/60 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-[1vw] text-[clamp(20px,2.4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-grey-dark/85">
                    {step.title}
                  </h3>
                  <p className="mt-[1.4vw] text-[clamp(14px,1.25vw,20px)] leading-[1.5] font-semibold text-grey">
                    {step.body}
                  </p>
                </div>

                <div
                  className={`lg:col-span-7 ${
                    i % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  {i === 3 ? (
                    // the long full-page capture scrolls inside its frame
                    <figure className="max-h-[70vh] overflow-y-auto rounded-[10px] shadow-[0_20px_50px_rgba(70,48,30,0.16)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shot}
                        alt={`${project.name}, full page`}
                        className="w-full"
                      />
                    </figure>
                  ) : (
                    <BrowserFrame
                      src={shot}
                      alt={`${project.name} — ${step.title}`}
                      url={project.liveUrl}
                      sizes="(min-width: 1024px) 55vw, 92vw"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Responsive proof ─────────────────────────────────── */}
      <section className="mt-[4vw] bg-[#efe8dd] px-[4vw] py-[8vw]">
        <div className="flex flex-col items-center gap-[4vw] lg:flex-row lg:items-center lg:gap-[6vw]">
          <div className="lg:w-[38vw]">
            <h2 className="text-[clamp(26px,4.4vw,72px)] leading-[0.98] font-semibold tracking-[-0.045em] text-peach">
              On a phone
            </h2>
            <p className="cs-fill mt-[2vw] text-[clamp(15px,1.4vw,23px)] leading-[1.45] font-semibold text-grey">
              Most of the traffic arrives on mobile, so the small screen isn&apos;t
              an afterthought — layout, type scale and tap targets are designed
              at this width first and expanded outward.
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-[3vw] inline-flex items-center gap-[12px]"
            >
              <span className="rounded-full bg-peach px-[24px] py-[15px] text-[clamp(13px,1.1vw,17px)] font-semibold text-[#7a5a44] transition-colors duration-300 group-hover:bg-peach-deep">
                Visit {project.liveLabel}
              </span>
            </a>
          </div>

          <div className="cs-rise relative mx-auto w-[240px] shrink-0 overflow-hidden rounded-[26px] border-[7px] border-[#2b1c12] bg-[#2b1c12] shadow-[0_24px_60px_rgba(70,48,30,0.3)] sm:w-[280px]">
            <div className="relative aspect-[414/896] overflow-hidden rounded-[19px]">
              <Image
                src={project.images.mobile}
                alt={`${project.name} on mobile`}
                fill
                sizes="280px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Outcome ──────────────────────────────────────────── */}
      <section className="px-[4vw] py-[9vw]">
        <div className="flex flex-col gap-[3vw] lg:flex-row lg:gap-[6vw]">
          <h2 className="shrink-0 text-[clamp(26px,4.4vw,72px)] leading-[0.98] font-semibold tracking-[-0.045em] text-peach lg:w-[26vw]">
            Where it landed
          </h2>
          <div>
            <p className="cs-fill max-w-[820px] text-[clamp(16px,1.6vw,26px)] leading-[1.45] font-semibold text-grey-dark/80">
              {project.outcome}
            </p>
            <div className="mt-[3vw] flex flex-wrap gap-[0.6vw]">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-grey/35 px-[14px] py-[8px] text-[clamp(11px,0.9vw,14px)] font-semibold text-grey"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Next project ─────────────────────────────────────── */}
      <Link
        href={`/work/${next.slug}`}
        className="group relative block overflow-clip border-t border-grey/25 px-[4vw] py-[8vw]"
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, ${next.accent}26, transparent 60%)`,
          }}
        />
        <span className="relative block text-[clamp(12px,1vw,15px)] font-semibold text-grey">
          Next project
        </span>
        <span className="relative mt-[1vw] flex items-center justify-between gap-[3vw]">
          <span className="text-[clamp(32px,7vw,130px)] leading-[0.9] font-semibold tracking-[-0.05em] text-grey-dark/80 transition-transform duration-500 group-hover:translate-x-[1vw]">
            {next.name}
          </span>
          <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-peach transition-transform duration-500 group-hover:translate-x-[8px]">
            <svg width="20" height="16" viewBox="0 0 18 14" fill="none">
              <path
                d="M1 7h15M11 1.5 16.5 7 11 12.5"
                stroke="#8c6f5a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </Link>
    </article>
  );
}
