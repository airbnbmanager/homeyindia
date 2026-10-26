"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { PROPERTIES } from "@/data/properties";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Search,
  CheckCircle2,
  Lock,
  DollarSign,
  User,
  Building,
  Sparkles,
  ShieldCheck,
  X,
  Clock
} from "lucide-react";

interface TimelineBlock {
  propId: string;
  startDay: number;
  endDay: number;
  channel: "Airbnb" | "Booking.com" | "Direct" | "Blocked";
  guestName: string;
  nights: number;
  total: number;
}

export default function UnifiedCalendarPage() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // Nov
  const [searchFilter, setSearchFilter] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected cell for Quick Action
  const [selectedCell, setSelectedCell] = useState<{ propId: string; propName: string; day: number; price: number } | null>(null);
  const [quickNewPrice, setQuickNewPrice] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 14 days visible window for horizontal timeline
  const days = Array.from({ length: 14 }, (_, i) => i + 1);

  // Sample timeline bookings
  const [bookings, setBookings] = useState<TimelineBlock[]>([
    { propId: "LUL-101", startDay: 2, endDay: 5, channel: "Airbnb", guestName: "Vikram Malhotra", nights: 3, total: 8940 },
    { propId: "LUL-101", startDay: 8, endDay: 11, channel: "Direct", guestName: "Pooja Hegde", nights: 3, total: 7950 },
    { propId: "GOM-201", startDay: 4, endDay: 7, channel: "Booking.com", guestName: "Arjun Rampal", nights: 3, total: 10500 },
    { propId: "GOM-201", startDay: 10, endDay: 12, channel: "Blocked", guestName: "Maintenance Block", nights: 2, total: 0 },
    { propId: "LUL-102", startDay: 1, endDay: 4, channel: "Direct", guestName: "Rajeev Shukla", nights: 3, total: 7950 },
    { propId: "SHA-301", startDay: 5, endDay: 10, channel: "Airbnb", guestName: "Dr. K. Saxena", nights: 5, total: 42500 }
  ]);

  const filteredProps = PROPERTIES.filter((p) =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.location.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleApplyPrice = () => {
    if (!selectedCell || !quickNewPrice) return;
    showToast(`Updated price to ₹${parseInt(quickNewPrice).toLocaleString()} for ${selectedCell.propName} on Nov ${selectedCell.day}. Synced with OTAs in 0.8s!`);
    setSelectedCell(null);
    setQuickNewPrice("");
  };

  const handleToggleBlock = () => {
    if (!selectedCell) return;
    const existing = bookings.find(
      (b) => b.propId === selectedCell.propId && selectedCell.day >= b.startDay && selectedCell.day <= b.endDay
    );

    if (existing) {
      setBookings(bookings.filter((b) => b !== existing));
      showToast(`Unblocked ${selectedCell.propName} on Nov ${selectedCell.day}.`);
    } else {
      setBookings([
        ...bookings,
        {
          propId: selectedCell.propId,
          startDay: selectedCell.day,
          endDay: selectedCell.day + 1,
          channel: "Blocked",
          guestName: "Host Block",
          nights: 1,
          total: 0
        }
      ]);
      showToast(`Blocked ${selectedCell.propName} on Nov ${selectedCell.day} across all channels.`);
    }
    setSelectedCell(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#0f172a] text-white pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Host Control Centre &bull; Homey India
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display flex items-center gap-3">
              Unified Multi-Property Timeline (Video 08)
            </h1>
          </div>

          {/* Month Navigator */}
          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setCurrentMonth((prev) => (prev > 0 ? prev - 1 : 11))}
              className="p-1.5 rounded-xl hover:bg-slate-700 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-xs text-white px-3">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={() => setCurrentMonth((prev) => (prev < 11 ? prev + 1 : 0))}
              className="p-1.5 rounded-xl hover:bg-slate-700 text-slate-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center gap-2 border-t border-slate-800/80 pt-4 overflow-x-auto text-sm font-medium">
          <Link href="/dashboard" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Dashboard
          </Link>
          <Link href="/calendar" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Calendar &amp; Pricing
          </Link>
          <Link href="/unified-calendar" className="px-4 py-2 rounded-xl bg-[#ff3823] text-white font-bold shadow-lg shadow-[#ff3823]/20">
            Unified Multi-Property (Active)
          </Link>
          <Link href="/properties" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Properties ({PROPERTIES.length})
          </Link>
          <Link href="/reservations" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Reservations
          </Link>
          <Link href="/channel-manager" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Channel Manager
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Top Filter and Channel Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search properties or locations..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 w-64"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff385c]"></span> Airbnb
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#003580]"></span> Booking.com
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span> Direct (0% Comm)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300"></span> Blocked / Maint
            </div>
          </div>
        </div>

        {/* Unified Timeline Matrix Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6 w-64 min-w-[240px] sticky left-0 bg-slate-50 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                    Property ({filteredProps.length})
                  </th>
                  {days.map((d) => (
                    <th key={d} className="py-4 px-3 text-center min-w-[70px] border-l border-slate-100">
                      <div>Nov {d}</div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][(d + 5) % 7]}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProps.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/50 transition">
                    {/* Left Sticky Property Column */}
                    <td className="py-4 px-6 sticky left-0 bg-white z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <Image src={prop.image} alt={prop.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-slate-900 truncate text-xs">{prop.name}</div>
                          <div className="text-[10px] text-slate-400 font-medium truncate">
                            #{prop.id} &bull; {prop.zone}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Timeline Days */}
                    {days.map((d) => {
                      const booking = bookings.find(
                        (b) => b.propId === prop.id && d >= b.startDay && d <= b.endDay
                      );
                      const isStart = booking && booking.startDay === d;

                      let cellBg = "hover:bg-slate-100/70 cursor-pointer";
                      let badge = null;

                      if (booking) {
                        if (booking.channel === "Airbnb") cellBg = "bg-rose-50 text-rose-900";
                        else if (booking.channel === "Booking.com") cellBg = "bg-blue-50 text-blue-900";
                        else if (booking.channel === "Direct") cellBg = "bg-emerald-50 text-emerald-900";
                        else if (booking.channel === "Blocked") cellBg = "bg-slate-100 text-slate-400 border-dashed";

                        if (isStart) {
                          badge = (
                            <div className="text-[10px] font-bold truncate">
                              {booking.guestName} ({booking.channel})
                            </div>
                          );
                        }
                      }

                      return (
                        <td
                          key={d}
                          onClick={() =>
                            setSelectedCell({
                              propId: prop.id,
                              propName: prop.name,
                              day: d,
                              price: prop.price
                            })
                          }
                          className={`p-2 text-center border-l border-slate-100 h-16 transition ${cellBg}`}
                        >
                          {badge || (
                            <span className="text-[11px] font-semibold text-slate-500">
                              ₹{prop.price.toLocaleString()}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Cell Action Modal */}
        {selectedCell && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">{selectedCell.propName}</div>
                  <h3 className="text-base font-bold text-slate-900 font-display">Date: Nov {selectedCell.day}, 2026</h3>
                </div>
                <button onClick={() => setSelectedCell(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Nightly Rate (₹)</label>
                  <input
                    type="number"
                    placeholder={`Current: ₹${selectedCell.price}`}
                    value={quickNewPrice}
                    onChange={(e) => setQuickNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleApplyPrice}
                    className="flex-1 py-2.5 rounded-xl bg-[#ff3823] text-white font-bold text-xs hover:bg-[#e5220d] shadow"
                  >
                    Update Price
                  </button>
                  <button
                    onClick={handleToggleBlock}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow"
                  >
                    Block / Unblock
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
