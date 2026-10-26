"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#ff3823] focus:outline-none"
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
                      ? "bg-[#ff3823] text-white shadow-md shadow-[#ff3823]/25"
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
            {filtered.map((prop) => {
              const savings = prop.airbnbPrice - prop.price;
              return (
                <div
                  key={prop.id}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  {/* Photo & Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={prop.image}
                      alt={prop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-gray-900 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{prop.rating}</span>
                      <span className="text-gray-400 font-normal">({prop.reviewsCount})</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm">
                      Save ₹{savings.toLocaleString("en-IN")}
                    </div>

                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono">
                      {prop.id}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#ff3823]" />
                        <span>{prop.location}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#ff3823] transition-colors leading-snug">
                        {prop.name}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    {/* Room Meta Specs */}
                    <div className="flex items-center gap-4 text-xs text-gray-600 py-3 border-y border-gray-100">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gray-400" /> {prop.maxGuests} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-gray-400" /> {prop.bedrooms} BHK
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-gray-400" /> {prop.bathrooms} Baths
                      </span>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="flex items-end justify-between pt-1">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-extrabold text-[#ff3823] font-display">
                            ₹{prop.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-gray-500">/ night</span>
                        </div>
                        <div className="text-[11px] text-gray-400 line-through">
                          Airbnb Rate: ₹{prop.airbnbPrice.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <Link
                        href={`/stays/${prop.slug}`}
                        className="px-4 py-2.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1"
                      >
                        Book Stay <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
