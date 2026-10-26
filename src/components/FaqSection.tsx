"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Which booking channels does Homey India support?",
      a: "Homey India connects with major Indian and global booking channels, including Airbnb, Booking.com, MakeMyTrip, Agoda, Goibibo, Vrbo, Expedia, and Trip.com. Availability, pricing, and reservations stay synchronized automatically in real time (0.8s sync latency).",
    },
    {
      q: "Will Homey India prevent double bookings?",
      a: "Yes. Every booking automatically updates your calendar and closes those dates across all connected channels in real time, completely eliminating double bookings.",
    },
    {
      q: "Can I manage direct bookings and offline walk-ins too?",
      a: "Absolutely. Manage direct bookings, walk-ins, phone inquiries, and WhatsApp bookings from one dashboard. Generate professional GST invoices, send automated WhatsApp confirmations, and track advance payments in one place.",
    },
    {
      q: "What is Magic Cluster™?",
      a: "Magic Cluster™ lets you sell the same property in multiple configurations—for example, individual bedrooms or the entire villa. When any individual room is booked, the full villa listing automatically closes across all OTAs, preventing conflicts while maximizing occupancy.",
    },
    {
      q: "Can I launch my own direct booking website?",
      a: "Yes. Homey India lets you launch a professional, mobile-friendly booking website under your own brand and custom domain. Accept direct online payments (UPI, Cards, Netbanking) with 0% commission.",
    },
    {
      q: "Can I track expenses and know my actual profit?",
      a: "Yes. Track expenses such as property rent, caretaker salaries, laundry, maintenance, and utilities. View property-level Profit and Loss (P&L) reports so you understand your true net profit, not just top-line revenue.",
    },
    {
      q: "Do I need to be listed on Airbnb or Booking.com to use Homey India?",
      a: "Not at all. Homey India works just as well for hosts who only take direct, walk-in, phone, or WhatsApp bookings. You can run your entire hospitality operations from one app, with or without OTAs.",
    },
    {
      q: "Is there a long-term contract or lock-in?",
      a: "No. There are no contracts, setup fees, or hidden termination clauses. You can upgrade, downgrade, or cancel anytime according to your business needs.",
    },
    {
      q: "How quickly can I get started?",
      a: "Getting started takes less than 10 minutes. Sign up, import your existing Airbnb listing, connect your booking channels, and you are ready to manage your business from one place.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50/70 border-t border-gray-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3 py-1 rounded-full border border-[#ffe2de]">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mt-3">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Everything you need to know about channel sync, direct bookings, pricing, and features.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-bold text-sm sm:text-base text-gray-900">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
                    openIndex === i ? "rotate-180 text-[#ff3823]" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
