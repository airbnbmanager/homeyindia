import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveCalendar from "@/components/InteractiveCalendar";
import AutopilotComparison from "@/components/AutopilotComparison";
import FeatureExplorer from "@/components/FeatureExplorer";
import ThreePillars from "@/components/ThreePillars";
import ChannelExpansion from "@/components/ChannelExpansion";
import PricingCalculator from "@/components/PricingCalculator";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import FloatingWidget from "@/components/FloatingWidget";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#ff2800]/10 selection:text-[#ff2800]">
      <Navbar showBanner={true} />
      <main className="flex-grow">
        <Hero />
        <InteractiveCalendar />
        <AutopilotComparison />
        <FeatureExplorer />
        <ThreePillars />
        <ChannelExpansion />
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
