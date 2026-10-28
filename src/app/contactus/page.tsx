import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageSquare, Clock, UserCheck, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact Us | Homey India - Praveen Singh",
  description: "Get in touch with Praveen Singh and the Homey India hospitality support desk in Lucknow.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/60">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff2800] bg-[#fff1ef] px-3.5 py-1.5 rounded-full border border-[#ffe2de]">
              Direct Contact & Host Desk
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mt-3">
              Get in Touch with Homey India
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Have a question about our PMS, channel manager, or booking The Unique Haven Homes luxury stays in Lucknow? Connect directly with us.
            </p>
          </div>

          {/* Lead Contact Card - Praveen Singh */}
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-lg p-8 sm:p-10 mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff2800] to-[#ff6b57] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                  PS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-900">Praveen Singh</h2>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <UserCheck className="w-3 h-3" /> Verified Host & Lead
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Head of Operations & Lead Hospitality Specialist • Homey India & The Unique Haven Homes
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ff2800]" /> Lucknow, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <a
                  href="tel:+919454470872"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-gray-50 text-gray-900 font-bold text-xs border border-gray-300 shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ff2800]" />
                  Call +91 94544 70872
                </a>
                <a
                  href="https://wa.me/919454470872?text=Hi%20Praveen,%20I%20am%20contacting%20you%20via%20Homey%20India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp Direct
                </a>
              </div>
            </div>

            {/* Quick Contact Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 text-center sm:text-left">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">Direct Phone / Helpline</span>
                <p className="text-lg font-bold text-gray-900">+91 94544 70872</p>
                <span className="text-[11px] text-emerald-600 font-semibold block">Available 24/7 for Host & Guest Support</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">Official Support Email</span>
                <p className="text-lg font-bold text-gray-900">hosts@homeyindia.com</p>
                <span className="text-[11px] text-gray-500 block">Quick response within 1 hour</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">Headquarters Location</span>
                <p className="text-lg font-bold text-gray-900">Lucknow, Uttar Pradesh</p>
                <span className="text-[11px] text-gray-500 block">Gomti Nagar & Shaheed Path Office</span>
              </div>
            </div>
          </div>

          {/* Additional Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm text-center space-y-2">
              <Phone className="w-8 h-8 text-[#ff2800] mx-auto" />
              <h3 className="font-bold text-gray-900 text-sm">24/7 Calling Desk</h3>
              <p className="text-xs text-gray-600 font-medium">+91 94544 70872</p>
              <span className="text-[10px] text-emerald-600 font-semibold block">Direct Connection with Praveen Singh</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm text-center space-y-2">
              <MessageSquare className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-gray-900 text-sm">WhatsApp Instant Desk</h3>
              <p className="text-xs text-gray-600 font-medium">+91 94544 70872</p>
              <span className="text-[10px] text-emerald-600 font-semibold block">Live Chat & PDF Invoicing</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm text-center space-y-2">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto" />
              <h3 className="font-bold text-gray-900 text-sm">Operational Hub</h3>
              <p className="text-xs text-gray-600 font-medium">Lucknow, UP</p>
              <span className="text-[10px] text-gray-400 block">Serving Hosts Across India</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
