import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yulo Studio — Your Design Studio",
  description:
    "A Nepal-based brand transformation studio working across strategy, design, and digital.",
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
