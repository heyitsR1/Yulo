"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { siteContent } from "@/data/content";

const { email } = siteContent;

const SERVICES = [
  "Website / landing page",
  "Web app or extension",
  "SEO & growth setup",
  "Not sure yet",
];

const TIMELINES = ["ASAP", "1–2 months", "Just exploring"];

const STEPS = [
  {
    title: "You send a few lines",
    body: "What you're building, roughly when you need it, and anything you already have — a doc, a Figma, a competitor you like.",
  },
  {
    title: "We reply within a day",
    body: "An honest read on scope and approach, and whether we're the right studio for it. If we're not, we'll say so.",
  },
  {
    title: "A call, then a plan",
    body: "Thirty minutes to pin down the details, followed by a written scope with milestones before any money changes hands.",
  },
];

export default function ContactForm() {
  const rootRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const title = root.querySelector(".ct-title");
      if (title) {
        const split = new SplitText(title, { type: "chars" });
        gsap.from(split.chars, {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.035,
          delay: 0.1,
        });
      }
      gsap.from(".ct-rise", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.35,
      });
      root.querySelectorAll(".ct-step").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 34,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const toggle = (service: string) =>
    setPicked((current) =>
      current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service]
    );

  const subject = `New project enquiry${name ? ` — ${name}` : ""}`;
  const body = [
    `Name: ${name || "—"}`,
    `Email: ${from || "—"}`,
    `Looking for: ${picked.length ? picked.join(", ") : "—"}`,
    `Timeline: ${timeline}`,
    "",
    "About the project:",
    message || "—",
  ].join("\n");

  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const fieldClass =
    "w-full border-b border-grey/35 bg-transparent py-[14px] text-[clamp(15px,1.3vw,20px)] font-semibold text-grey-dark placeholder:text-grey/55 outline-none transition-colors focus:border-blue";

  return (
    <section ref={rootRef} className="w-full bg-bg-warm">
      <header className="px-[4vw] pt-[20vh] pb-[5vw]">
        <p className="ct-rise text-[clamp(13px,1.1vw,17px)] font-semibold tracking-[0.02em] text-grey">
          {siteContent.location} — working with teams in any timezone
        </p>
        <h1 className="mt-[1vw] overflow-hidden text-[13vw] leading-[0.84] font-semibold tracking-[-0.05em] text-peach">
          <span className="ct-title block">Let&apos;s talk</span>
        </h1>
        <p className="ct-rise mt-[3vw] max-w-[680px] text-[clamp(15px,1.5vw,24px)] leading-[1.45] font-semibold text-grey-dark/80">
          Tell us what you&apos;re building. Every enquiry gets a real reply from
          the people who&apos;d actually do the work — usually within a day.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-[6vw] px-[4vw] pb-[9vw] lg:grid-cols-12 lg:gap-[5vw]">
        {/* ── form ─────────────────────────────────────────── */}
        <form
          className="ct-rise lg:col-span-7"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
        >
          <div className="flex flex-col gap-[2.5vw]">
            <div>
              <label
                htmlFor="ct-name"
                className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase"
              >
                Your name
              </label>
              <input
                id="ct-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor="ct-email"
                className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase"
              >
                Your email
              </label>
              <input
                id="ct-email"
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="jane@company.com"
                className={fieldClass}
              />
            </div>

            <fieldset>
              <legend className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase">
                What do you need?
              </legend>
              <div className="mt-[1.2vw] flex flex-wrap gap-[10px]">
                {SERVICES.map((service) => {
                  const on = picked.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggle(service)}
                      aria-pressed={on}
                      className={`rounded-full border px-[18px] py-[11px] text-[clamp(12px,1.05vw,16px)] font-semibold transition-all duration-300 ${
                        on
                          ? "border-transparent bg-peach text-[#7a5a44]"
                          : "border-grey/35 text-grey hover:border-grey/60"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase">
                Timeline
              </legend>
              <div className="mt-[1.2vw] flex flex-wrap gap-[10px]">
                {TIMELINES.map((option) => {
                  const on = timeline === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTimeline(option)}
                      aria-pressed={on}
                      className={`rounded-full border px-[18px] py-[11px] text-[clamp(12px,1.05vw,16px)] font-semibold transition-all duration-300 ${
                        on
                          ? "border-transparent bg-blue text-white"
                          : "border-grey/35 text-grey hover:border-grey/60"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="ct-msg"
                className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase"
              >
                About the project
              </label>
              <textarea
                id="ct-msg"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you building, and what does done look like?"
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div className="mt-[1vw] flex flex-wrap items-center gap-[14px]">
              <button
                type="submit"
                className="group flex items-center gap-[12px] rounded-full bg-peach py-[8px] pr-[8px] pl-[26px] transition-colors duration-300 hover:bg-peach-deep"
              >
                <span className="text-[clamp(14px,1.2vw,18px)] font-semibold text-[#7a5a44]">
                  Send it over
                </span>
                <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#faf6ef] transition-transform duration-300 group-hover:translate-x-[4px]">
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
              </button>
              <p className="text-[clamp(12px,1vw,15px)] font-semibold text-grey/75">
                Opens your mail app with everything filled in.
              </p>
            </div>
          </div>
        </form>

        {/* ── aside ────────────────────────────────────────── */}
        <aside className="ct-rise lg:col-span-5">
          <div className="rounded-[20px] bg-[#efe8dd] p-[3vw]">
            <p className="text-[11px] font-medium tracking-[0.09em] text-grey/70 uppercase">
              Or just email us
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-[1vw] block text-[clamp(18px,2.1vw,34px)] leading-[1.15] font-semibold tracking-[-0.02em] text-grey-dark transition-opacity hover:opacity-70"
            >
              {email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-[1.5vw] rounded-full border border-grey/35 px-[16px] py-[9px] text-[clamp(12px,1vw,15px)] font-semibold text-grey transition-colors hover:border-grey/60"
            >
              {copied ? "Copied!" : "Copy address"}
            </button>
          </div>

          <ol className="mt-[3vw]">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="ct-step border-t border-grey/25 py-[2vw]"
              >
                <span className="text-[clamp(12px,1vw,15px)] font-semibold text-grey/60 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-[0.6vw] text-[clamp(17px,1.6vw,26px)] leading-[1.2] font-semibold tracking-[-0.02em] text-grey-dark/85">
                  {step.title}
                </h2>
                <p className="mt-[0.7vw] text-[clamp(13px,1.15vw,18px)] leading-[1.5] font-semibold text-grey">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
