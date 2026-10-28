"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Mail, Lock, 
  RefreshCw, Edit2, Sparkles, Building2 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, signInWithPassword, signInWithOtp, verifyOtp, loginAsUniqueHaven } = useAuth();
  
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [step, setStep] = useState<"input" | "otp_verify" | "success">("input");
  
  const [email, setEmail] = useState("praveensinghaws@gmail.com");
  const [password, setPassword] = useState("UniqueHaven@2026");
  const [showPassword, setShowPassword] = useState(false);
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (step === "otp_verify" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user?.isLoggedIn && step !== "success") {
      router.push("/dashboard");
    }
  }, [user, router, step]);

  const handleInstantMasterLogin = () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      loginAsUniqueHaven();
      setStep("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch {
      setErrorMessage("Unable to sign in automatically.");
    } finally {
      setIsLoading(false);
    }
  };

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
        setErrorMessage(error.message || "Invalid credentials.");
        setIsLoading(false);
        return;
      }

      setStep("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
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
        if (error.message?.includes("rate limit") || error.message?.includes("security purposes")) {
          setErrorMessage("Supabase email rate limit reached. Use Password Login above or code 123456.");
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
        document.getElementById("login-otp-0")?.focus();
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
      document.getElementById(`login-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`login-otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (pasted.length >= 6) {
      const digits = pasted.slice(0, 6).split("");
      setOtp(digits);
      document.getElementById("login-otp-5")?.focus();
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
        error.message || "Invalid verification code. Enter 123456 as master bypass or use password login."
      );
      document.getElementById("login-otp-0")?.focus();
      return;
    }

    setIsLoading(false);
    setStep("success");

    setTimeout(() => {
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 pt-28 pb-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
          
          {step === "input" && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#ff2800] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#ff2800]/25">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="font-display font-extrabold text-xl text-[#0a1d4b]">The Unique Haven Homes</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display tracking-tight mt-1">
                  Host Sign In
                </h1>
                <p className="text-xs text-gray-600">
                  Access your PMS dashboard, calendar, channel manager, and 18 luxury properties.
                </p>
              </div>

              {/* 1-Click Master Login Button */}
              <button
                type="button"
                onClick={handleInstantMasterLogin}
                disabled={isLoading}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#0a1d4b] via-[#11245a] to-[#0a1d4b] text-white hover:brightness-110 transition-all flex items-center justify-between shadow-xl shadow-[#0a1d4b]/20 group border border-white/10 cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-black text-sm shrink-0">
                    <Sparkles className="w-5 h-5 fill-current text-gray-950" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>1-Click Master Sign In</span>
                      <span className="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.2 rounded-full">SUPERHOST</span>
                    </div>
                    <div className="text-[11px] text-gray-300">Praveen Singh · The Unique Haven Homes</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform mr-1" />
              </button>

              {/* Mode Switcher */}
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
                <div className="p-3.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100 animate-in fade-in">
                  {errorMessage}
                </div>
              )}

              {/* Password Form */}
              {authMode === "password" && (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#ff2800]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-gray-600 flex items-center justify-between">
                    <span>Master Host Password:</span>
                    <span className="font-mono font-bold text-gray-900">UniqueHaven@2026</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-sm shadow-md shadow-[#ff2800]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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

              {/* OTP Form */}
              {authMode === "otp" && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#ff2800]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff2800] focus:outline-none text-sm font-medium transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-full bg-[#ff2800] hover:bg-[#d7382a] text-white font-bold text-sm shadow-md shadow-[#ff2800]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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

          {step === "otp_verify" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <button
                  onClick={() => { setStep("input"); setErrorMessage(null); }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900 mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to email
                </button>
                <h2 className="text-2xl font-extrabold text-gray-900 font-display tracking-tight">
                  Enter Verification Code
                </h2>
                <div className="flex items-center justify-between bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-100 mt-2">
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

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 mt-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong>Master Host Bypass:</strong> If email is delayed or rate-limited, enter <strong>123456</strong> or switch back to Password login.
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="flex justify-center gap-2" onPaste={handlePaste}>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      id={`login-otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[i]}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      className="w-11 h-13 text-center rounded-xl border-2 border-gray-200 focus:border-[#ff2800] focus:outline-none text-xl font-mono font-bold"
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

          {step === "success" && (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900">Signed In Successfully!</h3>
              <p className="text-xs text-gray-500">Welcome Praveen Singh. Opening The Unique Haven Homes...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
