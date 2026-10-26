"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(120);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      alert("Please enter a valid email or phone number.");
      return;
    }
    setStep("otp");
    setTimer(120);
  };

  const handleOtpChange = (val: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (val && index < 3) {
      document.getElementById(`login-otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) {
      alert("Please enter the 4-digit OTP.");
      return;
    }

    const isEmail = identifier.includes("@");
    const userProfile = {
      firstName: isEmail ? identifier.split("@")[0] : "Praveen",
      lastName: "Host",
      email: isEmail ? identifier : "host@theuniquehaven.com",
      phone: !isEmail ? identifier : "+91 94544 70872",
      isLoggedIn: true,
    };

    localStorage.setItem("homey_user_profile", JSON.stringify(userProfile));
    setStep("success");

    setTimeout(() => {
      router.push("/account");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 pt-24 sm:pt-28">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
          
          {step === "input" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff1ef] text-[#ff3823] text-xs font-bold border border-[#ffe2de]">
                  Homey India Host & Guest Portal
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display tracking-tight">
                  Welcome to Homey India!
                </h1>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your next adventure awaits. Log in to continue exploring unique travel experiences and managing stays.
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Enter Email / Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9454470872 or host@gmail.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Instant OTP login · No password required</span>
              </div>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-gray-900 font-display tracking-tight">
                  Enter OTP
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Please enter the verification code sent to <strong className="text-gray-900">{identifier}</strong>
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-5">
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <input
                      key={i}
                      id={`login-otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={otp[i]}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      className="w-14 h-14 text-center rounded-2xl border-2 border-gray-200 focus:border-[#ff3823] focus:outline-none text-2xl font-mono font-bold"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Resend OTP ({timer}s)</span>
                  <button
                    type="button"
                    disabled={timer > 0}
                    onClick={() => setTimer(120)}
                    className={`font-semibold ${timer === 0 ? "text-[#ff3823] hover:underline" : "text-gray-400 cursor-not-allowed"}`}
                  >
                    Resend Code
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit & Continue</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900">Signed In Successfully!</h3>
              <p className="text-xs text-gray-500">Redirecting to your Account Settings & Identity Verifications...</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
