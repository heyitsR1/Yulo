import Image from "next/image";
import { siteContent } from "@/data/content";

const { workCta } = siteContent;

export default function WorkCTA() {
  return (
    <section
      id="work"
      className="relative w-full h-[500px] md:h-[1210px] flex items-center justify-center overflow-hidden bg-bg-warm"
    >
      <span className="absolute text-peach/30 text-[200px] md:text-[500px] xl:text-[825.6px] font-bold leading-none tracking-[-8px] md:tracking-[-19.2px] select-none pointer-events-none whitespace-nowrap left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Work
      </span>

      <div className="relative z-10 flex flex-col items-center w-[300px] md:w-[461px]">
        <p className="text-text-muted text-sm md:text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px]">
          {workCta.preText}
        </p>

        <a
          href={workCta.folderHref}
          className="relative w-[250px] md:w-[461px] h-[200px] md:h-[384px] mt-8 md:mt-[82px] block"
        >
          <div className="absolute bottom-0 left-0 right-0 h-full">
            <Image src="/images/work/folder-icon-back.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute top-[28px] md:top-[54px] left-[3px] md:left-[5px] w-[244px] md:w-[452px] h-[60px] md:h-[115px] z-10">
            <Image src="/images/work/projects-folder.png" alt="Portfolio" fill className="object-contain" />
          </div>
          <div className="absolute bottom-0 -left-2 md:-left-[14px] -right-2 md:-right-[14px] h-[65%] z-20">
            <Image src="/images/work/folder-icon-front.png" alt="" fill className="object-contain" />
          </div>
        </a>

        <p className="mt-6 md:mt-[58px] text-text-muted text-sm md:text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px]">
          {workCta.postText}
        </p>
      </div>
    </section>
  );
}
