"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Star, ArrowRight, CheckCircle2, Lock, 
  RotateCw, Phone, Globe, Wallet, Mail, Users, AlertTriangle, 
  Calendar as CalendarIcon, Play, Pause, ChevronRight, MessageSquare, 
  Send, Search, Check, ShieldCheck, BedDouble, Building, ExternalLink,
  Sparkles, TrendingUp
} from "lucide-react";

export default function Hero() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [syncedMode, setSyncedMode] = useState(false);
  const [offlineSource, setOfflineSource] = useState("WhatsApp");
  const [inboxTab, setInboxTab] = useState("airbnb");

  // Motion graphics animated states
  const [animProgress, setAnimProgress] = useState(0);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const destinations = ["Lucknow, Gomti Nagar", "Shaheed Path (Lulu Mall)", "Vikalp Khand Villas", "Vishesh Khand Duplex"];

  const channels = [
    { name: "Airbnb", color: "#ff5a5f", dot: true, bg: "bg-[#ff5a5f]/10", border: "border-[#ff5a5f]/30" },
    { name: "Booking.com", color: "#003b95", dot: true, bg: "bg-[#003b95]/10", border: "border-[#003b95]/30" },
    { name: "Vrbo", color: "#3563e9", dot: false, bg: "bg-[#3563e9]/10", border: "border-[#3563e9]/30" },
    { name: "MakeMyTrip", color: "#e5195e", dot: true, bg: "bg-[#e5195e]/10", border: "border-[#e5195e]/30" },
    { name: "Agoda", color: "#6c3fd1", dot: true, bg: "bg-[#6c3fd1]/10", border: "border-[#6c3fd1]/30" },
    { name: "Goibibo", color: "#ec5b24", dot: false, bg: "bg-[#ec5b24]/10", border: "border-[#ec5b24]/30" },
    { name: "Direct Website", color: "#0d9488", dot: true, bg: "bg-[#0d9488]/10", border: "border-[#0d9488]/30" },
  ];

  const features = [
    { title: "Channel Manager", desc: "Real-time sync across all channels", icon: RotateCw, href: "/channel-manager" },
    { title: "Offline Booking", desc: "Walk-in, phone and social media bookings", icon: Phone, href: "/offline-bookings" },
    { title: "Direct Website", desc: "Your own website with online payments", icon: Globe, href: "/direct-booking-website" },
    { title: "Expenses & Profits", desc: "Know your true profits", icon: Wallet, href: "/expenses-and-profits" },
    { title: "Unified Inbox", desc: "Airbnb, Booking.com messages in one inbox", icon: Mail, href: "/unified-inbox", badge: "New" },
    { title: "Co-Hosts & Team", desc: "Let your team manage your business", icon: Users, href: "/co-hosts-and-team" },
  ];

  // Auto timeline & animation loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSyncedMode((prev) => !prev);
      setAnimProgress((prev) => (prev >= 100 ? 0 : prev + 25));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Typewriter effect for Direct Website demo
  useEffect(() => {
    const typeInterval = setInterval(() => {
      setTypewriterIndex((prev) => (prev + 1) % destinations.length);
    }, 3200);
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#faf9f5] via-white to-gray-50/50">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-[#ffe8e4]/50 via-[#fff3eb]/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-5 space-y-6 pt-2">
            
            {/* Google Rating Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm text-xs font-semibold text-gray-800">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black">G</span>
              <span className="font-bold text-gray-900">4.9</span>
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-gray-400">·</span>
              <span className="text-gray-600 font-normal">Trusted by 6,000+ properties across India</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0c1838] tracking-tight leading-[1.08] font-display">
                PMS & Channel Manager for{" "}
                <span className="font-serif italic font-normal text-[#ff2800] tracking-normal">Vacation Rentals</span>{" "}
                & Homestays
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-xl">
              Manage Airbnb, Booking.com, Vrbo, MakeMyTrip, direct bookings, pricing, and availability from{" "}
              <strong className="font-semibold text-gray-900 underline decoration-[#ff2800]/40 decoration-2 underline-offset-4">
                one powerful app
              </strong>
              .
            </p>

            {/* Channel Logos Sync Carousel */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Syncs with 50+ channels — from 1 to 1,000 properties
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {channels.map((ch) => (
                  <div
                    key={ch.name}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${ch.bg} ${ch.border} flex items-center gap-1.5 shadow-xs hover:scale-105`}
                    style={{ color: ch.color }}
                  >
                    <span>{ch.name}</span>
                    {ch.dot && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>
                ))}
                <span className="px-2.5 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200">
                  +50
                </span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/start-trial"
                className="px-8 py-3.5 rounded-full bg-[#ff2800] hover:bg-[#e5220d] text-white font-bold text-sm shadow-lg shadow-[#ff2800]/30 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                Start free trial
              </Link>
              <Link
                href="/stays"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-900 font-bold text-sm border border-gray-300 shadow-sm transition-all flex items-center gap-2 hover:border-[#ff2800] text-left"
              >
                <BedDouble className="w-4 h-4 text-[#ff2800]" />
                <span>Explore All 18 Stays</span>
              </Link>
              <Link
                href="/book-a-demo"
                className="px-5 py-3.5 rounded-full bg-transparent hover:bg-gray-100 text-gray-700 font-semibold text-sm transition-all flex items-center gap-1.5"
              >
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <span>Book Demo</span>
              </Link>
            </div>

            {/* Special Promo Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fff8eb] border border-amber-200/70 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-gray-800 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🪔</span>
                <div>
                  <div className="font-bold text-gray-900">
                    Special launch offer — <span className="text-[#ff2800]">up to 35% off</span>
                  </div>
                  <div className="text-gray-500 text-[11px]">New hosts & Lucknow property managers only</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 font-mono font-bold text-[11px] bg-white px-2 py-1 rounded border border-amber-200">
                  <span>20</span>
                  <span className="text-gray-300">:</span>
                  <span>02</span>
                  <span className="text-gray-300">:</span>
                  <span>50</span>
                </div>
                <Link href="/pricing" className="text-[11px] font-bold text-[#ff2800] underline hover:text-[#d9220e]">
                  See pricing
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Motion Graphics iPad Device Simulator + 6 Feature Tabs */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* iPad Device Shell with Soft Glass Gradient */}
            <div className="relative rounded-[32px] bg-[#1a1b1e] p-3 sm:p-4 shadow-2xl border-4 border-[#2d2e32] transition-all">
              
              {/* Inner Screen Surface */}
              <div className="rounded-[22px] bg-[#111216] p-4 sm:p-5 text-white min-h-[380px] flex flex-col justify-between overflow-hidden relative shadow-inner">
                
                {/* 1. CHANNEL MANAGER SCREEN (activeFeature === 0) */}
                {activeFeature === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* Top Mode Bar */}
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div className="inline-flex rounded-full bg-gray-900 p-1 border border-gray-800">
                        <button
                          onClick={() => setSyncedMode(false)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            !syncedMode
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Without a channel manager
                        </button>
                        <button
                          onClick={() => setSyncedMode(true)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            syncedMode
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          With Homey India (0.8s Sync)
                        </button>
                      </div>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 bg-gray-900/80 px-2.5 py-1 rounded-full border border-gray-800"
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

                    {/* Timeline Laser Scanner Motion Graphic */}
                    <div className="relative overflow-x-auto text-xs">
                      {/* Scanning Line Animation */}
                      <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#ff2800] to-transparent shadow-[0_0_8px_#ff2800] pointer-events-none z-10 animate-[scan_4s_ease-in-out_infinite]" />

                      <div className="min-w-[500px]">
                        <div className="grid grid-cols-8 gap-1.5 text-center text-gray-400 font-medium mb-2.5">
                          <div className="text-left pl-1">Channel</div>
                          <div>Mon 12</div>
                          <div>Tue 13</div>
                          <div className="text-[#ff2800] font-bold">Wed 14</div>
                          <div className="text-[#ff2800] font-bold">Thu 15</div>
                          <div>Fri 16</div>
                          <div>Sat 17</div>
                          <div>Sun 18</div>
                        </div>

                        {[
                          { id: "airbnb", name: "Airbnb", logo: "A", color: "#ff5a5f" },
                          { id: "booking", name: "Booking.com", logo: "B.", color: "#003b95" },
                          { id: "vrbo", name: "Vrbo", logo: "V", color: "#3563e9" },
                          { id: "agoda", name: "Agoda", logo: "Ag", color: "#6c3fd1" },
                          { id: "website", name: "Website", logo: "🌐", color: "#0d9488" },
                        ].map((row, rIdx) => (
                          <div key={row.id} className="grid grid-cols-8 gap-1.5 items-center py-1.5 border-b border-gray-800/40">
                            <div className="flex items-center gap-1.5 pl-1 font-semibold text-gray-200 text-[11px]">
                              <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0" style={{ backgroundColor: row.color, color: "#fff" }}>
                                {row.logo}
                              </span>
                              <span className="truncate">{row.name}</span>
                            </div>

                            <div className="text-center py-1 rounded bg-gray-900/60 text-gray-400 text-[11px]">180</div>
                            <div className="text-center py-1 rounded bg-gray-900/60 text-gray-400 text-[11px]">180</div>

                            {/* Wed 14 & Thu 15: Conflict vs 0.8s Lock with smooth CSS transitions */}
                            {!syncedMode ? (
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
                                  <div className="text-center py-1 rounded bg-gray-900/60 text-gray-400 text-[11px]">220</div>
                                  <div className="text-center py-1 rounded bg-gray-900/60 text-gray-400 text-[11px]">220</div>
                                </>
                              )
                            ) : (
                              rIdx === 0 ? (
                                <div className="col-span-2 text-center py-1.5 rounded bg-[#ff5a5f] text-white font-bold text-[11px] shadow-md transition-all">
                                  Priya · 2 nights
                                </div>
                              ) : (
                                <div className="col-span-2 text-center py-1.5 rounded bg-gray-800/90 text-gray-300 font-semibold text-[10px] border border-gray-700 flex items-center justify-center gap-1 transition-all">
                                  <Lock className="w-2.5 h-2.5 text-gray-400" /> Closed in 0.8s
                                </div>
                              )
                            )}

                            <div className="text-center py-1 rounded bg-gray-900/60 text-gray-400 text-[11px]">260</div>
                            <div className="text-center py-1 rounded bg-gray-900/60 text-gray-400 text-[11px]">280</div>
                            <div className="text-center py-1 rounded bg-gray-900/60 text-gray-400 text-[11px]">240</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status Note */}
                    <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
                      {!syncedMode ? (
                        <div className="flex items-center gap-1.5 text-red-400 font-semibold text-[11px] animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Double booking conflict! Two guests booked the same dates.</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Zero double bookings. All 4 OTAs locked automatically in 0.8s.</span>
                        </div>
                      )}
                      <span className="text-[10px] text-gray-500 font-mono">
                        {syncedMode ? "0.8s REAL-TIME SYNC" : "COLLISION DETECTED"}
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. OFFLINE BOOKING SCREEN (activeFeature === 1 - Animated Chat & Form) */}
                {activeFeature === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch animate-in fade-in duration-300">
                    {/* Left: Animated WhatsApp Chat Mockup */}
                    <div className="sm:col-span-5 rounded-xl bg-[#0f241d] border border-emerald-900/40 p-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 border-b border-emerald-900/60 pb-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                            P
                          </div>
                          <div>
                            <div className="font-bold text-xs text-emerald-100">Priya</div>
                            <div className="text-[9px] text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> WhatsApp · online
                            </div>
                          </div>
                        </div>

                        {/* Animated Chat Bubbles */}
                        <div className="space-y-2.5 text-[11px]">
                          <div className="bg-[#1b382d] p-2.5 rounded-xl rounded-tl-none text-emerald-100 max-w-[90%] shadow-xs animate-in slide-in-from-left duration-300">
                            Hi! Is The Unique Gomti Nagar villa free 20–22 Oct? We are 4.
                          </div>

                          {/* Pulsing Host Typing indicator */}
                          <div className="flex items-center gap-1 text-[10px] text-emerald-400 pl-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce" />
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce delay-100" />
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce delay-200" />
                            <span>Praveen Singh typing...</span>
                          </div>

                          <div className="bg-[#24523f] p-2.5 rounded-xl rounded-tr-none text-white ml-auto max-w-[90%] shadow-xs animate-in slide-in-from-right duration-500">
                            Yes! Creating your booking right now.
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-emerald-400/80 pt-2 flex items-center gap-1 border-t border-emerald-900/40">
                        <Check className="w-3 h-3" /> Auto-sync with PMS
                      </div>
                    </div>

                    {/* Right: New Offline Booking Form Card */}
                    <div className="sm:col-span-7 bg-white text-gray-900 rounded-xl p-3.5 space-y-2.5 shadow-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-gray-900">New offline booking</h4>
                        <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">
                          The Unique Gomti Nagar
                        </span>
                      </div>

                      {/* Source Pills */}
                      <div className="flex items-center gap-1 text-[10px]">
                        {["Walk-in", "Phone", "WhatsApp", "Instagram"].map((src) => (
                          <button
                            key={src}
                            onClick={() => setOfflineSource(src)}
                            className={`px-2 py-1 rounded font-semibold transition-all ${
                              offlineSource === src
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {src}
                          </button>
                        ))}
                      </div>

                      {/* Form Details */}
                      <div className="space-y-1.5 text-[11px] pt-1">
                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-gray-500">Guest</span>
                          <span className="font-bold text-gray-900">Priya Sharma</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-gray-500">Dates</span>
                          <span className="font-bold text-gray-900">20–22 Oct · 2 nights</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-gray-500">Guests</span>
                          <span className="font-bold text-gray-900">4 adults</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Advance</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded animate-pulse">
                            50% · rest on arrival
                          </span>
                        </div>
                      </div>

                      {/* Red Button */}
                      <Link
                        href="/offline-bookings"
                        className="w-full py-2 rounded-lg bg-[#ff2800] hover:bg-[#e5220d] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm hover:scale-[1.01]"
                      >
                        Create booking & send payment link
                      </Link>
                    </div>
                  </div>
                )}

                {/* 3. DIRECT WEBSITE SCREEN (activeFeature === 2 - Typewriter & Browser) */}
                {activeFeature === 2 && (
                  <div className="bg-white rounded-xl overflow-hidden shadow-2xl text-gray-900 animate-in fade-in duration-300">
                    {/* Browser Address Bar */}
                    <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-200 flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                      </div>
                      <div className="flex-1 bg-white rounded px-2.5 py-0.5 text-[11px] text-gray-600 font-mono border border-gray-200 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5 text-emerald-600" />
                          www.theuniquehavenhomes.com
                        </span>
                        <span className="text-[9px] text-[#ff2800] font-bold">0% Commission Engine</span>
                      </div>
                    </div>

                    {/* Mini Website Hero */}
                    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-5 min-h-[200px] flex flex-col justify-between">
                      {/* Nav */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold tracking-tight text-white">The Unique Haven Homes</span>
                        <div className="flex items-center gap-3 text-gray-300 text-[11px]">
                          <span>Stays</span>
                          <span>Experiences</span>
                          <span>About</span>
                          <span className="text-[#ff2800] font-bold">Book</span>
                        </div>
                      </div>

                      {/* Hero content */}
                      <div className="my-2 space-y-1">
                        <h3 className="text-lg font-bold font-display text-white">
                          Luxury Stays in Lucknow.
                        </h3>
                        <p className="text-[11px] text-gray-300">
                          18 Handcrafted Villas & Penthouses booked direct with 0% OTA fee.
                        </p>
                      </div>

                      {/* Dynamic Animated Typewriter Search Bar */}
                      <div className="bg-white text-gray-900 rounded-lg p-1.5 flex items-center justify-between gap-2 shadow-lg">
                        <div className="pl-2 border-r border-gray-200 pr-2 flex-1">
                          <div className="text-[9px] text-gray-400 font-bold uppercase">Where</div>
                          <div className="text-[11px] font-bold text-[#ff2800] flex items-center gap-1">
                            <span>{destinations[typewriterIndex]}</span>
                            <span className="w-1.5 h-3 bg-[#ff2800] animate-pulse inline-block" />
                          </div>
                        </div>
                        <div className="border-r border-gray-200 pr-2 flex-1 hidden sm:block">
                          <div className="text-[9px] text-gray-400 font-bold uppercase">When</div>
                          <div className="text-[11px] text-gray-700 font-medium">Any dates</div>
                        </div>
                        <div className="pr-2 flex-1 hidden sm:block">
                          <div className="text-[9px] text-gray-400 font-bold uppercase">Guests</div>
                          <div className="text-[11px] text-gray-700 font-medium">2-10 guests</div>
                        </div>
                        <Link
                          href="/stays"
                          className="w-8 h-8 rounded-md bg-[#ff2800] hover:bg-[#e5220d] text-white flex items-center justify-center shrink-0 transition-transform hover:scale-105"
                          title="View Lucknow Stays"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Bottom guest link banner */}
                    <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs px-4">
                      <span className="text-gray-600 font-medium text-[11px]">
                        Save ₹1,000–₹2,500 per night by booking direct on our engine
                      </span>
                      <Link
                        href="/stays"
                        className="text-[#ff2800] font-bold hover:underline flex items-center gap-1 text-xs"
                      >
                        Explore 18 Stays <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* 4. EXPENSES & PROFITS SCREEN (activeFeature === 3 - EXACT MATCH WITH USER SCREENSHOT!) */}
                {activeFeature === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch text-gray-900 animate-in fade-in duration-300">
                    
                    {/* Left Card: October / Sea View Villa (Revenue vs Expenses Progress Bars) */}
                    <div className="sm:col-span-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-200/90 flex flex-col justify-between">
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                          <h4 className="text-base font-extrabold text-gray-900 font-display">October</h4>
                          <span className="text-[10px] text-gray-500 font-medium">
                            The Unique Haven Homes
                          </span>
                        </div>

                        {/* Net Revenue Section */}
                        <div className="pt-3 space-y-2">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                            Net Revenue - After OTA Fees
                          </span>

                          {/* Airbnb bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="flex items-center gap-1.5 font-medium text-gray-800">
                                <span className="w-4 h-4 rounded-full bg-[#ff5a5f] text-white flex items-center justify-center font-bold text-[9px]">A</span>
                                Airbnb
                              </span>
                              <span className="font-bold text-gray-900 font-mono">1,240</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" style={{ width: "85%" }} />
                            </div>
                          </div>

                          {/* Website bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="flex items-center gap-1.5 font-medium text-gray-800">
                                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">🌐</span>
                                Website
                              </span>
                              <span className="font-bold text-gray-900 font-mono">1,140</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out delay-150" style={{ width: "78%" }} />
                            </div>
                          </div>

                          {/* WhatsApp bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="flex items-center gap-1.5 font-medium text-gray-800">
                                <span className="w-4 h-4 rounded-full bg-[#25d366] text-white flex items-center justify-center text-[9px]">💬</span>
                                WhatsApp
                              </span>
                              <span className="font-bold text-gray-900 font-mono">860</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out delay-300" style={{ width: "60%" }} />
                            </div>
                          </div>
                        </div>

                        {/* Expenses Section */}
                        <div className="pt-3 space-y-1.5 border-t border-gray-100 mt-3 text-[11px]">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                            Expenses
                          </span>
                          <div className="flex justify-between items-center text-gray-600">
                            <span>Cleaning</span>
                            <span className="font-bold text-red-500 font-mono">-320</span>
                          </div>
                          <div className="flex justify-between items-center text-gray-600">
                            <span>Staff</span>
                            <span className="font-bold text-red-500 font-mono">-450</span>
                          </div>
                          <div className="flex justify-between items-center text-gray-600">
                            <span>Utilities</span>
                            <span className="font-bold text-red-500 font-mono">-210</span>
                          </div>
                          <div className="flex justify-between items-center text-gray-600">
                            <span>Supplies</span>
                            <span className="font-bold text-red-500 font-mono">-200</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Card: Profit & Loss Waterfall Animated Chart (Exact match with Homeyhuts Screenshot!) */}
                    <div className="sm:col-span-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-200/90 flex flex-col justify-between">
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <h4 className="text-base font-extrabold text-gray-900 font-display">Profit & loss</h4>
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live P&L
                          </span>
                        </div>

                        {/* Dynamic Waterfall Chart Graphic */}
                        <div className="pt-4 pb-2">
                          <div className="h-32 flex items-end justify-between gap-2 px-2 border-b border-gray-200 pb-1 relative">
                            {/* Bar 1: Green Gross Revenue (Full height 120px) */}
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-emerald-500 rounded-t-md transition-all duration-1000 ease-out shadow-sm" style={{ height: "115px" }} />
                              <span className="text-[9px] text-gray-500 mt-1 font-medium truncate">Revenue</span>
                            </div>

                            {/* Bar 2: Red OTA Commission step */}
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-[#ff2800] rounded-md transition-all duration-1000 ease-out shadow-xs" style={{ height: "24px", marginBottom: "91px" }} />
                              <span className="text-[9px] text-gray-400 mt-1 truncate">OTA</span>
                            </div>

                            {/* Bar 3: Red Staff Expense step */}
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-[#ff2800] rounded-md transition-all duration-1000 ease-out shadow-xs" style={{ height: "30px", marginBottom: "61px" }} />
                              <span className="text-[9px] text-gray-400 mt-1 truncate">Staff</span>
                            </div>

                            {/* Bar 4: Red Cleaning step */}
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-[#ff2800] rounded-md transition-all duration-1000 ease-out shadow-xs" style={{ height: "16px", marginBottom: "45px" }} />
                              <span className="text-[9px] text-gray-400 mt-1 truncate">Clean</span>
                            </div>

                            {/* Bar 5: Red Supplies step */}
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-[#ff2800] rounded-md transition-all duration-1000 ease-out shadow-xs" style={{ height: "14px", marginBottom: "31px" }} />
                              <span className="text-[9px] text-gray-400 mt-1 truncate">Bills</span>
                            </div>

                            {/* Bar 6: Final Emerald Net Profit Bar */}
                            <div className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-emerald-500 rounded-t-md transition-all duration-1000 ease-out shadow-sm" style={{ height: "74px" }} />
                              <span className="text-[9px] text-emerald-700 font-bold mt-1 truncate">Profit</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Net Operating Income & Gauge Ring (Screenshot match) */}
                        <div className="pt-3 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">Net operating income</span>
                            <div className="text-xl font-extrabold text-gray-900 font-mono">
                              ₹1,84,500
                            </div>
                            <span className="text-[9px] text-gray-400 block">*Net revenue - Expenses</span>
                          </div>

                          {/* Circular Gauge Ring */}
                          <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-gray-100"
                                strokeWidth="3.5"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-emerald-500 transition-all duration-1000"
                                strokeDasharray="64, 100"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <span className="absolute text-[11px] font-black text-gray-900 font-mono">
                              64%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. UNIFIED INBOX SCREEN (activeFeature === 4 - Screenshot 3) */}
                {activeFeature === 4 && (
                  <div className="grid grid-cols-12 gap-2 text-gray-900 animate-in fade-in duration-300 h-[280px]">
                    {/* Left Rail Channels */}
                    <div className="col-span-1 bg-[#1a1c22] rounded-xl flex flex-col items-center py-3 gap-2.5 border border-gray-800">
                      <button
                        onClick={() => setInboxTab("airbnb")}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white transition-transform ${
                          inboxTab === "airbnb" ? "bg-[#ff5a5f] shadow-md scale-105" : "bg-gray-800 opacity-60"
                        }`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => setInboxTab("booking")}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white transition-transform ${
                          inboxTab === "booking" ? "bg-[#003b95] shadow-md scale-105" : "bg-gray-800 opacity-60"
                        }`}
                      >
                        B.
                      </button>
                      <button
                        onClick={() => setInboxTab("direct")}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white transition-transform ${
                          inboxTab === "direct" ? "bg-[#0d9488] shadow-md scale-105" : "bg-gray-800 opacity-60"
                        }`}
                      >
                        🌐
                      </button>
                    </div>

                    {/* Middle Message List */}
                    <div className="col-span-5 bg-white rounded-xl p-2.5 flex flex-col justify-between border border-gray-200 shadow-md">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <span className="font-bold text-xs text-gray-900">Inbox</span>
                          <span className="text-[9px] bg-red-100 text-[#ff2800] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                            2 new
                          </span>
                        </div>

                        <div className="space-y-1.5 mt-2">
                          <div className="p-2 rounded-lg bg-[#fff1ef] border border-[#ff2800]/30 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[11px] text-gray-900">Priya</span>
                              <span className="text-[9px] text-[#ff2800] font-semibold">now</span>
                            </div>
                            <p className="text-[10px] text-gray-600 truncate mt-0.5">What time is check-in?</p>
                          </div>

                          <div className="p-2 rounded-lg hover:bg-gray-50 border border-gray-100 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[11px] text-gray-800">Tom</span>
                              <span className="text-[9px] text-gray-400">1h</span>
                            </div>
                            <p className="text-[10px] text-gray-500 truncate mt-0.5">Is parking available?</p>
                          </div>

                          <div className="p-2 rounded-lg hover:bg-gray-50 border border-gray-100 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[11px] text-gray-800">Ana</span>
                              <span className="text-[9px] text-gray-400">yesterday</span>
                            </div>
                            <p className="text-[10px] text-gray-500 truncate mt-0.5">Loved the stay, thank you!</p>
                          </div>
                        </div>
                      </div>

                      <span className="text-[9px] text-gray-400 text-center">Auto-sync across Airbnb & Booking</span>
                    </div>

                    {/* Right Open Chat Window (Screenshot 3) */}
                    <div className="col-span-6 bg-white rounded-xl p-3 flex flex-col justify-between border border-gray-200 shadow-md">
                      <div>
                        {/* Chat Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <div>
                            <div className="font-bold text-xs text-gray-900">Priya</div>
                            <div className="text-[9px] text-gray-500">The Unique Lucknow · 25–27 Oct · 2 guests</div>
                          </div>
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Coming soon
                          </span>
                        </div>

                        {/* Chat Bubbles */}
                        <div className="space-y-2 mt-3 text-[11px]">
                          <div className="bg-gray-100 p-2.5 rounded-xl rounded-tl-none max-w-[85%] text-gray-800 shadow-xs animate-in slide-in-from-left duration-200">
                            Hi! What time is check-in?
                          </div>
                          <div className="bg-[#ff2800] text-white p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[85%] shadow-xs animate-in slide-in-from-right duration-300">
                            Check-in is from 2 PM. I have sent the door code too!
                          </div>
                        </div>
                      </div>

                      {/* Reply Input */}
                      <div className="pt-2 flex items-center gap-1.5 border-t border-gray-100">
                        <input
                          type="text"
                          placeholder="Type a reply..."
                          className="flex-1 bg-gray-50 rounded-lg px-2.5 py-1.5 text-[10px] border border-gray-200 outline-none"
                        />
                        <button className="w-7 h-7 rounded-lg bg-[#ff2800] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. CO-HOSTS & TEAM SCREEN (activeFeature === 5 - Screenshot 2 with Animated Org Tree) */}
                {activeFeature === 5 && (
                  <div className="space-y-3 animate-in fade-in duration-300 text-gray-900">
                    {/* Org Root Card */}
                    <div className="text-center relative">
                      <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-md border border-gray-200 text-xs">
                        <span className="w-5 h-5 rounded-full bg-gray-900 text-white font-bold text-[10px] flex items-center justify-center">
                          Y
                        </span>
                        <span className="font-bold text-gray-900">You · Owner (Praveen Singh)</span>
                        <span className="text-[9px] bg-red-500 text-white font-bold px-1.5 rounded-full animate-pulse">3 invites sent</span>
                      </div>
                    </div>

                    {/* Team Members 3-Col Cards (Screenshot 2) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { initial: "A", name: "Anita", role: "Account manager", scope: "All 18 properties", cal: true, price: true, payout: false },
                        { initial: "S", name: "Sneha", role: "Co-host", scope: "Gomti Grand Villa", cal: true, price: true, payout: false },
                        { initial: "R", name: "Rohan", role: "Ground Ops", scope: "The Unique Suites", cal: true, price: false, payout: false },
                      ].map((m) => (
                        <div key={m.name} className="bg-white rounded-xl p-2.5 border border-gray-200 shadow-md text-xs space-y-2 hover:shadow-lg transition-all">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold text-[10px] flex items-center justify-center">
                              {m.initial}
                            </span>
                            <div>
                              <div className="font-bold text-gray-900 text-[11px]">{m.name}</div>
                              <div className="text-[9px] text-gray-400">{m.role}</div>
                            </div>
                          </div>
                          <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded block text-center">
                            {m.scope}
                          </span>

                          <div className="space-y-1 text-[10px] pt-1">
                            <div className="flex justify-between items-center text-gray-600">
                              <span>Calendar</span>
                              <span className={`w-6 h-3.5 rounded-full flex items-center p-0.5 transition-colors ${m.cal ? "bg-emerald-500 justify-end" : "bg-gray-200 justify-start"}`}>
                                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                              <span>Pricing</span>
                              <span className={`w-6 h-3.5 rounded-full flex items-center p-0.5 transition-colors ${m.price ? "bg-emerald-500 justify-end" : "bg-gray-200 justify-start"}`}>
                                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                              <span>Payouts</span>
                              <span className={`w-6 h-3.5 rounded-full flex items-center p-0.5 transition-colors ${m.payout ? "bg-emerald-500 justify-end" : "bg-gray-200 justify-start"}`}>
                                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Activity Feed ticker */}
                    <div className="bg-white rounded-xl p-2.5 border border-gray-200 shadow-sm text-[10px] flex items-center justify-between text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span><strong>Sneha</strong> raised weekend prices by 10% on Gomti Grand Villa</span>
                      </div>
                      <span className="text-gray-400 font-mono">just now</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 6 Feature Tabs (2x3 Grid matching Homeyhuts) - CLICKABLE TO CHANGE VIEW! */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
              {features.map((item, idx) => (
                <button
                  key={item.title}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-2.5 sm:p-3 rounded-2xl border transition-all text-left flex flex-col sm:flex-row items-start gap-2 sm:gap-3 group cursor-pointer ${
                    activeFeature === idx
                      ? "bg-white border-[#0c1838] shadow-md ring-2 ring-[#0c1838]/10 scale-[1.01]"
                      : "bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    activeFeature === idx
                      ? "bg-[#0c1838] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 group-hover:text-[#ff2800]"
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-bold flex items-center gap-1 ${
                      activeFeature === idx ? "text-[#0c1838]" : "text-gray-900 group-hover:text-[#ff2800]"
                    }`}>
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
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
