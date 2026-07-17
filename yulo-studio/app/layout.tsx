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

export const metadata: Metadata = {
  title: "Yulo Studio | Brand & Web Design Studio",
  description:
    "Yulo Studio is a brand and web design studio crafting websites, visual identities, and digital products that make users click and scroll.",
  keywords: ["design studio", "brand design", "web design", "Yulo Studio"],
  openGraph: {
    title: "Yulo Studio | Brand & Web Design Studio",
    description:
      "A brand and web design studio crafting websites, visual identities, and digital products.",
    type: "website",
  },
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
