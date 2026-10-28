"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, Layers, Globe, Zap, DollarSign, Shield, 
  BarChart3, MessageSquare, Users, PhoneCall, ArrowRight,
  CheckCircle2, Sparkles, Sliders, TrendingUp, ChevronRight
} from "lucide-react";

export default function FeatureExplorer() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: "calendar",
      title: "Unified Calendar",
      badge: "Core Engine",
      h3: "One calendar. Every booking. Complete control.",
      icon: Calendar,
      bullets: [
        "View every booking from all your connected booking channels across all your properties in one unified calendar.",
        "Manage OTA, direct, walk-in, and offline bookings from a single place.",
        "Update availability and pricing instantly across every connected booking channel.",
        "Prevent double bookings with automatic real-time calendar synchronization.",
      ],
      link: "/unified-calendar",
      previewTitle: "Unified Calendar Live View",
      previewSub: "Synced across 50+ channels in real-time",
      previewStats: [
        { label: "Connected Portfolios", val: "5 Properties · 18 Units" },
        { label: "Sync Latency", val: "0.8 seconds (Sub-second)" },
        { label: "Upcoming Check-ins", val: "14 Guests this week" },
      ]
    },
    {
      id: "direct",
      title: "Direct Bookings",
      badge: "0% Commission",
      h3: "Own your bookings. Build your brand. Keep more revenue.",
      icon: PhoneCall,
      bullets: [
        "Manage direct, walk-in, phone, WhatsApp, and offline bookings from one professional dashboard.",
        "Send branded booking confirmations, payment reminders, invoices, and guest notifications that reinforce your brand.",
        "Track payments, add-ons, food, experiences, airport transfers, and every upsell opportunity in one place.",
        "Encourage repeat guests and direct bookings to reduce OTA commissions while giving your team one shared system to manage every reservation with confidence.",
      ],
      link: "/offline-bookings",
      previewTitle: "Direct Booking Engine",
      previewSub: "Zero OTA commissions · Instant UPI & Card settlements",
      previewStats: [
        { label: "Commission Saved", val: "₹1,84,000 / month" },
        { label: "Direct Payment Modes", val: "UPI, Cards, NetBanking" },
        { label: "Guest Vouchers", val: "Automated WhatsApp PDF" },
      ]
    },
    {
      id: "channel",
      title: "Channel Manager",
      badge: "50+ OTAs",
      h3: "More channels. More travelers. More bookings.",
      icon: Layers,
      bullets: [
        "Connect Airbnb, Booking.com, MakeMyTrip, Agoda, Goibibo, Expedia, and more to maximize your property's visibility.",
        "Reach millions of travelers searching across multiple booking channels and increase your booking opportunities.",
        "Automatically sync pricing, availability, and bookings across every connected channel in real time.",
        "Eliminate manual updates and prevent double bookings effortlessly.",
      ],
      link: "/channel-manager",
      previewTitle: "Channel Connection Hub",
      previewSub: "2-Way Certified API & iCal Sync",
      previewStats: [
        { label: "Active Channels", val: "Airbnb, Booking, MMT, Agoda" },
        { label: "Conflict Prevention", val: "100% Guaranteed" },
        { label: "Avg Occupancy Boost", val: "+28% in 120 Days" },
      ]
    },
    {
      id: "website",
      title: "Booking Website",
      badge: "No-Code",
      h3: "Your brand. Your website. Built for one property or one thousand.",
      icon: Globe,
      bullets: [
        "Launch a stunning, mobile-friendly booking website under your own brand in less than 15 minutes.",
        "Accept secure online payments and increase commission-free direct bookings.",
        "Automatically sync pricing, availability, and bookings with your connected OTAs in real time.",
        "Showcase photo galleries, guest reviews, amenities, and house rules with custom domain support.",
      ],
      link: "/direct-booking-website",
      previewTitle: "Direct Website Builder",
      previewSub: "Custom domain ready · SEO optimized",
      previewStats: [
        { label: "Conversion Rate", val: "4.8% on Mobile" },
        { label: "Custom Domain", val: "yourbrand.com supported" },
        { label: "Payment Gateway", val: "Direct Host Account Pay" },
      ]
    },
    {
      id: "cluster",
      title: "Magic Cluster",
      badge: "Patented Logic",
      h3: "One property. Multiple listings. Endless possibilities.",
      icon: Zap,
      bullets: [
        "List the same property as individual rooms, room combinations, or the entire property to maximize booking opportunities.",
        "Every booking automatically updates and syncs all related listings across your connected booking channels.",
        "Increase occupancy during low and regular seasons by letting guests book your property the way they prefer.",
        "Avoid calendar clashes with automatic parent-child block rules.",
      ],
      link: "/magic-cluster",
      previewTitle: "Magic Cluster™ Architecture",
      previewSub: "Entire Villa ↔ Room 1 + Room 2 + Room 3",
      previewStats: [
        { label: "Listing Multiplier", val: "1 Property → 4 Live Listings" },
        { label: "Weekday Occupancy", val: "+35% Lift" },
        { label: "Auto-Block Status", val: "Active (Zero Clashes)" },
      ]
    },
    {
      id: "pricing",
      title: "Flexi Pricing",
      badge: "Yield Booster",
      h3: "Single or bulk pricing updates, made effortless.",
      icon: DollarSign,
      bullets: [
        "Increase or decrease prices across one or dozens of properties with a single percentage update.",
        "Prepare your portfolio for weekends, holidays, festivals, or special events in just a few clicks.",
        "Apply pricing changes instantly without updating every property one by one.",
        "Define length of stay discounts and last-minute deals across all OTAs.",
      ],
      link: "/flexi-pricing",
      previewTitle: "Flexi Pricing™ Engine",
      previewSub: "Bulk percentage updates & surge multipliers",
      previewStats: [
        { label: "Weekend Surge Rule", val: "+20% Fri & Sat" },
        { label: "Festive Season Preset", val: "Diwali / New Year ready" },
        { label: "Propagation Speed", val: "Instant across all channels" },
      ]
    },
    {
      id: "expenses",
      title: "Expense Tracking",
      badge: "True P&L",
      h3: "Know your real profit, not just your revenue.",
      icon: Shield,
      bullets: [
        "Track every expense including rent, salaries, electricity, maintenance, commissions, and supplies for each property.",
        "See your true profit margin with complete property-level profit and loss reporting, not just gross revenue.",
        "Identify your most profitable properties and discover where you're losing money.",
        "Generate one-click financial export sheets for accountants and partners.",
      ],
      link: "/expenses-and-profits",
      previewTitle: "Property Profit & Loss (P&L)",
      previewSub: "Revenue - Commissions - Ops Costs = Net Profit",
      previewStats: [
        { label: "Net Profit Margin", val: "48.2% after all expenses" },
        { label: "OTA Fees Saved", val: "₹42,800 this month" },
        { label: "Vendor Outstandings", val: "Tracked per unit" },
      ]
    },
    {
      id: "analytics",
      title: "AI Analytics",
      badge: "Soon",
      h3: "Turn your business data into smarter decisions.",
      icon: BarChart3,
      bullets: [
        "Track revenue, occupancy, ADR, direct bookings, and business performance from one intelligent dashboard.",
        "Get actionable insights, trends, and recommendations to grow revenue and improve occupancy.",
        "Compare the performance of your properties, booking channels, and portfolio from one place.",
        "Predict upcoming demand and adjust pricing proactively.",
      ],
      link: "/ai-analytics",
      previewTitle: "AI Business Intelligence",
      previewSub: "ADR, RevPAR & Occupancy Forecasting",
      previewStats: [
        { label: "Forecasted RevPAR", val: "₹3,420 / available room" },
        { label: "Top Channel Yield", val: "Direct (98% margin)" },
        { label: "Market Demand Trend", val: "High Surge (+31%)" },
      ]
    },
    {
      id: "inbox",
      title: "Unified Inbox",
      badge: "Soon",
      h3: "Every guest message. One inbox.",
      icon: MessageSquare,
      bullets: [
        "Airbnb + Booking.com + Direct Booking Website messages consolidated in one single workspace.",
        "One place to read, reply, and send check-in instructions to arriving guests.",
        "AI-powered auto replies to answer standard guest questions about Wi-Fi, directions, and parking.",
        "View guest stay details and phone numbers right alongside the conversation.",
      ],
      link: "/unified-inbox",
      previewTitle: "Unified Guest Inbox",
      previewSub: "Airbnb, Booking.com & WhatsApp in one screen",
      previewStats: [
        { label: "Response Time", val: "< 4 minutes avg" },
        { label: "Active Guest Chats", val: "6 conversations today" },
        { label: "Automated Check-in", val: "Enabled with directions" },
      ]
    },
    {
      id: "team",
      title: "Co-Hosts",
      badge: "Role Control",
      h3: "Let your team manage your business.",
      icon: Users,
      bullets: [
        "Add co-hosts, employees, cleaners, and team members to help manage your properties.",
        "Give your team access to bookings, calendars, guests, and daily operations from one place.",
        "Manage multiple properties together without sharing your personal accounts or master passwords.",
        "Fine-grained permissions: hide financials and pricing from operational staff.",
      ],
      link: "/co-hosts-and-team",
      previewTitle: "Team & Role Access Matrix",
      previewSub: "Co-hosts, Cleaners, Managers & Accountants",
      previewStats: [
        { label: "Active Team Members", val: "4 Staff Members" },
        { label: "Access Security", val: "Role-Based Restrictive" },
        { label: "Housekeeping Alert", val: "Instant on Checkout" },
      ]
    },
  ];

  const current = features[activeTab];

  return (
    <section id="features" className="py-20 sm:py-24 bg-[#fbf9f6] border-y border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff2800] bg-[#ffeee9] px-3 py-1 rounded-full border border-[#ffe9e5] inline-block mb-3">
            Designed for Every Host
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d4b] tracking-tight font-display">
            Whether you&apos;re managing one property or{" "}
            <span className="lyp-serif text-[#ff2800]">one thousand.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            A comprehensive PMS platform built from the ground up for modern homestays, vacation rental operators, and hospitality entrepreneurs.
          </p>
        </div>

        {/* Feature Tab Navigation Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 scrollbar-none border-b border-gray-200">
          {features.map((f, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={f.id}
                onClick={() => setActiveTab(idx)}
                className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0a1d4b] text-white shadow-md shadow-[#0a1d4b]/20 font-bold"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                }`}
              >
                <span>{f.title}</span>
                {f.badge === "Soon" && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-amber-400 text-gray-950" : "bg-amber-100 text-amber-800"
                  }`}>
                    Soon
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#ff2800] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Feature Showcase Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#ffeee9] text-[#ff2800] text-xs font-bold border border-[#ffe9e5]">
                {current.badge}
              </span>
              <span className="text-xs font-semibold text-[#0a1d4b] bg-[#e7ebf4] px-2.5 py-1 rounded-full">
                {current.title}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d4b] font-display tracking-tight leading-tight">
                {current.h3}
              </h3>
            </div>

            {/* Bullets with → */}
            <div className="space-y-3 pt-1">
              {current.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <span className="text-[#ff2800] font-bold text-sm shrink-0">→</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link
                href={current.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-[#0a1d4b] hover:bg-[#1c3066] text-white font-semibold text-xs transition-colors shadow-md"
              >
                Explore {current.title} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start-trial"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:py-3 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-xs transition-colors shadow-md shadow-[#ff2800]/25"
              >
                Start free trial
              </Link>
            </div>
          </div>

          {/* Right Visual Graphic / Mockup Card */}
          <div className="lg:col-span-5 bg-[#0a1d4b] rounded-2xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-[#1c3066]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff2800]/20 blur-[60px] rounded-full pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ff2800] flex items-center justify-center text-white">
                  <current.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{current.previewTitle}</div>
                  <div className="text-[10px] text-gray-300">{current.previewSub}</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                ACTIVE
              </span>
            </div>

            {/* Stats List */}
            <div className="space-y-3 text-xs mb-5">
              {current.previewStats.map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-gray-300">{st.label}</span>
                  <span className="font-bold text-white font-mono">{st.val}</span>
                </div>
              ))}
            </div>

            {/* Bottom Insight Pill */}
            <div className="p-3 rounded-xl bg-[#ffeee9]/10 border border-[#ff2800]/30 text-white flex items-start gap-2 text-xs">
              <Sparkles className="w-4 h-4 text-[#ff2800] shrink-0 mt-0.5" />
              <div className="text-[11px] text-gray-200 leading-snug">
                Fully automated and ready out of the box with zero complex engineering.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
