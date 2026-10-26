"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, 
  Smartphone, Monitor, DollarSign, SlidersHorizontal, Check, X, 
  Sparkles, ShieldCheck, UserCheck, CreditCard
} from "lucide-react";

export default function InteractiveCalendar() {
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ start: "29 Jul", end: "31 Jul", prop: "Ocean View Villa" });

  const properties = [
    { id: 1, name: "The Unique — Luxury 3BHK", location: "Vikalp Khand, Gomti Nagar", rate: "₹5,500", weekend: "₹6,500", type: "3BHK Residence" },
    { id: 2, name: "The Dark Blue — Royal 3BHK", location: "Vikalp Khand, Gomti Nagar", rate: "₹4,500", weekend: "₹5,500", type: "3BHK Royal Flat" },
    { id: 3, name: "Black Beauty — Executive 3BHK", location: "Vikalp Khand, Gomti Nagar", rate: "₹4,500", weekend: "₹5,500", type: "3BHK Suite" },
    { id: 4, name: "Gomti Grand Villa — Private Estate", location: "Gomti Nagar Extension", rate: "₹8,000", weekend: "₹10,000", type: "Private Villa" },
    { id: 5, name: "Starlight Blue — Penthouse", location: "Gomti Nagar, Lucknow", rate: "₹6,000", weekend: "₹7,500", type: "Panoramic Penthouse" },
  ];

  const bookings = [
    {
      id: "b1",
      propertyId: 1,
      guest: "Aarav Mehta",
      channel: "Airbnb",
      color: "#ff5a5f",
      bg: "#fde8ea",
      text: "#b42a30",
      dates: "26 Jul – 29 Jul",
      nights: 3,
      amount: "₹36,000",
      phone: "+91 98210 XXXXX",
      status: "Confirmed & Paid",
      colStart: 1,
      span: 3,
    },
    {
      id: "b2",
      propertyId: 2,
      guest: "Rohit Sharma",
      channel: "Booking.com",
      color: "#003b95",
      bg: "#e6eef8",
      text: "#002257",
      dates: "25 Jul – 28 Jul",
      nights: 3,
      amount: "₹28,500",
      phone: "+91 99100 XXXXX",
      status: "Confirmed (Pay at Property)",
      colStart: 0,
      span: 3,
    },
    {
      id: "b3",
      propertyId: 3,
      guest: "Karan Kapoor (Direct)",
      channel: "Your Website",
      color: "#0d9488",
      bg: "#e6fffa",
      text: "#0f766e",
      dates: "28 Jul – 30 Jul",
      nights: 2,
      amount: "₹12,000 (0% Comm)",
      phone: "+91 97110 XXXXX",
      status: "UPI Advance Received",
      colStart: 3,
      span: 2,
    },
    {
      id: "b4",
      propertyId: 4,
      guest: "Neha Jain",
      channel: "MakeMyTrip",
      color: "#e5195e",
      bg: "#fde7ef",
      text: "#a30f45",
      dates: "30 Jul – 2 Aug",
      nights: 3,
      amount: "₹27,000",
      phone: "+91 98450 XXXXX",
      status: "Confirmed via MMT API",
      colStart: 5,
      span: 3,
    },
  ];

  const days = [
    { day: "Fri", date: 25, isWeekend: false },
    { day: "Sat", date: 26, isWeekend: true },
    { day: "Sun", date: 27, isWeekend: true },
    { day: "Mon", date: 28, isWeekend: false },
    { day: "Tue", date: 29, isWeekend: false, isToday: true },
    { day: "Wed", date: 30, isWeekend: false },
    { day: "Thu", date: 31, isWeekend: false },
    { day: "Fri", date: 1, isWeekend: false },
    { day: "Sat", date: 2, isWeekend: true },
    { day: "Sun", date: 3, isWeekend: true },
  ];

  return (
    <section id="unified-calendar" className="py-24 bg-gray-50/70 border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3 py-1 rounded-full border border-[#ffe2de]">
              Unified Calendar
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display mt-3">
              One live calendar to <span className="text-[#ff3823]">manage everything.</span>
            </h2>
            <p className="mt-3 text-base text-gray-600 max-w-2xl">
              Every booking, rate change, and blocked date from Airbnb, Booking.com, Vrbo, MakeMyTrip, and your direct website synced in real time. On your laptop and on your phone.
            </p>
          </div>
          <Link
            href="/unified-calendar"
            className="text-sm font-semibold text-[#ff3823] hover:text-[#d7382a] flex items-center gap-1 group"
          >
            Explore Unified Calendar specs <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Calendar Workspace Frame */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Top Bar of the App */}
          <div className="bg-gray-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#ff3823] flex items-center justify-center font-bold text-xs text-white">
                Y
              </div>
              <span className="text-sm font-bold tracking-tight">Homey India Calendar</span>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-mono">v4.2 PRO</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center bg-gray-800 rounded-lg p-0.5 border border-gray-700">
                <button className="p-1 text-gray-400 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                <span className="px-3 font-semibold">25 Jul – 3 Aug 2026</span>
                <button className="p-1 text-gray-400 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
              </div>

              <button 
                onClick={() => setNewBookingModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff3823] hover:bg-[#e5220d] text-white font-semibold shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Offline / Direct Booking
              </button>
            </div>
          </div>

          {/* Sub Toolbar: Status Indicators */}
          <div className="px-4 sm:px-6 py-2.5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a5f]" /> Airbnb
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#003b95]" /> Booking.com
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e5195e]" /> MakeMyTrip
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" /> Direct Web (0% Comm)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                Avg Occupancy: 84%
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-[11px] text-gray-500">Click any reservation bar to inspect details</span>
            </div>
          </div>

          {/* Timeline Grid Container */}
          <div className="overflow-x-auto">
            <div className="min-w-[960px]">
              {/* Header Days Row */}
              <div className="grid grid-cols-12 border-b border-gray-200 bg-white sticky top-0 z-10">
                {/* Left Properties Header */}
                <div className="col-span-3 p-3.5 border-r border-gray-200 font-bold text-xs text-gray-700 uppercase tracking-wider flex items-center justify-between bg-gray-50/50">
                  <span>Property Portfolio (5)</span>
                  <span className="text-gray-400 font-normal text-[11px]">Nightly Base</span>
                </div>

                {/* Days */}
                <div className="col-span-9 grid grid-cols-10 divide-x divide-gray-100 text-center text-xs">
                  {days.map((d) => (
                    <div 
                      key={d.date} 
                      className={`py-2.5 px-1 ${
                        d.isToday ? "bg-red-50/80 font-bold text-[#ff3823]" : d.isWeekend ? "bg-amber-50/30 font-medium text-gray-900" : "text-gray-600"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-semibold text-gray-400">{d.day}</div>
                      <div className={`text-xs mt-0.5 ${d.isToday ? "w-5 h-5 mx-auto rounded-full bg-[#ff3823] text-white flex items-center justify-center font-bold shadow-sm" : ""}`}>
                        {d.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Rows */}
              {properties.map((prop) => (
                <div key={prop.id} className="grid grid-cols-12 border-b border-gray-100 hover:bg-gray-50/40 transition-colors relative min-h-[78px]">
                  {/* Property Left Details */}
                  <div className="col-span-3 p-3 border-r border-gray-200 flex flex-col justify-center">
                    <div className="font-bold text-xs text-gray-900 truncate">{prop.name}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{prop.location}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {prop.rate} / night
                      </span>
                      <span className="text-[10px] text-gray-400">Wknd: {prop.weekend}</span>
                    </div>
                  </div>

                  {/* Calendar Days Background & Rate Cells */}
                  <div className="col-span-9 grid grid-cols-10 divide-x divide-gray-100 relative">
                    {days.map((d, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          setSelectedDates({ start: `${d.day} ${d.date}`, end: `${d.day} ${d.date + 2}`, prop: prop.name });
                          setNewBookingModalOpen(true);
                        }}
                        className={`h-full p-1 flex flex-col justify-end items-center cursor-pointer hover:bg-gray-100/60 transition-colors ${
                          d.isWeekend ? "bg-amber-50/15" : ""
                        }`}
                      >
                        <span className="text-[10px] text-gray-400 hover:text-gray-900">
                          {d.isWeekend ? prop.weekend : prop.rate}
                        </span>
                      </div>
                    ))}

                    {/* Booking Overlay Bar for this Property */}
                    {bookings
                      .filter((b) => b.propertyId === prop.id)
                      .map((b) => (
                        <div
                          key={b.id}
                          onClick={() => setSelectedBooking(b)}
                          style={{
                            left: `${(b.colStart / 10) * 100}%`,
                            width: `${(b.span / 10) * 100}%`,
                            backgroundColor: b.bg,
                            borderColor: b.color,
                            color: b.text,
                          }}
                          className="absolute top-2 bottom-2 mx-1 rounded-xl p-2.5 border-l-4 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-center overflow-hidden z-2"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs truncate">{b.guest}</span>
                            <span className="text-[10px] font-semibold uppercase px-1 rounded" style={{ backgroundColor: b.color, color: "#fff" }}>
                              {b.channel}
                            </span>
                          </div>
                          <div className="text-[11px] opacity-90 truncate mt-0.5 font-medium">
                            {b.nights} nights · {b.amount}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Action Helper */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff3823]" />
              <span><strong>Pro Tip:</strong> Click any empty date cell to create a walk-in, phone, or direct booking with instant GST invoice!</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-gray-700 font-semibold">All channels connected and synced</span>
            </div>
          </div>
        </div>

        {/* Selected Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedBooking.color }} />
                  <h3 className="font-bold text-base text-gray-900">Reservation Details</h3>
                </div>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="p-1 text-gray-400 hover:text-gray-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Guest Name:</span>
                  <span className="font-bold text-gray-900">{selectedBooking.guest}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Booking Source:</span>
                  <span className="font-semibold" style={{ color: selectedBooking.color }}>{selectedBooking.channel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Dates:</span>
                  <span className="font-medium text-gray-900">{selectedBooking.dates} ({selectedBooking.nights} nights)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Total Revenue:</span>
                  <span className="font-extrabold text-[#ff3823]">{selectedBooking.amount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Payment & WhatsApp:</span>
                  <span className="font-medium text-emerald-700">{selectedBooking.status}</span>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-full py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => alert(`GST Invoice sent to ${selectedBooking.guest}`)}
                  className="w-full py-2.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-semibold text-xs shadow-md transition-colors"
                >
                  Send WhatsApp Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Booking Modal */}
        {newBookingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 font-display">Create Direct / Walk-in Booking</h3>
                  <p className="text-xs text-gray-500">Automatically block dates across Airbnb, Booking.com & MMT</p>
                </div>
                <button 
                  onClick={() => setNewBookingModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Selected Property</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedDates.prop} 
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 font-medium text-gray-900" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Check-in Date</label>
                    <input 
                      type="text" 
                      defaultValue={selectedDates.start} 
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Check-out Date</label>
                    <input 
                      type="text" 
                      defaultValue={selectedDates.end} 
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Guest Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Vikram Malhotra" 
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Guest WhatsApp Phone</label>
                    <input 
                      type="text" 
                      placeholder="+91 98765 43210" 
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Total Price (INR)</label>
                    <input 
                      type="text" 
                      defaultValue="₹24,000" 
                      className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none font-bold text-gray-900" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Payment Status</label>
                    <select className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none bg-white">
                      <option>Paid via UPI / Bank</option>
                      <option>Advance Paid (Balance at Check-in)</option>
                      <option>Pending Payment</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => setNewBookingModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-full border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Booking created successfully! Syncing availability across all connected OTAs...");
                    setNewBookingModalOpen(false);
                  }}
                  className="w-1/2 py-2.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-semibold text-xs shadow-md"
                >
                  Confirm & Sync All OTAs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
