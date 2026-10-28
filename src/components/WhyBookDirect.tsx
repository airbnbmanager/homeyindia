"use client";

import React from "react";
import { 
  BadgePercent, RefreshCw, Sparkles, MessageCircle, 
  ShieldCheck, Clock, Award, Coffee, HeartHandshake, Check
} from "lucide-react";

export default function WhyBookDirect() {
  const benefits = [
    {
      icon: BadgePercent,
      title: "0% Commission Direct Booking",
      desc: "Skip middleman platform markups. Save 15% to 20% on every single booking compared to Airbnb, Booking.com, and MakeMyTrip.",
      badge: "Save ₹800–₹2,500/night",
      color: "bg-emerald-500",
    },
    {
      icon: RefreshCw,
      title: "Real-Time 2-Way Calendar Lock",
      desc: "Our automated iCal engine syncs instantly across Airbnb and our master PMS in 0.8s. Absolute zero chance of double-booking.",
      badge: "100% Guaranteed Lock",
      color: "bg-[#ff385c]",
    },
    {
      icon: Sparkles,
      title: "Hospitality Craft & Sanitization",
      desc: "Every residence is professionally inspected, deeply sanitized, and stocked with high thread-count fresh linens and luxury toiletries.",
      badge: "5-Star Standard",
      color: "bg-amber-500",
    },
    {
      icon: MessageCircle,
      title: "Direct WhatsApp Concierge",
      desc: "Direct contact with founder Praveen Singh and our 24/7 care team for airport pickup, custom check-in times, and authentic Lucknow dining guides.",
      badge: "24/7 Host Care",
      color: "bg-blue-500",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2800] uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>The Homey India Promise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Why Book Directly with Homey India?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            Experience authentic Lucknow homestays with the assurance of professional hospitality management, verified listings, and direct host savings.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${b.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <b.icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700">
                    {b.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#ff2800] transition-colors">
                  {b.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Verified Direct Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout Bar */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-[#0c1838] to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Transparent &amp; Fair Pricing
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display">
              See the exact price breakdown before you pay.
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              No hidden 14% guest service fee, no unexpected cleaning surprises at checkout. What you see is what you pay.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919454470872?text=Hello%20Praveen%20ji%2C%20I%20am%20planning%20a%20stay%20in%20Lucknow%20and%20would%20like%20to%20know%20more%20about%20direct%20booking%20offers."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#ff2800] hover:bg-[#e02400] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Host Directly</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
