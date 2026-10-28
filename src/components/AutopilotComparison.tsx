"use client";

import React from "react";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AutopilotComparison() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff2800] bg-[#ffeee9] px-3 py-1 rounded-full border border-[#ffe9e5]">
            Operational Clarity
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d4b] tracking-tight font-display mt-3">
            Spend less time managing.{" "}
            <span className="lyp-serif text-[#ff2800]">Spend more time growing.</span>
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Whether you manage one homestay or hundreds of vacation rentals, Homey India helps you automate daily operations, simplify bookings, and grow your business with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* The Hard Way */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#f5f5f5] border border-gray-200/90 shadow-sm relative flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-semibold mb-4 border border-gray-200">
                Without Homey India
              </span>
              <h3 className="text-2xl font-bold font-display text-gray-900 mb-6">Hosting the hard way</h3>

              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Managing multiple booking calendars manually</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Double bookings and availability conflicts</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Losing 15%–25% commission on every OTA booking</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Revenue and expenses scattered across spreadsheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Hours spent updating prices and availability one by one</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 italic">
              Constant stress, missed guest inquiries, and lost revenue.
            </div>
          </div>

          {/* With Homeyhuts / Business on Autopilot */}
          <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#0a1d4b] via-[#11245a] to-[#06122f] text-white shadow-2xl relative overflow-hidden border border-[#1c3066] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff2800]/15 blur-[90px] rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#ff2800]/20 text-[#ff2800] border border-[#ff2800]/40 text-xs font-bold">
                  With Homey India
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live 2-way sync
                </span>
              </div>

              <h3 className="text-2xl font-bold font-display text-white">Your business on autopilot</h3>
              <p className="text-xs text-gray-300 mt-1 mb-6">Less manual work. More bookings. Better business.</p>

              {/* Hero Stat Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 mb-6 flex items-center gap-4">
                <div className="text-4xl sm:text-5xl font-extrabold text-amber-300 font-display">28%</div>
                <div className="text-xs sm:text-sm text-gray-200 leading-snug">
                  average revenue growth in the first 120 days after connecting channels
                </div>
              </div>

              {/* 4 Key Pillars Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-lg font-bold text-white">40+ Hours</div>
                  <div className="text-[11px] text-gray-300">Saved every month on calendar management</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-lg font-bold text-white">2.5× More</div>
                  <div className="text-[11px] text-gray-300">Direct booking revenue in the first year</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-lg font-bold text-white">64%</div>
                  <div className="text-[11px] text-gray-300">Average occupancy across all connected OTAs</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-lg font-bold text-emerald-400">₹0 Comm</div>
                  <div className="text-[11px] text-gray-300">On direct bookings. Keep 100% of what you earn</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs text-gray-300 font-medium">Ready to run smarter?</span>
              <Link
                href="/start-trial"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ff2800] text-white text-xs font-bold hover:bg-[#d7382a] transition-all shadow-md shadow-[#ff2800]/25"
              >
                Start free trial <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
