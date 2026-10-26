"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, ChevronDown, Calendar, Layers, ShieldCheck, 
  TrendingUp, DollarSign, MessageSquare, Users, 
  Home, PhoneCall, Sparkles, Building2, User, BedDouble
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const features = [
    { title: "Unified Calendar", desc: "Real-time multi-calendar for all properties", href: "/unified-calendar", icon: Calendar },
    { title: "Channel Manager", desc: "Instant 2-way sync with Airbnb, Booking.com, MMT", href: "/channel-manager", icon: Layers },
    { title: "Direct Booking Website", desc: "Zero-commission luxury brand website with UPI", href: "/direct-booking-website", icon: Home },
    { title: "Magic Cluster™", desc: "Sell room-by-room or as whole villa without double bookings", href: "/magic-cluster", icon: Sparkles },
    { title: "Flexi Pricing™", desc: "Dynamic seasonal & surge pricing engine", href: "/flexi-pricing", icon: TrendingUp },
    { title: "Expenses & Profits", desc: "Track net profit, payouts, and vendor costs", href: "/expenses-and-profits", icon: DollarSign },
    { title: "Unified Inbox", desc: "Chat with guests across Airbnb, Booking.com & WhatsApp", href: "/unified-inbox", icon: MessageSquare },
    { title: "Co-Hosts & Team", desc: "Multi-role permissions for cleaners, co-hosts & managers", href: "/co-hosts-and-team", icon: Users },
  ];

  const solutions = [
    { title: "For Vacation Rentals", desc: "Villas, farmhouses & beach retreats", href: "/channel-manager", icon: Building2 },
    { title: "For Homestays & BnBs", desc: "Family run stays & boutique heritage homes", href: "/direct-booking-website", icon: Home },
    { title: "Offline Bookings", desc: "Walk-in, phone and WhatsApp booking invoices", href: "/offline-bookings", icon: PhoneCall },
  ];

  const resources = [
    { title: "About Us", desc: "Our story, mission & Indian hospitality vision", href: "/about-us", icon: Sparkles },
    { title: "Why List with Us", desc: "How Homey India drives 40% more revenue", href: "/about-us", icon: ShieldCheck },
    { title: "24/7 Host Help Desk", desc: "WhatsApp and phone assistance for property managers", href: "/contactus", icon: PhoneCall },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo matching Homeyhuts red hut style */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#ff3823] flex items-center justify-center text-white shadow-md shadow-[#ff3823]/25 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2L2 9.5V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V9.5L12 2ZM12 4.5L19.5 10.2V20H15V14H9V20H4.5V10.2L12 4.5Z" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-gray-900">
                homeyindia<span className="text-[#ff3823]">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700">
              {/* Product Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("product")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
                  Product <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {activeDropdown === "product" && (
                  <div className="absolute top-full left-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 mt-1 grid grid-cols-1 gap-1 animate-in fade-in zoom-in-95 duration-150">
                    {features.map((item) => (
                      <Link 
                        key={item.title} 
                        href={item.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#ff3823] shrink-0">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-[#ff3823]">{item.title}</div>
                          <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{item.desc}</p>
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
                  Solutions <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {activeDropdown === "solutions" && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 mt-1 animate-in fade-in zoom-in-95 duration-150">
                    {solutions.map((item) => (
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

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("resources")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
                  Resources <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
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

              {/* Direct Booking Stays Link */}
              <Link 
                href="/stays" 
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-[#ff3823] hover:bg-gray-50 transition-colors font-semibold flex items-center gap-1.5"
              >
                <BedDouble className="w-4 h-4 text-[#ff3823]" />
                <span>Book your stay</span>
              </Link>

              <Link href="/pricing" className="px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
                Pricing
              </Link>

              <Link href="/#reviews" className="px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors">
                Reviews
              </Link>
            </nav>
          </div>

          {/* Right Action Elements */}
          <div className="flex items-center gap-3">
            {/* Start Free Trial Button */}
            <Link
              href="/start-trial"
              className="px-5 py-2.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ff3823]/25 transition-all"
            >
              Start free trial
            </Link>

            {/* Account & Menu Button Pill (Triggers Slide-Over Right Drawer matching Screenshot 1) */}
            <button
              onClick={() => setRightDrawerOpen(true)}
              className="h-10 px-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2.5 shadow-sm transition-all focus:outline-none"
              aria-label="User account menu"
            >
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <User className="w-4 h-4" />
              </div>
              <Menu className="w-4 h-4 text-gray-700" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
            <Link
              href="/stays"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-bold text-[#ff3823] border-b border-gray-100"
            >
              <BedDouble className="w-4 h-4 text-[#ff3823]" />
              Book your stay (The Unique Haven Homes)
            </Link>
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

      {/* Slide-Over Drawer on the Right (Exact match with Homeyhuts Screenshot 1) */}
      {rightDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            onClick={() => setRightDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-bold text-gray-900 text-sm">Hey there!</span>
              </div>
              <button
                onClick={() => setRightDrawerOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links List (Exact match with Screenshot 1) */}
            <div className="flex-1 px-6 py-6 space-y-4 text-sm font-medium text-gray-800">
              <div>
                <Link
                  href="/start-trial"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block font-bold text-gray-900 hover:text-[#ff3823] transition-colors py-1"
                >
                  Sign Up / Sign In
                </Link>
              </div>

              <div>
                <Link
                  href="/stays"
                  onClick={() => setRightDrawerOpen(false)}
                  className="flex items-center justify-between font-bold text-[#ff3823] hover:text-[#e5220d] transition-colors py-1 group"
                >
                  <span className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4" /> Book your stay
                  </span>
                  <span className="text-[10px] bg-[#fff1ef] text-[#ff3823] px-2 py-0.5 rounded-full border border-[#ffe2de]">
                    The Unique Haven Homes
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  href="/start-trial"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block hover:text-[#ff3823] transition-colors py-1 text-gray-700"
                >
                  List Your Property
                </Link>
              </div>

              <div>
                <Link
                  href="/about-us"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block hover:text-[#ff3823] transition-colors py-1 text-gray-700"
                >
                  Why List with Homey India
                </Link>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <Link
                  href="/about-us"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block hover:text-[#ff3823] transition-colors py-1 text-gray-700"
                >
                  About Us
                </Link>
              </div>

              <div>
                <Link
                  href="/contactus"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block hover:text-[#ff3823] transition-colors py-1 text-gray-700"
                >
                  Contact Us
                </Link>
              </div>

              <div>
                <Link
                  href="/contactus"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block hover:text-[#ff3823] transition-colors py-1 text-gray-500"
                >
                  Help Center
                </Link>
              </div>
            </div>

            {/* Bottom info in Drawer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/70 text-xs text-gray-500 space-y-1.5">
              <div className="font-bold text-gray-800">Homey India Host & Guest Desk</div>
              <p>Praveen Singh: +91 94544 70872</p>
              <p>Gomti Nagar, Lucknow, UP</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
