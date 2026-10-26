import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, PhoneCall, ShieldCheck, Star } from "lucide-react";

export const metadata = {
  title: "Unified Calendar for Vacation Rentals & Homestays | Homey India",
  description: "Every booking, price update, and blocked date from Airbnb, Booking.com, Vrbo, MakeMyTrip, and your own website in one live calendar. Available on both desktop and mobile.",
};

export default function Page() {
  const stats = [{"value": "0.8s", "label": "Instant Sync Speed"}, {"value": "50+", "label": "Connected OTAs"}, {"value": "100%", "label": "Double Booking Prevention"}, {"value": "24/7", "label": "Live Cloud Availability"}];
  const features = [{"title": "Multi-Property Overview", "desc": "View and manage all your properties side-by-side on a continuous horizontal timeline."}, {"title": "Click & Drag Booking", "desc": "Click any empty date range to block dates for maintenance or create walk-in reservations in seconds."}, {"title": "Channel-Coded Reservations", "desc": "Instantly identify reservation sources with channel-specific color badges (Airbnb red, Booking navy, MMT pink, Direct green)."}, {"title": "Mobile App Sync", "desc": "Carry your complete operations in your pocket with native iOS & Android calendar sync and push notifications."}];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3.5 py-1.5 rounded-full border border-[#ffe2de]">
              Live Multi-Property Timeline
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight font-display mt-4 leading-tight">
              One live calendar to sync and manage everything.
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Every booking, price update, and blocked date from Airbnb, Booking.com, Vrbo, MakeMyTrip, and your own website in one live calendar. Available on both desktop and mobile.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/start-trial"
                className="px-8 py-3.5 rounded-full bg-[#ff3823] text-white font-bold text-sm shadow-xl shadow-[#ff3823]/25 hover:bg-[#e5220d] transition-all flex items-center gap-2"
              >
                Start 30-Day Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book-a-demo"
                className="px-7 py-3.5 rounded-full bg-white text-gray-800 font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#ff3823]" /> Schedule a Guided Demo
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-br from-[#0c1838] to-[#1a2b56] text-white p-8 rounded-3xl shadow-xl">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#ff3823] font-display">{s.value}</div>
                <div className="text-xs text-gray-300 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Deep Dive */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display text-gray-900">Key Capabilities & Architecture</h2>
            <p className="mt-2 text-sm text-gray-600">Engineered specifically for boutique homestays and professional villa managers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-200/80 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#fff1ef] text-[#ff3823] flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-gray-900 to-[#0c1838] text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">Ready to test this live on your properties?</h3>
            <p className="mt-3 text-sm text-gray-300 max-w-xl mx-auto">
              Start your 30-day free trial. Setup takes under 5 minutes with zero credit card required.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/start-trial"
                className="px-8 py-3.5 rounded-full bg-[#ff3823] text-white font-bold text-sm shadow-lg hover:bg-[#e5220d] transition-all"
              >
                Start 30-Day Free Trial
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
