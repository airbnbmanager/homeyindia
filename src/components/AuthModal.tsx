"use client";

import React, { useState, useEffect } from "react";
import { 
  X, ArrowRight, CheckCircle2, Mail, Lock, ShieldCheck, 
  RefreshCw, Edit2, Sparkles, KeyRound, Building2
} from "lucide-react";
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
  const { user, signInWithPassword, signInWithOtp, verifyOtp, loginAsUniqueHaven } = useAuth();
  
  // Modes: "password" (default) or "otp"
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [step, setStep] = useState<"input" | "otp_verify" | "success">("input");
  
  // Password login state
  const [email, setEmail] = useState("praveensinghaws@gmail.com");
  const [password, setPassword] = useState("UniqueHaven@2026");
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-detect when authenticated
  useEffect(() => {
    if (user?.isLoggedIn && isOpen) {
      setStep("success");
      const timeout = setTimeout(() => {
        if (onSuccess) onSuccess(user);
        handleClose();
        router.push("/dashboard");
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [user, isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (step === "otp_verify" && timer > 0) {
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
    setOtp(["", "", "", "", "", ""]);
    onClose();
  };

  // 1-Click Instant Master Login
  const handleInstantMasterLogin = () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      loginAsUniqueHaven();
      setStep("success");
      setTimeout(() => {
        if (onSuccess) onSuccess(user);
        handleClose();
        router.push("/dashboard");
      }, 700);
    } catch {
      setErrorMessage("Unable to sign in automatically. Please enter your password.");
    } finally {
      setIsLoading(false);
    }
  };

  // Password submission
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signInWithPassword(cleanEmail, cleanPass);
      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      setStep("success");
      setTimeout(() => {
        if (onSuccess) onSuccess(user);
        handleClose();
        router.push("/dashboard");
      }, 700);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Request
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
        if (error.message?.includes("rate limit") || error.message?.includes("security purposes")) {
          setErrorMessage("Supabase email rate limit reached. Please use Password Login above or use code 123456.");
          setStep("otp_verify");
          setTimer(60);
          setIsLoading(false);
          return;
        }
      }

      setStep("otp_verify");
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        document.getElementById("modal-otp-input-0")?.focus();
      }, 100);
    } catch {
      setStep("otp_verify");
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

    if (char && index < 5) {
      document.getElementById(`modal-otp-input-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`modal-otp-input-${index - 1}`)?.focus();
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

  const handleVerifyOtp = async (e: React.FormEvent) => {
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
        error.message || "Invalid verification code. Use 123456 as master bypass or try password login."
      );
      document.getElementById("modal-otp-input-0")?.focus();
      return;
    }

    setIsLoading(false);
    setStep("success");

    setTimeout(() => {
      if (onSuccess) onSuccess(user);
      handleClose();
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 overflow-hidden"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Main Login Interface */}
        {step === "input" && (
          <div className="space-y-5">
            {/* Logo & Header */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#ff2800] flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#ff2800]/25">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="font-display font-extrabold text-lg text-[#0a1d4b]">The Unique Haven Homes</span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 font-display tracking-tight">
                Host Portal Login
              </h2>
              <p className="text-xs text-gray-600">
                Sign in to manage your 18 luxury properties, unified calendar, and reservations.
              </p>
            </div>

            {/* 1-Click Instant Master Login Button */}
            <button
              type="button"
              onClick={handleInstantMasterLogin}
              disabled={isLoading}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#0a1d4b] via-[#11245a] to-[#0a1d4b] text-white hover:brightness-110 transition-all flex items-center justify-between shadow-lg shadow-[#0a1d4b]/20 group border border-white/10 cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-black text-sm shrink-0">
                  <Sparkles className="w-4 h-4 fill-current text-gray-950" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>1-Click Master Sign In</span>
                    <span className="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.2 rounded-full">SUPERHOST</span>
                  </div>
                  <div className="text-[11px] text-gray-300">Login as Praveen Singh (All Devices)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform mr-1" />
            </button>

            {/* Divider with mode switcher */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Or sign in with</span>
              <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setAuthMode("password"); setErrorMessage(null); }}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    authMode === "password" ? "bg-white text-gray-900 shadow-xs font-bold" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Password
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode("otp"); setErrorMessage(null); }}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    authMode === "otp" ? "bg-white text-gray-900 shadow-xs font-bold" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Email OTP
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100 animate-in fade-in">
                {errorMessage}
              </div>
            )}

            {/* TAB A: Password Login Form */}
            {authMode === "password" && (
              <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#ff2800]" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#ff2800]" />
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] text-gray-500 hover:text-gray-900 cursor-pointer"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Pre-filled credentials hint */}
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-gray-600 flex items-center justify-between">
                  <span>Pre-filled with master credentials</span>
                  <span className="font-mono font-bold text-gray-900">UniqueHaven@2026</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ff2800]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In with Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB B: OTP Request Form */}
            {authMode === "otp" && (
              <form onSubmit={handleSendOtp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#ff2800]" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ff2800]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send 6-Digit OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* STEP 2: OTP Verification Screen */}
        {step === "otp_verify" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-gray-900 font-display tracking-tight">
                Enter Verification Code
              </h2>
              <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-700 font-medium truncate">
                  Sent to <strong className="text-gray-900">{email}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => { setStep("input"); setErrorMessage(null); }}
                  className="text-[11px] text-[#ff2800] font-bold hover:underline flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" /> Change
                </button>
              </div>

              {/* Rate limit bypass note */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>Master Host Bypass:</strong> If email is rate-limited, you can enter <strong>123456</strong> or switch to Password login.
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
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
                    className="w-10 sm:w-11 h-12 sm:h-13 text-center rounded-xl border-2 border-gray-200 focus:border-[#ff2800] focus:outline-none text-xl font-mono font-bold"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Resend in {timer}s</span>
                <button
                  type="button"
                  onClick={() => { setAuthMode("password"); setStep("input"); }}
                  className="text-[#ff2800] font-bold hover:underline cursor-pointer"
                >
                  Use Password Instead
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Code &amp; Sign In</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Success Screen */}
        {step === "success" && (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-gray-900">Signed In Successfully!</h3>
            <p className="text-xs text-gray-500">Welcome, Praveen Singh. Opening The Unique Haven Homes...</p>
          </div>
        )}
      </div>
    </div>
  );
}
