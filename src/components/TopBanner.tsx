"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

export default function TopBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 3, mins: 21, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[#1e100a] via-[#2d170b] to-[#1e100a] text-white py-2 px-4 border-b border-amber-900/40 relative z-50 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="flex items-center gap-1.5 font-medium text-amber-200">
            <span className="text-base">🪔</span>
            <span><strong>Special Launch Offer</strong> — up to <strong>35% off</strong> for new hosts</span>
          </span>

          <div className="flex items-center gap-1 text-[11px] font-mono">
            <span className="bg-white/10 px-1.5 py-0.5 rounded font-bold text-amber-300">{String(timeLeft.days).padStart(2, "0")}</span>
            <span className="text-[9px] uppercase text-gray-400">DAYS</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded font-bold text-amber-300 ml-1">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="text-[9px] uppercase text-gray-400">HRS</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded font-bold text-amber-300 ml-1">{String(timeLeft.mins).padStart(2, "0")}</span>
            <span className="text-[9px] uppercase text-gray-400">MIN</span>
          </div>

          <Link
            href="/pricing"
            className="px-3 py-1 rounded-full bg-white text-gray-900 font-bold text-[11px] hover:bg-amber-100 transition-colors shadow-sm ml-2"
          >
            Claim offer
          </Link>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
