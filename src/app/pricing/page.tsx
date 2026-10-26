import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCalculator from "@/components/PricingCalculator";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "Simple, Transparent Pricing | Homey India",
  description: "Flat fee per listing, zero commissions on direct bookings. Scale your vacation rentals with no contracts.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-24">
        <PricingCalculator />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
