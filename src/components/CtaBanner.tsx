"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, Sparkles, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-[#0a1d4b] via-[#11245a] to-[#06122f] text-white relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff2800]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#ff2800]" />
          <span>Start your 14-day free trial today</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-tight">
          Ready to run your rental business{" "}
          <span className="lyp-serif text-[#ff2800]">
            smarter?
          </span>
        </h2>

        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
          Join thousands of vacation rental hosts and property managers who have eliminated double bookings and grown their direct booking revenue with Homey India.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/start-trial"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#ff2800] text-white font-bold text-sm shadow-xl shadow-[#ff2800]/30 hover:bg-[#d7382a] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            Start free trial <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/book-a-demo"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <PhoneCall className="w-4 h-4 text-white" /> Schedule a Demo
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> No credit card required
          </span>
          <span>•</span>
          <span>10-minute setup</span>
          <span>•</span>
          <span>Cancel anytime with 1 click</span>
        </div>
      </div>
    </section>
  );
}
