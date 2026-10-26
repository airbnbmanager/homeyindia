"use client";

import React from "react";
import { XCircle, CheckCircle2, AlertOctagon, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AutopilotComparison() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3 py-1 rounded-full border border-[#ffe2de]">
            Real Host Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mt-3">
            Spend less time managing. <br />
            <span className="text-[#ff3823]">Spend more time growing.</span>
          </h2>
          <p className="mt-3 text-base text-gray-600">
            See how smart homestay hosts and property managers upgrade their operations with Homey India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Hard Way */}
          <div className="rounded-3xl p-8 bg-gray-50 border border-gray-200/80 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-6 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900">Hosting the hard way</h3>
            </div>

            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Constant fear of double bookings:</strong> Logging into 5 different apps every time a guest calls or books.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Losing 15%–25% commission on every stay:</strong> No direct booking website or easy online payment links.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Messy manual rate updates:</strong> Changing weekend rates one by one across Airbnb, Booking.com, and MMT.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span><strong>No idea of real profit:</strong> Looking only at gross booking payouts while rent, staff, and utilities eat into margins.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Scattered guest communications:</strong> Replying on Airbnb app, Booking extranet, WhatsApp, and SMS separately.</span>
              </li>
            </ul>
          </div>

          {/* Homey India Autopilot */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-[#0c1838] to-[#1a2b56] text-white shadow-xl relative overflow-hidden border border-gray-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff3823]/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Your business on autopilot</h3>
            </div>

            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant 0.8s two-way sync:</strong> Never worry about double bookings again across 50+ channels.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>0% Commission Direct Website:</strong> Accept instant UPI & card payments with automatic GST invoice vouchers.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Flexi Pricing™ bulk rules:</strong> Change weekend rates or seasonal surges across all OTAs with one single click.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>True Property-Level P&L:</strong> Track maintenance, salaries, and rent against income for clear net earnings.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Unified Guest Inbox:</strong> Every inquiry and chat from Airbnb, Booking.com, and WhatsApp in one clean view.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-700/80 flex items-center justify-between">
              <span className="text-xs text-gray-300 font-medium">Ready to put your listings on autopilot?</span>
              <Link
                href="/start-trial"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff3823] text-white text-xs font-bold hover:bg-[#e5220d] transition-colors shadow-md"
              >
                Start free trial <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
