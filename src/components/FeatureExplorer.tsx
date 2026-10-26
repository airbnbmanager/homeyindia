"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, Layers, Globe, Zap, DollarSign, Shield, 
  BarChart3, MessageSquare, Users, PhoneCall, ArrowRight,
  CheckCircle2, Sparkles, Sliders, TrendingUp
} from "lucide-react";

export default function FeatureExplorer() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: "calendar",
      title: "Unified Calendar",
      tagline: "One calendar. Every booking. Complete control.",
      icon: Calendar,
      description: "A live, centralized multi-property schedule with real-time drag-and-drop bookings, instant date blocks, and 2-way sync across all channels. View occupancy rates, upcoming check-outs, and pending tasks in one glance.",
      bullets: [
        "Color-coded reservation tags by channel (Airbnb, Booking.com, MMT, Direct)",
        "Instant click-and-drag offline/walk-in booking creation",
        "Mobile calendar app sync with native push notifications",
        "Entire Villa mode vs individual room multi-calendar sync",
      ],
      link: "/unified-calendar",
      badge: "Core Engine",
      stat: "0.8s Sync Latency",
    },
    {
      id: "direct",
      title: "Direct Bookings",
      tagline: "Own your bookings. Build your brand. Keep more revenue.",
      icon: Globe,
      description: "Stop paying 15% to 25% commissions on repeat guests. Manage direct reservations, walk-ins, phone inquiries, and social media bookings with professional automated WhatsApp booking vouchers and GST-compliant invoices.",
      bullets: [
        "Zero commission on direct reservations",
        "Instant automated WhatsApp booking confirmation & check-in guide",
        "GST-ready professional invoice generator with HSN/SAC codes",
        "Online payment links supporting UPI, cards, and Netbanking",
      ],
      link: "/direct-booking-website",
      badge: "0% Commission",
      stat: "Save 20% Margins",
    },
    {
      id: "channel",
      title: "Channel Manager",
      tagline: "More channels. More travelers. More bookings.",
      icon: Layers,
      description: "Two-way live API & iCal synchronization across 50+ travel portals including Airbnb, Booking.com, MakeMyTrip, Agoda, Vrbo, Goibibo, and Expedia. Updates rates and blocks booked dates instantly.",
      bullets: [
        "Two-way instant availability & rate propagation",
        "Certified API connections with premier Indian & global OTAs",
        "Centralized cancellation and modification tracking",
        "Zero double-booking guarantee with automatic conflict resolution",
      ],
      link: "/channel-manager",
      badge: "50+ OTAs",
      stat: "Zero Double Bookings",
    },
    {
      id: "website",
      title: "Booking Website",
      tagline: "Your brand. Your website. Built for one property or one thousand.",
      icon: Globe,
      description: "Launch a custom-branded, mobile-first booking website with zero coding. Showcase high-res property photo galleries, reviews, amenities, house rules, and an instant booking checkout engine.",
      bullets: [
        "Connect your own custom domain (e.g., yourvillagoa.com)",
        "Mobile-responsive design optimized for maximum conversion",
        "Integrated payment gateway with direct bank settlements",
        "SEO-optimized meta tags, local schema, and lightning load speeds",
      ],
      link: "/direct-booking-website",
      badge: "No Code",
      stat: "100% Mobile Ready",
    },
    {
      id: "cluster",
      title: "Magic Cluster™",
      tagline: "One property. Multiple listings. Endless possibilities.",
      icon: Zap,
      description: "Sell the same villa in multiple configurations without double bookings. Sell the entire 4-bedroom villa, or sell individual bedrooms when unbooked. Magic Cluster™ automatically closes parent or child listings in real time.",
      bullets: [
        "Maximize occupancy during off-peak weekdays by selling room-by-room",
        "Capture high-ticket weekend groups with full-property listings",
        "Zero risk of booking overlap across different OTA listings",
        "Automatic recalculation of base and extra guest prices",
      ],
      link: "/magic-cluster",
      badge: "Patented Logic",
      stat: "+35% Occupancy",
    },
    {
      id: "pricing",
      title: "Flexi Pricing™",
      tagline: "Single or bulk pricing updates, made effortless.",
      icon: DollarSign,
      description: "No more logging into multiple extranets to update weekend rates. Flexi Pricing™ lets you define surge pricing, length-of-stay discounts, and seasonal rules that update across all connected channels simultaneously.",
      bullets: [
        "One-click weekend pricing adjustments (Fri–Sun rules)",
        "Bulk rate changes across custom date ranges and property groups",
        "Minimum stay requirements for long weekends and peak holiday seasons",
        "Multi-currency support for international travelers",
      ],
      link: "/flexi-pricing",
      badge: "Dynamic Yield",
      stat: "1-Click Bulk Update",
    },
    {
      id: "expenses",
      title: "Expenses & Real Profit",
      tagline: "Know your real profit, not just your revenue.",
      icon: Shield,
      description: "Revenue is vanity, profit is sanity. Track property-level operational expenses—rent/lease, caretaker salaries, linen laundry, electricity, maintenance, and supplies—to calculate accurate monthly P&L statements.",
      bullets: [
        "Property-level cost categorisation and expense logs",
        "Net operating profit (P&L) calculation per listing",
        "Staff salary and caretaker advance tracking",
        "Exportable financial reports for accountants and investors",
      ],
      link: "/expenses-and-profits",
      badge: "True P&L",
      stat: "True Margin Clarity",
    },
    {
      id: "analytics",
      title: "AI Analytics",
      tagline: "Turn your business data into smarter decisions.",
      icon: BarChart3,
      description: "AI-driven insights on your portfolio performance. Discover your most profitable channels, forecast upcoming month occupancy, and get automated recommendations on optimal nightly rates to maximize RevPAR.",
      bullets: [
        "Occupancy rate and RevPAR forecasting",
        "Channel revenue share breakdown (Airbnb vs Booking vs Direct)",
        "Lead-time and average length of stay intelligence",
        "Smart rate recommendations during regional events and festivals",
      ],
      link: "/ai-analytics",
      badge: "AI Powered",
      stat: "Predictive RevPAR",
    },
    {
      id: "inbox",
      title: "Unified Inbox",
      tagline: "Every guest message. One inbox.",
      icon: MessageSquare,
      description: "Never miss a booking inquiry or guest check-in message again. Consolidate guest communications from Airbnb, Booking.com, and WhatsApp into one unified messaging workspace.",
      bullets: [
        "Real-time two-way messaging across OTAs and WhatsApp",
        "Automated canned responses and check-in/out instructions",
        "Guest history, reservation details, and stay notes in chat sidebar",
        "Team assignment: assign inquiries to specific property managers",
      ],
      link: "/unified-inbox",
      badge: "All-in-One Chat",
      stat: "Zero Missed Chats",
    },
    {
      id: "team",
      title: "Co-Hosts & Team",
      tagline: "Let your team manage your business with confidence.",
      icon: Users,
      description: "Delegate operations without sacrificing security. Invite cleaners, property supervisors, accountants, and co-hosts with fine-grained role-based permissions per listing. Keep financial data private from operational staff.",
      bullets: [
        "Pre-configured roles: Owner, Co-Host, Manager, Cleaner, Accountant",
        "Property-level access: restrict staff to specific locations",
        "Housekeeping schedule view with check-in/out alerts for cleaners",
        "Audit logs of all price changes and reservation modifications",
      ],
      link: "/co-hosts-and-team",
      badge: "Role Control",
      stat: "Granular Security",
    },
  ];

  const current = features[activeTab];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3 py-1 rounded-full border border-[#ffe2de]">
            All-In-One Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mt-3">
            Whether you are managing <br />
            <span className="text-[#ff3823]">one property or one thousand.</span>
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Discover the 10 purpose-built features engineered specifically for homestays, vacation rentals, and boutique villa operators.
          </p>
        </div>

        {/* Feature Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 border-b border-gray-100">
          {features.map((f, idx) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === idx
                  ? "bg-[#ff3823] text-white shadow-md shadow-[#ff3823]/25"
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
              }`}
            >
              <f.icon className="w-3.5 h-3.5" />
              {f.title}
            </button>
          ))}
        </div>

        {/* Active Feature Showcase Card */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200/80 p-8 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#fff1ef] text-[#ff3823] text-xs font-bold border border-[#ffe2de]">
                {current.badge}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {current.stat}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display tracking-tight">
                {current.tagline}
              </h3>
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {current.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href={current.link}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0c1838] text-white font-semibold text-xs hover:bg-[#1a2b56] transition-colors shadow-md"
              >
                Learn more about {current.title} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start-trial"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#ff3823] text-white font-semibold text-xs hover:bg-[#e5220d] transition-colors shadow-md shadow-[#ff3823]/25"
              >
                Try it free
              </Link>
            </div>
          </div>

          {/* Right Visual Graphic / Mockup Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <current.icon className="w-5 h-5 text-[#ff3823]" />
                <span className="font-bold text-sm text-gray-900">{current.title} Dashboard</span>
              </div>
              <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">LIVE SYNC</span>
            </div>

            {/* Feature Mockup Content */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <span className="text-gray-500 font-medium">Operational Status</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active & Connected
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
                <div className="flex justify-between text-gray-500">
                  <span>Direct Booking Revenue (0% Fee)</span>
                  <span className="font-bold text-gray-900">₹1,84,000 / mo</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ff3823] h-full rounded-full" style={{ width: "72%" }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
                <div className="flex justify-between text-gray-500">
                  <span>Multi-Channel Sync Health</span>
                  <span className="font-bold text-emerald-600">99.98% Available</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "99%" }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#fff1ef] border border-[#ffe2de] text-gray-800 space-y-1">
                <div className="font-bold text-[#ff3823] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Automated Yield Advice
                </div>
                <p className="text-[11px] text-gray-600 leading-tight">
                  Weekend demand for Goa homestays is up 28%. Increase Saturday base rate by ₹1,500 to capture extra margin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
