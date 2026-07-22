import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageChrome from "@/components/PageChrome";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — Start a project with Yulo Studio",
  description:
    "Tell us what you're building. Yulo Studio is a web and product studio in Kathmandu, Nepal, building websites, web apps, browser extensions and the SEO groundwork behind them.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Start a project with Yulo Studio",
    description:
      "A web and product studio in Kathmandu, Nepal. Tell us what you're building.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-warm">
      <PageChrome />
      <ContactForm />
      <SiteFooter />
    </main>
  );
}
