"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, RefreshCw } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your email sign-in...");

  useEffect(() => {
    async function handleAuth() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (session?.user) {
          const email = session.user.email || "";
          const username = email.split("@")[0] || "Host";
          const displayName = username.charAt(0).toUpperCase() + username.slice(1);

          const userProfile = {
            id: session.user.id,
            firstName: displayName,
            lastName: "Host",
            email,
            role: "host",
            isLoggedIn: true,
          };

          localStorage.setItem("homey_user_profile", JSON.stringify(userProfile));
          setStatus("Signed in successfully! Redirecting to Dashboard...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 800);
        } else {
          // Listen for hash token exchange
          const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
              const email = session.user.email || "";
              const username = email.split("@")[0] || "Host";
              const displayName = username.charAt(0).toUpperCase() + username.slice(1);

              const userProfile = {
                id: session.user.id,
                firstName: displayName,
                lastName: "Host",
                email,
                role: "host",
                isLoggedIn: true,
              };

              localStorage.setItem("homey_user_profile", JSON.stringify(userProfile));
              setStatus("Signed in successfully! Redirecting...");
              setTimeout(() => {
                router.push("/dashboard");
              }, 800);
            }
          });

          // Fallback timeout
          setTimeout(() => {
            router.push("/dashboard");
          }, 2500);
        }
      } catch (err) {
        router.push("/dashboard");
      }
    }

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-gray-100 space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-display text-gray-900">Email Confirmed!</h2>
        <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#ff2800]" />
          <span>{status}</span>
        </p>
      </div>
    </div>
  );
}
