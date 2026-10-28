"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Vikram & Neha Singhania",
      role: "Owners of 4 Luxury Villas",
      location: "Candolim & Anjuna, Goa",
      rating: 5,
      content: "Before Homey India, we had two double bookings in one month during peak Christmas season. It was a nightmare. Ever since switching to Homey India, our calendars across Airbnb, Booking.com, and MMT sync in under a second. Plus, our direct bookings have increased by 40% with the direct website!",
      avatar: "VS",
      stats: "Saved ₹1.8L on commissions",
    },
    {
      name: "Col. Rakesh Sharma (Retd.)",
      role: "Homestay Superhost, 2 Cottages",
      location: "Old Manali, Himachal Pradesh",
      rating: 5,
      content: "I am not very tech-savvy, but Homey India is so simple to use on my phone. When guests call directly, I just tap the dates to create an offline booking, and it immediately sends them a professional WhatsApp voucher and payment link. Truly built for hosts!",
      avatar: "RS",
      stats: "0 double bookings in 2 yrs",
    },
    {
      name: "Ananya Deshmukh",
      role: "Professional Property Manager (14 Units)",
      location: "Lonavala & Alibaug, Maharashtra",
      rating: 5,
      content: "Magic Cluster™ is a genius feature. We sell a 6-bedroom estate as a whole villa or 3 private suites. No other PMS handled this without causing booking clashes. The expense tracking module also tells us our exact net profit per property every month.",
      avatar: "AD",
      stats: "+34% Portfolio Revenue",
    },
  ];

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#faf8f5] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff2800] bg-[#ffeee9] px-3 py-1 rounded-full border border-[#ffe9e5] inline-block mb-3">
            Host Love & Community
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d4b] tracking-tight font-display">
            Built by hosts, for hosts &{" "}
            <span className="lyp-serif text-[#ff2800]">property managers</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-lg mx-auto">
            See why hosts and vacation rental managers rely on Homey India to power their daily hospitality operations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, i) => (
            <div 
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-xl hover:border-gray-300 transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {rev.stats}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0a1d4b] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[11px] text-gray-500">{rev.role}</p>
                  <p className="text-[10px] text-gray-400">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
