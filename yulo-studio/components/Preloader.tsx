"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export const INTRO_EVENT = "yulo:intro";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root || !bar) return;

    document.documentElement.style.overflow = "hidden";

    const done = { fired: false };
    const finish = () => {
      if (done.fired) return;
      done.fired = true;

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          window.dispatchEvent(new CustomEvent(INTRO_EVENT));
          setGone(true);
        },
      });
      tl.to(bar, { scaleX: 1, duration: 0.35, ease: "power2.out" })
        .to(root, {
          backgroundColor: "#f0bb96",
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          root.querySelector(".loader-word"),
          { opacity: 0, duration: 0.3 },
          "<"
        )
        .to(root, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, "+=0.15");
    };

    // Progress bar creeps forward, then completes on window load
    gsap.to(bar, { scaleX: 0.85, duration: 2.2, ease: "power2.out" });
    if (document.readyState === "complete") {
      gsap.delayedCall(1.6, finish);
    } else {
      window.addEventListener("load", () => gsap.delayedCall(0.6, finish), {
        once: true,
      });
      // Hard fallback so the site never stays hidden
      gsap.delayedCall(4, finish);
    }
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "var(--loader-grey)" }}
    >
      <div
        ref={barRef}
        className="absolute top-0 left-0 h-[5px] w-full origin-left scale-x-0 bg-peach"
      />
      <p className="loader-word loader-pulse text-[15px] font-semibold tracking-wide text-peach">
        Yulo&nbsp;&nbsp;•&nbsp;&nbsp;Studio
      </p>
    </div>
  );
}
