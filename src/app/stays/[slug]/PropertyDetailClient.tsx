"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Star, MapPin, Users, Bed, Bath, Wifi, ShieldCheck, 
  Check, ArrowLeft, MessageCircle, Calendar, Share2, 
  ChevronRight, Sparkles, Building, UtensilsCrossed, Flame,
  X, ChevronLeft, Grid, Image as ImageIcon
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Property } from "@/data/properties";

export default function PropertyDetailClient({ prop }: { prop: Property }) {
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [bookingMode, setBookingMode] = useState<"entire" | "room">("entire");
  const [chefAddon, setChefAddon] = useState(false);
  const [bonfireAddon, setBonfireAddon] = useState(false);

  // Fullscreen Photo Lightbox States
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Categories list
  const categoryKeys = prop.categories ? Object.keys(prop.categories) : [];
  
  // Current active photos based on category filter
  const currentPhotoList: string[] = React.useMemo(() => {
    if (selectedCategory === "all" || !prop.categories || !prop.categories[selectedCategory]) {
      return prop.gallery && prop.gallery.length > 0 ? prop.gallery : [prop.image];
    }
    return prop.categories[selectedCategory];
  }, [selectedCategory, prop]);

  const openGalleryAt = (idx: number, category: string = "all") => {
    setSelectedCategory(category);
    setActivePhotoIdx(Math.max(0, Math.min(idx, currentPhotoList.length - 1)));
    setGalleryOpen(true);
  };

  const nextPhoto = useCallback(() => {
    setActivePhotoIdx((prev) => (prev + 1) % currentPhotoList.length);
  }, [currentPhotoList.length]);

  const prevPhoto = useCallback(() => {
    setActivePhotoIdx((prev) => (prev - 1 + currentPhotoList.length) % currentPhotoList.length);
  }, [currentPhotoList.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!galleryOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGalleryOpen(false);
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen, nextPhoto, prevPhoto]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) nextPhoto();
    if (diff < -50) prevPhoto();
    setTouchStartX(null);
  };

  // Pricing calculations
  const effectiveBasePrice = bookingMode === "entire" ? prop.price : Math.round(prop.price * 0.45);
  const baseTotal = effectiveBasePrice * nights;
  const addonsTotal = (chefAddon ? 3500 : 0) + (bonfireAddon ? 2000 : 0);
  const totalAmount = baseTotal + addonsTotal;
  const savings = (prop.airbnbPrice - prop.price) * nights;

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hello Praveen Singh,\n\nI want to book *${prop.name}* (${prop.id}) in Lucknow directly via Homey India:\n- Stay Duration: ${nights} Nights\n- Guests: ${guests}\n- Mode: ${bookingMode === "entire" ? "Entire Villa/Flat" : "Single Suite / Room-by-Room"}\n- Private Chef: ${chefAddon ? "Yes (+₹3,500)" : "No"}\n- Bonfire Setup: ${bonfireAddon ? "Yes (+₹2,000)" : "No"}\n- Total Direct Rate: ₹${totalAmount.toLocaleString("en-IN")}\n\nPlease share the booking confirmation & UPI payment QR.`
    );
    window.open(`https://wa.me/919454470872?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20">
        {/* Header Breadcrumbs & Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 mb-6">
          <Link
            href="/stays"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#ff3823] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all 18 Lucknow Stays
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff3823] mb-1">
                <span>{prop.zone}</span>
                <span>•</span>
                <span>{prop.type}</span>
                <span>•</span>
                <span className="text-gray-400 font-mono">{prop.id}</span>
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
                Direct Superhost Listing
              </div>
            </div>
          </div>

          {/* Airbnb-Style 5-Photo Bento Gallery Grid (Desktop & Tablet) */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-100 group">
            
            {/* Desktop 5-Photo Bento Grid */}
            <div className="hidden sm:grid grid-cols-4 gap-2 aspect-[16/10] md:aspect-[21/9]">
              {/* Main Lead Photo (2 Cols) */}
              <div 
                onClick={() => openGalleryAt(0)}
                className="col-span-2 relative overflow-hidden h-full cursor-pointer group/lead"
              >
                <img
                  src={prop.gallery?.[0] || prop.image}
                  alt={`${prop.name} Main View`}
                  className="w-full h-full object-cover group-hover/lead:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                  Lead Photo · Tap to Enlarge
                </div>
              </div>

              {/* Right 2x2 Photo Grid */}
              <div className="col-span-2 grid grid-cols-2 gap-2 h-full">
                {[
                  { idx: 1, label: "Living & Dining" },
                  { idx: 2, label: "Master Bedroom" },
                  { idx: 3, label: "Luxury Bathroom" },
                  { idx: 4, label: "Balcony & Views" },
                ].map((item) => (
                  <div 
                    key={item.idx} 
                    onClick={() => openGalleryAt(item.idx)}
                    className="relative overflow-hidden h-full bg-gray-100 cursor-pointer group/item"
                  >
                    <img
                      src={prop.gallery?.[item.idx] || prop.image}
                      alt={`${prop.name} ${item.label}`}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Single Hero Photo with Tap-to-Open and Swipe Preview */}
            <div 
              onClick={() => openGalleryAt(0)}
              className="sm:hidden relative aspect-[16/11] cursor-pointer"
            >
              <img
                src={prop.gallery?.[0] || prop.image}
                alt={prop.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                Tap to view all {prop.gallery?.length || 1} photos
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5" />
                <span>1 / {prop.gallery?.length || 1}</span>
              </div>
            </div>

            {/* Floating "Show all photos" Button */}
            <button 
              onClick={() => openGalleryAt(0)}
              className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-gray-900 font-bold text-xs shadow-xl border border-gray-300 flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Show all {prop.gallery?.length || 0} photos</span>
            </button>
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

            {/* Magic Cluster Mode Selector */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-900 to-[#0c1838] text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="w-4 h-4" /> Powered by Magic Cluster™ Engine
              </div>
              <h2 className="text-xl font-bold font-display">How would you like to stay?</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => setBookingMode("entire")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    bookingMode === "entire"
                      ? "bg-white/15 border-white shadow-md ring-2 ring-white/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Entire Villa / Residence</span>
                    <Building className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xs text-gray-300 mt-1">All {prop.bedrooms} bedrooms with full kitchen & terrace.</div>
                  <div className="text-sm font-extrabold text-white mt-3">₹{prop.price.toLocaleString("en-IN")}<span className="text-xs font-normal text-gray-300">/night</span></div>
                </button>

                <button
                  onClick={() => setBookingMode("room")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    bookingMode === "room"
                      ? "bg-white/15 border-white shadow-md ring-2 ring-white/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Single Master Suite</span>
                    <Bed className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xs text-gray-300 mt-1">1 Private room with attached luxury bath.</div>
                  <div className="text-sm font-extrabold text-white mt-3">₹{Math.round(prop.price * 0.45).toLocaleString("en-IN")}<span className="text-xs font-normal text-gray-300">/night</span></div>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 font-display">About the Residence</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {prop.description}
              </p>
            </div>

            {/* Addon Experiences */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 font-display">Optional Bespoke Experiences</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

      {/* FULLSCREEN AIRBNB-STYLE PHOTO GALLERY LIGHTBOX */}
      {galleryOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between text-white animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-800/80 bg-black/40">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-[70vw] no-scrollbar py-1">
              <button
                onClick={() => { setSelectedCategory("all"); setActivePhotoIdx(0); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-[#ff3823] text-white shadow-md shadow-[#ff3823]/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All Photos ({prop.gallery?.length || 1})
              </button>

              {categoryKeys.map((cat) => {
                const count = prop.categories?.[cat]?.length || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setActivePhotoIdx(0); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-[#ff3823] text-white shadow-md shadow-[#ff3823]/30"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Counter & Close */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono font-medium text-gray-400 hidden sm:inline">
                {activePhotoIdx + 1} / {currentPhotoList.length}
              </span>
              <button
                onClick={() => setGalleryOpen(false)}
                className="p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                aria-label="Close photo gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Main Stage Viewport */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            {/* Left Nav Arrow */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-6 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-gray-700/80 shadow-2xl transition-all hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Current Photo */}
            <div className="relative max-w-5xl max-h-[72vh] flex items-center justify-center">
              <img
                src={currentPhotoList[activePhotoIdx]}
                alt={`${prop.name} Photo ${activePhotoIdx + 1}`}
                className="max-h-[72vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl select-none"
              />
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-6 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-gray-700/80 shadow-2xl transition-all hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Filmstrip Ribbon */}
          <div className="p-3 sm:p-4 border-t border-gray-800/80 bg-black/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {currentPhotoList.map((photoUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activePhotoIdx === idx
                      ? "border-[#ff3823] scale-105 shadow-md shadow-[#ff3823]/40"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={photoUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* In-Modal Direct WhatsApp Reserve */}
            <button
              onClick={handleWhatsAppBooking}
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Book this stay</span>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
