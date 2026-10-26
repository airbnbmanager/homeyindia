import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveCalendar from "@/components/InteractiveCalendar";
import AutopilotComparison from "@/components/AutopilotComparison";
import FeatureExplorer from "@/components/FeatureExplorer";
import PricingCalculator from "@/components/PricingCalculator";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import FloatingWidget from "@/components/FloatingWidget";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#ff3823]/10 selection:text-[#ff3823]">
      <TopBanner />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <InteractiveCalendar />
        <AutopilotComparison />
        <FeatureExplorer />
        <PricingCalculator />
        <Testimonials />
        <FaqSection />
        <CtaBanner />
      </main>
      <FloatingWidget />
      <Footer />
    </div>
  );
}
