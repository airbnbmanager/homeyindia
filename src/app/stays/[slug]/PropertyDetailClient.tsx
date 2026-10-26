"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Property } from "@/data/properties";
import { 
  Star, MapPin, Users, Bed, Bath, ShieldCheck, Check, 
  ArrowLeft, MessageCircle, Calendar as CalendarIcon, 
  Sparkles, Coffee, Wifi, Car, UtensilsCrossed, Flame 
} from "lucide-react";

export default function PropertyDetailClient({ prop }: { prop: Property }) {
  const [bookingMode, setBookingMode] = useState<"entire" | "room">("entire");
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(4);
  const [chefAddon, setChefAddon] = useState(false);
  const [bonfireAddon, setBonfireAddon] = useState(false);

  const effectiveBasePrice = bookingMode === "entire" ? prop.price : Math.round(prop.price * 0.45);
  const baseTotal = effectiveBasePrice * nights;
  const addonsTotal = (chefAddon ? 3500 : 0) + (bonfireAddon ? 2000 : 0);
  const totalAmount = baseTotal + addonsTotal;
  const otaComparison = (bookingMode === "entire" ? prop.airbnbPrice : Math.round(prop.airbnbPrice * 0.45)) * nights;
  const savings = Math.max(0, otaComparison - baseTotal);

  const handleWhatsAppBooking = () => {
    const msg = encodeURIComponent(
      `Hi Praveen Singh & The Unique Haven Homes team!\n\nI want to book *${prop.name}* via Homey India Direct Booking Engine:\n• Option: ${bookingMode === "entire" ? "Entire Villa/Residence" : "Single Suite Room"}\n• Duration: ${nights} Nights\n• Guests: ${guests} Guests\n• Total Amount: ₹${totalAmount.toLocaleString("en-IN")}\n\nPlease confirm availability and share UPI payment QR.`
    );
    window.open(`https://wa.me/919454470872?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-24">
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link
            href="/stays"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#ff3823] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Residences
          </Link>
        </div>

        {/* Property Hero Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  The Unique Haven Homes · Flagship
                </span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#ff3823]" /> {prop.location}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 font-display tracking-tight">
                {prop.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{prop.rating}</span>
                <span className="text-gray-400 font-normal">({prop.reviewsCount} reviews)</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#fff1ef] border border-[#ffe2de] text-xs font-bold text-[#ff3823]">
                Direct Host Superhost
              </div>
            </div>
          </div>

          {/* Airbnb-Style 5-Photo Bento Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-3xl overflow-hidden shadow-xl aspect-[16/10] md:aspect-[21/9] relative group bg-gray-100">
            {/* Main Lead Photo (2 Cols) */}
            <div className="md:col-span-2 relative overflow-hidden h-full">
              <img
                src={prop.gallery?.[0] || prop.image}
                alt={prop.name}
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500 cursor-pointer"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                Main Living & Facade
              </div>
            </div>

            {/* Right 2x2 Photo Grid */}
            <div className="hidden md:grid col-span-2 grid-cols-2 gap-2 h-full">
              {[
                { idx: 1, label: "Living & Lounge" },
                { idx: 2, label: "Master Suite" },
                { idx: 3, label: "Luxury Bath" },
                { idx: 4, label: "Balcony & Views" },
              ].map((item) => (
                <div key={item.idx} className="relative overflow-hidden h-full bg-gray-100 group/item">
                  <img
                    src={prop.gallery?.[item.idx] || prop.image}
                    alt={prop.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Right Floating Badge & Button */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-medium hidden sm:block">
                Verified Airbnb Superhost Photos
              </div>
              <button 
                onClick={() => alert('Full gallery view with all high-resolution photos open!')}
                className="px-3.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-gray-900 font-bold text-xs shadow-md border border-gray-300 flex items-center gap-1.5 backdrop-blur-sm transition-all hover:scale-105"
              >
                <span>☷</span> Show all photos
              </button>
            </div>
          </div>
        </div>

        {/* Content & Booking Engine Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200/80 text-center text-xs">
              <div>
                <span className="text-gray-400 font-medium block">Capacity</span>
                <span className="text-sm font-bold text-gray-900">Up to {prop.maxGuests} Guests</span>
              </div>
              <div className="border-x border-gray-200">
                <span className="text-gray-400 font-medium block">Layout</span>
                <span className="text-sm font-bold text-gray-900">{prop.bedrooms} Bedrooms</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block">Bathrooms</span>
                <span className="text-sm font-bold text-gray-900">{prop.bathrooms} Luxury Baths</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 font-display">About this Residence</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{prop.description}</p>
            </div>

            {/* Magic Cluster™ Live Demonstration */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1838] to-[#1a2b56] text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Magic Cluster™ Enabled</span>
                </div>
                <span className="text-[10px] text-gray-400">0.8s Conflict Auto-Lock</span>
              </div>
              <h4 className="text-base font-bold text-white">Choose Your Booking Configuration:</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div
                  onClick={() => setBookingMode("entire")}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    bookingMode === "entire"
                      ? "bg-[#ff3823] border-[#ff3823] text-white font-bold shadow-md"
                      : "bg-white/10 border-white/20 text-gray-300 hover:bg-white/15"
                  }`}
                >
                  <div className="text-sm font-bold">Entire Residence</div>
                  <div className="text-[11px] opacity-80 mt-0.5">All {prop.bedrooms} Bedrooms · ₹{prop.price}/night</div>
                </div>
                <div
                  onClick={() => setBookingMode("room")}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    bookingMode === "room"
                      ? "bg-[#ff3823] border-[#ff3823] text-white font-bold shadow-md"
                      : "bg-white/10 border-white/20 text-gray-300 hover:bg-white/15"
                  }`}
                >
                  <div className="text-sm font-bold">Single King Suite</div>
                  <div className="text-[11px] opacity-80 mt-0.5">1 Private Bedroom · ₹{Math.round(prop.price * 0.45)}/night</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-300">
                Magic Cluster automatically blocks the remaining configuration across Airbnb, Booking.com, and MMT the instant you book!
              </p>
            </div>

            {/* Curated Lucknowi Addon Experiences */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 font-display">Curated Concierge Experiences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  onClick={() => setChefAddon(!chefAddon)}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                    chefAddon ? "bg-[#fff1ef] border-[#ff3823] text-gray-900" : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                >
                  <UtensilsCrossed className="w-5 h-5 text-[#ff3823] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 flex justify-between">
                      <span>Private Lucknowi Chef</span>
                      <span className="text-[#ff3823]">+₹3,500</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Fresh Awadhi Galawati kebabs & fragrant mutton/veg biryani cooked in villa.</p>
                  </div>
                </div>

                <div
                  onClick={() => setBonfireAddon(!bonfireAddon)}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                    bonfireAddon ? "bg-[#fff1ef] border-[#ff3823] text-gray-900" : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                >
                  <Flame className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 flex justify-between">
                      <span>Bonfire & Ambient Setup</span>
                      <span className="text-[#ff3823]">+₹2,000</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Hardwood logs, open fire pit, acoustic sound speaker, and fairy lights.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 font-display">Premium Amenities</h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                {prop.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Floating Direct Booking Checkout Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 sm:p-8 sticky top-28 space-y-6">
              <div className="flex items-baseline justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-[#ff3823] font-display">
                      ₹{effectiveBasePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-500">/ night</span>
                  </div>
                  <div className="text-xs text-gray-400 line-through">
                    OTA Extranet: ₹{(bookingMode === "entire" ? prop.airbnbPrice : Math.round(prop.airbnbPrice * 0.45)).toLocaleString("en-IN")}
                  </div>
                </div>
                {savings > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    Save ₹{savings.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Booking Controls */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stay Duration (Nights)</label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 font-bold text-gray-700"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-gray-900">{nights} Nights</span>
                    <button
                      onClick={() => setNights(nights + 1)}
                      className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 font-bold text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-medium text-gray-900 focus:outline-none"
                  >
                    {[...Array(prop.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>₹{effectiveBasePrice.toLocaleString("en-IN")} × {nights} nights:</span>
                  <span className="font-semibold text-gray-900">₹{baseTotal.toLocaleString("en-IN")}</span>
                </div>
                {chefAddon && (
                  <div className="flex justify-between text-gray-700">
                    <span>Private Chef Experience:</span>
                    <span>₹3,500</span>
                  </div>
                )}
                {bonfireAddon && (
                  <div className="flex justify-between text-gray-700">
                    <span>Bonfire Setup:</span>
                    <span>₹2,000</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Direct Booking Fee:</span>
                  <span>₹0 (0% Commission)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-extrabold text-base text-gray-900">
                  <span>Total Payable:</span>
                  <span className="text-[#ff3823]">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Instant WhatsApp Action Button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Book Instantly via WhatsApp
                </button>
                <p className="text-[11px] text-center text-gray-400">
                  Instant check-in voucher & UPI payment link sent directly to your phone.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Superhost Guarantee · Free Date Rescheduling</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
