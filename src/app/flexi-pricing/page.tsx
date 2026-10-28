"use client";

import HostNavTabs from "@/components/HostNavTabs";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PROPERTIES } from "@/data/properties";
import {
  TrendingUp,
  Percent,
  Calendar,
  Sparkles,
  Zap,
  CheckCircle2,
  DollarSign,
  Clock,
  Tag,
  AlertCircle,
  Building,
  Sliders,
  Check
} from "lucide-react";

interface SeasonalRule {
  id: string;
  name: string;
  dates: string;
  surgePercent: number;
  active: boolean;
}

export default function FlexiPricingPage() {
  const [selectedPropId, setSelectedPropId] = useState(PROPERTIES[0].id);
  const [weekendSurge, setWeekendSurge] = useState(20);
  const [lastMinuteDiscount, setLastMinuteDiscount] = useState({ enabled: true, hours: 24, percent: 15 });
  const [earlyBirdDiscount, setEarlyBirdDiscount] = useState({ enabled: true, days: 30, percent: 10 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [seasonalRules, setSeasonalRules] = useState<SeasonalRule[]>([
    {
      id: "1",
      name: "Ekana Stadium IPL & Cricket Match Nights",
      dates: "Selected Match Dates 2026",
      surgePercent: 50,
      active: true
    },
    {
      id: "2",
      name: "Diwali & Dhanteras Festive Week",
      dates: "28 Oct - 04 Nov 2026",
      surgePercent: 40,
      active: true
    },
    {
      id: "3",
      name: "Christmas & New Year Eve Gala Week",
      dates: "24 Dec - 02 Jan 2027",
      surgePercent: 65,
      active: true
    },
    {
      id: "4",
      name: "Lucknow Winter Wedding Season",
      dates: "15 Nov - 15 Dec 2026",
      surgePercent: 30,
      active: true
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedProperty = PROPERTIES.find((p) => p.id === selectedPropId) || PROPERTIES[0];
  const weekdayPrice = selectedProperty.price;
  const weekendPrice = Math.round(weekdayPrice * (1 + weekendSurge / 100));

  const toggleRule = (id: string) => {
    setSeasonalRules(
      seasonalRules.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#0f172a] text-white pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Host Control Centre &bull; Homey India
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display flex items-center gap-3">
              Flexi Pricing&trade; Yield Management
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700">
            <Building className="w-5 h-5 text-[#ff2800] ml-2" />
            <select
              value={selectedPropId}
              onChange={(e) => setSelectedPropId(e.target.value)}
              aria-label="Select Property"
              className="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer pr-4"
            >
              {PROPERTIES.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sub Navigation */}
        <HostNavTabs />
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Selected Property Price Summary Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#ff2800]/20 text-[#ff2800] font-bold text-xs border border-[#ff2800]/30 uppercase tracking-wider">
              {selectedProperty.type} &bull; {selectedProperty.zone}
            </span>
            <h2 className="text-2xl font-bold font-display mt-2">{selectedProperty.name}</h2>
            <p className="text-xs text-slate-300 mt-1">
              Dynamic pricing engine optimizes revenue across high-occupancy weekends and festive dates.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Weekday Base</span>
              <span className="text-xl font-extrabold text-white font-display">₹{weekdayPrice.toLocaleString()}</span>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase block">Weekend Surge (+{weekendSurge}%)</span>
              <span className="text-xl font-extrabold text-amber-400 font-display">₹{weekendPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 3 Core Rules Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* RULE 1: WEEKEND SURGE */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#ff2800]" />
                <h3 className="font-bold text-slate-900 text-base">Weekend Surcharge</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fff1ef] text-[#ff2800] font-bold text-xs">
                +{weekendSurge}%
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Automatically applies premium rates for Friday and Saturday check-ins without manually altering weekdays.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Surge Multiplier</span>
                <span>+{weekendSurge}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={weekendSurge}
                onChange={(e) => setWeekendSurge(parseInt(e.target.value))}
                className="w-full accent-[#ff2800] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>0% (No surge)</span>
                <span>+25%</span>
                <span>+50% (Max)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Weekend Nightly Rate:</span>
                <strong className="text-slate-900">₹{weekendPrice.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Extra Revenue per 2-night stay:</span>
                <span>+₹{((weekendPrice - weekdayPrice) * 2).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* RULE 2: LAST-MINUTE DEAL ENGINE */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-base">Last-Minute Discount</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold text-xs">
                {lastMinuteDiscount.percent}% OFF
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Fills unbooked dates by automatically dropping price 24 hours prior to check-in with the direct website <strong className="text-slate-900">Hot Price</strong> spotlight badge.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Trigger Window</label>
                <select
                  value={lastMinuteDiscount.hours}
                  onChange={(e) => setLastMinuteDiscount({ ...lastMinuteDiscount, hours: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                >
                  <option value={12}>12 Hours before check-in</option>
                  <option value={24}>24 Hours before check-in (Recommended)</option>
                  <option value={48}>48 Hours before check-in</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Discount Amount</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={lastMinuteDiscount.percent}
                    onChange={(e) => setLastMinuteDiscount({ ...lastMinuteDiscount, percent: parseInt(e.target.value) || 0 })}
                    className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 font-bold"
                  />
                  <span className="font-bold text-slate-600">%</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <Tag className="w-3.5 h-3.5" /> Hot Price Badge Activated
              </div>
              <p className="text-[11px] text-amber-800">
                Listings with 10%+ discount receive 2.4x higher click-through rate on Homey India website.
              </p>
            </div>
          </div>

          {/* RULE 3: EARLY BIRD BOOKINGS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-slate-900 text-base">Early Bird Booking</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 font-bold text-xs">
                {earlyBirdDiscount.percent}% OFF
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Secures high-occupancy months ahead by rewarding advance bookers with guaranteed rates.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Advance Booking Window</label>
                <select
                  value={earlyBirdDiscount.days}
                  onChange={(e) => setEarlyBirdDiscount({ ...earlyBirdDiscount, days: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                >
                  <option value={15}>15+ Days in advance</option>
                  <option value={30}>30+ Days in advance (Recommended)</option>
                  <option value={60}>60+ Days in advance</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Discount Amount</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={earlyBirdDiscount.percent}
                    onChange={(e) => setEarlyBirdDiscount({ ...earlyBirdDiscount, percent: parseInt(e.target.value) || 0 })}
                    className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 font-bold"
                  />
                  <span className="font-bold text-slate-600">%</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-900 space-y-1">
              <span className="font-bold">Zero Cancellation Leakage:</span>
              <p className="text-[11px] text-indigo-800">
                Early bird bookings lock in non-refundable or moderate cancellation terms.
              </p>
            </div>
          </div>
        </div>

        {/* Seasonal Festive Surge Calendar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Seasonal &amp; High-Demand Event Surges</h3>
              <p className="text-xs text-slate-500 mt-0.5">Pre-configured calendar peaks for Lucknow events &amp; festivals.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalRules.map((rule) => (
              <div key={rule.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {rule.name}
                  </div>
                  <div className="text-xs text-slate-500">{rule.dates}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200">
                    +{rule.surgePercent}% Surge
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleRule(rule.id)}
                    className={`w-10 h-6 rounded-full transition relative ${rule.active ? "bg-emerald-500" : "bg-slate-300"}`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition ${
                        rule.active ? "right-1" : "left-1"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Rules sync across Airbnb, Booking.com, Vrbo, and Direct website within 0.8 seconds.
            </span>
            <button
              onClick={() => showToast("Saved flexi pricing rules and pushed to all channels.")}
              className="px-6 py-2.5 rounded-xl bg-[#ff2800] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff2800]/20 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save &amp; Push to 50+ Channels
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
