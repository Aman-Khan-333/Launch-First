import type { Metadata } from "next";
import { preload } from "react-dom";
import { BookingModal } from "@/components/BookingModal";
import { Loader } from "@/components/Loader";
import { MetaPixel } from "@/components/MetaPixel";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LeadFit } from "@/components/LeadFit";
import "./globals.css";

export const metadata: Metadata = {
  title: "Launch First — A working product live in 14 days",
  description:
    "A production-ready product you can put in front of users and investors. Fixed scope, fixed price of $9,999 only.",
  // Served from public/: the app/icon.png convention breaks on the apostrophe in the local folder path.
  // "lf." monogram on the brand green, built from the logo's own letters
  // (versioned file names so browsers drop any cached older icon).
  icons: {
    icon: { url: "/lf-icon-v3.png", type: "image/png" },
    apple: "/lf-apple-icon-v3.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Inter with the optical-size axis (opsz 14 = "Inter", opsz 32 = "Inter Display"), self-hosted: see the
  // @font-face at the top of globals.css. Preloaded so the headline renders in it as early as possible.
  preload("/fonts/inter-latin-opsz.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    // "is-loading" is removed by <Loader /> when its exit animation starts.
    <html lang="en" className="is-loading" suppressHydrationWarning>
      <body>
        <SmoothScroll />
        <div className="site">{children}</div>
        <ProgressiveBlur />
        <ScrollReveal />
        <LeadFit />
        <BookingModal />
        <Loader />
        <MetaPixel />
        <noscript>
          <style>{".loader{display:none}"}</style>
        </noscript>
      </body>
    </html>
  );
}
