"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteContent } from "@/data/content";

const { footer } = siteContent;

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Curtain reveal: the footer content sits fixed-feel behind the page
      gsap.fromTo(
        ".footer-inner",
        { yPercent: -28 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      gsap.from(".footer-word", {
        yPercent: 55,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={rootRef}
      data-nav-dark
      className="relative -mt-[3vw] h-[92vh] w-full overflow-clip"
    >
      <div className="footer-inner absolute inset-0">
        <div
          className="grain absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${footer.scene})` }}
        >
          <div className="absolute inset-0 bg-[#1b120b]/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0bb96]/30 via-transparent to-transparent" />
        </div>

        <div
          data-email-hover
          className="relative z-10 flex h-full flex-col justify-end px-[4vw] pb-[3vh]"
        >
          <div className="absolute top-[24vh] right-[4vw] text-right">
            <p className="text-[13px] font-medium text-peach/60">
              Website made using:
            </p>
            <ul className="mt-[3vh] flex flex-col items-end gap-[1.1vh]">
              {footer.madeUsing.map((tech) => (
                <li
                  key={tech}
                  className="text-[13.5px] font-semibold text-peach"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-end justify-between">
            <span className="overflow-hidden">
              <span className="footer-word block text-[15vw] leading-[0.8] font-semibold tracking-[-0.05em] text-[#f0bb96]">
                {footer.left.word}
              </span>
            </span>
            <span className="overflow-hidden">
              <span className="footer-word block text-[15vw] leading-[0.8] font-semibold tracking-[-0.05em] text-[#f0bb96]">
                {footer.right.word}
              </span>
            </span>
          </div>

          <div className="mt-[1.5vh] flex items-center justify-between">
            <p className="text-[clamp(14px,1.35vw,21px)] font-semibold text-[#f0bb96]">
              {footer.left.sub}{" "}
              <span className="text-[#f0bb96]/50">{footer.left.year}</span>
            </p>
            <p className="text-[clamp(14px,1.35vw,21px)] font-semibold text-[#f0bb96]">
              {footer.right.sub}{" "}
              <span className="text-[#f0bb96]/50">{footer.right.tag}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
