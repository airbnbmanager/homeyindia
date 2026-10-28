"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, CheckCircle2, Mail, ShieldCheck, RefreshCw, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth, UserProfile } from "@/context/AuthContext";

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserProfile | null) => void;
}) {
  const router = useRouter();
  const { user, signInWithOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  if (!isOpen) return null;

  const handleClose = () => {
    setErrorMessage(null);
    setStep("input");
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    onClose();
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signInWithOtp(cleanEmail);

      if (error) {
        console.warn("Supabase OTP notice:", error.message);
        if (error.message?.includes("rate limit")) {
          setErrorMessage("Too many attempts. Please wait a minute before requesting another code.");
          setIsLoading(false);
          return;
        }
      }

      setStep("otp");
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        document.getElementById("modal-otp-input-0")?.focus();
      }, 100);
    } catch {
      setStep("otp");
      setTimer(60);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (val: string, index: number) => {
    const cleaned = val.replace(/\D/g, "");
    const char = cleaned.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto-focus next input
    if (char && index < 5) {
      const nextInput = document.getElementById(`modal-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`modal-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (pasted.length >= 6) {
      const digits = pasted.slice(0, 6).split("");
      setOtp(digits);
      document.getElementById("modal-otp-input-5")?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const code = otp.join("").trim();

    if (code.length < 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsLoading(true);

    const { error } = await verifyOtp(email, code);

    if (error) {
      setIsLoading(false);
      setErrorMessage(
        error.message || "Invalid or expired verification code. Please check your email and try again."
      );
      document.getElementById("modal-otp-input-0")?.focus();
      return;
    }

    setIsLoading(false);
    setStep("success");

    setTimeout(() => {
      if (onSuccess) onSuccess(user);
      handleClose();
      router.push("/account");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Enter Email  */}
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
                Sign in with Email OTP
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Enter your email address to receive an instant 6-digit login verification code.
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
                className="w-full py-3.5 rounded-full bg-[#ff3823] hover:bg-[#e5220d] text-white font-bold text-sm shadow-md shadow-[#ff3823]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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

            <div className="pt-3 border-t border-gray-100 space-y-1.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 py-1.5 rounded-lg border border-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free &amp; Secure Email OTP via Supabase</span>
              </div>
              <p className="text-[10px] text-gray-400">
                WhatsApp SMS OTP login will be integrated in Phase 2 via Meta Cloud API.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Enter 6-Digit OTP */}
        {step === "otp" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-gray-900 font-display tracking-tight">
                Check Your Email
              </h2>
              <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-700 font-medium truncate">
                  Sent to <strong className="text-gray-900">{email}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => { setStep("input"); setErrorMessage(null); }}
                  className="text-[11px] text-[#ff3823] font-bold hover:underline flex items-center gap-1 shrink-0 ml-2"
                >
                  <Edit2 className="w-3 h-3" /> Change
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Enter the 6-digit code or click the confirmation link received in your inbox.
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
                    id={`modal-otp-input-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[i]}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-11 h-13 text-center rounded-xl border-2 border-gray-200 focus:border-[#ff3823] focus:outline-none text-xl font-mono font-bold"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Resend in {timer}s</span>
                <button
                  type="button"
                  disabled={timer > 0 || isLoading}
                  onClick={() => handleSendOtp()}
                  className={`font-semibold ${timer === 0 ? "text-[#ff3823] hover:underline cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
                >
                  Resend Email OTP
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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

        {/* STEP 3: Success Animation */}
        {step === "success" && (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-gray-900">Signed In Successfully!</h3>
            <p className="text-xs text-gray-500">Welcome to Homey India. Opening your host account...</p>
          </div>
        )}
      </div>
    </div>
  );
}
