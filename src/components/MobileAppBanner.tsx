"use client";

import React from "react";
import Link from "next/link";
import { 
  Smartphone, Apple, Play, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, QrCode, Download
} from "lucide-react";

export default function MobileAppBanner() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-[#0c1838] to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff2800]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mobile-First Experience</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-tight">
                Homey India in Your Pocket &bull;{" "}
                <span className="font-serif italic text-[#ff2800]">Anytime, Anywhere</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
                Browse and book 18 luxury Lucknow residences with 1-tap confirmation, or manage your homestay calendars, pricing, and guest WhatsApp communication on the go.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>0% Booking Fee &bull; Direct Host Chat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Realtime Calendar Sync in 0.8s</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Keyless Smart Lock Access Codes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>PWA &bull; Install on iOS &amp; Android</span>
                </div>
              </div>

              {/* App Store / Google Play / PWA Install Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="/manifest.webmanifest"
                  className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm hover:bg-slate-100 transition shadow-md flex items-center gap-2.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#ff2800]" />
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">Add to Homescreen</div>
                    <div className="font-extrabold text-xs">Install Web App (PWA)</div>
                  </div>
                </a>

                <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-300 text-xs flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Works seamlessly on Chrome, Safari &amp; Edge</span>
                </div>
              </div>
            </div>

            {/* Right Preview Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 bg-slate-900 rounded-[40px] p-3 border-4 border-slate-700 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-20" />
                
                {/* Screen Content */}
                <div className="bg-slate-950 rounded-[32px] overflow-hidden p-4 space-y-3 text-xs text-white">
                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-extrabold text-sm font-display">homeyindia<span className="text-[#ff2800]">.</span></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Upcoming Stay</div>
                    <div className="font-bold text-white text-xs">The Luxe Haven Gomti Nagar</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Confirmed &bull; Code: #ABB-HMT444S9WA</div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">Direct Host Discount</span>
                    <span className="font-bold text-emerald-400">Saved ₹850</span>
                  </div>

                  <div className="h-28 rounded-2xl overflow-hidden relative border border-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80"
                      alt="Stay preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                      <span className="font-bold text-[11px] text-white">18 Residences in Lucknow</span>
                    </div>
                  </div>

                  <div className="text-center pt-1 text-[10px] text-slate-400">
                    Touch &bull; Book &bull; Realtime Sync
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

