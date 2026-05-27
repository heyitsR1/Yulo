import Image from "next/image";
import { siteContent } from "@/data/content";

const { workCta } = siteContent;

export default function WorkCTA() {
  return (
    <section
      id="work"
      className="relative w-full h-[1210px] flex items-center justify-center overflow-hidden bg-bg-warm"
    >
      {/* Giant "Work" background text */}
      <span className="absolute text-peach/30 text-[825.6px] font-bold leading-[825.6px] tracking-[-19.2px] select-none pointer-events-none whitespace-nowrap left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Work
      </span>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center gap-0 w-[461px]">
        <p className="text-text-muted text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px]">
          {workCta.preText}
        </p>

        {/* Folder illustration */}
        <a
          href={workCta.folderHref}
          className="relative w-[461px] h-[384px] mt-[82px] block"
        >
          {/* Back layer */}
          <div className="absolute bottom-0 left-0 right-0 h-[394px]">
            <Image
              src="/images/work/folder-icon-back.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          {/* Content layer */}
          <div className="absolute top-[54px] left-[5px] w-[452px] h-[115px] z-10">
            <Image
              src="/images/work/projects-folder.png"
              alt="Portfolio"
              fill
              className="object-contain"
            />
          </div>
          {/* Front layer */}
          <div className="absolute bottom-0 -left-[14px] -right-[14px] h-[314px] z-20">
            <Image
              src="/images/work/folder-icon-front.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </a>

        <p className="mt-[58px] text-text-muted text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px]">
          {workCta.postText}
        </p>
      </div>
    </section>
  );
}
