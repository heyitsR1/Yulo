"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { siteContent } from "@/data/content";

const { nav } = siteContent;

function LogoTile() {
  return (
    <span className="mx-1 flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
        <path
          d="M3.5 6.5 L5.8 4.2 L5.8 16"
          stroke="#2e54fe"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.2 4 L11.2 16"
          stroke="#2e54fe"
          strokeWidth="3.2"
          strokeLinecap="round"
          transform="skewX(-8)"
        />
        <path
          d="M17.5 4 L17.5 16"
          stroke="#2e54fe"
          strokeWidth="3.2"
          strokeLinecap="round"
          transform="skewX(-8)"
        />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Swap nav palette when a dark section passes under it
    const navEl = ref.current;
    if (!navEl) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const probeY = 44;
      const dark = [...document.querySelectorAll("[data-nav-dark]")].some(
        (s) => {
          const r = s.getBoundingClientRect();
          return r.top <= probeY && r.bottom >= probeY;
        }
      );
      navEl.classList.toggle("nav-on-dark", dark);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      ref={ref}
      className="group/nav fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-[2.6vw] py-[22px]"
    >
      <Link
        href="/"
        className="flex items-center gap-[5px] text-[17px] font-semibold tracking-[-0.02em] text-grey transition-colors duration-500 [.nav-on-dark_&]:text-peach"
      >
        {nav.brand.name}
        <span className="h-[5px] w-[5px] rounded-full bg-blue" />
        {nav.brand.suffix}
      </Link>

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center">
        <Link
          href={nav.links[0].href}
          className="rounded-full bg-[rgba(120,114,108,0.28)] px-[18px] py-[13px] text-[14px] leading-none font-semibold text-white/90 backdrop-blur-[6px] transition-all duration-300 hover:bg-[rgba(80,76,70,0.45)]"
        >
          {nav.links[0].label}
        </Link>
        <LogoTile />
        <Link
          href={nav.links[1].href}
          className="rounded-full bg-[rgba(120,114,108,0.28)] px-[18px] py-[13px] text-[14px] leading-none font-semibold text-white/90 backdrop-blur-[6px] transition-all duration-300 hover:bg-[rgba(80,76,70,0.45)]"
        >
          {nav.links[1].label}
        </Link>
      </div>

      <div className="hidden items-center gap-[6px] md:flex">
        {nav.social.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              link.href.startsWith("mailto")
                ? undefined
                : "noopener noreferrer"
            }
            className="rounded-full px-[13px] py-[10px] text-[14px] leading-none font-semibold text-grey transition-all duration-300 hover:bg-[rgba(120,114,108,0.2)] [.nav-on-dark_&]:text-peach"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
