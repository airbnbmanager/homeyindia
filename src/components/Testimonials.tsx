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
      content: "Before Homey India, we had two double bookings in one month during peak Christmas season. It was a nightmare. Ever since switching to Homey India, our calendars across Airbnb, Booking.com, and MMT sync in under a second. Plus, our direct bookings have increased by 40% with the booking website!",
      avatar: "VS",
    },
    {
      name: "Col. Rakesh Sharma (Retd.)",
      role: "Homestay Superhost, 2 Cottages",
      location: "Old Manali, Himachal Pradesh",
      rating: 5,
      content: "I am not very tech-savvy, but Homey India is so simple to use on my phone. When guests call directly, I just tap the dates to create an offline booking, and it immediately sends them a professional WhatsApp voucher and GST invoice. Truly built for Indian hosts!",
      avatar: "RS",
    },
    {
      name: "Ananya Deshmukh",
      role: "Professional Property Manager (14 Units)",
      location: "Lonavala & Alibaug, Maharashtra",
      rating: 5,
      content: "Magic Cluster™ is a genius feature. We sell a 6-bedroom estate as a whole villa or 3 private suites. No other PMS handled this without causing booking clashes. The expense tracking module also tells us our exact net profit per property every month.",
      avatar: "AD",
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3 py-1 rounded-full border border-[#ffe2de]">
            Host Love & Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mt-3">
            See why 6,000+ hosts rely on <span className="text-[#ff3823]">Homey India.</span>
          </h2>
          <p className="mt-3 text-base text-gray-600">
            From single homestays to multi-villa portfolios, hear how hosts automate their daily operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div 
              key={i}
              className="bg-gray-50/70 rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gray-300 group-hover:text-[#ff3823] transition-colors" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  \"{rev.content}\"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0c1838] to-[#1a2b56] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-xs text-gray-500">{rev.role}</p>
                  <p className="text-[11px] text-gray-400">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
