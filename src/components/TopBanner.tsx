"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function TopBanner({ onDismiss }: { onDismiss?: () => void }) {
  const { user } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 1, mins: 18, secs: 45 });

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

  if (dismissed || user?.isPaidMember || user?.email === "praveensinghaws@gmail.com") return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <div className="bg-[#1f1008] text-white py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#3d2012] text-xs font-sans w-full transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Center content */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 font-medium text-amber-200">
            <span className="text-sm">🪔</span>
            <span>
              <strong className="text-white font-semibold">Diwali offer</strong> &mdash; up to <strong className="text-amber-400 font-bold">35% off</strong> &mdash; new hosts only
            </span>
          </span>

          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono">
            <span className="bg-white/10 px-1.5 py-0.5 rounded font-bold text-amber-300">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase text-gray-400 font-sans">DAYS</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded font-bold text-amber-300 ml-0.5">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase text-gray-400 font-sans">HRS</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded font-bold text-amber-300 ml-0.5">
              {String(timeLeft.mins).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase text-gray-400 font-sans">MIN</span>
          </div>

          <Link
            href="/pricing"
            className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white text-gray-900 font-bold text-[10px] sm:text-[11px] hover:bg-amber-100 transition shadow-sm ml-1 sm:ml-2 shrink-0"
          >
            Claim offer
          </Link>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white p-1 rounded-md transition-colors shrink-0"
          aria-label="Dismiss offer banner"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
