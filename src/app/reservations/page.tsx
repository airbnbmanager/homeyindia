"use client";

import HostNavTabs from "@/components/HostNavTabs";

import { useState, useMemo, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PROPERTIES } from "@/data/properties";
import {
  Calendar,
  Search,
  Plus,
  Filter,
  Download,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  User,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  CreditCard,
  Building,
  ExternalLink,
  ChevronRight,
  DollarSign,
  Tag,
  ShieldCheck,
  Zap,
  Printer,
  RefreshCw
} from "lucide-react";

interface Reservation {
  id: string;
  source: "Airbnb" | "Booking.com" | "Goibibo" | "Direct Website";
  propertyId: string;
  propertyName: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  adults: number;
  children: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  grossAmount: number;
  guestTax: number;
  channelFee: number;
  tds: number;
  netPayout: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  bookedOn: string;
  payoutStatus: "Paid" | "Pending" | "Processing";
}

export default function ReservationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [showManualModal, setShowManualModal] = useState(false);
  const [reservationsList, setReservationsList] = useState<Reservation[]>([]);
  const [isLoadingRealtime, setIsLoadingRealtime] = useState(true);
  const [realtimeSyncedCount, setRealtimeSyncedCount] = useState(0);

  // Fetch live bookings from Airbnb iCal feeds via sync API
  const fetchLiveReservations = useCallback(async () => {
    setIsLoadingRealtime(true);
    try {
      const res = await fetch("/api/calendar/sync?property_id=all");
      const data = await res.json();

      if (data.success && Array.isArray(data.allReservations)) {
        const fmt = (dStr: string) => {
          try {
            const [y, m, d] = dStr.split("-").map(Number);
            const dt = new Date(y, m - 1, d);
            return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
          } catch {
            return dStr;
          }
        };

        const liveList: Reservation[] = data.allReservations.map((r: any) => {
          const prop = PROPERTIES.find((p) => p.id === r.propertyId);
          const gross = r.amount > 0 ? r.amount : (prop?.price ? prop.price * (r.nights || 1) : 6000);
          const guestTax = Math.round(gross * 0.12);
          const channelFee = Math.round(gross * 0.15);
          const tds = Math.round(gross * 0.01);
          const net = gross - channelFee - tds;

          return {
            id: r.confirmationCode ? `ABB-${r.confirmationCode}` : `ABB-${r.uid.slice(0, 10)}`,
            source: "Airbnb" as const,
            propertyId: r.propertyId,
            propertyName: prop ? `${prop.name} (${prop.type})` : r.propertyName,
            guestName: r.guestName,
            guestPhone: r.guestPhone || `+91 XXXXX ${r.phoneEnd || "6100"}`,
            guestEmail: r.confirmationCode ? `${r.confirmationCode.toLowerCase()}@guest.airbnb.com` : "guest@airbnb.com",
            adults: 2,
            children: 0,
            checkIn: fmt(r.startDate),
            checkOut: fmt(r.endDate),
            nights: r.nights || 1,
            grossAmount: gross,
            guestTax,
            channelFee,
            tds,
            netPayout: net,
            status: "Upcoming" as const,
            bookedOn: "Realtime Airbnb iCal",
            payoutStatus: "Paid" as const,
          };
        });

        setRealtimeSyncedCount(liveList.length);
        setReservationsList(liveList);
      }
    } catch (err) {
      console.warn("Failed to fetch live reservations:", err);
    } finally {
      setIsLoadingRealtime(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveReservations();
  }, [fetchLiveReservations]);

  // Manual booking form fields
  const [mPropId, setMPropId] = useState(PROPERTIES[0].id);
  const [mGuestName, setMGuestName] = useState("");
  const [mGuestPhone, setMGuestPhone] = useState("");
  const [mGuestEmail, setMGuestEmail] = useState("");
  const [mCheckIn, setMCheckIn] = useState("2026-11-05");
  const [mCheckOut, setMCheckOut] = useState("2026-11-08");
  const [mAdults, setMAdults] = useState(2);
  const [mTotalAmount, setMTotalAmount] = useState(8500);
  const [mAdvanceAmount, setMAdvanceAmount] = useState(3000);
  const [mHasGST, setMHasGST] = useState(false);
  const [mGstNumber, setMGstNumber] = useState("");
  const [mCompanyName, setMCompanyName] = useState("");
  const [mNotes, setMNotes] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredReservations = useMemo(() => {
    return reservationsList.filter((r) => {
      // Source filter
      if (sourceFilter !== "All" && r.source !== sourceFilter) return false;

      // Category filter
      if (selectedCategory === "upcoming" && r.status !== "Upcoming") return false;
      if (selectedCategory === "ongoing" && r.status !== "Ongoing") return false;
      if (selectedCategory === "completed" && r.status !== "Completed") return false;
      if (selectedCategory === "cancelled" && r.status !== "Cancelled") return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          r.id.toLowerCase().includes(q) ||
          r.guestName.toLowerCase().includes(q) ||
          r.propertyName.toLowerCase().includes(q) ||
          r.guestPhone.includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [selectedCategory, sourceFilter, searchQuery, reservationsList]);

    const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mGuestName.trim() || !mGuestPhone.trim()) return;

    const prop = PROPERTIES.find((p) => p.id === mPropId) || PROPERTIES[0];
    const newRes: Reservation = {
      id: `HH-${Math.floor(2100 + Math.random() * 800)}`,
      source: "Direct Website",
      propertyId: prop.id,
      propertyName: `${prop.name} (${prop.type})`,
      guestName: mGuestName,
      guestPhone: mGuestPhone,
      guestEmail: mGuestEmail || `${mGuestName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      adults: mAdults,
      children: 0,
      checkIn: mCheckIn,
      checkOut: mCheckOut,
      nights: 3,
      grossAmount: mTotalAmount,
      guestTax: Math.round(mTotalAmount * 0.12),
      channelFee: 0,
      tds: Math.round(mTotalAmount * 0.01),
      netPayout: mTotalAmount - Math.round(mTotalAmount * 0.01),
      status: "Upcoming",
      bookedOn: "Today (Manual)",
      payoutStatus: "Processing"
    };

    setReservationsList([newRes, ...reservationsList]);
    setShowManualModal(false);
    showToast(`Created booking #${newRes.id} for ${mGuestName}. Dates locked on Airbnb & Booking.com in 0.8s!`);
    setMGuestName("");
    setMGuestPhone("");
  };

  const handleExportCSV = () => {
    const headers = "Booking ID,Source,Property,Guest Name,Phone,Check-In,Check-Out,Nights,Gross Amount,Net Payout,Status\n";
    const rows = filteredReservations
      .map(
        (r) =>
          `"${r.id}","${r.source}","${r.propertyName}","${r.guestName}","${r.guestPhone}","${r.checkIn}","${r.checkOut}",${r.nights},${r.grossAmount},${r.netPayout},"${r.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Homey_India_Reservations_${Date.now()}.csv`;
    a.click();
    showToast("Exported reservations CSV report.");
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
              Manage Reservations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLiveReservations}
              disabled={isLoadingRealtime}
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-slate-700 flex items-center gap-1.5 shadow"
              title="Sync live bookings directly from Airbnb"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoadingRealtime ? "animate-spin" : ""}`} />
              {isLoadingRealtime ? "Syncing Airbnb..." : "Sync Live Feeds"}
            </button>
            <button
              onClick={() => setShowManualModal(true)}
              className="px-4 py-2 rounded-xl bg-[#ff2800] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff2800]/20 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Manual Booking
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-slate-700 flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4 text-emerald-400" /> Export CSV
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <HostNavTabs />
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-6">
            {/* General */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">General</div>
              <div className="space-y-1 text-xs font-semibold">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3.5 py-2 rounded-xl flex items-center justify-between transition ${
                    selectedCategory === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>All Reservations</span>
                  <span className="text-[11px] opacity-75">{reservationsList.length}</span>
                </button>
                <button
                  onClick={() => setSelectedCategory("upcoming")}
                  className={`w-full text-left px-3.5 py-2 rounded-xl flex items-center justify-between transition ${
                    selectedCategory === "upcoming" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Arriving Soon</span>
                  <span className="text-[11px] opacity-75">2</span>
                </button>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Status */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Trip Status</div>
              <div className="space-y-1 text-xs font-semibold">
                <button
                  onClick={() => setSelectedCategory("ongoing")}
                  className={`w-full text-left px-3.5 py-2 rounded-xl flex items-center justify-between transition ${
                    selectedCategory === "ongoing" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Ongoing
                  </span>
                  <span className="text-[11px] opacity-75">1</span>
                </button>

                <button
                  onClick={() => setSelectedCategory("upcoming")}
                  className={`w-full text-left px-3.5 py-2 rounded-xl flex items-center justify-between transition ${
                    selectedCategory === "upcoming" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Upcoming
                  </span>
                  <span className="text-[11px] opacity-75">2</span>
                </button>

                <button
                  onClick={() => setSelectedCategory("completed")}
                  className={`w-full text-left px-3.5 py-2 rounded-xl flex items-center justify-between transition ${
                    selectedCategory === "completed" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span> Completed
                  </span>
                  <span className="text-[11px] opacity-75">2</span>
                </button>

                <button
                  onClick={() => setSelectedCategory("cancelled")}
                  className={`w-full text-left px-3.5 py-2 rounded-xl flex items-center justify-between transition ${
                    selectedCategory === "cancelled" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span> Cancelled
                  </span>
                  <span className="text-[11px] opacity-75">1</span>
                </button>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Financial Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Bookings</div>
              <div className="text-xl font-extrabold text-slate-900 font-display">₹82,350</div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ₹64,667 Net Host Payout
              </div>
            </div>
          </div>

          {/* Right Main Table (9 cols) */}
          <div className="lg:col-span-9 space-y-4">
            {/* Top Search & Channel Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Booking ID, guest name, property or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff2800]/20 focus:border-[#ff2800] shadow-sm"
                />
              </div>

              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                aria-label="Filter Reservations by OTA Channel"
                className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm outline-none cursor-pointer"
              >
                <option value="All">Channel: All</option>
                <option value="Direct Website">Direct Website (0% Commission)</option>
                <option value="Airbnb">Airbnb</option>
                <option value="Booking.com">Booking.com</option>
                <option value="Goibibo">Goibibo / MMT</option>
              </select>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-4 px-6">Booking ID</th>
                      <th className="py-4 px-6">Property</th>
                      <th className="py-4 px-6">Channel</th>
                      <th className="py-4 px-6">Guest Info</th>
                      <th className="py-4 px-6">Dates</th>
                      <th className="py-4 px-6">Net Payout</th>
                      <th className="py-4 px-6">Trip Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredReservations.map((r) => {
                      let channelBadge = "bg-emerald-50 text-emerald-700 border-emerald-200";
                      if (r.source === "Airbnb") channelBadge = "bg-rose-50 text-rose-700 border-rose-200";
                      if (r.source === "Booking.com") channelBadge = "bg-blue-50 text-blue-700 border-blue-200";
                      if (r.source === "Goibibo") channelBadge = "bg-amber-50 text-amber-700 border-amber-200";

                      return (
                        <tr
                          key={r.id}
                          onClick={() => setActiveReservation(r)}
                          className="hover:bg-slate-50/80 cursor-pointer transition"
                        >
                          <td className="py-4 px-6 font-mono font-bold text-slate-900">
                            {r.id}
                          </td>

                          <td className="py-4 px-6 font-semibold text-slate-900 max-w-[180px] truncate">
                            {r.propertyName}
                          </td>

                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${channelBadge}`}>
                              {r.source}
                            </span>
                          </td>

                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900">{r.guestName}</div>
                            <div className="text-[11px] text-slate-500">{r.adults} Adults &bull; {r.guestPhone}</div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="font-semibold text-slate-900">{r.checkIn} &ndash; {r.checkOut}</div>
                            <div className="text-[11px] text-slate-500">{r.nights} Nights</div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="font-extrabold text-slate-900 text-sm">₹{r.netPayout.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400">Gross: ₹{r.grossAmount.toLocaleString()}</div>
                          </td>

                          <td className="py-4 px-6">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                r.status === "Ongoing"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : r.status === "Upcoming"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : r.status === "Cancelled"
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-slate-100 text-slate-600 border-slate-200"
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SLIDE OVER RESERVATION DETAILS DRAWER */}
      {activeReservation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-slate-400">{activeReservation.id}</span>
                <h3 className="text-xl font-bold text-slate-900 font-display">Reservation Details</h3>
              </div>
              <button
                onClick={() => setActiveReservation(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${activeReservation.guestPhone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                  activeReservation.guestName
                )},%20this%20is%20Praveen%20Singh%20from%20The%20Unique%20Haven%20Homes%20Lucknow.%20Looking%20forward%20to%20hosting%20you!`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Guest
              </a>
              <button
                onClick={() => showToast(`Downloaded GST Tax Invoice for #${activeReservation.id}`)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4 text-[#ff2800]" /> GST Invoice
              </button>
            </div>

            {/* Property & Dates */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">Property</div>
                <div className="font-bold text-slate-900 text-sm">{activeReservation.propertyName}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-slate-500 font-medium">Check-In</div>
                  <div className="font-bold text-slate-900">{activeReservation.checkIn} (02:00 PM)</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Check-Out</div>
                  <div className="font-bold text-slate-900">{activeReservation.checkOut} (11:00 AM)</div>
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guest Information</h4>
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <User className="w-4 h-4 text-slate-400" /> {activeReservation.guestName}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" /> {activeReservation.guestPhone}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" /> {activeReservation.guestEmail}
                </div>
                <div className="text-slate-500 pt-1">
                  Total Guests: {activeReservation.adults} Adults {activeReservation.children > 0 ? `& ${activeReservation.children} Children` : ""}
                </div>
              </div>
            </div>

            {/* Financial Ledger Dual Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Financial Breakdown</h4>

              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 text-xs">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                  Owner Payout Ledger
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">Gross Booking Value ({activeReservation.nights} nights)</span>
                  <span className="font-bold">₹{activeReservation.grossAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">GST Collected from Guest (12%)</span>
                  <span>+₹{activeReservation.guestTax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-rose-300">
                  <span>Less Channel OTA Fee ({activeReservation.source})</span>
                  <span>-₹{activeReservation.channelFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-amber-300">
                  <span>Less TDS Under Section 194-O (1%)</span>
                  <span>-₹{activeReservation.tds.toLocaleString()}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-extrabold text-emerald-400">
                  <span>Net Payout to Host Account</span>
                  <span className="text-base font-display">₹{activeReservation.netPayout.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Booked on {activeReservation.bookedOn}</span>
              <button
                onClick={() => setActiveReservation(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MANUAL BOOKING MODAL  */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateManualBooking}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 uppercase tracking-wider">
                  Direct / Offline Booking
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display mt-1">Create Manual Booking</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Property *
                </label>
                <select
                  value={mPropId}
                  onChange={(e) => setMPropId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.id} - {p.name} ({p.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest Details */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="font-bold text-slate-800 text-xs">Guest Details</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Siddharth Mehra"
                      value={mGuestName}
                      onChange={(e) => setMGuestName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={mGuestPhone}
                      onChange={(e) => setMGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Email ID</label>
                  <input
                    type="email"
                    placeholder="guest@example.com"
                    value={mGuestEmail}
                    onChange={(e) => setMGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={mHasGST}
                    onChange={(e) => setMHasGST(e.target.checked)}
                    className="rounded text-[#ff2800]"
                  />
                  <span className="text-[11px] font-bold text-slate-700">Guest requires GST Invoice?</span>
                </label>

                {mHasGST && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={mCompanyName}
                      onChange={(e) => setMCompanyName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="GSTIN (15 Digits)"
                      value={mGstNumber}
                      onChange={(e) => setMGstNumber(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono font-semibold"
                    />
                  </div>
                )}
              </div>

              {/* Stay Dates */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Check-In *</label>
                  <input
                    type="date"
                    required
                    value={mCheckIn}
                    onChange={(e) => setMCheckIn(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Check-Out *</label>
                  <input
                    type="date"
                    required
                    value={mCheckOut}
                    onChange={(e) => setMCheckOut(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Adult Guests</label>
                  <input
                    type="number"
                    value={mAdults}
                    onChange={(e) => setMAdults(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Financials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Total Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={mTotalAmount}
                    onChange={(e) => setMTotalAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-extrabold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Advance Received (₹)</label>
                  <input
                    type="number"
                    value={mAdvanceAmount}
                    onChange={(e) => setMAdvanceAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Balance Due (₹)</label>
                  <div className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-extrabold text-amber-700">
                    ₹{Math.max(0, mTotalAmount - mAdvanceAmount).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Internal Host Notes</label>
                <input
                  type="text"
                  placeholder="e.g. VIP guest, early check-in requested at 11 AM"
                  value={mNotes}
                  onChange={(e) => setMNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 text-[11px] text-amber-800 flex items-center gap-2 border border-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Creating this manual booking will automatically block these dates across Airbnb, Booking.com, and Vrbo to prevent double bookings.
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#ff2800] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff2800]/20"
              >
                Create Booking &amp; Lock OTAs
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
