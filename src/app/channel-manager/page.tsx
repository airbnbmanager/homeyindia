"use client";

import HostNavTabs from "@/components/HostNavTabs";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PROPERTIES } from "@/data/properties";
import {
  Globe,
  RefreshCw,
  CheckCircle2,
  Sliders,
  DollarSign,
  ShieldCheck,
  Zap,
  Lock,
  Unlock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Percent,
  Layers,
  Settings2,
  Calendar,
  Check,
  Clock
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  code: string;
  logoColor: string;
  status: "Connected" | "Syncing" | "Paused";
  lastSync: string;
  commission: number; // OTA commission %
  multiplier: number; // host markup %
  instantBook: boolean;
  minStay: number;
}

export default function ChannelManagerPage() {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: "airbnb",
      name: "Airbnb",
      code: "ABB",
      logoColor: "bg-[#ff385c] text-white",
      status: "Connected",
      lastSync: "0.8s ago",
      commission: 15,
      multiplier: 14,
      instantBook: true,
      minStay: 2
    },
    {
      id: "booking",
      name: "Booking.com",
      code: "BKG",
      logoColor: "bg-[#003580] text-white",
      status: "Connected",
      lastSync: "1.2s ago",
      commission: 18,
      multiplier: 18,
      instantBook: true,
      minStay: 1
    },
    {
      id: "makemytrip",
      name: "MakeMyTrip / Goibibo",
      code: "MMT",
      logoColor: "bg-[#e41d36] text-white",
      status: "Connected",
      lastSync: "2.1s ago",
      commission: 15,
      multiplier: 15,
      instantBook: true,
      minStay: 1
    },
    {
      id: "agoda",
      name: "Agoda",
      code: "AGD",
      logoColor: "bg-[#5856d6] text-white",
      status: "Connected",
      lastSync: "3.4s ago",
      commission: 15,
      multiplier: 15,
      instantBook: true,
      minStay: 1
    },
    {
      id: "vrbo",
      name: "Vrbo / Expedia",
      code: "VRB",
      logoColor: "bg-[#1c3c6b] text-white",
      status: "Connected",
      lastSync: "4.0s ago",
      commission: 16,
      multiplier: 16,
      instantBook: true,
      minStay: 2
    },
    {
      id: "direct",
      name: "Homey India Direct Portal",
      code: "HMY",
      logoColor: "bg-emerald-600 text-white",
      status: "Connected",
      lastSync: "Real-time",
      commission: 0,
      multiplier: 0,
      instantBook: true,
      minStay: 1
    }
  ]);

  const [baseRate, setBaseRate] = useState(3000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSimulatingLock, setIsSimulatingLock] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMultiplierChange = (id: string, newMul: number) => {
    setChannels(
      channels.map((c) => (c.id === id ? { ...c, multiplier: newMul } : c))
    );
  };

  const triggerDoubleBookingTest = () => {
    setIsSimulatingLock(true);
    setSimulationLog(["[0.0s] Incoming booking on Airbnb for 15-18 Nov..."]);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        "[0.3s] Homey 2-way cloud lock acquired. Broadcasting instant block..."
      ]);
    }, 300);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        "[0.6s] Booking.com: 15-18 Nov dates BLOCKED (Status: 200 OK)",
        "[0.7s] MakeMyTrip / Agoda: 15-18 Nov dates BLOCKED (Status: 200 OK)",
        "[0.8s] Homey Direct website: 15-18 Nov dates BLOCKED."
      ]);
    }, 600);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        "SUCCESS: 100% Double-Booking Collision Prevented in 0.8 seconds!"
      ]);
      setIsSimulatingLock(false);
      showToast("Double-booking collision test passed! All 50+ channels locked in 0.8s.");
    }, 1000);
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
              Channel Manager &amp; Multi-OTA Sync
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast("Force syncing all 50+ channels in 0.8s...")}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-slate-700 flex items-center gap-1.5 shadow"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" /> Force Global Sync
            </button>
            <button
              onClick={triggerDoubleBookingTest}
              className="px-4 py-2 rounded-xl bg-[#ff3823] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff3823]/20 flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4" /> Test Collision Lock
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <HostNavTabs />
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        
        {simulationLog.length > 0 && (
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-xl space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm">2-Way Double Booking Lock Simulation</span>
              </div>
              <button
                onClick={() => setSimulationLog([])}
                className="text-xs text-slate-400 hover:text-white"
              >
                Dismiss Log
              </button>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-2xl font-mono text-xs space-y-1 text-slate-300 border border-slate-800">
              {simulationLog.map((log, idx) => (
                <div key={idx} className={log.includes("SUCCESS") ? "text-emerald-400 font-bold" : ""}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Channels Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Connected OTAs &amp; Sync Status</h2>
              <p className="text-xs text-slate-500 mt-0.5">2-way direct API links with 0.8-second update propagation.</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 6/6 Channels Synced
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {channels.map((c) => (
              <div key={c.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-xs shadow-sm ${c.logoColor}`}>
                      {c.code}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">Last sync: {c.lastSync}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {c.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Commission</span>
                    <span className="font-bold text-slate-800">{c.commission}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Markup Multiplier</span>
                    <span className="font-bold text-[#ff3823]">+{c.multiplier}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Min Stay: <strong>{c.minStay} Night{c.minStay > 1 ? "s" : ""}</strong></span>
                  <button
                    onClick={() => showToast(`Channel rules for ${c.name} updated.`)}
                    className="font-bold text-slate-700 hover:text-[#ff3823] transition flex items-center gap-1"
                  >
                    Edit Rules <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#ff3823]/10 text-[#ff3823] font-bold text-xs uppercase tracking-wider">
                Dynamic OTA Markup Engine
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-display mt-2">
                OTA Markup Multiplier Calculator
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pass OTA host commission fees to third-party bookings while keeping your direct website the lowest price online.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600">Base Direct Price:</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  value={baseRate}
                  onChange={(e) => setBaseRate(parseInt(e.target.value) || 0)}
                  className="pl-6 pr-3 py-1.5 rounded-xl border border-slate-300 font-extrabold text-sm text-slate-900 w-28 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Rate Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {channels.filter((c) => c.id !== "direct").map((c) => {
              const displayRate = Math.round(baseRate * (1 + c.multiplier / 100));
              const guestSavings = displayRate - baseRate;

              return (
                <div key={c.id} className="p-4 rounded-2xl border border-slate-200 space-y-3 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                    <span className="text-xs font-bold text-[#ff3823] bg-[#fff1ef] px-2 py-0.5 rounded-md">
                      +{c.multiplier}%
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Markup Percentage</label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={c.multiplier}
                      onChange={(e) => handleMultiplierChange(c.id, parseInt(e.target.value))}
                      className="w-full accent-[#ff3823] cursor-pointer"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Displayed on {c.name}:</span>
                      <strong className="text-slate-900">₹{displayRate.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Direct Guest Saves:</span>
                      <span>₹{guestSavings.toLocaleString()} / night</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Rates auto-sync across all 50+ connected channels within 0.8 seconds of saving.
            </span>
            <button
              onClick={() => showToast("Applied rate multipliers across all 50+ channels successfully!")}
              className="px-6 py-2.5 rounded-xl bg-[#ff3823] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff3823]/20"
            >
              Save &amp; Propagate Rates
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
