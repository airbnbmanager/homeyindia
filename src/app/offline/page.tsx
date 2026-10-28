import React from "react";
import Link from "next/link";
import { WifiOff, Phone, Home, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-50 text-[#ff2800] flex items-center justify-center mx-auto shadow-inner">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight font-display">
            You're currently offline
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please check your internet connection. You can still reach us directly via phone or WhatsApp.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left space-y-1 text-xs">
          <div className="font-bold text-gray-900">Direct Contact & Bookings</div>
          <p className="text-gray-600">The Unique Haven Homes · Lucknow</p>
          <p className="text-gray-600 font-medium">Praveen Singh: +91 94544 70872</p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <a
            href="tel:+919454470872"
            className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Praveen Singh</span>
          </a>

          <Link
            href="/"
            className="w-full py-3 px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
