import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Heart, Shield, Award, Users, Globe } from "lucide-react";

export const metadata = {
  title: "About Us | Homey India",
  description: "Built by vacation rental hosts, for vacation rental hosts. Learn our story and vision for Indian hospitality.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3.5 py-1.5 rounded-full border border-[#ffe2de]">
              Our Story & Mission
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 font-display mt-4">
              Built by hosts, for hosts & property managers.
            </h1>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              We started Homey India because running homestays and vacation villas in India was fraught with double bookings, high OTA commissions, and chaotic manual coordination.
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8 text-base text-gray-700 leading-relaxed">
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-200/80">
              <h3 className="text-xl font-bold text-gray-900 mb-2">The Problem We Solved</h3>
              <p>
                Property managers and homestay owners were forced to use western PMS software that charged exorbitant USD pricing, lacked support for Indian booking portals like MakeMyTrip and Goibibo, and offered zero assistance for GST invoicing or WhatsApp customer communications.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c1838] to-[#1a2b56] text-white">
              <h3 className="text-xl font-bold text-white mb-2">Our Core Pillars</h3>
              <ul className="space-y-3 mt-4 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#ff3823]" /> <strong>0.8s 2-Way Sync:</strong> The fastest channel manager synchronization engine in the industry.</li>
                <li className="flex items-center gap-2"><Heart className="w-4 h-4 text-[#ff3823]" /> <strong>Direct Booking Maximization:</strong> Helping hosts keep 100% of their revenues with zero commission websites.</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#ff3823]" /> <strong>Transparent Financials:</strong> Giving hosts true property-level net profit analytics, not just vanity GMV.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
