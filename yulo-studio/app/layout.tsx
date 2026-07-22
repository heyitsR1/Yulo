import type { Metadata } from "next";
import { Figtree, Six_Caps, Shrikhand } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
});

const sixCaps = Six_Caps({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-six-caps",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-shrikhand",
});

const SITE_URL = "https://yulo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yulo Studio | Web & Product Studio in Kathmandu",
    template: "%s | Yulo Studio",
  },
  description:
    "Yulo Studio is a web and product studio in Kathmandu, Nepal. We design and build websites, web apps and browser extensions — and the SEO groundwork that makes launch day matter.",
  keywords: [
    "web development studio",
    "web design Nepal",
    "Next.js development",
    "app development",
    "SEO services",
    "Kathmandu web studio",
    "Yulo Studio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yulo Studio | Web & Product Studio in Kathmandu",
    description:
      "We design and build websites, web apps and browser extensions that ship — every project in our portfolio is live with real users.",
    type: "website",
    url: SITE_URL,
    siteName: "Yulo Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yulo Studio | Web & Product Studio in Kathmandu",
    description:
      "Websites, web apps and browser extensions, designed and built end to end.",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Yulo Studio",
  url: SITE_URL,
  email: "hello@yulostudio.com",
  description:
    "Web and product studio building websites, web apps, browser extensions and SEO foundations.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "Web development",
    "Web application development",
    "Browser extension development",
    "Search engine optimisation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${sixCaps.variable} ${shrikhand.variable}`}
    >
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
