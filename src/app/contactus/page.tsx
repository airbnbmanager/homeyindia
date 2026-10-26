import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageSquare, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Homey India Host Support",
  description: "Get in touch with Homey India 24/7 host support desk, sales team, and onboarding specialists.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/60">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3.5 py-1.5 rounded-full border border-[#ffe2de]">
              24/7 Support Desk
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mt-3">
              We are here to support your hosting journey.
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Reach out for product inquiries, live channel setup assistance, or custom portfolio migrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm text-center space-y-2">
              <Phone className="w-8 h-8 text-[#ff3823] mx-auto" />
              <h3 className="font-bold text-gray-900 text-sm">Host Helpline</h3>
              <p className="text-xs text-gray-500">+91 98765 43210</p>
              <span className="text-[10px] text-emerald-600 font-semibold block">Toll-free 24/7</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm text-center space-y-2">
              <MessageSquare className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-gray-900 text-sm">WhatsApp Host Desk</h3>
              <p className="text-xs text-gray-500">+91 98765 43211</p>
              <span className="text-[10px] text-emerald-600 font-semibold block">Instant Chat Reply</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm text-center space-y-2">
              <Mail className="w-8 h-8 text-blue-600 mx-auto" />
              <h3 className="font-bold text-gray-900 text-sm">Email Support</h3>
              <p className="text-xs text-gray-500">hosts@homeyindia.com</p>
              <span className="text-[10px] text-gray-400 block">Reply within 1 hour</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
