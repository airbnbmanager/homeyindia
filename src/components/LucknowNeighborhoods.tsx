"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Building, Sparkles } from "lucide-react";

interface NeighborhoodProps {
  onSelectNeighborhood?: (locId: string) => void;
}

export default function LucknowNeighborhoods({ onSelectNeighborhood }: NeighborhoodProps) {
  const neighborhoods = [
    {
      id: "gomti",
      name: "Gomti Nagar & Patrakarpuram",
      tagline: "Lucknow's Cultural & Culinary Heartland",
      count: "8 Residences",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=720&q=80",
      highlights: ["Patrakarpuram Cafes", "Janeshwar Mishra Park", "Max Hospital", "Riverside Mall"],
    },
    {
      id: "shaheed",
      name: "Shaheed Path & Lulu Mall",
      tagline: "Modern Luxury & Vibrant Shopping",
      count: "6 Residences",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80",
      highlights: ["Lulu Mall (5 Mins)", "Ekana Stadium", "Phoenix Palassio", "Medanta Hospital"],
    },
    {
      id: "villa",
      name: "Vibhuti Khand & Private Villas",
      tagline: "Duplex Penthouses, Private Pools & Lawns",
      count: "4 Grand Villas",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=720&q=80",
      highlights: ["Private Lawn / Pool", "Home Theatre Stays", "Corporate Suites", "Airport Express Highway"],
    },
  ];

  const handleCardClick = (id: string) => {
    if (onSelectNeighborhood) {
      onSelectNeighborhood(id);
    }
    const target = document.getElementById("featured-stays");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#faf9f5] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2800] uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Prime Locations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Explore Lucknow by Neighborhood
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Stay near Lucknow's premier entertainment, dining, and business landmarks.
            </p>
          </div>

          <Link
            href="/stays"
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#ff2800] flex items-center gap-1.5 transition group"
          >
            <span>View All Destinations on Map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Neighborhood Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {neighborhoods.map((n) => (
            <div
              key={n.id}
              onClick={() => handleCardClick(n.id)}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-900 flex flex-col justify-end aspect-[4/5] sm:aspect-[3/4]"
            >
              {/* Photo */}
              <img
                src={n.image}
                alt={n.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                loading="lazy"
              />

              {/* Gradient Vignette for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-extrabold text-slate-900 shadow-sm">
                  {n.count}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-7 space-y-2 text-white">
                <h3 className="text-2xl font-bold font-display leading-tight group-hover:text-[#ff2800] transition-colors">
                  {n.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {n.tagline}
                </p>

                {/* Micro tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {n.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-slate-200 border border-white/10"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="pt-3 flex items-center gap-2 text-xs font-bold text-[#ff2800] group-hover:translate-x-1 transition-transform">
                  <span>Browse Stays in {n.name.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
