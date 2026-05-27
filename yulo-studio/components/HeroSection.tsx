import { siteContent } from "@/data/content";

const { hero } = siteContent;

export default function HeroSection() {
  return (
    <section className="relative h-[984px] w-full overflow-hidden">
      {/* Background — placeholder gradient until real image provided */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#c4a882] via-[#d4b896] to-bg-warm" />

      {/* Top glow overlay */}
      <div className="absolute top-0 left-0 right-0 h-[108px] bg-gradient-to-b from-bg-warm/60 to-transparent backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-page-x">
        <h1 className="text-white text-[136.6px] font-bold leading-[157.65px] tracking-[-6.72px] text-center whitespace-pre-line max-w-[1200px]">
          {hero.heading}
        </h1>
        <p className="mt-6 text-white/70 text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px] text-center max-w-[700px]">
          {hero.subtitle}
        </p>
      </div>
    </section>
  );
}
