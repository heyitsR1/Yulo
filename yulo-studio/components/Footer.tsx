import { siteContent } from "@/data/content";

const { footer } = siteContent;

export default function Footer() {
  return (
    <footer className="relative w-full h-[1200px] overflow-hidden">
      {/* Background — placeholder gradient until video/image provided */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-warm via-[#e8ddd0] to-[#d6cabb]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-content mx-auto pb-page-x">
        {/* Tech list — right aligned */}
        <div className="flex justify-end mb-[77px]">
          <div className="flex flex-col items-end gap-12">
            <p className="text-peach text-[14.4px] font-normal leading-[14.4px] opacity-[0.54]">
              Website made using:
            </p>
            <ul className="flex flex-col items-end gap-4">
              {footer.techList.map((tech) => (
                <li
                  key={tech}
                  className="text-peach text-[14px] font-bold leading-[14.4px]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large split branding */}
        <div className="flex items-center justify-between gap-[230px] mb-[10px]">
          <div className="w-[768px]">
            <div className="overflow-hidden h-[245px] pt-[14px]">
              <span className="text-peach text-[313.3px] font-bold leading-[244.8px] tracking-[-13.44px]">
                {footer.brandLeft}
              </span>
            </div>
          </div>
          <div className="w-[768px] flex flex-col items-end">
            <div className="overflow-hidden h-[245px] pt-[26px]">
              <span className="text-peach text-[326.4px] font-bold leading-[244.8px] tracking-[-13.44px]">
                {footer.brandRight}
              </span>
            </div>
          </div>
        </div>

        {/* Subtitles */}
        <div className="flex items-center justify-between">
          <span className="text-peach text-[24.6px] font-bold leading-[25.6px] ml-[162px]">
            {footer.subtitleLeft}
          </span>
          <span className="text-peach text-[24.4px] font-bold leading-[25.6px]">
            {footer.subtitleRight}
          </span>
        </div>
      </div>
    </footer>
  );
}
