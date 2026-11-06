import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Loader } from "@/components/Loader";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./globals.css";

// Inter with the optical-size axis: opsz 14 = "Inter", opsz 32 = "Inter Display".
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Launch First — A working product live in 14 days",
  description:
    "A production-ready product you can put in front of users and investors. Fixed scope, fixed price under $10,000.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // "is-loading" is removed by <Loader /> when its exit animation starts.
    <html lang="en" className={`${inter.variable} is-loading`} suppressHydrationWarning>
      <body>
        <SmoothScroll />
        <div className="site">{children}</div>
        <ProgressiveBlur />
        <ScrollReveal />
        <Loader />
        <noscript>
          <style>{".loader{display:none}"}</style>
        </noscript>
      </body>
    </html>
  );
}
