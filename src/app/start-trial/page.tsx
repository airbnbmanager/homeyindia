"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Building, User, Mail, Phone, Lock, Calendar } from "lucide-react";

export default function StartTrialPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyCount: "2-5",
    primaryLocation: "Goa",
    currentChannels: ["airbnb", "booking"],
  });

  const handleChannelToggle = (ch: string) => {
    setFormData((prev) => ({
      ...prev,
      currentChannels: prev.currentChannels.includes(ch)
        ? prev.currentChannels.filter((c) => c !== ch)
        : [...prev.currentChannels, ch],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/60">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3.5 py-1.5 rounded-full border border-[#ffe2de]">
              30-Day Zero Risk Trial
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mt-3">
              Start your 30-day free trial
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              No credit card required. Connect your listings and eliminate double bookings in 5 minutes.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl p-8 sm:p-10">
            {!submitted ? (
              <div>
                {/* Step Indicators */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 text-xs font-semibold">
                  <span className={step >= 1 ? "text-[#ff3823]" : "text-gray-400"}>1. Host Profile</span>
                  <span className="text-gray-300">→</span>
                  <span className={step >= 2 ? "text-[#ff3823]" : "text-gray-400"}>2. Property Portfolio</span>
                  <span className="text-gray-300">→</span>
                  <span className={step >= 3 ? "text-[#ff3823]" : "text-gray-400"}>3. Channels</span>
                </div>

                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="e.g. Rajesh Khurana"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Work / Personal Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          placeholder="rajesh@yourdomain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none text-sm"
                        />
                      </div>
                      <span className="text-[11px] text-gray-400 mt-1 block">We will send your trial activation OTP and login credentials via WhatsApp.</span>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full mt-4 py-3 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      Next: Property Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Number of Listings Managed</label>
                      <select
                        value={formData.propertyCount}
                        onChange={(e) => setFormData({ ...formData, propertyCount: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none text-sm bg-white"
                      >
                        <option value="1">1 Property (Single Homestay)</option>
                        <option value="2-5">2 to 5 Properties</option>
                        <option value="6-15">6 to 15 Properties</option>
                        <option value="16-50">16 to 50 Properties (Estate Manager)</option>
                        <option value="50+">50+ Properties (Enterprise PMS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Primary Destination</label>
                      <input
                        type="text"
                        placeholder="e.g. North Goa, Manali, Lonavala, etc."
                        value={formData.primaryLocation}
                        onChange={(e) => setFormData({ ...formData, primaryLocation: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none text-sm"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setStep(1)}
                        className="w-1/2 py-2.5 rounded-full border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="w-1/2 py-2.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-semibold text-xs shadow-md"
                      >
                        Next: Connect Channels
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Select Channels You Currently Use</label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { id: "airbnb", name: "Airbnb" },
                          { id: "booking", name: "Booking.com" },
                          { id: "mmt", name: "MakeMyTrip" },
                          { id: "agoda", name: "Agoda" },
                          { id: "vrbo", name: "Vrbo" },
                          { id: "direct", name: "Direct / WhatsApp Only" },
                        ].map((ch) => (
                          <div
                            key={ch.id}
                            onClick={() => handleChannelToggle(ch.id)}
                            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                              formData.currentChannels.includes(ch.id)
                                ? "bg-[#fff1ef] border-[#ff3823] text-[#ff3823] font-bold"
                                : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <span>{ch.name}</span>
                            {formData.currentChannels.includes(ch.id) && <CheckCircle2 className="w-4 h-4 text-[#ff3823]" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setStep(2)}
                        className="w-1/3 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setSubmitted(true)}
                        className="w-2/3 py-3 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-sm shadow-lg shadow-[#ff3823]/30 transition-all flex items-center justify-center gap-2"
                      >
                        Launch My 30-Day Free Trial <Sparkles className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900">Your Trial Account is Ready!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Welcome to Homey India. We have sent your temporary access link and setup credentials to{" "}
                  <strong>{formData.phone || formData.email}</strong>.
                </p>
                <div className="pt-4">
                  <Link
                    href="/unified-calendar"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#ff3823] text-white font-bold text-sm shadow-md hover:bg-[#e5220d] transition-all"
                  >
                    Open Homey India Live Calendar <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
