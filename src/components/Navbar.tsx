"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthModal from "@/components/AuthModal";
import { 
  Menu, X, ChevronDown, Calendar, Layers, ShieldCheck, 
  TrendingUp, DollarSign, MessageSquare, Users, 
  Home, PhoneCall, Sparkles, Building2, User, BedDouble,
  ArrowRight, Phone
} from "lucide-react";

export default function Navbar() {
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [featuresAccordionOpen, setFeaturesAccordionOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("homey_user_profile");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

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
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#ff3823] flex items-center justify-center text-white shadow-md shadow-[#ff3823]/25 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2L2 9.5V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V9.5L12 2ZM12 4.5L19.5 10.2V20H15V14H9V20H4.5V10.2L12 4.5Z" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-gray-900">
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile-only Stays pill */}
            <Link
              href="/stays"
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#fff1ef] text-[#ff3823] border border-[#ffe2de] text-xs font-bold whitespace-nowrap"
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>18 Stays</span>
            </Link>

            {/* Desktop Start Free Trial Button */}
            <Link
              href="/start-trial"
              className="hidden sm:inline-flex whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ff3823]/25 transition-all hover:scale-[1.02]"
            >
              Start free trial
            </Link>

            {/* Single Unified Account & Menu Button Pill */}
            <button
              onClick={() => setRightDrawerOpen(true)}
              className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-all focus:outline-none"
              aria-label="Open main menu and account drawer"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <Menu className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      </header>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={(user) => setCurrentUser(user)} />

      {/* Slide-Over Mobile & Desktop Drawer */}
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
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff3823] to-[#e0220d] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {currentUser ? (currentUser.firstName?.[0] || "U") : <User className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-bold text-gray-900 text-sm block">
                    {currentUser ? `Hey, ${currentUser.firstName}!` : "Homey India Desk"}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {currentUser ? "Verified Host Profile" : "Praveen Singh · Lucknow"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setRightDrawerOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Cards */}
            <div className="p-4 bg-gray-50/70 border-b border-gray-100 space-y-2">
              <Link
                href="/stays"
                onClick={() => setRightDrawerOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#ff3823] to-[#e0220d] text-white shadow-md hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-center gap-2.5">
                  <BedDouble className="w-5 h-5 text-white" />
                  <div>
                    <div className="font-bold text-xs">Book 18 Luxury Stays</div>
                    <div className="text-[10px] text-white/80">The Unique Haven Homes · Lucknow</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/start-trial"
                  onClick={() => setRightDrawerOpen(false)}
                  className="p-2.5 rounded-xl bg-white border border-gray-200 text-center hover:border-gray-400 transition-colors"
                >
                  <div className="text-xs font-bold text-gray-900">Start Free Trial</div>
                  <div className="text-[10px] text-gray-500">30 days free PMS</div>
                </Link>

                <Link
                  href="/book-a-demo"
                  onClick={() => setRightDrawerOpen(false)}
                  className="p-2.5 rounded-xl bg-white border border-gray-200 text-center hover:border-gray-400 transition-colors"
                >
                  <div className="text-xs font-bold text-gray-900">Book Demo</div>
                  <div className="text-[10px] text-gray-500">Live 1-on-1 walk</div>
                </Link>
              </div>
            </div>

            {/* Links List */}
            <div className="flex-1 px-5 py-4 space-y-3 text-sm font-medium text-gray-800 overflow-y-auto">
              {!currentUser ? (
                <div>
                  <button
                    onClick={() => { setRightDrawerOpen(false); setAuthModalOpen(true); }}
                    className="w-full text-left py-1 font-bold text-[#ff3823] hover:text-[#e0220d] transition-colors"
                  >
                    Sign Up / Sign In (OTP)
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <Link
                      href="/dashboard"
                      onClick={() => setRightDrawerOpen(false)}
                      className="block py-1 font-bold text-[#ff3823] hover:text-[#e0220d] transition-colors flex items-center justify-between"
                    >
                      <span>Host Control Dashboard</span>
                      <span className="text-[10px] bg-[#fff1ef] text-[#ff3823] px-2 py-0.5 rounded-full font-bold border border-[#ffe2de]">Live</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/account"
                      onClick={() => setRightDrawerOpen(false)}
                      className="block py-1 font-bold text-gray-900 hover:text-[#ff3823] transition-colors flex items-center justify-between"
                    >
                      <span>Account Settings & Identity</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Verified</span>
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        localStorage.removeItem("homey_user_profile");
                        setCurrentUser(null);
                        setRightDrawerOpen(false);
                      }}
                      className="text-xs text-gray-400 hover:text-red-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
              <div>
                <button
                  onClick={() => setFeaturesAccordionOpen(!featuresAccordionOpen)}
                  className="w-full flex items-center justify-between py-1.5 font-bold text-gray-900 hover:text-[#ff3823] transition-colors"
                >
                  <span>PMS Features</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${featuresAccordionOpen ? "rotate-180 text-[#ff3823]" : "text-gray-400"}`} />
                </button>

                {featuresAccordionOpen && (
                  <div className="mt-2 pl-2 border-l-2 border-gray-100 space-y-1.5 animate-in fade-in duration-150">
                    {features.map((f) => (
                      <Link
                        key={f.title}
                        href={f.href}
                        onClick={() => setRightDrawerOpen(false)}
                        className="flex items-center gap-2 py-1 text-xs text-gray-600 hover:text-[#ff3823]"
                      >
                        <f.icon className="w-3.5 h-3.5 text-[#ff3823]" />
                        <span>{f.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Link
                  href="/pricing"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block py-1 text-gray-700 hover:text-[#ff3823] transition-colors"
                >
                  Pricing Calculator
                </Link>
              </div>

              <div>
                <Link
                  href="/channel-manager"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block py-1 text-gray-700 hover:text-[#ff3823] transition-colors"
                >
                  Channel Manager Sync
                </Link>
              </div>

              <div>
                <Link
                  href="/direct-booking-website"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block py-1 text-gray-700 hover:text-[#ff3823] transition-colors"
                >
                  Direct Booking Engine
                </Link>
              </div>

              <div>
                <Link
                  href="/about-us"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block py-1 text-gray-700 hover:text-[#ff3823] transition-colors"
                >
                  About Us & Story
                </Link>
              </div>

              <div>
                <Link
                  href="/contactus"
                  onClick={() => setRightDrawerOpen(false)}
                  className="block py-1 text-gray-700 hover:text-[#ff3823] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Bottom info in Drawer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/70 text-xs text-gray-600 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">Direct Founder Desk</div>
                  <p className="text-[11px] text-gray-500">Praveen Singh · Lucknow, UP</p>
                </div>
                <a
                  href="tel:+919454470872"
                  className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow hover:scale-105 transition-transform"
                  aria-label="Call Praveen Singh"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
