"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { PROPERTIES, Property } from "@/data/properties";
import {
  Building,
  Search,
  Filter,
  Plus,
  Layers,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Copy,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Settings,
  MoreVertical,
  Check,
  AlertCircle,
  FolderTree
} from "lucide-react";

interface Cluster {
  id: string;
  name: string;
  parentId: string;
  childIds: string[];
  entirePlaceMode?: boolean;
}

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "cluster">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "activated" | "draft" | "pending">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Clusters state
  const [clusters, setClusters] = useState<Cluster[]>([
    {
      id: "CLS-101",
      name: "The Grand Haven Villa & Independent Floors",
      parentId: "LUL-101",
      childIds: ["LUL-102", "LUL-103", "LUL-104"],
      entirePlaceMode: false
    },
    {
      id: "CLS-102",
      name: "Shaheed Path Executive Suites Cluster",
      parentId: "LUL-105",
      childIds: ["LUL-106", "LUL-107"],
      entirePlaceMode: false
    }
  ]);

  const [showClusterModal, setShowClusterModal] = useState(false);
  const [newClusterName, setNewClusterName] = useState("");
  const [selectedParent, setSelectedParent] = useState(PROPERTIES[0].id);
  const [selectedChildren, setSelectedChildren] = useState<string[]>([PROPERTIES[1].id, PROPERTIES[2].id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.zone.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

    const toggleEntirePlaceMode = (clusterId: string) => {
    setClusters(
      clusters.map((c) => {
        if (c.id === clusterId) {
          const nextVal = !c.entirePlaceMode;
          showToast(
            nextVal
              ? `Entire Place Mode ACTIVATED for "${c.name}". Paused all child listings on Airbnb & Booking.com to sell the entire property!`
              : `Entire Place Mode DEACTIVATED. Resumed individual child room bookings.`
          );
          return { ...c, entirePlaceMode: nextVal };
        }
        return c;
      })
    );
  };

  const handleCreateCluster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClusterName.trim()) return;
    const newCluster: Cluster = {
      id: `CLS-${Math.floor(100 + Math.random() * 900)}`,
      name: newClusterName,
      parentId: selectedParent,
      childIds: selectedChildren
    };
    setClusters([...clusters, newCluster]);
    setShowClusterModal(false);
    setNewClusterName("");
    showToast(`Created cluster "${newClusterName}". Parent & Child listings are now synced with instant 2-way lock!`);
  };

  const handleCloneProperty = (prop: Property) => {
    showToast(`Cloned "${prop.name}". New draft listing created with identical photos, rules & amenities.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      {/* Host Header */}
      <div className="bg-[#0f172a] text-white pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Host Control Centre &bull; Homey India
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display flex items-center gap-3">
              Properties Manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-bold border border-slate-700 transition"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/properties/clone-airbnb"
              className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition flex items-center gap-1.5 border border-slate-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Clone Airbnb Listing
            </Link>
            <Link
              href="/properties/create"
              className="px-4 py-2 rounded-xl bg-[#ff3823] text-white text-xs font-bold hover:bg-[#e5220d] transition flex items-center gap-1.5 shadow-lg shadow-[#ff3823]/20"
            >
              <Plus className="w-4 h-4" /> Create New Listing
            </Link>
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
          <Link href="/properties" className="px-4 py-2 rounded-xl bg-[#ff3823] text-white font-bold shadow-lg shadow-[#ff3823]/20">
            Properties ({PROPERTIES.length})
          </Link>
          <Link href="/channel-manager" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Channel Manager
          </Link>
          <Link href="/account" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Account &amp; KYC
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Top Controls: Tabs & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Dual Tabs */}
          <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm inline-flex">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                activeTab === "all" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building className="w-3.5 h-3.5" /> All Properties ({PROPERTIES.length})
            </button>
            <button
              onClick={() => setActiveTab("cluster")}
              className={`px-5 py-2 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                activeTab === "cluster" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FolderTree className="w-3.5 h-3.5 text-[#ff3823]" /> Magic Cluster ({clusters.length})
            </button>
          </div>

          {activeTab === "all" ? (
            /* Search & Status Filters */
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, ID, zone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff3823]/20 focus:border-[#ff3823] w-64 shadow-sm"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                aria-label="Filter Properties by Status"
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm outline-none cursor-pointer"
              >
                <option value="all">Status: All (18)</option>
                <option value="activated">Status: Activated (18)</option>
                <option value="draft">Status: Draft (0)</option>
                <option value="pending">Status: Pending Approval (0)</option>
              </select>
            </div>
          ) : (
            <button
              onClick={() => setShowClusterModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4 text-[#ff3823]" /> New Cluster
            </button>
          )}
        </div>

        {/* TAB 1: ALL PROPERTIES TABLE */}
        {activeTab === "all" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Property ID</th>
                    <th className="py-4 px-6">Listing Title &amp; Zone</th>
                    <th className="py-4 px-6">Type &amp; Space</th>
                    <th className="py-4 px-6">Channels Synced</th>
                    <th className="py-4 px-6">Nightly Rate</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900">
                        #{prop.id}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            <Image
                              src={prop.image}
                              alt={prop.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/properties/${prop.id}`}
                              className="font-bold text-slate-900 text-sm hover:text-[#ff3823] transition flex items-center gap-1"
                            >
                              {prop.name}
                            </Link>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {prop.location} &bull; {prop.zone}, Lucknow
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{prop.type}</div>
                        <div className="text-[11px] text-slate-500">
                          {prop.bedrooms} Bed &bull; {prop.bathrooms} Bath &bull; Up to {prop.maxGuests} Guests
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="font-semibold text-slate-700">Airbnb, Booking, Direct</span>
                        </div>
                        <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                          2-Way Instant Sync Active
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-extrabold text-slate-900 text-sm">
                          ₹{prop.price.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          OTA Rate: ₹{prop.airbnbPrice.toLocaleString()}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Activated
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/properties/${prop.id}`}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                          >
                            Update Listing
                          </Link>
                          <button
                            onClick={() => handleCloneProperty(prop)}
                            title="Clone Listing"
                            className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MAGIC CLUSTER */}
        {activeTab === "cluster" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="max-w-2xl">
                <span className="px-3 py-1 rounded-full bg-[#ff3823]/20 text-[#ff3823] font-bold text-xs border border-[#ff3823]/30 uppercase tracking-wider">
                  Homey Magic Cluster Technology
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display mt-2">
                  Automatically sync Parent &amp; Child listings with zero double bookings
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Sell your entire villa (Parent) while simultaneously renting individual rooms/floors (Children).
                  When any room gets booked, the entire villa is auto-blocked. When the entire villa is booked, all individual rooms are auto-blocked across Airbnb, Booking.com &amp; Direct website.
                </p>
              </div>

              <button
                onClick={() => setShowClusterModal(true)}
                className="px-5 py-3 rounded-2xl bg-[#ff3823] text-white font-bold text-xs hover:bg-[#e5220d] transition shrink-0 shadow-lg shadow-[#ff3823]/25 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create New Cluster
              </button>
            </div>

            {/* Clusters List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clusters.map((cluster) => {
                const parentProp = PROPERTIES.find((p) => p.id === cluster.parentId);
                const childProps = PROPERTIES.filter((p) => cluster.childIds.includes(p.id));

                return (
                  <div key={cluster.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-400">#{cluster.id}</span>
                        <h4 className="font-bold text-slate-900 text-base">{cluster.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleEntirePlaceMode(cluster.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 border ${
                            cluster.entirePlaceMode
                              ? "bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/30"
                              : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                          }`}
                        >
                          <Zap className={`w-3.5 h-3.5 ${cluster.entirePlaceMode ? "text-amber-600" : "text-slate-400"}`} />
                          Entire Place Mode: {cluster.entirePlaceMode ? "ON (Child Paused)" : "OFF"}
                        </button>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Parent Property */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-extrabold text-[10px] uppercase tracking-wider">
                          PARENT LISTING
                        </span>
                        <span className="text-xs font-bold text-slate-700">₹{parentProp?.price.toLocaleString()}/night</span>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">{parentProp?.name}</div>
                      <div className="text-[11px] text-slate-500">{parentProp?.type} &bull; {parentProp?.location}</div>
                    </div>

                    {/* Child Properties */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Linked Child Listings ({childProps.length})
                      </div>

                      {childProps.map((child) => (
                        <div key={child.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                              {child.name}
                            </div>
                            <div className="text-[10px] text-slate-500">{child.type}</div>
                          </div>
                          <span className="text-xs font-bold text-slate-900">₹{child.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Instant 2-way auto-lock active
                      </span>
                      <button
                        onClick={() => showToast(`Cluster "${cluster.name}" settings updated.`)}
                        className="text-slate-700 hover:text-[#ff3823] font-bold"
                      >
                        Edit Cluster
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* CREATE CLUSTER MODAL */}
      {showClusterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCluster} className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-900 font-display">Create Magic Cluster</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Connect a Parent property (e.g. Full Villa) with Child properties (individual rooms).
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cluster Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Raj Mahal Villa & Royal Suites"
                  value={newClusterName}
                  onChange={(e) => setNewClusterName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff3823]/20 focus:border-[#ff3823]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Parent Property (Entire Space)
                </label>
                <select
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      [Parent] {p.name} ({p.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Child Properties (Rooms / Floors)
                </label>
                <div className="max-h-40 overflow-y-auto space-y-1.5 border border-slate-200 p-2 rounded-xl">
                  {PROPERTIES.filter((p) => p.id !== selectedParent).map((p) => {
                    const isChecked = selectedChildren.includes(p.id);
                    return (
                      <label key={p.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-800">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedChildren([...selectedChildren, p.id]);
                            else setSelectedChildren(selectedChildren.filter((id) => id !== p.id));
                          }}
                          className="rounded text-[#ff3823] focus:ring-[#ff3823]"
                        />
                        <span>{p.name} ({p.type})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowClusterModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#ff3823] text-white font-bold text-sm hover:bg-[#e5220d] transition shadow-lg shadow-[#ff3823]/20"
              >
                Save &amp; Activate Cluster
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
