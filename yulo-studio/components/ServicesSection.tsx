import { siteContent } from "@/data/content";
import ServiceCard from "./ServiceCard";

const { services } = siteContent;

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-bg-warm">
      <div className="px-6 md:px-page-x">
        <p className="text-text-muted text-base md:text-[20px] font-bold leading-5">
          {services.label}
        </p>
        <h2 className="mt-4 md:mt-[19px] text-[40px] md:text-[80px] xl:text-[156.5px] font-bold leading-[1] md:leading-[146.88px] tracking-[-2px] md:tracking-[-7.68px]">
          <span className="text-text-muted">
            We help companies to succeed on projects{" "}
          </span>
          <span className="text-peach-warm">like:</span>
        </h2>
      </div>

      <div className="mt-[100px] md:mt-[333px] flex flex-col gap-16 md:gap-0">
        {services.items.map((service, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-end ${
              i === services.items.length - 1
                ? "md:h-[638px]"
                : "md:h-[883px]"
            }`}
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              images={service.images}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
