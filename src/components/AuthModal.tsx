"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, CheckCircle2, Phone, Mail, Key, ShieldCheck, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    let interval: any;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

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

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
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
      if (onSuccess) onSuccess(userProfile);
      onClose();
      router.push("/account");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Enter Email / Phone Number  */}
        {step === "input" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#ff3823] flex items-center justify-center text-white font-bold text-xs">
                  H
                </div>
                <span className="font-display font-bold text-lg text-gray-900">homeyindia.</span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 font-display tracking-tight">
                Welcome to Homey India!
              </h2>
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
                className="w-full py-3.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-sm shadow-md shadow-[#ff3823]/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Instant verification via SMS / WhatsApp OTP</span>
            </div>
          </div>
        )}

        {/* STEP 2: Enter OTP  */}
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
                    id={`otp-input-${i}`}
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
                <span>Submit & Verify</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Success Animation */}
        {step === "success" && (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-gray-900">Signed In Successfully!</h3>
            <p className="text-xs text-gray-500">Redirecting to your Account Settings & Verifications...</p>
          </div>
        )}
      </div>
    </div>
  );
}
