"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { PROPERTIES, Property } from "@/data/properties";
import {
  Building,
  ChevronLeft,
  CheckCircle2,
  Sliders,
  Copy,
  Zap,
  ShieldAlert,
  Camera,
  MapPin,
  Users,
  Bed,
  Bath,
  Clock,
  Sparkles,
  Upload,
  Plus,
  Trash2,
  Check,
  AlertCircle
} from "lucide-react";

export default function PropertySettingsClient({ propertyId }: { propertyId: string }) {

  const property = PROPERTIES.find((p) => p.id === propertyId || p.slug === propertyId) || PROPERTIES[0];

  const [activeSection, setActiveSection] = useState<"info" | "rules" | "photos">("info");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState(property.name);
  const [tagline, setTagline] = useState(property.tagline);
  const [description, setDescription] = useState(property.description);
  const [neighbourhood, setNeighbourhood] = useState("Situated in the premier hub of Lucknow, close to Lulu Mall, Ekana Stadium and Medanta Hospital with seamless connectivity.");
  const [guests, setGuests] = useState(property.maxGuests);
  const [bedrooms, setBedrooms] = useState(property.bedrooms);
  const [bathrooms, setBathrooms] = useState(property.bathrooms);
  const [beds, setBeds] = useState(property.bedrooms * 2);
  const [checkInTime, setCheckInTime] = useState("02:00 PM");
  const [checkOutTime, setCheckOutTime] = useState("11:00 AM");
  const [instantBooking, setInstantBooking] = useState(true);
  const [status, setStatus] = useState<"Activated" | "Deactivated">("Activated");

  // Rules state
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [partiesAllowed, setPartiesAllowed] = useState(false);
  const [quietHours, setQuietHours] = useState(true);
  const [hasCCTV, setHasCCTV] = useState(true);

  // Photos
  const [photos, setPhotos] = useState<string[]>(property.gallery || [property.image]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = () => {
    showToast(`Saved changes for "${title}". Synced with Airbnb, Booking.com & Vrbo in 0.8s!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#0f172a] text-white pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
            <Link href="/properties" className="hover:text-white flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> All Properties
            </Link>
            <span>/</span>
            <span className="text-white font-bold">{property.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                  {property.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {status}
                </span>
                <span className="font-mono text-xs text-slate-400">#{property.id}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {property.type} &bull; {property.location}, {property.zone}, Lucknow
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/calendar"
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-slate-700 flex items-center gap-1.5"
              >
                Calendar &amp; Pricing
              </Link>
              <button
                onClick={() => {
                  setInstantBooking(!instantBooking);
                  showToast(`Instant Booking turned ${!instantBooking ? "ON" : "OFF"}`);
                }}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                  instantBooking ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-slate-800 text-slate-400"
                }`}
              >
                <Zap className="w-3.5 h-3.5" /> Instant Book: {instantBooking ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => {
                  setStatus(status === "Activated" ? "Deactivated" : "Activated");
                  showToast(`Listing status updated to ${status === "Activated" ? "Deactivated" : "Activated"}`);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-bold transition"
              >
                {status === "Activated" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Tabs (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
            <button
              onClick={() => setActiveSection("info")}
              className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs transition flex items-center gap-2.5 ${
                activeSection === "info" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Building className="w-4 h-4 text-[#ff2800]" /> Property Details &amp; Space
            </button>
            <button
              onClick={() => setActiveSection("photos")}
              className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs transition flex items-center gap-2.5 ${
                activeSection === "photos" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Camera className="w-4 h-4 text-[#ff2800]" /> Photos ({photos.length})
            </button>
            <button
              onClick={() => setActiveSection("rules")}
              className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs transition flex items-center gap-2.5 ${
                activeSection === "rules" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-[#ff2800]" /> House Rules &amp; Policies
            </button>

            <hr className="my-3 border-slate-100" />

            <div className="p-3 rounded-2xl bg-slate-50 text-[11px] text-slate-500 space-y-1">
              <div className="font-bold text-slate-800">Property Host</div>
              <div>Praveen Singh</div>
              <div>+91 94544 70872</div>
              <div className="text-emerald-600 font-semibold">Government KYC Verified</div>
            </div>
          </div>

          {/* Right Form Body (9 cols) */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
            {/* SECTION 1: PROPERTY DETAILS & SPACE */}
            {activeSection === "info" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">Listing Basics</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Information shown to guests on booking portals and search results.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Listing Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff2800]/20 focus:border-[#ff2800]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tagline / Subtitle
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff2800]/20 focus:border-[#ff2800]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      About this Property
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#ff2800]/20 focus:border-[#ff2800]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Neighbourhood Overview
                    </label>
                    <textarea
                      rows={2}
                      value={neighbourhood}
                      onChange={(e) => setNeighbourhood(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#ff2800]/20 focus:border-[#ff2800]"
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Rooms & Capacity */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Guests &amp; Room Layout</h4>
                  <p className="text-xs text-slate-500 mb-4">Set maximum guest capacity and room configurations.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase">Max Guests</div>
                      <div className="text-2xl font-extrabold text-slate-900 my-2">{guests}</div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setGuests(guests + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase">Bedrooms</div>
                      <div className="text-2xl font-extrabold text-slate-900 my-2">{bedrooms}</div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setBedrooms(bedrooms + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase">Beds</div>
                      <div className="text-2xl font-extrabold text-slate-900 my-2">{beds}</div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setBeds(Math.max(1, beds - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setBeds(beds + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase">Bathrooms</div>
                      <div className="text-2xl font-extrabold text-slate-900 my-2">{bathrooms}</div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setBathrooms(bathrooms + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Check In / Out */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Check-In Time
                    </label>
                    <input
                      type="text"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Check-Out Time
                    </label>
                    <input
                      type="text"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: PHOTOS */}
            {activeSection === "photos" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">Property Photos</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    To attract more bookings, upload at least 15-20 high-quality photos. The first 5 photos appear on top and help guests fall in love at first glance!
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {photos.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
                      <Image
                        src={imgUrl}
                        alt={`Photo ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 bg-[#ff2800] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                          Cover Photo
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        <span className="text-[11px] font-bold text-white">Photo #{idx + 1}</span>
                      </div>
                    </div>
                  ))}

                  <div className="aspect-video rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#ff2800] flex flex-col items-center justify-center text-slate-400 hover:text-[#ff2800] cursor-pointer transition p-4 text-center">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-xs font-bold">+ Upload Photos</span>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: RULES & POLICIES */}
            {activeSection === "rules" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">House Rules &amp; Safety</h3>
                  <p className="text-xs text-slate-500 mt-1">Set guest boundaries and disclose property requirements.</p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <div className="text-sm font-bold text-slate-900">Pets Allowed</div>
                      <div className="text-xs text-slate-500">Assistance animals must always be accommodated reasonably.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={petsAllowed}
                      onChange={(e) => setPetsAllowed(e.target.checked)}
                      className="w-5 h-5 rounded text-[#ff2800] focus:ring-[#ff2800]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <div className="text-sm font-bold text-slate-900">Smoking Permitted</div>
                      <div className="text-xs text-slate-500">Smoking allowed in balcony or dedicated outdoor zones.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={smokingAllowed}
                      onChange={(e) => setSmokingAllowed(e.target.checked)}
                      className="w-5 h-5 rounded text-[#ff2800] focus:ring-[#ff2800]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <div className="text-sm font-bold text-slate-900">Parties and Events Permitted</div>
                      <div className="text-xs text-slate-500">Allow family gatherings, birthday celebrations or shoots.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={partiesAllowed}
                      onChange={(e) => setPartiesAllowed(e.target.checked)}
                      className="w-5 h-5 rounded text-[#ff2800] focus:ring-[#ff2800]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <div className="text-sm font-bold text-slate-900">Quiet Hours after 10:00 PM</div>
                      <div className="text-xs text-slate-500">Maintain society silence and zero loud music past 10 PM.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={quietHours}
                      onChange={(e) => setQuietHours(e.target.checked)}
                      className="w-5 h-5 rounded text-[#ff2800] focus:ring-[#ff2800]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <div className="text-sm font-bold text-slate-900">Security Cameras on Premises</div>
                      <div className="text-xs text-slate-500">CCTV installed outside entrance / parking for guest security.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasCCTV}
                      onChange={(e) => setHasCCTV(e.target.checked)}
                      className="w-5 h-5 rounded text-[#ff2800] focus:ring-[#ff2800]"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/properties"
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Back to Properties
              </Link>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-[#ff2800] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff2800]/20 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Save &amp; Sync Listing
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
