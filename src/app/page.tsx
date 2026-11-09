import { Approach } from "@/components/Approach";
import { CaseStudies } from "@/components/CaseStudies";
import { Comparison } from "@/components/Comparison";
import { Concerns, Stats } from "@/components/Concerns";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { GetPricing } from "@/components/GetPricing";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Stats />
      <Concerns />
      <CaseStudies />
      <Approach />
      <Comparison />
      <Process />
      <Pricing />
      <Testimonials />
      <GetPricing />
      <Faq />
      <Footer />
    </main>
  );
}
