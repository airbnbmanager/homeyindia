"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  User, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, 
  FileText, Upload, Lock, Phone, Mail, MapPin, Globe, 
  Check, Trash2, Smartphone, Key, Award, AlertTriangle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function AccountSettingsPage() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"personal" | "verification">("personal");
  const [verificationSubTab, setVerificationSubTab] = useState<"aadhaar" | "foreign">("aadhaar");

  // Personal Info Form State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Praveen",
    lastName: "Singh",
    preferredName: "Praveen",
    email: "praveen@theuniquehaven.com",
    phone: "+91 94544 70872",
    dob: "1992-06-15",
    address1: "Vikalp Khand, Gomti Nagar",
    address2: "Near Shaheed Path",
    country: "India",
    state: "Uttar Pradesh",
    city: "Lucknow",
    pincode: "226010",
    profession: "Superhost & Hospitality Director",
    hobbies: "Interior Design, Architecture, Travel",
    petName: "Max",
    languages: "Hindi, English, Awadhi",
    school: "University of Lucknow",
    about: "Dedicated superhost managing 18 luxury properties with The Unique Haven Homes Private Limited in Gomti Nagar & Shaheed Path, Lucknow.",
  });

  const [isSaved, setIsSaved] = useState(false);

  // Verification States 
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarOtp, setAadhaarOtp] = useState("");
  const [aadhaarStep, setAadhaarStep] = useState<"input" | "otp" | "verified">("input");
  const [aadhaarTimer, setAadhaarTimer] = useState(120);
  const [passportUploaded, setPassportUploaded] = useState(false);
  const [passportFileName, setPassportFileName] = useState("");
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [foreignSubmitted, setForeignSubmitted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("homey_user_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPersonalInfo((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }

    const savedVerif = localStorage.getItem("homey_aadhaar_verified");
    if (savedVerif === "true") {
      setAadhaarStep("verified");
    }
  }, []);

  // Aadhaar OTP countdown
  useEffect(() => {
    let interval: any;
    if (aadhaarStep === "otp" && aadhaarTimer > 0) {
      interval = setInterval(() => setAadhaarTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [aadhaarStep, aadhaarTimer]);

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("homey_user_profile", JSON.stringify(personalInfo));
    updateProfile(personalInfo);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaarNumber.replace(/\s/g, "").length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar Number.");
      return;
    }
    setAadhaarStep("otp");
    setAadhaarTimer(120);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaarOtp.length < 4) {
      alert("Please enter the 6-digit OTP sent to your Aadhaar-registered mobile.");
      return;
    }
    setAadhaarStep("verified");
    localStorage.setItem("homey_aadhaar_verified", "true");
  };

  const handleFormatAadhaar = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 12);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setAadhaarNumber(parts.join(" "));
  };

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#ff2800] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display tracking-tight">
                Account Settings
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Manage your host/guest identity, personal details, and government verifications.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs shadow-xs">
                <span className="text-amber-500">👑</span>
                <span className="font-extrabold text-emerald-900">
                  {user?.isPaidMember ? "Enterprise Lifetime (Paid Member)" : "Active Pro Host"}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs shadow-sm">
                <div className={`w-2.5 h-2.5 rounded-full ${aadhaarStep === "verified" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                <span className="font-bold text-gray-800">
                  Status: {aadhaarStep === "verified" ? "Government Verified ✓" : "Verification Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
            
            {/* Left Sidebar Tabs */}
            <div className="md:col-span-4 space-y-2">
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  activeTab === "personal"
                    ? "bg-white border-[#0c1838] shadow-md ring-2 ring-[#0c1838]/10 text-[#0c1838]"
                    : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === "personal" ? "bg-[#0c1838] text-white" : "bg-gray-100 text-gray-600"}`}>
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Personal Info</div>
                    <div className="text-[11px] text-gray-500">Contact, bio & address</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("verification")}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  activeTab === "verification"
                    ? "bg-white border-[#0c1838] shadow-md ring-2 ring-[#0c1838]/10 text-[#0c1838]"
                    : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === "verification" ? "bg-[#ff2800] text-white" : "bg-gray-100 text-gray-600"}`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      <span>Account Verifications</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        aadhaarStep === "verified" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {aadhaarStep === "verified" ? "Verified" : "Pending"}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500">Aadhaar & Passport verification</div>
                  </div>
                </div>
              </button>

              {/* Founder Trust Box */}
              <div className="p-4 rounded-2xl bg-[#fff8eb] border border-amber-200 text-xs text-gray-700 space-y-1.5 mt-6">
                <div className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>The Unique Haven Homes Trust</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Verified hosts enjoy 40% higher direct bookings, automatic priority rank on search, and instant OTA sync.
                </p>
              </div>
            </div>

            {/* Right Tab Content */}
            <div className="md:col-span-8">
              
              {/* TAB 1: PERSONAL INFO  */}
              {activeTab === "personal" && (
                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 font-display">Personal Information</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Details shown to guests on booking confirmations and invoices.</p>
                    </div>
                    {isSaved && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Saved Successfully!
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSavePersonalInfo} className="space-y-5">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">First Name *</label>
                        <input
                          type="text"
                          required
                          value={personalInfo.firstName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={personalInfo.lastName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                          <input
                            type="email"
                            required
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                          <input
                            type="tel"
                            required
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preferred Name & Date of Birth */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Preferred Display Name</label>
                        <input
                          type="text"
                          value={personalInfo.preferredName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, preferredName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={personalInfo.dob}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    {/* Address Line 1 & Line 2 */}
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Address Information</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Address Line 1</label>
                          <input
                            type="text"
                            value={personalInfo.address1}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, address1: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Address Line 2</label>
                          <input
                            type="text"
                            value={personalInfo.address2}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, address2: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
                          <input
                            type="text"
                            value={personalInfo.country}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
                          <input
                            type="text"
                            value={personalInfo.state}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            value={personalInfo.city}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode</label>
                          <input
                            type="text"
                            value={personalInfo.pincode}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, pincode: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bio & Social Details (Frame 7) */}
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Host & Guest Profile Story</span>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Share more about yourself. Viewable exclusively by verified guests on confirmed bookings.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Profession</label>
                          <input
                            type="text"
                            value={personalInfo.profession}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, profession: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Hobbies</label>
                          <input
                            type="text"
                            value={personalInfo.hobbies}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, hobbies: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Languages Known</label>
                          <input
                            type="text"
                            value={personalInfo.languages}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, languages: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Pet Name</label>
                          <input
                            type="text"
                            value={personalInfo.petName}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, petName: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Where did I go to school?</label>
                          <input
                            type="text"
                            value={personalInfo.school}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, school: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">About yourself (Max 500 characters)</label>
                        <textarea
                          rows={3}
                          maxLength={500}
                          value={personalInfo.about}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, about: e.target.value })}
                          className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:border-[#ff2800] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Are you sure you want to deactivate your account?")) {
                            alert("Account deactivation request sent to host desk.");
                          }
                        }}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                      >
                        Deactivate account
                      </button>

                      <button
                        type="submit"
                        className="px-8 py-3 rounded-full bg-[#ff2800] hover:bg-[#e5220d] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                      >
                        Save Personal Info
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: ACCOUNT VERIFICATIONS (Frames 8 to 16) */}
              {activeTab === "verification" && (
                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-display">Account Verifications</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Government identification verification for trust, safety, and instant PMS channel syncing.
                    </p>
                  </div>

                  {/* Verification Sub-tabs */}
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setVerificationSubTab("aadhaar")}
                      className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all ${
                        verificationSubTab === "aadhaar"
                          ? "border-[#ff2800] text-[#ff2800]"
                          : "border-transparent text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      Aadhaar Verification (Indian Citizens)
                    </button>
                    <button
                      onClick={() => setVerificationSubTab("foreign")}
                      className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all ${
                        verificationSubTab === "foreign"
                          ? "border-[#ff2800] text-[#ff2800]"
                          : "border-transparent text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      Foreign Nationals or NRI Verification
                    </button>
                  </div>

                  {/* 1. AADHAAR VERIFICATION (Frames 8-12) */}
                  {verificationSubTab === "aadhaar" && (
                    <div className="space-y-6 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500">Government Identity Status:</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          aadhaarStep === "verified" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {aadhaarStep === "verified" ? "Verified ✓" : "Pending Verification"}
                        </span>
                      </div>

                      {aadhaarStep === "input" && (
                        <form onSubmit={handleAadhaarSubmit} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                              Enter your 12-digit Aadhaar Number
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="XXXX XXXX XXXX"
                              value={aadhaarNumber}
                              onChange={(e) => handleFormatAadhaar(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-base font-mono font-bold tracking-widest"
                            />
                          </div>

                          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs text-gray-600">
                            <p className="font-semibold text-gray-800">
                              Note: You'll get an OTP on your mobile number registered with Aadhaar (UIDAI).
                            </p>
                            <p className="text-[11px] text-gray-500 leading-relaxed">
                              We prioritize your privacy and security. Your Aadhaar number is used solely for one-time identity verification and is never stored unencrypted.
                            </p>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-full bg-[#ff2800] hover:bg-[#e5220d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Verify Aadhaar via OTP</span>
                          </button>
                        </form>
                      )}

                      {aadhaarStep === "otp" && (
                        <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in duration-200">
                          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-1">
                            <div className="font-bold">UIDAI Aadhaar OTP Sent!</div>
                            <p>Enter the 6-digit verification code sent to your registered mobile ending in <strong>•••• 0872</strong>.</p>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                              Enter 6-Digit OTP Code
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              placeholder="123456"
                              value={aadhaarOtp}
                              onChange={(e) => setAadhaarOtp(e.target.value.replace(/\D/g, ""))}
                              className="w-full text-center py-3 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-2xl font-mono font-black tracking-widest"
                            />
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                              <span>Resend OTP ({aadhaarTimer}s)</span>
                              <button
                                type="button"
                                onClick={() => setAadhaarTimer(120)}
                                disabled={aadhaarTimer > 0}
                                className={`font-semibold ${aadhaarTimer === 0 ? "text-[#ff2800] hover:underline" : "text-gray-400 cursor-not-allowed"}`}
                              >
                                Request New Code
                              </button>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Submit & Confirm Verification</span>
                          </button>
                        </form>
                      )}

                      {aadhaarStep === "verified" && (
                        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in zoom-in-95 duration-200">
                          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                            <Check className="w-6 h-6 stroke-[3]" />
                          </div>
                          <h3 className="text-base font-bold text-emerald-900">Aadhaar Verification Completed!</h3>
                          <p className="text-xs text-emerald-700 max-w-md mx-auto">
                            Government ID verified via UIDAI. Your host profile is now approved for direct zero-OTA bookings across India.
                          </p>
                          <div className="pt-2">
                            <span className="text-[11px] font-mono text-emerald-600 bg-white px-3 py-1 rounded-full border border-emerald-300">
                              UIDAI Ref: UH-IN-{Math.floor(100000 + Math.random() * 900000)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. FOREIGN NATIONALS OR NRI VERIFICATION (Frames 13-16) */}
                  {verificationSubTab === "foreign" && (
                    <div className="space-y-6 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500">Foreign National Identity:</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          foreignSubmitted ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {foreignSubmitted ? "Submitted for Review" : "Pending Document Upload"}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-600 space-y-1">
                        <p className="font-semibold text-gray-900">
                          For foreign nationals or NRI, upload a copy of Passport's first and the last page, and your picture to verify profile.
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Supported file types: SVG, PNG, JPG, PDF (Max 10MB each).
                        </p>
                      </div>

                      {!foreignSubmitted ? (
                        <div className="space-y-4">
                          {/* Passport Document Drag & Drop */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                              Passport First & Last Page
                            </label>
                            <label className="border-2 border-dashed border-gray-300 hover:border-[#ff2800] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white">
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-xs font-bold text-gray-900">
                                {passportUploaded ? `Uploaded: ${passportFileName}` : "Drag & drop a document, or Browse"}
                              </span>
                              <span className="text-[11px] text-gray-400 mt-0.5">Max 10MB per document</span>
                              <input
                                type="file"
                                className="hidden"
                                accept=".png,.jpg,.jpeg,.pdf"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    setPassportUploaded(true);
                                    setPassportFileName(e.target.files[0].name);
                                  }
                                }}
                              />
                            </label>
                          </div>

                          {/* Profile Picture Uploader */}
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                              Live Picture / Photo of Yourself
                            </label>
                            <label className="border border-gray-200 hover:border-gray-400 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-colors bg-white">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                                <User className="w-5 h-5" />
                              </div>
                              <div className="flex-1 text-xs">
                                <span className="font-bold text-gray-900 block">
                                  {selfieUploaded ? "Live selfie photo uploaded ✓" : "Upload clear photo of yourself"}
                                </span>
                                <span className="text-gray-400 text-[11px]">Helps caretakers identify you at check-in</span>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={() => setSelfieUploaded(true)}
                              />
                            </label>
                          </div>

                          <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-gray-400" />
                            <span>Your privacy is our highest priority. We never share your personal documents.</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (!passportUploaded) {
                                alert("Please upload a passport copy before submitting.");
                                return;
                              }
                              setForeignSubmitted(true);
                            }}
                            className="w-full py-3.5 rounded-full bg-[#ff2800] hover:bg-[#e5220d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Save & Submit for Verification</span>
                          </button>
                        </div>
                      ) : (
                        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3 animate-in zoom-in-95 duration-200">
                          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                            <FileText className="w-6 h-6" />
                          </div>
                          <h3 className="text-base font-bold text-blue-900">Documents Submitted for Review</h3>
                          <p className="text-xs text-blue-700 max-w-md mx-auto">
                            Your passport copy has been received. The Homey India host verification team will review and approve your profile within 4 hours.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
