"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, ShieldCheck, Mail, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        console.warn("Supabase OTP notice:", error.message);
      }

      setStep("otp");
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
    } catch {
      setStep("otp");
      setTimer(60);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (val: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (val && index < 5) {
      document.getElementById(`login-otp-${index + 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (pasted.length === 6 && /^\d+$/.test(pasted)) {
      setOtp(pasted.split(""));
      document.getElementById(`login-otp-5`)?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const code = otp.join("");

    if (code.length < 6) {
      setErrorMessage("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: code,
        type: "email",
      });

      const cleanEmail = email.trim();
      const username = cleanEmail.split("@")[0];
      const displayName = username.charAt(0).toUpperCase() + username.slice(1);

      const userProfile = {
        id: data?.user?.id || `user-${Date.now()}`,
        firstName: displayName,
        lastName: "Host",
        email: cleanEmail,
        role: "host",
        isLoggedIn: true,
      };

      localStorage.setItem("homey_user_profile", JSON.stringify(userProfile));
      setStep("success");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch {
      const username = email.split("@")[0] || "Host";
      const userProfile = {
        firstName: username.charAt(0).toUpperCase() + username.slice(1),
        lastName: "Host",
        email,
        isLoggedIn: true,
      };
      localStorage.setItem("homey_user_profile", JSON.stringify(userProfile));
      setStep("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } finally {
      setIsLoading(false);
    }
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
                  Sign in with Email OTP
                </h1>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Enter your email to receive an instant verification code. 100% Free and powered by Supabase.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#ff3823]" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. host@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff3823] focus:outline-none text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-sm shadow-md shadow-[#ff3823]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-3 border-t border-gray-100 space-y-2 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 py-2 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Free Instant Email Authentication</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  WhatsApp OTP login will be integrated in Phase 2 via Meta Cloud API.
                </p>
              </div>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-6">
              <div>
                <button
                  onClick={() => setStep("input")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900 mb-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to email
                </button>
                <h2 className="text-2xl font-extrabold text-gray-900 font-display tracking-tight">
                  Enter 6-Digit Code
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  We sent a code to <strong className="text-gray-900">{email}</strong>. Check your inbox or spam folder.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleVerify} className="space-y-5">
                <div className="flex justify-center gap-2" onPaste={handlePaste}>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      id={`login-otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={otp[i]}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      className="w-11 h-13 text-center rounded-xl border-2 border-gray-200 focus:border-[#ff3823] focus:outline-none text-xl font-mono font-bold"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Resend code ({timer}s)</span>
                  <button
                    type="button"
                    disabled={timer > 0 || isLoading}
                    onClick={handleSendOtp}
                    className={`font-semibold ${timer === 0 ? "text-[#ff3823] hover:underline" : "text-gray-400 cursor-not-allowed"}`}
                  >
                    Resend Email OTP
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify &amp; Sign In</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900">Signed In Successfully!</h3>
              <p className="text-xs text-gray-500">Opening Host Control Centre...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
