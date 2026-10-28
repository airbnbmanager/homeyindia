"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Zap, DollarSign, LayoutDashboard } from "lucide-react";

export default function ThreePillars() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#ff2800] bg-[#ffeee9] px-3 py-1 rounded-full border border-[#ffe9e5] inline-block mb-3">
              Core Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d4b] tracking-tight font-display">
              One platform. Every booking. Every guest.{" "}
              <span className="lyp-serif text-[#ff2800]">More profit.</span>
            </h2>
          </div>
          <Link
            href="/start-trial"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ff2800]/25 transition-all self-start md:self-auto"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Never worry about double bookings */}
          <div className="bg-[#faf8f5] rounded-3xl p-7 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              {/* Visual Sync Hub */}
              <div className="h-44 rounded-2xl bg-white border border-gray-200/80 p-4 mb-6 relative flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-[#0a1d4b] text-white flex items-center justify-center shadow-md text-xl z-10">
                  🏠
                </div>

                {/* Nodes orbiting */}
                <div className="absolute top-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fde8ea] text-[#b42a30] text-[11px] font-bold border border-[#ff5a5f]/20">
                  <span>Airbnb</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff5a5f] text-white flex items-center justify-center text-[9px]">✓</span>
                </div>

                <div className="absolute top-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e6eef8] text-[#002257] text-[11px] font-bold border border-[#003b95]/20">
                  <span>Booking.com</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#003b95] text-white flex items-center justify-center text-[9px]">✓</span>
                </div>

                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fde7ef] text-[#a30f45] text-[11px] font-bold border border-[#e5195e]/20">
                  <span>MakeMyTrip</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#e5195e] text-white flex items-center justify-center text-[9px]">✓</span>
                </div>

                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffeee9] text-[#ff2800] text-[11px] font-bold border border-[#ff2800]/20">
                  <span>Homey India</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff2800] text-white flex items-center justify-center text-[9px]">✓</span>
                </div>

                {/* Connecting subtle rings */}
                <div className="absolute inset-4 rounded-full border border-dashed border-gray-300 pointer-events-none" />
              </div>

              <h3 className="text-xl font-bold font-display text-[#0a1d4b] mb-2">
                Never worry about double bookings
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Automatically sync availability and pricing across every connected channel in real time. The moment a guest books on Airbnb or MMT, dates close everywhere in sub-seconds.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200/60 text-xs font-semibold text-[#ff2800] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore 2-Way Sync Engine →
            </div>
          </div>

          {/* Card 2: Run your entire business from one place */}
          <div className="bg-[#faf8f5] rounded-3xl p-7 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              {/* Visual Mock Operations */}
              <div className="h-44 rounded-2xl bg-white border border-gray-200/80 p-4 mb-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span>Operations Workspace</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">All Systems Online</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-gray-600">🧹 Housekeeping & Cleaning</span>
                    <span className="font-bold text-gray-900">Done (3:30 PM)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-gray-600">💬 Arriving Guest Check-in</span>
                    <span className="font-bold text-[#ff2800]">WhatsApp Sent</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-gray-600">🧾 GST Advance Payment</span>
                    <span className="font-bold text-emerald-600">UPI Received</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold font-display text-[#0a1d4b] mb-2">
                Run your entire business from one place
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Calendar, bookings, guest communications, cleaners, co-hosts, expenses, and invoices in one centralized software built for web and mobile.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200/60 text-xs font-semibold text-[#ff2800] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              See Multi-Property Dashboard →
            </div>
          </div>

          {/* Card 3: Turn more bookings into more profit */}
          <div className="bg-[#faf8f5] rounded-3xl p-7 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              {/* Visual Profit Lift */}
              <div className="h-44 rounded-2xl bg-white border border-gray-200/80 p-4 mb-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Commission vs Net Retained</span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+28% Net Lift</span>
                </div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span>OTA Commission Saved</span>
                      <span className="font-bold text-gray-900">₹48,200</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#ff2800] h-full rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span>Direct Guest Retention</span>
                      <span className="font-bold text-emerald-600">100% Retained</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: "95%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold font-display text-[#0a1d4b] mb-2">
                Turn more bookings into more profit
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Save 15% to 25% on every booking by converting repeat guests to your zero-commission website. Use Flexi Pricing™ to capture high surge margins.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200/60 text-xs font-semibold text-[#ff2800] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Calculate Direct Booking ROI →
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

