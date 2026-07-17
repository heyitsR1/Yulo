"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { siteContent } from "@/data/content";
import { INTRO_EVENT } from "./Preloader";

const { hero, email } = siteContent;

const NAME_FONTS = [
  "var(--font-six-caps), sans-serif",
  "var(--font-shrikhand), serif",
  "var(--font-figtree), Arial, sans-serif",
];

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mediaIndex, setMediaIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setMediaIndex((i) => (i + 1) % hero.media.length),
      3200
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-photo", { scale: 1.12, opacity: 0 });
      gsap.set(".hero-name-word", { yPercent: 110 });
      gsap.set(".hero-media", { scale: 0, opacity: 0 });
      gsap.set(".hero-corner", { opacity: 0 });

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(".hero-photo", { opacity: 1, scale: 1, duration: 1.4 })
          .to(
            ".hero-name-word",
            { yPercent: 0, duration: 1, stagger: 0.08 },
            "-=0.9"
          )
          .to(
            ".hero-media",
            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)" },
            "-=0.6"
          );

        // Cycle the giant name through display typefaces before settling
        const words = root.querySelectorAll<HTMLElement>(".hero-name-word");
        NAME_FONTS.forEach((font, i) => {
          tl.add(() => {
            words.forEach((w) => (w.style.fontFamily = font));
          }, 0.65 + i * 0.38);
        });

        // Word-by-word corner reveals
        root.querySelectorAll(".hero-corner").forEach((el) => {
          const split = new SplitText(el, { type: "words" });
          gsap.set(el, { opacity: 1 });
          tl.from(
            split.words,
            {
              opacity: 0,
              yPercent: 60,
              duration: 0.5,
              stagger: 0.12,
            },
            1.6
          );
        });
      };

      if (document.body.dataset.introDone === "1") play();
      else {
        window.addEventListener(INTRO_EVENT, play, { once: true });
        // Fallback if the preloader event was missed
        gsap.delayedCall(4.5, () => {
          if (!document.body.dataset.introDone) {
            document.body.dataset.introDone = "1";
            play();
          }
        });
      }

      // Slow parallax exit
      gsap.to(".hero-inner", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    const mark = () => (document.body.dataset.introDone = "1");
    window.addEventListener(INTRO_EVENT, mark, { once: true });
    return () => {
      window.removeEventListener(INTRO_EVENT, mark);
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="top"
      ref={rootRef}
      data-nav-dark
      className="relative h-[100svh] overflow-clip"
    >
      <div className="hero-inner absolute inset-0">
        <div
          className="hero-photo grain absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.photo})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/45" />
          <div className="absolute inset-0 bg-[#a05c33]/40 mix-blend-multiply" />
          <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(30,12,4,0.55)_100%)]" />
        </div>

        {/* peach glow bleeding in from the very top */}
        <div className="pointer-events-none absolute -top-6 left-0 h-24 w-full bg-peach opacity-90 blur-[30px]" />

        <div className="hero-corner absolute top-[24%] left-[4vw] text-[clamp(20px,1.9vw,30px)] leading-[1.25] font-semibold text-peach opacity-0">
          {hero.topLeft.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </div>

        <div className="absolute bottom-[6.5vh] left-0 w-full px-[4vw]">
          <div
            data-email-hover
            className="flex items-end justify-between gap-[1.5vw]"
            onClick={() => navigator.clipboard?.writeText(email)}
          >
            <span className="overflow-hidden">
              <span className="hero-name-word block text-[12.6vw] leading-[0.82] font-semibold tracking-[-0.04em] text-[#f0bb96]">
                {hero.nameLeft}
              </span>
            </span>

            <span className="hero-media relative mb-[0.6vw] block h-[11vw] w-[25vw] shrink-0 overflow-hidden rounded-[1vw]">
              {hero.media.map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={src}
                  src={src}
                  alt="Selected work"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === mediaIndex ? 1 : 0 }}
                />
              ))}
            </span>

            <span className="overflow-hidden">
              <span className="hero-name-word block text-[12.6vw] leading-[0.82] font-semibold tracking-[-0.04em] text-[#f0bb96]">
                {hero.nameRight}
              </span>
            </span>
          </div>
        </div>

        <div className="hero-corner absolute right-[4vw] bottom-[1.8vh] text-[clamp(18px,1.7vw,28px)] font-semibold text-peach opacity-0">
          {hero.bottomRight}
        </div>
      </div>
    </div>
  );
}
