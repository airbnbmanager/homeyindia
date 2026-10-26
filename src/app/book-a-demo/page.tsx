"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, PhoneCall, CheckCircle2, Clock, Sparkles } from "lucide-react";

export default function BookDemoPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("Tomorrow at 3:00 PM IST");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/60">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3823] bg-[#fff1ef] px-3.5 py-1.5 rounded-full border border-[#ffe2de]">
              1-on-1 Consultation
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mt-3">
              Schedule a Guided Demo with our PMS Specialist
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Get a personalized walkthrough of two-way OTA sync, Magic Cluster™ inventory grouping, and direct booking website setup.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl p-8 sm:p-12">
            {!confirmed ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Select a Preferred Time Slot</h3>
                  <div className="space-y-2 text-xs">
                    {[
                      "Today at 5:00 PM IST",
                      "Tomorrow at 11:30 AM IST",
                      "Tomorrow at 3:00 PM IST",
                      "Thursday at 2:00 PM IST",
                      "Friday at 4:30 PM IST",
                    ].map((slot) => (
                      <div
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                          selectedSlot === slot
                            ? "bg-[#fff1ef] border-[#ff3823] text-[#ff3823] font-bold"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" /> {slot}
                        </span>
                        {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-[#ff3823]" />}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="text-xs text-gray-500">Call format: 20-min Google Meet or phone call</span>
                  </div>
                </div>

                <div className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100 text-xs">
                  <h4 className="font-bold text-gray-900 text-sm">Your Host Details</h4>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Your Name</label>
                    <input type="text" placeholder="e.g. Siddharth Verma" className="w-full p-2.5 rounded-xl border border-gray-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">WhatsApp / Phone</label>
                    <input type="tel" placeholder="+91 98765 XXXXX" className="w-full p-2.5 rounded-xl border border-gray-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Property Portfolio Size</label>
                    <select className="w-full p-2.5 rounded-xl border border-gray-200 bg-white">
                      <option>1-3 Properties</option>
                      <option>4-10 Properties</option>
                      <option>10+ Properties</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setConfirmed(true)}
                    className="w-full mt-3 py-3 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-xs shadow-md transition-all"
                  >
                    Confirm My Demo for {selectedSlot}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900">Demo Scheduled Successfully!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Our hospitality specialist has reserved <strong>{selectedSlot}</strong> for your demo. We have sent the Google Meet link and calendar invitation to your WhatsApp and email.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
