import type { Metadata } from "next";
import Link from "next/link";
import PageChrome from "@/components/PageChrome";
import SiteFooter from "@/components/SiteFooter";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Work — Live products by Yulo Studio",
  description:
    "Case studies from Yulo Studio: a tech media platform, a Chrome Web Store asset generator, a browser extension with 2,400+ users, and an MVP studio site. All live, all in production.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — Live products by Yulo Studio",
    description:
      "Case studies from Yulo Studio — websites, web apps and browser extensions running in production.",
    type: "website",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-bg-warm">
      <PageChrome />
      <WorkIndex />

      <section className="bg-bg-warm px-[4vw] py-[10vw] text-center">
        <h2 className="text-[clamp(28px,5vw,84px)] leading-[1.02] font-semibold tracking-[-0.045em] text-grey-dark/80">
          Want yours in this list?
        </h2>
        <Link
          href="/contact"
          className="group mt-[3vw] inline-flex items-center gap-[12px]"
        >
          <span className="rounded-full bg-peach px-[26px] py-[16px] text-[clamp(14px,1.2vw,18px)] font-semibold text-[#7a5a44] transition-colors duration-300 group-hover:bg-peach-deep">
            Start a project
          </span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
