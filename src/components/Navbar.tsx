"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, Layers, Globe, Zap, DollarSign, Shield, 
  BarChart3, MessageSquare, Users, ChevronDown, Menu, X, 
  Home, PhoneCall, Sparkles, Building2, User
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const features = [
    { title: "Unified Calendar", desc: "One calendar to sync and manage all bookings", href: "/unified-calendar", icon: Calendar },
    { title: "Channel Manager", desc: "Real-time 2-way sync with 50+ OTAs in 0.8s", href: "/channel-manager", icon: Layers },
    { title: "Direct Booking Website", desc: "0% commission bookings with custom domain", href: "/direct-booking-website", icon: Globe },
    { title: "Magic Cluster™", desc: "Sell room combinations or full villa conflict-free", href: "/magic-cluster", icon: Zap },
    { title: "Flexi Pricing™", desc: "Bulk rate updates, weekend surge & seasonal rules", href: "/flexi-pricing", icon: DollarSign },
    { title: "Expense & P&L Tracking", desc: "Real property-level net profit, not just revenue", href: "/expenses-and-profits", icon: Shield },
    { title: "AI Analytics", desc: "Occupancy forecasting and smart rate advice", href: "/ai-analytics", icon: BarChart3 },
    { title: "Unified Inbox", desc: "Airbnb, Booking.com & WhatsApp chats in one place", href: "/unified-inbox", icon: MessageSquare },
    { title: "Co-Hosts & Team", desc: "Granular permissions for cleaners and managers", href: "/co-hosts-and-team", icon: Users },
    { title: "Offline Bookings", desc: "Walk-in, phone and WhatsApp booking invoices", href: "/offline-bookings", icon: PhoneCall },
  ];

  const solutions = [
    { title: "For Homestays & Single Hosts", desc: "Prevent double bookings and build your direct brand", href: "/start-trial", icon: Home },
    { title: "For Professional Property Managers", desc: "Scale multi-property portfolios with team access and true P&L", href: "/book-a-demo", icon: Building2 },
  ];

  const resources = [
    { title: "Host Knowledge Hub", desc: "Guides on occupancy optimization and OTA rankings", href: "/about-us", icon: Sparkles },
    { title: "Offline Invoicing & GST Guide", desc: "Automated tax receipts and check-in vouchers", href: "/offline-bookings", icon: Shield },
    { title: "24/7 Host Help Desk", desc: "WhatsApp and phone assistance for property managers", href: "/contactus", icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Red House Emblem */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff3823] to-[#ff6b57] flex items-center justify-center text-white shadow-md shadow-[#ff3823]/25 group-hover:scale-105 transition-transform">
            <Home className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-gray-900 font-display flex items-center">
              homeyindia<span className="text-[#ff3823]">.</span>
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700">
          {/* Product Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("product")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
              Product <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${activeDropdown === "product" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "product" && (
              <div className="absolute top-full left-0 w-[580px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 grid grid-cols-2 gap-2 mt-1 animate-in fade-in zoom-in-95 duration-150">
                {features.map((item) => (
                  <Link 
                    key={item.title} 
                    href={item.href}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#fff1ef] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-[#ffe2de] flex items-center justify-center text-gray-700 group-hover:text-[#ff3823] transition-colors shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900 group-hover:text-[#ff3823]">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1 leading-tight mt-0.5">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
              Solutions <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "solutions" && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 mt-1 animate-in fade-in zoom-in-95 duration-150">
                {solutions.map((item) => (
                  <Link 
                    key={item.title} 
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#fff1ef] flex items-center justify-center text-[#ff3823] shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-[#ff3823]">{item.title}</div>
                      <p className="text-xs text-gray-500 leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
              Resources <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "resources" && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 mt-1 animate-in fade-in zoom-in-95 duration-150">
                {resources.map((item) => (
                  <Link 
                    key={item.title} 
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-[#ff3823] shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-[#ff3823]">{item.title}</div>
                      <p className="text-xs text-gray-500 leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/stays" className="px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors font-semibold text-[#ff3823] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff3823] animate-pulse" /> Stays
          </Link>

          <Link href="/pricing" className="px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
            Pricing
          </Link>

          <Link href="/#reviews" className="px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
            Reviews
          </Link>
        </nav>

        {/* Right Action Elements */}
        <div className="flex items-center gap-3">
          {/* Start Free Trial Button */}
          <Link
            href="/start-trial"
            className="px-5 py-2.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ff3823]/25 transition-all"
          >
            Start free trial
          </Link>

          {/* Account & Menu Button Pill (Exact match with Homeyhuts) */}
          <div className="relative">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="h-10 px-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2.5 shadow-sm transition-all focus:outline-none"
              aria-label="User account menu"
            >
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <User className="w-4 h-4" />
              </div>
              <Menu className="w-4 h-4 text-gray-700" />
            </button>

            {/* Account Dropdown */}
            {accountMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-gray-100">
                  <div className="font-bold text-gray-900">Host Portal</div>
                  <div className="text-[11px] text-gray-400">Login to manage your properties</div>
                </div>
                <Link
                  href="/start-trial"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-[#fff1ef] hover:text-[#ff3823] font-semibold mt-1"
                >
                  Host Login
                </Link>
                <Link
                  href="/start-trial"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-[#fff1ef] hover:text-[#ff3823] font-semibold"
                >
                  Create New Account
                </Link>
                <Link
                  href="/book-a-demo"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-[#fff1ef] hover:text-[#ff3823]"
                >
                  Book a Product Demo
                </Link>
                <Link
                  href="/contactus"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-[#fff1ef] hover:text-[#ff3823]"
                >
                  24/7 Host Help Desk
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
          <div className="py-2 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Features</span>
            <div className="grid grid-cols-1 gap-1 mt-2">
              {features.map((f) => (
                <Link
                  key={f.title}
                  href={f.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-1.5 text-sm font-medium text-gray-700 hover:text-[#ff3823]"
                >
                  <f.icon className="w-4 h-4 text-[#ff3823]" />
                  {f.title}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-gray-700 hover:text-[#ff3823]"
          >
            Pricing Calculator
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-gray-700 hover:text-[#ff3823]"
          >
            About Us
          </Link>
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/book-a-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium text-gray-700 border border-gray-200 rounded-full"
            >
              Talk to our expert
            </Link>
            <Link
              href="/start-trial"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#ff3823] rounded-full shadow-md"
            >
              Start 30-Day Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
