"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PROPERTIES } from "@/data/properties";
import {
  Calendar,
  Search,
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
  Printer
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

const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "HH-2066",
    source: "Direct Website",
    propertyId: "LUL-101",
    propertyName: "The Luxe Haven (1BHK Flat)",
    guestName: "Aditya Verma",
    guestPhone: "+91 98201 44512",
    guestEmail: "aditya.v@gmail.com",
    adults: 2,
    children: 1,
    checkIn: "28 Oct 2026",
    checkOut: "31 Oct 2026",
    nights: 3,
    grossAmount: 7950,
    guestTax: 954,
    channelFee: 0,
    tds: 80,
    netPayout: 7870,
    status: "Upcoming",
    bookedOn: "24 Oct 2026",
    payoutStatus: "Pending"
  },
  {
    id: "ABB-HMXKJB3XKN",
    source: "Airbnb",
    propertyId: "GOM-201",
    propertyName: "The Dark Blue Haven (2BHK Flat)",
    guestName: "Kavita Singhal",
    guestPhone: "+91 94150 88231",
    guestEmail: "kavita.singhal@yahoo.com",
    adults: 4,
    children: 0,
    checkIn: "26 Oct 2026",
    checkOut: "29 Oct 2026",
    nights: 3,
    grossAmount: 11850,
    guestTax: 1422,
    channelFee: 1777,
    tds: 118,
    netPayout: 9955,
    status: "Ongoing",
    bookedOn: "20 Oct 2026",
    payoutStatus: "Processing"
  },
  {
    id: "GMT-0152911396",
    source: "Goibibo",
    propertyId: "LUL-102",
    propertyName: "The Elegant Haven (1BHK Flat)",
    guestName: "Rohan Kapoor",
    guestPhone: "+91 97112 39011",
    guestEmail: "rohan.kapoor@outlook.com",
    adults: 2,
    children: 0,
    checkIn: "24 Oct 2026",
    checkOut: "26 Oct 2026",
    nights: 2,
    grossAmount: 5300,
    guestTax: 636,
    channelFee: 795,
    tds: 53,
    netPayout: 4452,
    status: "Completed",
    bookedOn: "15 Oct 2026",
    payoutStatus: "Paid"
  },
  {
    id: "BKG-99238411",
    source: "Booking.com",
    propertyId: "SHA-301",
    propertyName: "The Grand Haven Villa",
    guestName: "Dr. Anirudh Sharma",
    guestPhone: "+91 98390 12345",
    guestEmail: "anirudh.sharma@medanta.org",
    adults: 8,
    children: 2,
    checkIn: "02 Nov 2026",
    checkOut: "07 Nov 2026",
    nights: 5,
    grossAmount: 42500,
    guestTax: 5100,
    channelFee: 6375,
    tds: 425,
    netPayout: 35700,
    status: "Upcoming",
    bookedOn: "22 Oct 2026",
    payoutStatus: "Pending"
  },
  {
    id: "ABB-HM88WADEKM",
    source: "Airbnb",
    propertyId: "LUL-103",
    propertyName: "The Modern Haven (1BHK Flat)",
    guestName: "Meenakshi Das",
    guestPhone: "+91 98114 99012",
    guestEmail: "meenakshi.das@gmail.com",
    adults: 2,
    children: 0,
    checkIn: "18 Oct 2026",
    checkOut: "21 Oct 2026",
    nights: 3,
    grossAmount: 7950,
    guestTax: 954,
    channelFee: 1192,
    tds: 80,
    netPayout: 6678,
    status: "Completed",
    bookedOn: "10 Oct 2026",
    payoutStatus: "Paid"
  },
  {
    id: "ABB-HMZXZBCJRB",
    source: "Airbnb",
    propertyId: "GOM-202",
    propertyName: "The Vintage Haven (2BHK Flat)",
    guestName: "Sameer Nanda",
    guestPhone: "+91 99100 23145",
    guestEmail: "sameer.n@nanda.in",
    adults: 3,
    children: 1,
    checkIn: "12 Oct 2026",
    checkOut: "14 Oct 2026",
    nights: 2,
    grossAmount: 6800,
    guestTax: 816,
    channelFee: 1020,
    tds: 68,
    netPayout: 5712,
    status: "Cancelled",
    bookedOn: "05 Oct 2026",
    payoutStatus: "Paid"
  }
];

export default function ReservationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredReservations = useMemo(() => {
    return MOCK_RESERVATIONS.filter((r) => {
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
  }, [selectedCategory, sourceFilter, searchQuery]);

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
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-slate-700 flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4 text-emerald-400" /> Export CSV Report
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center gap-2 border-t border-slate-800/80 pt-4 overflow-x-auto text-sm font-medium">
          <Link href="/dashboard" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Dashboard
          </Link>
          <Link href="/calendar" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Calendar &amp; Pricing
          </Link>
          <Link href="/properties" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Properties ({PROPERTIES.length})
          </Link>
          <Link href="/reservations" className="px-4 py-2 rounded-xl bg-[#ff3823] text-white font-bold shadow-lg shadow-[#ff3823]/20">
            Reservations ({MOCK_RESERVATIONS.length})
          </Link>
          <Link href="/channel-manager" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Channel Manager
          </Link>
          <Link href="/account" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Account &amp; KYC
          </Link>
        </div>
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
                  <span className="text-[11px] opacity-75">{MOCK_RESERVATIONS.length}</span>
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
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff3823]/20 focus:border-[#ff3823] shadow-sm"
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
                <Printer className="w-4 h-4 text-[#ff3823]" /> GST Invoice
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

      <Footer />
    </div>
  );
}
