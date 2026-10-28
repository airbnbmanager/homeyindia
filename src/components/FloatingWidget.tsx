"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MessageCircle, BedDouble, X, ChevronUp } from "lucide-react";

export default function FloatingWidget() {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <>
      {/* Desktop View: Sleek Floating Stack */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5 pointer-events-auto">
        <Link
          href="/book-a-demo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a1d4b] hover:bg-[#11245a] text-white text-xs font-semibold shadow-xl border border-white/10 hover:scale-105 transition-all group"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Book a Demo</span>
        </Link>

        <a
          href="https://wa.me/919454470872?text=Hi,%20I%20want%20to%20learn%20more%20about%20Homey%20India%20PMS%20and%20Channel%20Manager"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xl hover:scale-105 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp Us</span>
        </a>

        <Link
          href="/stays"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-900 text-xs font-semibold shadow-xl border border-gray-200 hover:scale-105 transition-all group"
        >
          <BedDouble className="w-3.5 h-3.5 text-[#ff2800] group-hover:scale-110 transition-transform" />
          <span>Book your stay</span>
        </Link>
      </div>

      {/* Mobile View: Sits safely above the bottom navigation bar */}
      <div className="md:hidden fixed bottom-20 right-4 z-40 flex flex-col items-end pointer-events-auto">
        {mobileExpanded && (
          <div className="mb-2 flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Link
              href="/book-a-demo"
              onClick={() => setMobileExpanded(false)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a1d4b] text-white text-xs font-semibold shadow-2xl border border-white/10"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book a Demo</span>
            </Link>

            <a
              href="https://wa.me/919454470872?text=Hi,%20I%20want%20to%20learn%20more%20about%20Homey%20India%20PMS"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileExpanded(false)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-2xl"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Us</span>
            </a>

            <Link
              href="/stays"
              onClick={() => setMobileExpanded(false)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-gray-900 text-xs font-semibold shadow-2xl border border-gray-200"
            >
              <BedDouble className="w-3.5 h-3.5 text-[#ff2800]" />
              <span>Browse Stays</span>
            </Link>
          </div>
        )}

        {/* Trigger Pill */}
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className={`h-10 px-3.5 rounded-full shadow-xl flex items-center gap-2 font-bold text-xs transition-all ${
            mobileExpanded 
              ? "bg-[#0a1d4b] text-white border border-white/20 scale-95" 
              : "bg-[#0a1d4b] text-white border border-white/10 active:scale-95"
          }`}
          aria-label="Quick actions menu"
        >
          {mobileExpanded ? (
            <>
              <X className="w-3.5 h-3.5 text-gray-300" />
              <span>Close</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-current" />
              <span>Help</span>
              <ChevronUp className="w-3 h-3 text-gray-400" />
            </>
          )}
        </button>
      </div>
    </>
  );
}
