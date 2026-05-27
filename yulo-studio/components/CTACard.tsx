import { siteContent } from "@/data/content";

const { cta } = siteContent;

export default function CTACard() {
  return (
    <section className="w-full bg-gray-mid py-[96px] flex items-center justify-center">
      <div className="w-full max-w-content mx-auto rounded-card border border-peach overflow-hidden">
        {/* Top zone — heading */}
        <div className="px-[96px] pt-[172px] pb-[172px]">
          <h2 className="text-white text-[110.8px] font-bold leading-[115.2px] tracking-[-5.76px] whitespace-pre-line">
            {cta.heading}
          </h2>
          <p className="mt-[19px] text-white text-[27.3px] font-bold leading-[46px] tracking-[0.48px]">
            {cta.subtitle}
          </p>
        </div>

        {/* Bottom strip — CTA */}
        <div className="bg-peach px-[96px] h-[269px] flex items-center justify-between">
          {/* Arrow icon */}
          <div className="w-[115px] h-[115px] flex items-center justify-center">
            <svg
              width="68"
              height="57"
              viewBox="0 0 68 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 28.5h62m0 0L40 4m23 24.5L40 53"
                stroke="#96908C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* "Let's talk" */}
          <a
            href={cta.ctaHref}
            className="text-blue text-[109.8px] font-bold leading-[107.14px] tracking-[-5.76px]"
          >
            {cta.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
