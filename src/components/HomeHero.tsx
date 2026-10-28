"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, Calendar, Users, MapPin, Sparkles, Star, 
  ShieldCheck, ArrowRight, BedDouble, ChevronDown, Check,
  SlidersHorizontal, Zap
} from "lucide-react";

interface HomeHeroProps {
  onSearch?: (criteria: { location: string; guests: number; category: string }) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function HomeHero({
  onSearch,
  selectedCategory,
  onSelectCategory,
}: HomeHeroProps) {
  const [location, setLocation] = useState("all");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [mode, setMode] = useState<"guest" | "host">("guest");

  const categories = [
    { id: "all", label: "All 18 Stays", icon: "✨" },
    { id: "gomti", label: "Gomti Nagar", icon: "🏙️" },
    { id: "shaheed", label: "Near Lulu Mall / Shaheed Path", icon: "🛍️" },
    { id: "villa", label: "Villas & Private Lawns", icon: "🏡" },
    { id: "duplex", label: "Duplex & Penthouses", icon: "🌆" },
    { id: "instant", label: "Instant Book", icon: "⚡" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ location, guests, category: selectedCategory });
    }
    const target = document.getElementById("featured-stays");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 bg-[#0c1838] text-white overflow-hidden">
      {/* Background Ambient Glow & Architectural Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1838] via-[#101f46] to-[#0c1838] pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-[#ff2800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Audience Mode Switcher (Traveler Stays vs Host PMS) */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-inner">
            <button
              onClick={() => setMode("guest")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                mode === "guest"
                  ? "bg-[#ff2800] text-white shadow-lg shadow-[#ff2800]/30 scale-[1.02]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <BedDouble className="w-4 h-4" />
              <span>Explore Stays &amp; Villas</span>
              <span className="hidden sm:inline bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">0% Fee</span>
            </button>
            <button
              onClick={() => {
                setMode("host");
                const target = document.getElementById("host-pms-section");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                mode === "host"
                  ? "bg-[#ff2800] text-white shadow-lg shadow-[#ff2800]/30 scale-[1.02]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Host PMS &amp; Channel Manager</span>
              <span className="hidden sm:inline bg-emerald-500/30 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono">50+ OTAs</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Unique Haven Homes &bull; Flagship 18 Residences in Lucknow</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.12]">
            Luxury Homestays &amp; Villas with{" "}
            <span className="font-serif italic font-normal text-[#ff2800] tracking-normal">
              Authentic Indian Hospitality
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Handcrafted luxury residences in Gomti Nagar, Shaheed Path, and near Lulu Mall.
            Book direct with founder Praveen Singh for{" "}
            <strong className="text-white font-semibold underline decoration-[#ff2800] underline-offset-4">
              0% booking commission
            </strong>{" "}
            and 2-way real-time calendar synchronization.
          </p>
        </div>

        {/* High-Converting Floating Search Capsule (Airbnb / Homeyhuts style) */}
        <div className="mt-8 sm:mt-10 max-w-5xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-3xl sm:rounded-full p-2.5 sm:p-3 shadow-2xl border border-slate-200/90 text-slate-900 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-0 items-center"
          >
            {/* Location Selector */}
            <div className="sm:col-span-4 px-4 py-2 sm:py-1 border-b sm:border-b-0 sm:border-r border-slate-100 flex flex-col justify-center">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#ff2800]" /> Destination / Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-slate-900 outline-none cursor-pointer mt-0.5"
                aria-label="Select Destination"
              >
                <option value="all">All Lucknow (18 Stays)</option>
                <option value="gomti">Gomti Nagar &amp; Vibhuti Khand</option>
                <option value="shaheed">Shaheed Path &amp; Lulu Mall</option>
                <option value="villas">Luxury Villas with Pool/Lawn</option>
              </select>
            </div>

            {/* Check-in / Check-out Dates */}
            <div className="sm:col-span-4 px-4 py-2 sm:py-1 border-b sm:border-b-0 sm:border-r border-slate-100 flex flex-col justify-center">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#ff2800]" /> Dates (Check-In &bull; Check-Out)
              </label>
              <div className="flex items-center gap-2 mt-0.5">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="Check-in"
                  className="bg-transparent font-bold text-xs sm:text-sm text-slate-900 outline-none cursor-pointer w-1/2"
                  aria-label="Check-in Date"
                />
                <span className="text-slate-300">&bull;</span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="Check-out"
                  className="bg-transparent font-bold text-xs sm:text-sm text-slate-900 outline-none cursor-pointer w-1/2"
                  aria-label="Check-out Date"
                />
              </div>
            </div>

            {/* Guests Counter */}
            <div className="sm:col-span-2 px-4 py-2 sm:py-1 flex flex-col justify-center">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#ff2800]" /> Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-slate-900 outline-none cursor-pointer mt-0.5"
                aria-label="Select Guests"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={4}>4 Guests (Family)</option>
                <option value={6}>6 Guests (Large)</option>
                <option value={10}>10+ Guests (Group)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 p-1">
              <button
                type="submit"
                className="w-full h-12 sm:h-12 rounded-2xl sm:rounded-full bg-[#ff2800] hover:bg-[#e02400] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#ff2800]/30 hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Search Stays</span>
              </button>
            </div>
          </form>
        </div>

        {/* Curated Category Quick Chips (Homeyhuts horizontal pills) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-md scale-105 ring-2 ring-[#ff2800]"
                    : "bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-white font-extrabold">4.94 Superhost Rating</span>
            <span className="text-slate-400 font-normal">(1,400+ Reviews)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-white font-bold">0% Booking Commission</span>
            <span className="text-emerald-300 font-normal">Save ₹500–₹1,500/night</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-bold">100% Verified Cleanliness</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff385c] animate-pulse"></span>
            <span className="text-white font-bold">Realtime Airbnb 2-Way Lock</span>
          </div>
        </div>

      </div>
    </section>
  );
}

