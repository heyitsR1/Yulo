import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yulo Studio — Transforming Brands, Building Futures",
  description:
    "A Nepal-based brand transformation studio working across strategy, design, and digital. We help companies succeed with websites, branding, and product design.",
  keywords: [
    "design studio",
    "brand design",
    "web design",
    "Nepal",
    "Yulo Studio",
  ],
  openGraph: {
    title: "Yulo Studio — Transforming Brands, Building Futures",
    description:
      "A Nepal-based brand transformation studio working across strategy, design, and digital.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-warm antialiased">{children}</body>
    </html>
  );
}
