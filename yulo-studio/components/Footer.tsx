import { siteContent } from "@/data/content";

const { footer } = siteContent;

export default function Footer() {
  return (
    <footer className="relative w-full h-[600px] md:h-[1200px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-warm via-[#e8ddd0] to-[#d6cabb]" />

      <div className="relative z-10 flex flex-col justify-end h-full max-w-content mx-auto px-6 md:px-0 pb-6 md:pb-page-x">
        {/* Tech list */}
        <div className="flex justify-end mb-8 md:mb-[77px]">
          <div className="flex flex-col items-end gap-6 md:gap-12">
            <p className="text-peach text-xs md:text-[14.4px] font-normal leading-[14.4px] opacity-[0.54]">
              Website made using:
            </p>
            <ul className="flex flex-col items-end gap-2 md:gap-4">
              {footer.techList.map((tech) => (
                <li
                  key={tech}
                  className="text-peach text-xs md:text-[14px] font-bold leading-[14.4px]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large split branding */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-0 md:gap-[230px] mb-2 md:mb-[10px]">
          <div className="md:w-[768px]">
            <div className="overflow-hidden h-[80px] md:h-[245px] pt-1 md:pt-[14px]">
              <span className="text-peach text-[100px] md:text-[200px] xl:text-[313.3px] font-bold leading-[0.78] tracking-[-4px] md:tracking-[-13.44px]">
                {footer.brandLeft}
              </span>
            </div>
          </div>
          <div className="md:w-[768px] md:flex md:flex-col md:items-end">
            <div className="overflow-hidden h-[80px] md:h-[245px] pt-1 md:pt-[26px]">
              <span className="text-peach text-[100px] md:text-[200px] xl:text-[326.4px] font-bold leading-[0.75] tracking-[-4px] md:tracking-[-13.44px]">
                {footer.brandRight}
              </span>
            </div>
          </div>
        </div>

        {/* Subtitles */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <span className="text-peach text-base md:text-[24.6px] font-bold leading-[25.6px] md:ml-[162px]">
            {footer.subtitleLeft}
          </span>
          <span className="text-peach text-base md:text-[24.4px] font-bold leading-[25.6px]">
            {footer.subtitleRight}
          </span>
        </div>
      </div>
    </footer>
  );
}
