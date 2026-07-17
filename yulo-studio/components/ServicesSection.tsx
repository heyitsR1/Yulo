"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import ServiceBlock from "./ServiceBlock";

const { services } = siteContent;

export default function ServicesSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Two-tone headline fades up as it enters
      gsap.from(".svc-headline > *", {
        yPercent: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={rootRef}
      className="relative w-full bg-bg-warm pt-[10vw]"
    >
      <div className="px-[4vw]">
        <p className="text-[clamp(14px,1.25vw,20px)] font-semibold text-grey">
          {services.label}
        </p>
        <h2 className="svc-headline mt-[1vw] text-[8.2vw] leading-[0.98] font-semibold tracking-[-0.05em]">
          <span className="text-grey-dark/70">{services.headlinePlain} </span>
          <span className="text-peach">{services.headlineAccent}</span>
        </h2>
      </div>

      <div className="mt-[18vw] flex flex-col gap-[6vw]">
        {services.items.map((service, i) => (
          <ServiceBlock key={i} index={i} {...service} />
        ))}
      </div>
    </section>
  );
}
