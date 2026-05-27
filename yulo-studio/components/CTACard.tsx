import { siteContent } from "@/data/content";

const { cta } = siteContent;

export default function CTACard() {
  return (
    <section className="w-full bg-gray-mid py-10 md:py-[96px] px-4 md:px-0 flex items-center justify-center">
      <div className="w-full max-w-content mx-auto rounded-[24px] md:rounded-card border border-peach overflow-hidden">
        <div className="px-6 md:px-[96px] py-12 md:pt-[172px] md:pb-[172px]">
          <h2 className="text-white text-[36px] md:text-[70px] xl:text-[110.8px] font-bold leading-[1.05] md:leading-[115.2px] tracking-[-2px] md:tracking-[-5.76px] whitespace-pre-line">
            {cta.heading}
          </h2>
          <p className="mt-4 md:mt-[19px] text-white text-base md:text-[27.3px] font-bold leading-[1.6] md:leading-[46px] tracking-[0.48px]">
            {cta.subtitle}
          </p>
        </div>

        <a
          href={cta.ctaHref}
          className="bg-peach px-6 md:px-[96px] h-[100px] md:h-[269px] flex items-center justify-between"
        >
          <div className="w-[50px] md:w-[115px] h-[50px] md:h-[115px] flex items-center justify-center">
            <svg
              width="68"
              height="57"
              viewBox="0 0 68 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 md:w-auto h-auto"
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
          <span className="text-blue text-[32px] md:text-[70px] xl:text-[109.8px] font-bold leading-none tracking-[-2px] md:tracking-[-5.76px]">
            {cta.ctaText}
          </span>
        </a>
      </div>
    </section>
  );
}
