"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Users, Bed, Bath, ArrowRight, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { Property } from "@/data/properties";

export default function PropertyCard({ prop }: { prop: Property }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Take first 5 preview photos
  const previewPhotos = prop.gallery && prop.gallery.length > 0 
    ? prop.gallery.slice(0, 6) 
    : [prop.image];

  const savings = prop.airbnbPrice - prop.price;

  const nextPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % previewPhotos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + previewPhotos.length) % previewPhotos.length);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
      {/* Photo Carousel & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <Link href={`/stays/${prop.slug}`} className="block w-full h-full">
          <img
            src={previewPhotos[currentIdx]}
            alt={`${prop.name} Photo ${currentIdx + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=720&q=80"; }}
          />
        </Link>

        {/* Prev / Next Buttons */}
        {previewPhotos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-gray-900 shadow-sm pointer-events-none">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{prop.rating}</span>
          <span className="text-gray-400 font-normal">({prop.reviewsCount})</span>
        </div>

        {/* Savings Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm pointer-events-none">
          Save ₹{savings.toLocaleString("en-IN")}
        </div>

        {/* Dot Indicators */}
        {previewPhotos.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
            {previewPhotos.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentIdx === i ? "bg-white w-3 shadow" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Total Photos Tag */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold flex items-center gap-1 pointer-events-none">
          <Grid className="w-3 h-3" />
          <span>{prop.gallery?.length || 1} photos</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#ff2800]" />
            <span>{prop.location}</span>
          </div>
          <Link href={`/stays/${prop.slug}`}>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#ff2800] transition-colors leading-snug">
              {prop.name}
            </h3>
          </Link>
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
              <span className="text-2xl font-extrabold text-[#ff2800] font-display">
                ₹{prop.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-500">/ night</span>
            </div>
            <div className="text-[11px] text-gray-400 line-through">
              Airbnb: ₹{prop.airbnbPrice.toLocaleString("en-IN")}
            </div>
          </div>

          <Link
            href={`/stays/${prop.slug}`}
            className="px-4 py-2.5 rounded-full bg-gray-900 hover:bg-[#ff2800] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <span>View Stay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
