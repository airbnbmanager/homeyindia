"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, HelpCircle, ShieldCheck } from "lucide-react";

export default function PricingCalculator() {
  const [propertyCount, setPropertyCount] = useState(3);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [websiteAddon, setWebsiteAddon] = useState(true);

  // Homeyhuts base price is ₹590 per property per month
  const baseRate = 590;
  const discountMultiplier = billingCycle === "annual" ? 0.8 : 1.0; // 20% discount on annual
  const websiteAddonPrice = websiteAddon ? (billingCycle === "annual" ? 799 : 999) : 0;

  const propertyTotal = Math.round(propertyCount * baseRate * discountMultiplier);
  const totalMonthlyCost = propertyTotal + websiteAddonPrice;
  const annualSavings = billingCycle === "annual" ? Math.round(propertyCount * baseRate * 0.2 * 12) : 0;

  return (
    <section id="pricing" className="py-24 bg-gray-50/80 border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3 py-1 rounded-full border border-[#ffe2de]">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mt-3">
            Simple, honest pricing. <br />
            <span className="text-[#ff3823]">No hidden commissions. Ever.</span>
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Pay a flat fee per listing with zero commissions on your direct bookings. Scale up or down anytime with no lock-in contracts.
          </p>

          {/* Billing Frequency Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-gray-200/80 border border-gray-300/60">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === "annual"
                  ? "bg-[#ff3823] text-white shadow-md shadow-[#ff3823]/25"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual Billing <span className="bg-amber-400 text-gray-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">20% OFF</span>
            </button>
          </div>
        </div>

        {/* Pricing Card & Interactive Calculator */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Calculator Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Slider Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-bold text-gray-900 text-sm">
                    How many properties do you manage?
                  </label>
                  <span className="text-2xl font-extrabold text-[#ff3823] font-display">
                    {propertyCount} {propertyCount === 1 ? "Property" : "Properties"}
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={propertyCount}
                  onChange={(e) => setPropertyCount(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff3823]"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-semibold mt-2">
                  <span>1 Property</span>
                  <span>10 Properties</span>
                  <span>20 Properties</span>
                  <span>30+ Properties</span>
                </div>
              </div>

              {/* Addon Checkbox */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <span>Direct Booking Website & Custom Domain</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Your own high-converting direct booking engine with UPI & online card checkout, zero booking commissions, and automated WhatsApp guest vouchers.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={websiteAddon}
                  onChange={(e) => setWebsiteAddon(e.target.checked)}
                  className="w-5 h-5 rounded text-[#ff3823] focus:ring-[#ff3823] cursor-pointer mt-0.5 accent-[#ff3823]"
                />
              </div>

              {/* What is Included Checklist */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Included with your plan</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {[
                    "Real-time 2-way sync across 50+ OTAs",
                    "Zero commissions on all bookings",
                    "Unified calendar (Web + Mobile App)",
                    "Magic Cluster™ multi-listing sync",
                    "Flexi Pricing™ bulk yield rules",
                    "Automated WhatsApp vouchers & invoices",
                    "Property-level expense tracking & P&L",
                    "24/7 dedicated host phone support",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c1838] to-[#1a2b56] text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">Estimated Total</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                    ₹{totalMonthlyCost.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-gray-300">/ month</span>
                </div>
                <p className="text-xs text-gray-400">
                  Billed {billingCycle === "annual" ? "annually" : "monthly"} for {propertyCount} {propertyCount === 1 ? "property" : "properties"}
                </p>
              </div>

              {billingCycle === "annual" && annualSavings > 0 && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>You save ₹{annualSavings.toLocaleString("en-IN")} / year with annual plan!</span>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-gray-700 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>PMS Base ({propertyCount} listings × ₹{Math.round(baseRate * discountMultiplier)}):</span>
                  <span className="font-semibold text-white">₹{propertyTotal.toLocaleString("en-IN")}</span>
                </div>
                {websiteAddon && (
                  <div className="flex justify-between">
                    <span>Direct Booking Website Addon:</span>
                    <span className="font-semibold text-white">₹{websiteAddonPrice}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-400 font-semibold pt-1">
                  <span>OTA Commission:</span>
                  <span>0% (You keep 100%)</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/start-trial"
                  className="w-full py-3.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-sm shadow-lg shadow-[#ff3823]/30 transition-all flex items-center justify-center gap-2"
                >
                  Start 30-Day Free Trial <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-gray-400">
                  No credit card required · Instant setup in 5 mins
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
