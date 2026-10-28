"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, MessageCircle, Headphones, Sparkles, ShieldCheck } from "lucide-react";

export default function ChannelExpansion() {
  const [activePromiseIndex, setActivePromiseIndex] = useState<number | null>(0);

  const channels = [
    { name: "Airbnb", logo: "airbnb", tag: "Certified API", color: "#ff5a5f", bg: "#fde8ea" },
    { name: "Booking.com", logo: "booking", tag: "Premier Partner", color: "#003b95", bg: "#e6eef8" },
    { name: "MakeMyTrip", logo: "mmt", tag: "2-Way iCal & API", color: "#e5195e", bg: "#fde7ef" },
    { name: "Agoda", logo: "agoda", tag: "Direct Sync", color: "#6c3fd1", bg: "#eee8fb" },
    { name: "Vrbo", logo: "vrbo", tag: "Global Traveler", color: "#4c6ef5", bg: "#ebf1ff" },
    { name: "Goibibo", logo: "goibibo", tag: "Indian Homestays", color: "#f58220", bg: "#fff2e6" },
    { name: "Expedia", logo: "expedia", tag: "Global OTA", color: "#fdbb30", bg: "#fef8eb" },
    { name: "Direct Website", logo: "direct", tag: "0% Commission", color: "#266c62", bg: "#e6f3f1" },
  ];

  const supportPromises = [
    {
      title: "1-on-1 Onboarding",
      content: "Our onboarding team gets you live fast—from personalized 1-on-1 setup sessions to complete listing and calendar migration from your existing tools. Your success on Homey India is our priority from day one.",
    },
    {
      title: "Dedicated WhatsApp Support",
      content: "Direct access to our expert support engineers on WhatsApp 7 days a week. Real human hospitality experts who understand Indian OTAs, channel mapping, and host operations—zero robotic dead ends.",
    },
    {
      title: "Data Privacy & Exclusive Host Control",
      content: "Your guest database, phone numbers, and pricing strategy belong 100% to you. We never share, sell, or monetize your information with third-party advertisers or competitors.",
    },
  ];

  return (
    <>
      {/* Channel Expansion Section */}
      <section className="py-20 sm:py-24 bg-[#faf8f5] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ff2800] bg-[#ffeee9] px-3 py-1 rounded-full border border-[#ffe9e5] inline-block">
                Multi-Channel Visibility
              </p>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d4b] tracking-tight font-display leading-tight">
                Still relying on one booking channel?{" "}
                <span className="lyp-serif text-[#ff2800]">You&apos;re missing guests every day.</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Your future guests are searching across multiple websites, not just one. Homey India helps you manage Airbnb, Booking.com, MakeMyTrip, Goibibo, Agoda, your own booking website, and direct bookings from one unified calendar, so you reach more guests without creating more work.
              </p>

              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ffeee9] text-[#ff2800] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong className="text-gray-900 font-bold">Reach more guests</strong>: connect your favorite booking channels, booking website, and direct bookings, all from one place.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ffeee9] text-[#ff2800] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong className="text-gray-900 font-bold">Zero double bookings</strong>: automatically sync availability across every connected channel in real time.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ffeee9] text-[#ff2800] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong className="text-gray-900 font-bold">Increase occupancy</strong>: reach more travelers and fill more nights without increasing your daily workload.
                  </span>
                </li>
              </ul>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/channel-manager"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0a1d4b] hover:bg-[#11245a] text-white font-bold text-xs shadow-md transition-all"
                >
                  Explore All Channels
                </Link>
                <Link
                  href="/start-trial"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-xs shadow-md shadow-[#ff2800]/25 transition-all"
                >
                  Start free trial
                </Link>
              </div>
            </div>

            {/* Right Channels Visual Matrix */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {channels.map((ch) => (
                <div
                  key={ch.name}
                  className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="px-2.5 py-1 rounded-full text-[10px] font-black tracking-tight"
                      style={{ backgroundColor: ch.bg, color: ch.color }}
                    >
                      {ch.tag}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">{ch.name}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">2-Way Live Sync Active</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Customer Support You Can Always Count On */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-[#ff2800] bg-[#ffeee9] px-3 py-1 rounded-full border border-[#ffe9e5] inline-block mb-3">
              Reliable Hospitality Partner
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d4b] tracking-tight font-display">
              Customer support you can{" "}
              <span className="lyp-serif text-[#ff2800]">always</span> count on
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              We know hospitality runs 24 hours a day. Our team is right here on WhatsApp when you need us most.
            </p>
          </div>

          <div className="space-y-4">
            {supportPromises.map((p, idx) => {
              const isOpen = activePromiseIndex === idx;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-gray-200/90 bg-[#faf8f5] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setActivePromiseIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white text-[#ff2800] font-bold text-xs flex items-center justify-center border border-gray-200 shadow-xs">
                        0{idx + 1}
                      </div>
                      <span className="font-bold text-base sm:text-lg text-[#0a1d4b]">
                        {p.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180 text-[#ff2800]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-3 animate-in fade-in duration-150">
                      {p.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick WhatsApp Banner */}
          <div className="mt-10 p-5 rounded-2xl bg-[#0a1d4b] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="font-bold text-sm">Have a question right now?</div>
                <div className="text-xs text-gray-300">Message our host onboarding team directly on WhatsApp</div>
              </div>
            </div>
            <a
              href="https://wa.me/919454470872?text=Hi%20Homey%20India%20Team,%20I%20have%20a%20question%20about%20the%20PMS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs whitespace-nowrap transition-all shadow-md"
            >
              Chat on WhatsApp →
            </a>
          </div>

        </div>
      </section>
    </>
  );
}

