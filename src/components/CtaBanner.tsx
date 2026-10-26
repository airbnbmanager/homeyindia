"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, Sparkles, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0c1838] via-[#102048] to-[#0c1838] text-white relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff3823]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#ff3823]" />
          <span>Start your 30-day free trial today</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-tight">
          Ready to run your rental business <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3823] via-[#ff7866] to-amber-300">
            smarter and on autopilot?
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Join 6,000+ vacation rental and homestay hosts who have eliminated double bookings and grown their direct booking revenue with Homey India.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/start-trial"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#ff3823] text-white font-bold text-sm shadow-xl shadow-[#ff3823]/30 hover:bg-[#e5220d] hover:shadow-2xl transition-all flex items-center justify-center gap-2"
          >
            Start 30-Day Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/book-a-demo"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <PhoneCall className="w-4 h-4 text-[#ff3823]" /> Schedule a Guided Demo
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> No credit card required
          </span>
          <span>•</span>
          <span>5-minute instant setup</span>
          <span>•</span>
          <span>Cancel anytime with 1 click</span>
        </div>
      </div>
    </section>
  );
}
