"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { siteContent } from "@/data/content";

/**
 * Cursor-following “Copy my Email” chip. Activates while the pointer is
 * over any element marked with [data-email-hover].
 */
export default function EmailChip() {
  const chipRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const chip = chipRef.current;
    if (!chip) return;

    const xTo = gsap.quickTo(chip, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(chip, "y", { duration: 0.35, ease: "power3.out" });
    let visible = false;

    const onMove = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "[data-email-hover]"
      );
      const show = !!target;
      xTo(e.clientX + 18);
      yTo(e.clientY + 14);
      if (show !== visible) {
        visible = show;
        gsap.to(chip, {
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0.8,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteContent.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      ref={chipRef}
      onClick={copy}
      className="pointer-events-none fixed top-0 left-0 z-[150] rounded-full bg-[#6459d9]/90 px-[14px] py-[8px] text-[13px] font-semibold text-white opacity-0"
    >
      {copied ? "Copied!" : "Copy my Email"}
    </button>
  );
}
