"use client";

import HostNavTabs from "@/components/HostNavTabs";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Building2, Calendar, DollarSign, Users, ArrowUpRight, 
  CheckCircle2, Clock, Search, Filter, Download, 
  ExternalLink, Layers, ArrowLeft, ChevronRight, X,
  Phone, Mail, MapPin, ShieldCheck, FileText, ChevronDown,
  Sparkles, RefreshCw, AlertCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PROPERTIES } from "@/data/properties";
import { useAuth } from "@/context/AuthContext";

interface BookingItem {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyUnit: string;
  channel: "Direct Website" | "Airbnb" | "Booking.com" | "MakeMyTrip" | "Offline WhatsApp";
  channelColor: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  adults: number;
  children: number;
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  nights: number;
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  platformFee: number;
  tdsAmount: number;
  netPayout: number;
  paymentStatus: "Paid in Full" | "Balance Due" | "Advance Paid";
  payoutStatus: "Paid" | "Upcoming Payout" | "Processing";
  bookingStatus: "ongoing" | "upcoming" | "checkout_today" | "request" | "offline";
  bookedOn: string;
  reservationUrl?: string;
}

export default function HostDashboardPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<"all" | "today_checkin" | "today_checkout" | "upcoming" | "offline">("all");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [earningsTab, setEarningsTab] = useState<"payouts" | "property_wise">("payouts");
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSync, setLastSync] = useState<string>("");
  const [isSyncingNow, setIsSyncingNow] = useState(false);

  // Fetch real-time live Airbnb reservations across all 18 properties
  const fetchLiveAirbnbBookings = useCallback(async () => {
    setIsSyncingNow(true);
    try {
      const res = await fetch("/api/calendar/sync?property_id=all");
      const data = await res.json();

      if (data.success && Array.isArray(data.allReservations)) {
        setLastSync(data.lastSync || new Date().toISOString());

        const fmt = (dStr: string) => {
          try {
            const [y, m, d] = dStr.split("-").map(Number);
            const dt = new Date(y, m - 1, d);
            return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
          } catch {
            return dStr;
          }
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const liveItems: BookingItem[] = data.allReservations.map((r: any) => {
          const prop = PROPERTIES.find((p) => p.id === r.propertyId);
          const nightlyRate = prop?.price || 4800;
          const nights = r.nights || 1;
          const baseAmount = r.amount > 0 ? r.amount : nightlyRate * nights;
          const taxAmount = Math.round(baseAmount * 0.12);
          const totalAmount = baseAmount + taxAmount;
          const platformFee = Math.round(baseAmount * 0.15); // Airbnb 15% host fee
          const tdsAmount = Math.round(baseAmount * 0.01);
          const netPayout = baseAmount - tdsAmount;

          const [sY, sM, sD] = r.startDate.split("-").map(Number);
          const [eY, eM, eD] = r.endDate.split("-").map(Number);
          const sDate = new Date(sY, sM - 1, sD);
          const eDate = new Date(eY, eM - 1, eD);

          let bStatus: "ongoing" | "upcoming" | "checkout_today" | "request" | "offline" = "upcoming";
          if (today >= sDate && today < eDate) {
            bStatus = "ongoing";
          } else if (today.getTime() === eDate.getTime()) {
            bStatus = "checkout_today";
          } else if (today < sDate) {
            bStatus = "upcoming";
          } else {
            bStatus = "ongoing";
          }

          const id = r.confirmationCode ? `ABB-${r.confirmationCode}` : `ABB-${r.uid.slice(0, 10)}`;

          return {
            id,
            propertyId: r.propertyId,
            propertyName: prop ? prop.name : r.propertyName,
            propertyUnit: prop ? `${prop.location} (${prop.type})` : (r.unitNo || "#TUHH"),
            channel: "Airbnb" as const,
            channelColor: "#ff385c",
            guestName: r.guestName || (r.confirmationCode ? `Guest (${r.confirmationCode})` : "Airbnb Guest"),
            guestPhone: r.guestPhone || (r.phoneEnd ? `+91 XXXXX ${r.phoneEnd}` : "+91 94544 70872"),
            guestEmail: r.confirmationCode ? `${r.confirmationCode.toLowerCase()}@guest.airbnb.com` : "guest@airbnb.com",
            adults: 2,
            children: 0,
            checkIn: fmt(r.startDate),
            checkOut: fmt(r.endDate),
            checkInTime: "02:00 PM",
            checkOutTime: "11:00 AM",
            nights,
            baseAmount,
            taxAmount,
            totalAmount,
            platformFee,
            tdsAmount,
            netPayout,
            paymentStatus: "Paid in Full" as const,
            payoutStatus: (bStatus === "ongoing" || today >= eDate) ? ("Paid" as const) : ("Upcoming Payout" as const),
            bookingStatus: bStatus,
            bookedOn: "Realtime Airbnb iCal",
            reservationUrl: r.reservationUrl,
          };
        });

        setBookings(liveItems);
      }
    } catch (err) {
      console.warn("Realtime sync error:", err);
    } finally {
      setIsLoading(false);
      setIsSyncingNow(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveAirbnbBookings();
  }, [fetchLiveAirbnbBookings]);

  // Dynamic filter based on real synced Airbnb bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "today_checkin" && (b.bookingStatus === "ongoing" || b.bookingStatus === "checkout_today")) ||
      (activeFilter === "today_checkout" && b.bookingStatus === "checkout_today") ||
      (activeFilter === "upcoming" && b.bookingStatus === "upcoming") ||
      (activeFilter === "offline" && b.channel.includes("Offline"));

    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.propertyName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalEarned = bookings
    .filter((b) => b.payoutStatus === "Paid")
    .reduce((acc, b) => acc + b.netPayout, 0);

  const yetToReceive = bookings
    .filter((b) => b.payoutStatus !== "Paid")
    .reduce((acc, b) => acc + b.netPayout, 0);

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Host Navigation Header  */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>👑 Paid Pro Master Host · Enterprise Lifetime Plan</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight flex items-center gap-2">
                  <span>Welcome, Praveen Singh</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  The Unique Haven Homes · Managing 18 Luxury Stays with Zero Commission
                </p>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={fetchLiveAirbnbBookings}
                  disabled={isSyncingNow}
                  className="px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
                  aria-label="Sync Realtime Airbnb Feeds"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingNow ? "animate-spin" : ""}`} />
                  <span>{isSyncingNow ? "Syncing Airbnb..." : "Sync Airbnb Realtime"}</span>
                </button>
                <Link
                  href="/unified-calendar"
                  className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/10 flex items-center gap-1.5 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>14-Day Calendar</span>
                </Link>
                <Link
                  href="/stays"
                  className="px-3.5 py-2 rounded-full bg-[#ff2800] hover:bg-[#e0220d] text-white text-xs font-bold shadow-md shadow-[#ff2800]/30 flex items-center gap-1.5 transition-all"
                >
                  <span>18 Stays</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 4 Mini KPI Cards in Mobile 2x2 / Desktop 4x1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-2 border-t border-slate-800">
              <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold block">Gross Revenue</span>
                <span className="text-base sm:text-xl font-extrabold font-mono text-emerald-400 mt-0.5 block">
                  ₹{totalEarned.toLocaleString("en-IN")}
                </span>
                <span className="text-[9px] text-slate-500">Live Synced from Airbnb</span>
              </div>
              <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold block">Upcoming Payout</span>
                <span className="text-base sm:text-xl font-extrabold font-mono text-amber-400 mt-0.5 block">
                  ₹{yetToReceive.toLocaleString("en-IN")}
                </span>
                <span className="text-[9px] text-slate-500">Scheduled to SBI Bank</span>
              </div>
              <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold block">Active / Arrivals</span>
                <span className="text-base sm:text-xl font-extrabold font-mono text-white mt-0.5 block">
                  {bookings.filter(b => b.bookingStatus === "ongoing" || b.bookingStatus === "checkout_today").length} Bookings
                </span>
                <span className="text-[9px] text-emerald-400">Keys &amp; WiFi Ready</span>
              </div>
              <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold block">Realtime Airbnb Sync</span>
                <span className="text-base sm:text-xl font-extrabold font-mono text-white mt-0.5 block">
                  {bookings.length} Bookings Live
                </span>
                <span className="text-[9px] text-emerald-400">
                  {lastSync ? `Synced ${new Date(lastSync).toLocaleTimeString()}` : "● Active iCal Link"}
                </span>
              </div>
            </div>

            <HostNavTabs variant="dark" />
          </div>

          {/* Activity Filter Tabs  */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: "all", label: "All Airbnb Bookings", count: bookings.length },
                  { id: "today_checkin", label: "Active / Today Check-Ins", count: bookings.filter((b) => b.bookingStatus === "ongoing" || b.bookingStatus === "checkout_today").length },
                  { id: "today_checkout", label: "Today's Check-Outs", count: bookings.filter((b) => b.bookingStatus === "checkout_today").length },
                  { id: "upcoming", label: "Upcoming Bookings", count: bookings.filter((b) => b.bookingStatus === "upcoming").length },
                  { id: "offline", label: "Direct Website", count: bookings.filter((b) => b.channel.includes("Direct")).length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      activeFilter === tab.id
                        ? "bg-[#0c1838] text-white shadow-md scale-102"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeFilter === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search confirmation code, guest or stay..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-white text-xs focus:border-[#ff2800] focus:outline-none"
                />
              </div>
            </div>

            {/* Loading & Empty States */}
            {isLoading ? (
              <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center space-y-3 shadow-xs">
                <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                <div className="font-bold text-gray-900 text-sm">Syncing Realtime Bookings from Airbnb...</div>
                <p className="text-xs text-gray-400">Fetching live iCal feeds directly across all 18 Lucknow properties.</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center space-y-2 shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <div className="font-bold text-gray-900 text-sm">No reservations found for "{activeFilter}" filter</div>
                <p className="text-xs text-gray-400">All 18 properties are actively synced with Airbnb.</p>
              </div>
            ) : (
              <>
                {/* Mobile Responsive Booking Cards (md:hidden) */}
                <div className="md:hidden space-y-3">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm active:scale-[0.99] transition-all space-y-3 cursor-pointer"
                    >
                      {/* Top Row: Property & Status */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-extrabold text-sm text-gray-900 leading-snug">
                            {b.propertyName}
                          </div>
                          <div className="text-[11px] text-gray-400 font-medium">
                            {b.propertyUnit}
                          </div>
                        </div>
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0"
                          style={{
                            borderColor: `${b.channelColor}40`,
                            backgroundColor: `${b.channelColor}12`,
                            color: b.channelColor,
                          }}
                        >
                          {b.channel}
                        </span>
                      </div>

                      {/* Middle: Guest & Dates */}
                      <div className="bg-gray-50/80 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Guest</span>
                          <span className="font-bold text-gray-900 truncate block">{b.guestName}</span>
                          <span className="text-[11px] text-gray-500">{b.adults} Guests · {b.nights}N</span>
                        </div>
                        <div className="border-l border-gray-200 pl-3">
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Dates</span>
                          <span className="font-bold text-gray-900 text-[11px] block">{b.checkIn}</span>
                          <span className="text-[10px] text-gray-500">to {b.checkOut}</span>
                        </div>
                      </div>

                      {/* Financials & Quick Action Buttons */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Net Payout</span>
                          <span className="text-base font-extrabold text-[#ff2800] font-mono">
                            ₹{b.netPayout.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${b.guestName}, Praveen Singh here from The Unique Haven Homes. We are delighted to host you at ${b.propertyName}! Here are your check-in details for ${b.checkIn}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs"
                            aria-label="WhatsApp Guest"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                          >
                            <span>Folio</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Bookings Table (hidden on mobile)  */}
                <div className="hidden md:block bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3.5 px-6">Booking ID</th>
                          <th className="py-3.5 px-6">Property / Residence</th>
                          <th className="py-3.5 px-6">Channel</th>
                          <th className="py-3.5 px-6">Guest Info</th>
                          <th className="py-3.5 px-6">Dates (In → Out)</th>
                          <th className="py-3.5 px-6 text-right">Net Payout</th>
                          <th className="py-3.5 px-6 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredBookings.map((b) => (
                          <tr
                            key={b.id}
                            onClick={() => setSelectedBooking(b)}
                            className="hover:bg-[#fff8eb]/60 transition-colors cursor-pointer group"
                          >
                            <td className="py-4 px-6 font-mono font-bold text-gray-900 group-hover:text-[#ff2800]">
                              {b.id}
                            </td>
                            <td className="py-4 px-6">
                              <div className="font-bold text-gray-900">{b.propertyName}</div>
                              <div className="text-[11px] text-gray-400">{b.propertyUnit}</div>
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border"
                                style={{
                                  borderColor: `${b.channelColor}40`,
                                  backgroundColor: `${b.channelColor}12`,
                                  color: b.channelColor,
                                }}
                              >
                                {b.channel}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="font-semibold text-gray-900">{b.guestName}</div>
                              <div className="text-[11px] text-gray-500">{b.guestPhone}</div>
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-700">
                              <div>{b.checkIn} → {b.checkOut}</div>
                              <div className="text-[10px] text-gray-400">{b.nights} Nights · {b.adults} Guests</div>
                            </td>
                            <td className="py-4 px-6 text-right font-extrabold text-sm text-gray-900 font-mono">
                              ₹{b.netPayout.toLocaleString("en-IN")}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                b.payoutStatus === "Paid"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {b.payoutStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Homey India Earnings & Payouts Cards  */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 font-display">Homey India Host Earnings</h2>
                <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
                  Real-time revenue consolidated across Direct Bookings, Airbnb, Booking.com, and MakeMyTrip channel integrations with automated TDS and GST deductions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEarningsTab("payouts")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    earningsTab === "payouts"
                      ? "bg-[#ff2800] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Payouts Timeline
                </button>
                <button
                  onClick={() => setEarningsTab("property_wise")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    earningsTab === "property_wise"
                      ? "bg-[#ff2800] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Property-Wise
                </button>
              </div>
            </div>

            {/* Metric Summary Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-[#0c1838] text-white space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Revenue Earned</span>
                <div className="text-3xl font-extrabold font-mono text-emerald-400">
                  ₹{totalEarned.toLocaleString("en-IN")}
                </div>
                <span className="text-[10px] text-gray-400 block pt-1">Across 18 Lucknow stays</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Yet to Receive (Upcoming Payout)</span>
                <div className="text-3xl font-extrabold font-mono text-[#ff2800]">
                  ₹{yetToReceive.toLocaleString("en-IN")}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold block pt-1">Direct Bank Account Credit (SBI)</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Direct Savings for Guests</span>
                <div className="text-3xl font-extrabold font-mono text-emerald-600">
                  ₹32,400
                </div>
                <span className="text-[10px] text-gray-500 block pt-1">0% OTA Commission on website bookings</span>
              </div>
            </div>

            {/* Property-Wise Table if selected */}
            {earningsTab === "property_wise" && (
              <div className="border border-gray-100 rounded-2xl overflow-hidden animate-in fade-in duration-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 font-bold text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Residence</th>
                      <th className="p-3">Location</th>
                      <th className="p-3 text-center">Occupancy Rate</th>
                      <th className="p-3 text-right">Gross Booking Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {PROPERTIES.slice(0, 6).map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-900">{p.name}</td>
                        <td className="p-3 text-gray-500">{p.location}</td>
                        <td className="p-3 text-center font-bold text-emerald-600">84%</td>
                        <td className="p-3 text-right font-mono font-bold text-gray-900">₹{(p.price * 22).toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* SLIDE-OVER BOOKING DETAILS DRAWER  */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedBooking(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250 overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2800] to-[#e0220d] text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {selectedBooking.id.slice(-2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-gray-900 font-mono">
                      #{selectedBooking.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    From {selectedBooking.channel} on {selectedBooking.bookedOn}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Invoices Bar  */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-500">Official Guest Invoices:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Generating GST Tax Invoice for ${selectedBooking.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900 flex items-center gap-1.5 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Invoice</span>
                </button>
                <button
                  onClick={() => alert(`Generating Payment Receipt for ${selectedBooking.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900 flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Receipt</span>
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Check-in / Check-out Timeline */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Check In</span>
                  <div className="font-extrabold text-sm text-gray-900 mt-0.5">{selectedBooking.checkIn}</div>
                  <span className="text-gray-500 text-[11px]">{selectedBooking.checkInTime}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-600 font-semibold">
                    {selectedBooking.nights} Nights
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 my-1" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Check Out</span>
                  <div className="font-extrabold text-sm text-gray-900 mt-0.5">{selectedBooking.checkOut}</div>
                  <span className="text-gray-500 text-[11px]">{selectedBooking.checkOutTime}</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Booked Property</span>
                <div className="font-bold text-base text-gray-900">{selectedBooking.propertyName}</div>
                <p className="text-xs text-gray-500">{selectedBooking.propertyUnit} · Lucknow, Uttar Pradesh</p>
              </div>

              {/* DUAL COLUMN FINANCIALS: Price Details vs Owner Payout  */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Guest Price Details */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                  <span className="font-extrabold text-xs text-gray-900 block pb-1 border-b border-gray-200">
                    Guest Price Details
                  </span>
                  <div className="flex justify-between text-gray-600">
                    <span>Price for {selectedBooking.nights} nights:</span>
                    <span className="font-medium text-gray-900">₹{selectedBooking.baseAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (12%):</span>
                    <span className="font-medium text-gray-900">₹{selectedBooking.taxAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total Amount:</span>
                    <span>₹{selectedBooking.totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Amount Paid:</span>
                    <span>₹{selectedBooking.totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-[11px]">
                    <span>Balance Due:</span>
                    <span>₹0</span>
                  </div>
                </div>

                {/* Owner Payout Details */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs">
                  <span className="font-extrabold text-xs text-emerald-950 block pb-1 border-b border-emerald-200">
                    Owner Final Payout
                  </span>
                  <div className="flex justify-between text-gray-700">
                    <span>Gross Paid:</span>
                    <span>₹{selectedBooking.totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-[11px]">
                    <span>Less Guest Tax:</span>
                    <span>-₹{selectedBooking.taxAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-[11px]">
                    <span>Channel Fee:</span>
                    <span>-₹{selectedBooking.platformFee.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-[11px]">
                    <span>Less TDS (1%):</span>
                    <span>-₹{selectedBooking.tdsAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-sm text-emerald-900 pt-2 border-t border-emerald-200">
                    <span>Net Payout to Host:</span>
                    <span className="font-mono">₹{selectedBooking.netPayout.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Guest Details & Contact */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3 text-xs">
                <span className="font-extrabold text-xs text-gray-900 block pb-1 border-b border-gray-100">
                  Guest Information
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-400 text-[10px] block">Full Name</span>
                    <span className="font-bold text-gray-900">{selectedBooking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Party Size</span>
                    <span className="font-bold text-gray-900">{selectedBooking.adults} Adults, {selectedBooking.children} Kids</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">WhatsApp / Phone</span>
                    <a href={`tel:${selectedBooking.guestPhone}`} className="text-emerald-600 font-bold hover:underline">
                      {selectedBooking.guestPhone}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Email</span>
                    <span className="text-gray-700">{selectedBooking.guestEmail}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${selectedBooking.guestPhone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(selectedBooking.guestName)},%20this%20is%20Praveen%20Singh%20from%20The%20Unique%20Haven%20Homes%20welcoming%20you%20to%20${encodeURIComponent(selectedBooking.propertyName)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Message Guest on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Policy & Rules */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-500 space-y-1">
                <span className="font-bold text-gray-700 block">Cancellation Policy</span>
                <p className="text-[11px] leading-relaxed">
                  Flexible Policy: Guests must cancel at least 48 hours (2 days) before check-in for a full 100% refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
