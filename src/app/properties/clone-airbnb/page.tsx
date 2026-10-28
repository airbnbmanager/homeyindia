"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Link2,
  Sparkles,
  Download,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  Building,
  Image as ImageIcon,
  Zap,
  Bed,
  Bath,
  Users
} from "lucide-react";

export default function CloneAirbnbPage() {
  const router = useRouter();
  const [airbnbUrl, setAirbnbUrl] = useState("https://www.airbnb.com/rooms/8923412");
  const [isImporting, setIsImporting] = useState(false);
  const [importStep, setImportStep] = useState(0);
  const [clonedData, setClonedData] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStartImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!airbnbUrl.trim()) return;

    setIsImporting(true);
    setImportStep(1);

    setTimeout(() => setImportStep(2), 600);
    setTimeout(() => setImportStep(3), 1200);
    setTimeout(() => setImportStep(4), 1800);
    setTimeout(() => {
      setIsImporting(false);
      setClonedData({
        title: "The Regal Gomti Penthouse with Private Terrace & Panoramic Skyline Views",
        tagline: "Ultra-luxury 3BHK flat in Gomti Nagar, Lucknow",
        price: 4500,
        airbnbPrice: 5130,
        guests: 8,
        bedrooms: 3,
        beds: 3,
        bathrooms: 3,
        rating: 4.96,
        reviewsCount: 38,
        location: "Vibhuti Khand, Gomti Nagar, Lucknow",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        photosCount: 24,
        amenities: ["Private Terrace", "High-Speed 300 Mbps Wi-Fi", "Fully Equipped Modular Kitchen", "Free Underground Parking", "Smart TV with Netflix", "100% Power Backup"]
      });
      showToast("Successfully cloned Airbnb listing! Ready for 1-click publishing.");
    }, 2400);
  };

  const handleConfirmPublish = () => {
    showToast("Publishing cloned listing to Homey India direct booking website...");
    setTimeout(() => {
      router.push("/properties");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#0f172a] text-white pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/properties" className="text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1 mb-2">
              <ChevronLeft className="w-4 h-4" /> Back to Properties
            </Link>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Smart 1-Click Importer &bull; Homey India
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display flex items-center gap-3">
              Clone Airbnb Listing in 30 Seconds
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Input Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#ff2800]/10 text-[#ff2800] font-bold text-xs uppercase tracking-wider">
              1-Click Smart Importer
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-2">
              Import Everything Directly from Your Airbnb Listing
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Paste your public Airbnb listing URL. Homey India extracts all 20+ HD photos, bed &amp; bath counts, amenities checklist, and house rules automatically.
            </p>
          </div>

          <form onSubmit={handleStartImport} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Airbnb Listing URL
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    required
                    placeholder="https://www.airbnb.com/rooms/..."
                    value={airbnbUrl}
                    onChange={(e) => setAirbnbUrl(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff2800]/20 focus:border-[#ff2800]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isImporting}
                  className="px-6 py-3 rounded-xl bg-[#ff2800] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff2800]/20 shrink-0 disabled:opacity-50 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> {isImporting ? "Importing..." : "Clone Listing"}
                </button>
              </div>
            </div>
          </form>

          {/* Stepper Progress Animation */}
          {isImporting && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 animate-in fade-in text-xs font-semibold">
              <div className="flex items-center gap-2">
                {importStep >= 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300 animate-spin"></div>}
                <span className={importStep >= 1 ? "text-slate-900 font-bold" : "text-slate-400"}>Connecting to Airbnb room listing...</span>
              </div>
              <div className="flex items-center gap-2">
                {importStep >= 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
                <span className={importStep >= 2 ? "text-slate-900 font-bold" : "text-slate-400"}>Scraping 24 high-resolution photography assets...</span>
              </div>
              <div className="flex items-center gap-2">
                {importStep >= 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
                <span className={importStep >= 3 ? "text-slate-900 font-bold" : "text-slate-400"}>Extracting bed/bath layout, pricing &amp; house rules...</span>
              </div>
              <div className="flex items-center gap-2">
                {importStep >= 4 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
                <span className={importStep >= 4 ? "text-slate-900 font-bold" : "text-slate-400"}>Configuring 2-way live iCal sync engine...</span>
              </div>
            </div>
          )}
        </div>

        {/* Cloned Listing Preview */}
        {clonedData && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-wider border border-emerald-200">
                  Ready to Publish
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
                  {clonedData.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{clonedData.location}</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold text-slate-900 font-display">
                  ₹{clonedData.price.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">
                  Airbnb Price: ₹{clonedData.airbnbPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Photo & Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src={clonedData.image}
                  alt={clonedData.title}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {clonedData.photosCount} Photos Imported
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Guests</span>
                    <span className="font-extrabold text-slate-900 text-base">{clonedData.guests}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Bedrooms</span>
                    <span className="font-extrabold text-slate-900 text-base">{clonedData.bedrooms}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Baths</span>
                    <span className="font-extrabold text-slate-900 text-base">{clonedData.bathrooms}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Imported Amenities</div>
                  <div className="flex flex-wrap gap-1.5">
                    {clonedData.amenities.map((am: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Publishing will activate this listing on your Homey India website with 0% guest booking fee.
              </span>
              <button
                onClick={handleConfirmPublish}
                className="px-6 py-2.5 rounded-xl bg-[#ff2800] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff2800]/20 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Publish Listing Now
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
