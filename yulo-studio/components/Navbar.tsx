"use client";

import { siteContent } from "@/data/content";

const { nav } = siteContent;

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-page-x py-5">
      {/* Left: Brand */}
      <div className="flex-1 flex items-center">
        <a href="#" className="flex items-center gap-[4.8px] px-4 py-2">
          <span className="text-white text-base md:text-[21.7px] font-bold tracking-[-0.64px] leading-5">
            {nav.brand.name}
          </span>
          <span className="w-[6.4px] h-[6.4px] rounded-full bg-blue" />
          <span className="text-white text-base md:text-[22.4px] font-bold tracking-[-0.64px] leading-5">
            {nav.brand.suffix}
          </span>
        </a>
      </div>

      {/* Center: Nav links — hidden on mobile */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-0">
        <a
          href={nav.links[0].href}
          className="px-4 py-3 rounded-pill backdrop-blur-[5.5px] bg-white/[0.08] text-peach text-[14.2px] font-bold leading-4"
        >
          {nav.links[0].label}
        </a>
        <div className="w-11 h-[67px] mx-0" />
        <a
          href={nav.links[1].href}
          className="px-4 py-3 rounded-pill backdrop-blur-[5.5px] bg-white/[0.08] text-peach text-[14.2px] font-bold leading-4"
        >
          {nav.links[1].label}
        </a>
      </div>

      {/* Right: Social links — hidden on mobile */}
      <div className="hidden md:flex flex-1 items-center justify-end">
        {nav.social.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="px-[15px] py-[10px] rounded-[80px] text-peach text-[14.2px] font-bold leading-5"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
