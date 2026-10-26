"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MessageCircle, Home } from "lucide-react";

export default function FloatingWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      <Link
        href="/book-a-demo"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-950/90 hover:bg-black text-white text-xs font-semibold shadow-xl backdrop-blur-md border border-gray-800 hover:scale-105 transition-all group"
      >
        <Calendar className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span>Book a Demo</span>
      </Link>

      <a
        href="https://wa.me/919876543210?text=Hi%20Homey India%20Team,%20I%20want%20to%20learn%20more%20about%20the%20PMS"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xl hover:scale-105 transition-all"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-current" />
        <span>Talk to us</span>
      </a>

      <Link
        href="/start-trial"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white text-xs font-semibold shadow-xl shadow-[#ff3823]/30 hover:scale-105 transition-all"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Start Free Trial</span>
      </Link>
    </div>
  );
}
