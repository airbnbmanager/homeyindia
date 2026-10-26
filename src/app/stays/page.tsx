"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { UNIQUE_HAVEN_PROPERTIES } from "@/data/properties";
import { 
  Star, MapPin, Users, Bed, Bath, Sparkles, ShieldCheck, 
  ArrowRight, Search, SlidersHorizontal, CheckCircle2 
} from "lucide-react";

export default function StaysPage() {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = UNIQUE_HAVEN_PROPERTIES.filter((p) => {
    const matchesType = filterType === "all" || p.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-24">
        {/* Flagship Brand Banner */}
        <div className="bg-gradient-to-r from-[#0c1838] via-[#1a2b56] to-[#0c1838] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff3823]/20 border border-[#ff3823]/40 text-xs font-semibold text-[#ff6b57] mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Powered by Homey India Direct Booking Engine
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
                The Unique Haven Homes
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-xl">
                Lucknow’s Premier Luxury Homestays & Private Villas. Book directly with zero OTA commission fees and instant WhatsApp check-in vouchers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-lg">
                  <span>4.96</span>
                  <div className="flex text-xs">★★★★★</div>
                </div>
                <div className="text-xs text-gray-300">800+ Verified Superhost Reviews</div>
              </div>
              <span className="hidden sm:block text-gray-500">|</span>
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Verified Stays
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
                placeholder="Search by property name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#ff3823] focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 sm:pb-0">
              {[
                { label: "All Stays", val: "all" },
                { label: "3BHK Flats", val: "3bhk" },
                { label: "Luxury Villas", val: "villa" },
                { label: "Penthouses", val: "penthouse" },
                { label: "1BHK Suites", val: "1bhk" },
              ].map((f) => (
                <button
                  key={f.val}
                  onClick={() => setFilterType(f.val)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    filterType === f.val
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

        {/* Property Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900">
              Available Residences in Lucknow ({filtered.length})
            </h2>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Save ~15-20% Booking Direct
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
                      src={prop.coverImage}
                      alt={prop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-gray-900 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{prop.rating}</span>
                      <span className="text-gray-400 font-normal">({prop.reviewsCount})</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm">
                      Save ₹{savings.toLocaleString("en-IN")}
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
                        <Users className="w-3.5 h-3.5 text-gray-400" /> {prop.guests} Guests
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
                          OTA Rate: ₹{prop.airbnbPrice.toLocaleString("en-IN")}
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
