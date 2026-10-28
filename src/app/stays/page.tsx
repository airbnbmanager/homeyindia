"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { PROPERTIES } from "@/data/properties";
import { 
  Star, MapPin, Users, Bed, Bath, ArrowRight, 
  Sparkles, ShieldCheck, Search, BedDouble
} from "lucide-react";

export default function StaysPage() {
  const [filterZone, setFilterZone] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = PROPERTIES.filter((p) => {
    const matchesZone = filterZone === "all" || p.zone.toLowerCase().includes(filterZone.toLowerCase());
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/60">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        {/* Luxury Banner */}
        <div className="bg-gradient-to-r from-[#0c1838] via-[#162347] to-[#0c1838] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> The Unique Haven Homes • Flagship Collection
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
                Luxury Stays & Villas in Lucknow
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-xl">
                18 Handcrafted Residences in Gomti Nagar, Shaheed Path, and Vibhuti Khand. Book direct with Praveen Singh for zero OTA commission and instant check-in.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-lg">
                  <span>4.94</span>
                  <div className="flex text-xs">★★★★★</div>
                </div>
                <div className="text-xs text-gray-300">1,400+ Verified Superhost Reviews</div>
              </div>
              <span className="hidden sm:block text-gray-500">|</span>
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Direct Verification
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/90 p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by property name (e.g. Royal White House, Starlight...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#ff2800] focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 sm:pb-0">
              {[
                { label: "All 18 Stays", val: "all" },
                { label: "Gomti Nagar", val: "gomti" },
                { label: "Shaheed Path / Lulu Mall", val: "shaheed" },
                { label: "Villas with Pool / Lawn", val: "villa" },
              ].map((f) => (
                <button
                  key={f.val}
                  onClick={() => setFilterZone(f.val)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    filterZone === f.val
                      ? "bg-[#ff2800] text-white shadow-md shadow-[#ff2800]/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Property Grid (All 18 Properties) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900">
              All Residences ({filtered.length} Properties)
            </h2>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Direct Booking Save ₹1,000 - ₹2,500 vs Airbnb
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((prop) => (
              <PropertyCard key={prop.id} prop={prop} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
