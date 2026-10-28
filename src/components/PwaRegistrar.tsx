"use client";

import React, { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

export default function PwaRegistrar() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const standaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standaloneMode);

    if (standaloneMode) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // Register Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[PWA] Service Worker registered with scope:", reg.scope);
          })
          .catch((err) => {
            console.warn("[PWA] Service Worker registration failed:", err);
          });
      });
    }

    // Capture beforeinstallprompt for Android / Chrome / Edge
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user dismissed banner recently
      const dismissed = localStorage.getItem("homey_pwa_dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("[PWA] User choice outcome:", outcome);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem("homey_pwa_dismissed", Date.now().toString());
  };

  if (isStandalone || !showInstallBanner) return null;

  return (
    <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
      <div className="bg-[#0c1838] text-white p-4 rounded-2xl shadow-2xl border border-gray-700/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff2800] to-[#d42211] flex items-center justify-center shrink-0 shadow-md">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold leading-tight">Install Homey India App</div>
            <p className="text-[11px] text-gray-300 leading-tight">
              Fast offline access to 18 stays & host channel manager.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-full bg-[#ff2800] hover:bg-[#e5220d] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
