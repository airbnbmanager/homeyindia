"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MessageCircle, BedDouble } from "lucide-react";

export default function FloatingWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      <Link
        href="/book-a-demo"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shadow-xl backdrop-blur-md border border-gray-700/80 hover:scale-105 transition-all group"
      >
        <Calendar className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span>Book a Demo</span>
      </Link>

      <a
        href="https://wa.me/919454470872?text=Hi%20Praveen,%20I%20want%20to%20learn%20more%20about%20Homey%20India%20PMS%20and%20Stays"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xl hover:scale-105 transition-all"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-current" />
        <span>Talk to us</span>
      </a>

      <Link
        href="/stays"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shadow-xl border border-gray-700 hover:scale-105 transition-all group"
      >
        <BedDouble className="w-3.5 h-3.5 text-[#ff3823] group-hover:scale-110 transition-transform" />
        <span>Book your stay</span>
      </Link>
    </div>
  );
}
