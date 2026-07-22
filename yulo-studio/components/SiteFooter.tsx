import Link from "next/link";
import { siteContent } from "@/data/content";

const { email, location, footer, nav } = siteContent;

/**
 * Compact footer for the sub-pages. The home page keeps its own full-bleed
 * photographic footer; this one carries the same wordmark and palette in a
 * fraction of the height.
 */
export default function SiteFooter() {
  return (
    <footer
      data-nav-dark
      className="relative w-full overflow-clip bg-[#2b1c12] px-[4vw] pt-[7vw] pb-[3vw]"
    >
      <div className="flex flex-wrap items-start justify-between gap-[3vw]">
        <div data-email-hover>
          <p className="text-[13px] font-medium tracking-[0.08em] text-peach/50 uppercase">
            Start a project
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-[1vw] block text-[clamp(22px,3.4vw,52px)] leading-[1.1] font-semibold tracking-[-0.03em] text-peach transition-opacity hover:opacity-70"
          >
            {email}
          </a>
          <p className="mt-[1vw] text-[clamp(13px,1.1vw,17px)] font-semibold text-peach/60">
            {location} — working worldwide
          </p>
        </div>

        <nav className="flex flex-col items-start gap-[0.9vh]">
          <p className="mb-[0.6vw] text-[13px] font-medium tracking-[0.08em] text-peach/50 uppercase">
            Pages
          </p>
          <Link
            href="/"
            className="text-[15px] font-semibold text-peach transition-opacity hover:opacity-65"
          >
            Home
          </Link>
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-peach transition-opacity hover:opacity-65"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#about"
            className="text-[15px] font-semibold text-peach transition-opacity hover:opacity-65"
          >
            About
          </Link>
        </nav>

        <div className="hidden flex-col items-start gap-[0.9vh] md:flex">
          <p className="mb-[0.6vw] text-[13px] font-medium tracking-[0.08em] text-peach/50 uppercase">
            Built with
          </p>
          {footer.madeUsing.map((tech) => (
            <span key={tech} className="text-[15px] font-semibold text-peach">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[6vw] flex items-end justify-between">
        <span className="text-[15vw] leading-[0.78] font-semibold tracking-[-0.05em] text-[#f0bb96]">
          {footer.left.word}
        </span>
        <span className="text-[15vw] leading-[0.78] font-semibold tracking-[-0.05em] text-[#f0bb96]">
          {footer.right.word}
        </span>
      </div>

      <div className="mt-[1.5vw] flex items-center justify-between border-t border-peach/20 pt-[1.2vw]">
        <p className="text-[clamp(12px,1vw,15px)] font-semibold text-peach/70">
          {footer.left.sub}
        </p>
        <p className="text-[clamp(12px,1vw,15px)] font-semibold text-peach/70">
          © {footer.left.year}
        </p>
      </div>
    </footer>
  );
}
