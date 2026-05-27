"use client";

import Image from "next/image";
import { siteContent } from "@/data/content";

const { clickScroll } = siteContent;

export default function ClickScrollSection() {
  return (
    <section className="relative w-full bg-bg-warm">
      <div className="md:h-[2246px] overflow-clip pt-[100px] md:pt-[250px]">
        <div className="sticky top-0 mx-auto w-[90vw] md:w-[960px]">
          <div className="relative">
            <h2 className="text-text-muted text-[40px] md:text-[80px] xl:text-[136.6px] font-bold leading-[1.15] md:leading-[157.65px] tracking-[-2px] md:tracking-[-6.72px]">
              <span className="block">{clickScroll.line1}</span>
              <span className="block">{clickScroll.line2}</span>
              <span className="block relative">
                <span className="relative inline-block">
                  <span className="absolute -left-3 md:-left-[42px] top-1/2 -translate-y-1/2 w-[120px] md:w-[384px] h-[50px] md:h-[163px] bg-peach rounded-full" />
                  <span className="relative z-10 text-bg-warm">
                    {clickScroll.line3_pre}
                  </span>
                </span>
                <span className="text-text-muted">
                  {"   "}
                  {clickScroll.line3_mid}{" "}
                </span>
                <span className="text-peach">{clickScroll.line3_post}</span>
              </span>
              <span className="block">{clickScroll.line4}</span>
            </h2>
          </div>
        </div>

        {/* Floating shapes — hidden on mobile */}
        <div className="hidden md:block relative w-full h-[1174px] mt-[-200px]">
          <div className="absolute left-[165px] -top-[363px] w-[1102px] h-[1102px] rotate-[59.82deg]">
            <Image src="/images/shapes/big-circle-scroll1.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[403px] top-[241px] w-[499px] h-[434px]">
            <Image src="/images/shapes/big-pill-scroll1.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[1136px] top-[264px] w-[892px] h-[892px] rotate-[59.82deg]">
            <Image src="/images/shapes/big-circle-scroll2.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[1782px] -top-[217px] w-[1069px] h-[1038px] rotate-[59.95deg]">
            <Image src="/images/shapes/big-hexagon-scroll1.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[1695px] top-[485px] w-[401px] h-[401px] rotate-[79.93deg]">
            <Image src="/images/shapes/big-circle-scroll3.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[365px] top-[647px] w-[384px] h-[338px]">
            <Image src="/images/shapes/big-square-scroll1.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[417px] top-[510px] w-[79px] h-[79px]">
            <svg viewBox="0 0 58 58" fill="none" className="w-full h-full rotate-[59.82deg]">
              <circle cx="29" cy="29" r="29" fill="#2E54FE" />
            </svg>
          </div>
          <div className="absolute left-[1224px] top-[83px] w-[95px] h-[110px]">
            <svg viewBox="0 0 96 54" fill="none" className="w-full h-full rotate-[59.82deg]">
              <rect x="0" y="0" width="96" height="54" rx="27" fill="#2E54FE" />
            </svg>
          </div>
          <div className="absolute left-[1355px] top-[658px] w-[54px] h-[53px]">
            <svg viewBox="0 0 54 53" fill="none" className="w-full h-full rotate-[59.82deg]">
              <polygon points="27,0 51,13 51,40 27,53 3,40 3,13" fill="#2E54FE" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
