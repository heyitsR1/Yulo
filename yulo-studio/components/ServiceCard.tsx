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
    <div className="flex flex-col items-center gap-[30px] w-full px-page-x pb-[30px]">
      {/* Title + description */}
      <div className="flex flex-col items-center gap-[28px] w-[530px] max-w-full">
        <h3 className="text-text-muted text-[73px] font-bold leading-[69.12px] tracking-[-2.88px] text-center whitespace-pre-line">
          {title}
        </h3>
        <p className="text-text-muted text-[16.8px] font-bold leading-[24.64px] tracking-[0.48px] text-center max-w-[430px]">
          {description}
        </p>
      </div>

      {/* Image strip */}
      {images.length > 0 && (
        <div className="flex gap-[9.6px] w-full h-[276px]">
          {images.map((src, i) => (
            <div
              key={i}
              className="flex-1 relative rounded overflow-hidden bg-[#d4cfc9]"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
