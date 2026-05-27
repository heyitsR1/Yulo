import { siteContent } from "@/data/content";
import ServiceCard from "./ServiceCard";

const { services } = siteContent;

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-bg-warm">
      {/* Header */}
      <div className="px-page-x">
        <p className="text-text-muted text-[20px] font-bold leading-5">
          {services.label}
        </p>
        <h2 className="mt-[19px] text-[156.5px] font-bold leading-[146.88px] tracking-[-7.68px]">
          <span className="text-text-muted">
            We help companies to succeed on projects{" "}
          </span>
          <span className="text-peach-warm">like:</span>
        </h2>
      </div>

      {/* Service blocks */}
      <div className="mt-[333px] flex flex-col">
        {services.items.map((service, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-end ${
              i === services.items.length - 1 ? "h-[638px]" : "h-[883px]"
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
