import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vizuler — See where your financial life is headed",
  description:
    "Vizuler is a visual financial intelligence dashboard. Turn messy money data into a clear future model and find the highest-leverage paths to multiply your net worth.",
  keywords: [
    "financial dashboard",
    "net worth tracker",
    "wealth multiplier",
    "scenario modeling",
    "financial clarity",
    "visual finance",
    "personal finance dashboard",
  ],
  openGraph: {
    title: "Vizuler — See where your financial life is headed",
    description:
      "A visual financial clarity engine. Net worth today. Trajectory tomorrow. The highest-leverage paths in between.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizuler",
    description:
      "Turn messy money data into a clear future model. Find the highest-leverage path to grow your net worth.",
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body className={`${fontSans.className} min-h-screen antialiased`}>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
