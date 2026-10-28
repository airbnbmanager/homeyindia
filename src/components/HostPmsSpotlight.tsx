"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, Calendar, RotateCw, ShieldCheck, DollarSign, 
  MessageSquare, Users, ArrowRight, ExternalLink, Check,
  Layers, Sparkles, Smartphone, CheckCircle2
} from "lucide-react";

export default function HostPmsSpotlight() {
  const [activeTab, setActiveTab] = useState<"sync" | "calendar" | "pricing" | "whatsapp">("sync");

  const channels = [
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg", color: "#ff5a5f" },
    { name: "Booking.com", logo: "", color: "#003b95" },
    { name: "MakeMyTrip", logo: "", color: "#e5195e" },
    { name: "Agoda", logo: "", color: "#6c3fd1" },
    { name: "Direct Website", logo: "", color: "#0d9488" },
  ];

  return (
    <section id="host-pms-section" className="py-16 sm:py-24 bg-gradient-to-b from-[#0c1838] via-[#0f1d44] to-[#0c1838] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2800]/20 border border-[#ff2800]/40 text-xs font-bold text-[#ff2800]">
            <Zap className="w-4 h-4 fill-current" />
            <span>For Homestay &amp; Villa Owners</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display leading-tight">
            PMS &amp; Channel Manager Built for{" "}
            <span className="font-serif italic font-normal text-amber-300">Indian Hospitality</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Manage Airbnb, Booking.com, MakeMyTrip, and your own zero-commission direct website from one powerful mobile and desktop command center.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: 2-Way Sync */}
          <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-7 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                <RotateCw className="w-6 h-6 stroke-[2.5] group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Real-Time 2-Way Sync
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When a guest books on Airbnb, that date instantly blocks on Booking.com, MakeMyTrip, and your website in 0.8s.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 0% Double Booking Guarantee
            </div>
          </div>

          {/* Card 2: Unified Multi-Calendar */}
          <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-7 border border-slate-700/80 hover:border-[#ff2800]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ff2800]/20 text-[#ff2800] flex items-center justify-center font-black">
                <Calendar className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#ff2800] transition-colors">
                Unified Multi-Calendar
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                View all your properties on a single monthly timeline grid or mobile agenda. Drag and drop rates or block maintenance in seconds.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] font-bold text-[#ff2800] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 18 Properties on 1 Screen
            </div>
          </div>

          {/* Card 3: Dynamic Flexi-Pricing */}
          <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-7 border border-slate-700/80 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                <DollarSign className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Dynamic Flexi-Pricing™
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automate weekend surges, last-minute discounts, and festival spikes across all channels simultaneously with 1 click.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> +28% Average Host Revenue
            </div>
          </div>

          {/* Card 4: WhatsApp Automation */}
          <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-7 border border-slate-700/80 hover:border-blue-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                <MessageSquare className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                WhatsApp AI Concierge
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated check-in instructions, Wi-Fi details, digital KYC collection, and location pins delivered automatically to guests.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Meta Cloud API Integrated
            </div>
          </div>

        </div>

        {/* Live Channel Sync Banner */}
        <div className="mt-12 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Broadcast to 50+ Global Booking Portals</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-display text-white">
              Connect your iCal feed or let Homey India manage your listings.
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Compatible with Airbnb, Booking.com, Vrbo, Agoda, MakeMyTrip, Goibibo, TripAdvisor, and custom iCal URLs.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/channel-manager"
              className="px-6 py-3 rounded-full bg-[#ff2800] hover:bg-[#e02400] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Channel Manager</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/unified-calendar"
              className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Live Multi-Calendar</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
