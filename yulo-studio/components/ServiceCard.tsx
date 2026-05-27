import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  images: string[];
}

export default function ServiceCard({
  title,
  description,
  images,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 md:gap-[30px] w-full px-6 md:px-page-x pb-[30px]">
      <div className="flex flex-col items-center gap-4 md:gap-[28px] w-full md:w-[530px]">
        <h3 className="text-text-muted text-[32px] md:text-[52px] xl:text-[73px] font-bold leading-[1] md:leading-[69.12px] tracking-[-1px] md:tracking-[-2.88px] text-center whitespace-pre-line">
          {title}
        </h3>
        <p className="text-text-muted text-sm md:text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px] text-center max-w-[430px]">
          {description}
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-[9.6px] w-full md:h-[276px]">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[5/4] md:aspect-auto md:flex-1 rounded overflow-hidden bg-[#d4cfc9]"
            >
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
