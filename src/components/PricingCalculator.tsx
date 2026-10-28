"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export default function PricingCalculator() {
  const [propertyCount, setPropertyCount] = useState(1);
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [includeWebsite, setIncludeWebsite] = useState(true);

  // Homeyhuts Pricing structure:
  // ₹590/mo base per listing monthly, or ₹472/mo (20% off) when billed annually
  const monthlyRatePerListing = 590;
  const annualDiscountMultiplier = 0.8; // 20% savings
  const effectivePerListingRate = billingCycle === "annual" 
    ? Math.round(monthlyRatePerListing * annualDiscountMultiplier) 
    : monthlyRatePerListing;

  const websiteAddonMonthly = billingCycle === "annual" ? 799 : 999;
  const websiteCost = includeWebsite ? websiteAddonMonthly : 0;

  const listingsCostMonthly = propertyCount * effectivePerListingRate;
  const totalMonthlyPay = listingsCostMonthly + websiteCost;
  const totalAnnualBilled = totalMonthlyPay * 12;

  const annualSavings = (propertyCount * monthlyRatePerListing * 0.2 * 12) + (includeWebsite ? (999 - 799) * 12 : 0);

  const incrementCount = () => setPropertyCount((prev) => Math.min(prev + 1, 50));
  const decrementCount = () => setPropertyCount((prev) => Math.max(prev - 1, 1));

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff2800] bg-[#ffeee9] px-3 py-1 rounded-full border border-[#ffe9e5] inline-block mb-3">
            Simple & Transparent
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d4b] tracking-tight font-display">
            Simple, honest pricing.{" "}
            <span className="lyp-serif text-[#ff2800]">No hidden commissions.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Pay per listing. Scale as you grow. And our promise: switch to annual and if you ever cancel, we refund every unused month.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#f3f5fa] border border-gray-200">
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-[#0a1d4b] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual <span className="text-[10px] bg-[#ffeee9] text-[#ff2800] font-black px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#0a1d4b] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Card & Calculator Grid */}
        <div className="max-w-4xl mx-auto bg-[#faf8f5] rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Controls Column (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* How many listings? */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-bold text-[#0a1d4b] text-sm">
                    How many listings?
                  </label>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#ff2800] font-display">
                      {propertyCount} {propertyCount === 1 ? "listing" : "listings"}
                    </span>
                    <span className="block text-[11px] text-gray-500 font-medium">
                      ₹{effectivePerListingRate}/mo per listing
                    </span>
                  </div>
                </div>

                {/* Range Slider + Stepper Controls */}
                <div className="space-y-3">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={propertyCount}
                    onChange={(e) => setPropertyCount(parseInt(e.target.value) || 1)}
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff2800]"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-[11px] text-gray-400 font-semibold">
                      <span>1</span>
                      <span>10</span>
                      <span>20</span>
                      <span>30</span>
                      <span>40</span>
                      <span>50+</span>
                    </div>

                    {/* Step buttons */}
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={decrementCount}
                        disabled={propertyCount <= 1}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40 font-bold text-sm"
                        aria-label="Decrease listings"
                      >
                        −
                      </button>
                      <span className="px-3 text-xs font-bold text-[#0a1d4b] font-mono">{propertyCount}</span>
                      <button
                        type="button"
                        onClick={incrementCount}
                        disabled={propertyCount >= 50}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40 font-bold text-sm"
                        aria-label="Increase listings"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add a booking website Addon Card */}
              <div 
                onClick={() => setIncludeWebsite(!includeWebsite)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  includeWebsite
                    ? "bg-white border-[#0a1d4b] shadow-sm"
                    : "bg-gray-100/60 border-gray-200 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-[#0a1d4b] flex items-center gap-2">
                    <span>Your own booking website</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      0% Commission
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Take direct bookings on your own site. No commission to OTAs, instant online guest payments.
                  </p>
                </div>
                
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-[#0a1d4b]">
                    +₹{websiteAddonMonthly}/mo
                  </div>
                  <div className="mt-1 w-5 h-5 rounded-md border flex items-center justify-center bg-white border-gray-300 ml-auto">
                    {includeWebsite && <Check className="w-3.5 h-3.5 text-[#ff2800] stroke-[3]" />}
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unused months refunded</span>
                </div>
              </div>
            </div>

            {/* Right Summary Aside (5 cols) */}
            <aside className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-md space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400">You pay</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-[#0a1d4b] font-display">
                    ₹{totalMonthlyPay.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">/ mo</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {propertyCount} {propertyCount === 1 ? "listing" : "listings"} · billed {billingCycle === "annual" ? "annually" : "monthly"} 
                  {billingCycle === "annual" && ` (₹${totalAnnualBilled.toLocaleString("en-IN")}/yr)`}
                </p>
              </div>

              {/* Breakdown lines */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>{propertyCount} × PMS License (₹{effectivePerListingRate}/mo)</span>
                  <span className="font-semibold text-gray-900">₹{listingsCostMonthly.toLocaleString("en-IN")}</span>
                </div>
                {includeWebsite && (
                  <div className="flex justify-between">
                    <span>Direct Booking Website & Engine</span>
                    <span className="font-semibold text-gray-900">₹{websiteAddonMonthly}</span>
                  </div>
                )}
                {billingCycle === "annual" && annualSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                    <span>Annual 20% discount savings:</span>
                    <span>Save ₹{annualSavings.toLocaleString("en-IN")}/yr</span>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                <Link
                  href="/start-trial"
                  className="w-full py-3.5 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ff2800]/25 transition-all text-center block"
                >
                  Start free trial
                </Link>
                <Link
                  href="/book-a-demo"
                  className="w-full py-3 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs border border-gray-300 transition-colors text-center block"
                >
                  Book a 1-on-1 demo
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
