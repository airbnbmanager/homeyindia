"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Star, ArrowRight, PhoneCall, CheckCircle2, Lock, 
  RotateCw, Phone, Globe, Wallet, Mail, Users, AlertTriangle, 
  Play, Pause, Sparkles, Calendar as CalendarIcon
} from "lucide-react";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [syncedMode, setSyncedMode] = useState(false); // false = without channel manager, true = with Homey India
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSyncedMode((prev) => !prev);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const channels = [
    { id: "airbnb", name: "Airbnb", color: "#ff5a5f", letter: "A" },
    { id: "booking", name: "Booking.com", color: "#003b95", letter: "B." },
    { id: "vrbo", name: "Vrbo", color: "#3563e9", letter: "V" },
    { id: "agoda", name: "Agoda", color: "#6c3fd1", letter: "Ag" },
    { id: "mmt", name: "MakeMyTrip", color: "#e5195e", letter: "my" },
    { id: "goibibo", name: "Goibibo", color: "#f58220", letter: "go" },
    { id: "website", name: "Your Website", color: "#0d9488", letter: "🌐" },
  ];

  const features = [
    { title: "Channel Manager", desc: "Realtime sync across all channels", icon: RotateCw, href: "/channel-manager" },
    { title: "Offline Booking", desc: "Walk-in, phone and social media bookings", icon: Phone, href: "/offline-bookings" },
    { title: "Direct Website", desc: "Your own website with online payments", icon: Globe, href: "/direct-booking-website" },
    { title: "Expenses & Profits", desc: "Know your true profits", icon: Wallet, href: "/expenses-and-profits" },
    { title: "Unified Inbox", desc: "Airbnb, Booking.com messages in one inbox", icon: Mail, badge: "Soon", href: "/unified-inbox" },
    { title: "Co-Hosts & Team", desc: "Let your team manage your business", icon: Users, href: "/co-hosts-and-team" },
  ];

  return (
    <section className="relative pt-24 pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Copy & Call to Actions) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Google Rating Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-sm text-xs text-gray-700">
              <div className="w-4 h-4 rounded-full bg-[#4285f4] flex items-center justify-center text-white font-bold text-[10px]">
                G
              </div>
              <span className="font-bold text-gray-900">4.9</span>
              <div className="flex text-amber-400 text-xs">
                ★★★★★
              </div>
              <span className="text-gray-300">·</span>
              <span className="text-gray-600">Trusted by <strong className="text-gray-900 font-semibold">6,000+ properties</strong></span>
            </div>

            {/* Main Headline with Editorial Italic Serif */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-gray-900 tracking-tight leading-[1.08] font-display">
              PMS & Channel <br />
              Manager for{" "}
              <span className="font-serif italic font-normal text-[#ff3823] tracking-normal">
                Vacation Rentals & Homestays
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
              Manage Airbnb, Booking.com, Vrbo, direct bookings, pricing and availability from{" "}
              <strong className="text-[#ff3823] font-bold">one powerful app</strong>.
            </p>

            {/* Sync Channels Strip */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs text-gray-500 font-medium block">
                Syncs with 50+ channels · from 1 to 1,000 properties
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {channels.map((ch) => (
                  <div
                    key={ch.id}
                    title={ch.name}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center font-bold text-xs relative hover:scale-105 transition-transform"
                    style={{ color: ch.color }}
                  >
                    <span>{ch.letter}</span>
                    {/* Glowing Sync Dot */}
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                  </div>
                ))}
                <span className="h-10 px-3 rounded-xl bg-gray-100 border border-gray-200 text-xs font-bold text-gray-600 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                  +50
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <Link
                href="/start-trial"
                className="px-7 py-3.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-sm shadow-lg shadow-[#ff3823]/25 transition-all"
              >
                Start free trial
              </Link>
              <Link
                href="/book-a-demo"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border border-gray-200/90 shadow-sm transition-all flex items-center gap-2"
              >
                <CalendarIcon className="w-4 h-4 text-gray-600" />
                <span>Talk to our expert</span>
              </Link>
            </div>

            {/* Special Promo Card */}
            <div className="p-4 rounded-2xl bg-[#fff8eb] border border-amber-200/70 text-xs flex items-center justify-between gap-3 text-gray-800 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🪔</span>
                <div>
                  <div className="font-bold text-gray-900">
                    Special launch offer — <span className="text-[#ff3823]">up to 35% off</span>
                  </div>
                  <div className="text-gray-500 text-[11px]">New hosts only · Limited time</div>
                </div>
              </div>
              <Link
                href="/pricing"
                className="px-3 py-1.5 rounded-full bg-white border border-amber-300 font-bold text-gray-900 hover:bg-amber-50 shrink-0 text-[11px]"
              >
                See pricing
              </Link>
            </div>
          </div>

          {/* Right Column (Interactive iPad Simulation Widget + 2x3 Grid) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Dark Tablet Device Frame */}
            <div className="bg-[#1c1c20] text-white rounded-[32px] p-4 sm:p-6 shadow-2xl border border-gray-800 relative overflow-hidden">
              {/* Device Top Control Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-800/80 mb-4">
                {/* Simulation Mode Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSyncedMode(false)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      !syncedMode
                        ? "bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Without a channel manager
                  </button>
                  <button
                    onClick={() => setSyncedMode(true)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      syncedMode
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> With Homey India (0.8s Sync)
                  </button>
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-[11px] font-mono transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-amber-400" /> Paused
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-400" /> Play
                    </>
                  )}
                </button>
              </div>

              {/* Calendar Simulation Stage */}
              <div className="overflow-x-auto">
                <div className="min-w-[540px] text-xs">
                  {/* Days Row */}
                  <div className="grid grid-cols-8 gap-1.5 text-center text-gray-400 font-medium mb-3">
                    <div className="text-left pl-1">Channel</div>
                    <div>Mon <span className="text-white font-bold">12</span></div>
                    <div>Tue <span className="text-white font-bold">13</span></div>
                    <div className="text-[#ff3823] font-bold">Wed 14</div>
                    <div className="text-[#ff3823] font-bold">Thu 15</div>
                    <div>Fri <span className="text-white font-bold">16</span></div>
                    <div>Sat <span className="text-white font-bold">17</span></div>
                    <div>Sun <span className="text-white font-bold">18</span></div>
                  </div>

                  {/* Channel Rows */}
                  {[
                    { id: "airbnb", name: "Airbnb", logo: "A", color: "#ff5a5f" },
                    { id: "booking", name: "Booking.com", logo: "B.", color: "#003b95" },
                    { id: "vrbo", name: "Vrbo", logo: "V", color: "#3563e9" },
                    { id: "agoda", name: "Agoda", logo: "Ag", color: "#6c3fd1" },
                    { id: "website", name: "Website", logo: "🌐", color: "#0d9488" },
                  ].map((row, rIdx) => (
                    <div key={row.id} className="grid grid-cols-8 gap-1.5 items-center py-2 border-b border-gray-800/50">
                      <div className="flex items-center gap-2 pl-1 font-semibold text-gray-200 text-[11px]">
                        <span className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0" style={{ backgroundColor: row.color, color: "#fff" }}>
                          {row.logo}
                        </span>
                        <span className="truncate">{row.name}</span>
                      </div>

                      {/* Mon 12 */}
                      <div className="text-center py-1.5 rounded bg-gray-900/60 text-gray-400 text-[11px]">180</div>

                      {/* Tue 13 */}
                      <div className="text-center py-1.5 rounded bg-gray-900/60 text-gray-400 text-[11px]">180</div>

                      {/* Target Conflict Dates: Wed 14 & Thu 15 */}
                      {!syncedMode ? (
                        // WITHOUT CHANNEL MANAGER: DOUBLE BOOKING COLLISION!
                        rIdx === 0 ? (
                          <div className="col-span-2 text-center py-1.5 rounded bg-[#ff5a5f] text-white font-bold text-[11px] shadow-sm animate-pulse">
                            Priya · 2 nights
                          </div>
                        ) : rIdx === 1 ? (
                          <div className="col-span-2 text-center py-1.5 rounded bg-[#003b95] text-white font-bold text-[11px] shadow-sm border border-red-500 animate-pulse">
                            Tom · 2 nights
                          </div>
                        ) : (
                          <>
                            <div className="text-center py-1.5 rounded bg-gray-900/60 text-gray-400 text-[11px]">220</div>
                            <div className="text-center py-1.5 rounded bg-gray-900/60 text-gray-400 text-[11px]">220</div>
                          </>
                        )
                      ) : (
                        // WITH YOURBNB: CLEAN 0.8s CLOSURE!
                        rIdx === 0 ? (
                          <div className="col-span-2 text-center py-1.5 rounded bg-[#ff5a5f] text-white font-bold text-[11px] shadow-md">
                            Priya · 2 nights
                          </div>
                        ) : (
                          <div className="col-span-2 text-center py-1.5 rounded bg-gray-800/90 text-gray-300 font-semibold text-[10px] border border-gray-700 flex items-center justify-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-gray-400" /> Closed in 0.8s
                          </div>
                        )
                      )}

                      {/* Fri 16 */}
                      <div className="text-center py-1.5 rounded bg-gray-900/60 text-gray-400 text-[11px]">260</div>

                      {/* Sat 17 & Sun 18 */}
                      <div className="text-center py-1.5 rounded bg-gray-900/60 text-gray-400 text-[11px]">280</div>
                      <div className="text-center py-1.5 rounded bg-gray-900/60 text-gray-400 text-[11px]">240</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Indicator Banner */}
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                {!syncedMode ? (
                  <div className="flex items-center gap-2 text-red-400 font-semibold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Double booking conflict! Same villa booked on 2 channels simultaneously.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>No double bookings. Ever. All other 4 OTAs locked automatically in 0.8s.</span>
                  </div>
                )}
                <span className="text-[11px] text-gray-400 font-mono">
                  {syncedMode ? "0.8s LIVE SYNC" : "CONFLICT STATE"}
                </span>
              </div>
            </div>

            {/* 6 Feature Tiles (2x3 Grid matching Homeyhuts) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {features.map((item, idx) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onMouseEnter={() => setActiveFeature(idx)}
                  className={`p-3.5 rounded-2xl border transition-all text-left flex items-start gap-3 group ${
                    activeFeature === idx
                      ? "bg-[#fff1ef] border-[#ff3823]/50 shadow-sm"
                      : "bg-gray-50/70 border-gray-200/80 hover:bg-gray-100/70"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 group-hover:text-[#ff3823] group-hover:border-[#ff3823]/40 transition-colors shrink-0 shadow-sm">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900 group-hover:text-[#ff3823] flex items-center gap-1">
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-700">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug mt-0.5 line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
