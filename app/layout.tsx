import React from "react"
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Quicksand } from "next/font/google";
import { Navbar } from "@/components/navbar";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Love Story",
  description:
    "A romantic interactive love portfolio game to celebrate our love.",
};

export const viewport: Viewport = {
  themeColor: "#e88da8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${quicksand.variable} font-sans antialiased min-h-screen`}
      >
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
