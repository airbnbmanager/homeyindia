"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { PROPERTIES } from "@/data/properties";
import { 
  Sparkles, SlidersHorizontal, ArrowRight, BedDouble, 
  MapPin, CheckCircle2, Star, ShieldCheck, Phone
} from "lucide-react";

interface FeaturedStaysSectionProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchCriteria?: { location: string; guests: number; category: string } | null;
}

export default function FeaturedStaysSection({
  selectedCategory,
  onSelectCategory,
  searchCriteria,
}: FeaturedStaysSectionProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc" | "rating">("featured");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter properties based on category and search criteria
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      // Category filter
      if (selectedCategory === "gomti") {
        if (!prop.zone.toLowerCase().includes("gomti") && !prop.location.toLowerCase().includes("gomti")) return false;
      } else if (selectedCategory === "shaheed") {
        if (!prop.zone.toLowerCase().includes("shaheed") && !prop.location.toLowerCase().includes("lulu") && !prop.location.toLowerCase().includes("shaheed")) return false;
      } else if (selectedCategory === "villa") {
        if (!prop.type.toLowerCase().includes("villa") && !prop.name.toLowerCase().includes("villa") && !prop.name.toLowerCase().includes("palace") && !prop.name.toLowerCase().includes("house")) return false;
      } else if (selectedCategory === "duplex") {
        if (!prop.name.toLowerCase().includes("duplex") && !prop.description.toLowerCase().includes("duplex") && !prop.type.toLowerCase().includes("penthouse")) return false;
      }

      // Location search
      if (searchCriteria?.location && searchCriteria.location !== "all") {
        const loc = searchCriteria.location.toLowerCase();
        if (loc === "gomti" && !prop.zone.toLowerCase().includes("gomti")) return false;
        if (loc === "shaheed" && !prop.zone.toLowerCase().includes("shaheed") && !prop.location.toLowerCase().includes("lulu")) return false;
        if (loc === "villas" && !prop.type.toLowerCase().includes("villa") && !prop.name.toLowerCase().includes("palace")) return false;
      }

      // Guests search
      if (searchCriteria?.guests && searchCriteria.guests > 1) {
        if (prop.maxGuests < searchCriteria.guests) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // default featured
    });
  }, [selectedCategory, searchCriteria, sortBy]);

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  return (
    <section id="featured-stays" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2800] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Handcrafted Lucknow Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Featured Residences &amp; Luxury Villas
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              18 private apartments, duplexes, and grand villas. Fully furnished, air-conditioned, with high-speed Wi-Fi, private kitchen, and hotel-grade sanitization.
            </p>
          </div>

          {/* Sort & Direct Savings Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Booking Saves ~₹800/Night</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
                aria-label="Sort Properties"
              >
                <option value="featured">Featured Stays</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated (4.9+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Tabs Bar (Homeyhuts Style) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-6">
          {[
            { id: "all", label: `All Stays (${PROPERTIES.length})` },
            { id: "gomti", label: "Gomti Nagar (8)" },
            { id: "shaheed", label: "Near Lulu Mall (6)" },
            { id: "villa", label: "Villas & Lawns (4)" },
            { id: "duplex", label: "Duplex Penthouses" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Property Grid (Responsive 3 col desktop, 2 col tablet, 1 col mobile) */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProperties.map((prop) => (
              <PropertyCard key={prop.id} prop={prop} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <BedDouble className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="text-lg font-bold text-slate-800">No properties found matching your criteria</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try resetting your filter or searching for all Lucknow stays.
            </p>
            <button
              onClick={() => onSelectCategory("all")}
              className="px-5 py-2.5 rounded-full bg-[#ff2800] text-white text-xs font-bold hover:bg-[#e02400] transition cursor-pointer"
            >
              Reset Filters &amp; View All 18 Stays
            </button>
          </div>
        )}

        {/* Load More & Direct WhatsApp Contact */}
        <div className="mt-12 text-center space-y-4">
          {visibleCount < filteredProperties.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-slate-300 shadow-sm transition hover:shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Load More Residences ({filteredProperties.length - visibleCount} Remaining)</span>
              <ArrowRight className="w-4 h-4 text-[#ff2800]" />
            </button>
          )}

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
            <Link
              href="/stays"
              className="font-bold text-[#ff2800] hover:underline flex items-center gap-1"
            >
              <span>Explore Complete 18 Stays Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-slate-300">&bull;</span>
            <a
              href="https://wa.me/919454470872?text=Hi%20Praveen%2C%20I%20want%20to%20inquire%20about%20booking%20a%20luxury%20stay%20in%20Lucknow%20via%20Homey%20India."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Concierge: +91 94544 70872</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
