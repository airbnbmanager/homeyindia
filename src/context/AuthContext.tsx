"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  phone?: string;
  isLoggedIn: boolean;
  avatarUrl?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithOtp: (email: string) => Promise<{ error: AuthError | Error | null }>;
  verifyOtp: (email: string, token: string) => Promise<{ data: { user: User | null; session: Session | null } | null; error: AuthError | Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to build profile safely
function buildProfile(email: string, id: string): UserProfile {
  let savedProfile: Record<string, unknown> = {};
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("homey_user_profile");
      if (saved) savedProfile = JSON.parse(saved);
    } catch (e) {
      console.error("Error reading saved user profile:", e);
    }
  }

  const cleanEmail = email.trim().toLowerCase();
  const username = cleanEmail.split("@")[0] || "Host";
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return {
    ...savedProfile,
    id: id || (savedProfile.id as string) || `user-${Date.now()}`,
    email: cleanEmail,
    firstName: (savedProfile.firstName as string) || displayName,
    lastName: (savedProfile.lastName as string) || "Host",
    role: (savedProfile.role as string) || "host",
    isLoggedIn: true,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("homey_user_profile");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.isLoggedIn) return parsed as UserProfile;
        }
      } catch (e) {
        console.error("Local profile parse error:", e);
      }
    }
    return null;
  });

  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch active Supabase session
    async function initSession() {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn("Supabase getSession warning:", error.message);
        }

        if (initialSession?.user) {
          setSession(initialSession);
          setSupabaseUser(initialSession.user);
          const email = initialSession.user.email || "";
          const prof = buildProfile(email, initialSession.user.id);
          setUser(prof);
          if (typeof window !== "undefined") {
            localStorage.setItem("homey_user_profile", JSON.stringify(prof));
          }
        }
      } catch (err) {
        console.warn("Auth initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    initSession();

    // Listen to Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setSupabaseUser(newSession?.user || null);

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
          if (newSession?.user) {
            const email = newSession.user.email || "";
            const prof = buildProfile(email, newSession.user.id);
            setUser(prof);
            if (typeof window !== "undefined") {
              localStorage.setItem("homey_user_profile", JSON.stringify(prof));
            }
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setSupabaseUser(null);
          setSession(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem("homey_user_profile");
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithOtp = async (email: string): Promise<{ error: AuthError | Error | null }> => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : "https://homeyindia.vercel.app/auth/callback";

      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          emailRedirectTo: redirectUrl,
          shouldCreateUser: true,
        },
      });

      return { error };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const verifyOtp = async (
    email: string,
    token: string
  ): Promise<{ data: { user: User | null; session: Session | null } | null; error: AuthError | Error | null }> => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanToken = token.trim();

      const { data, error } = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: cleanToken,
        type: "email",
      });

      if (error) {
        return { data: null, error };
      }

      if (!data?.user && !data?.session) {
        return { data: null, error: new Error("Invalid verification code. Please check and try again.") };
      }

      const prof = buildProfile(cleanEmail, data?.user?.id || "");
      setUser(prof);
      setSupabaseUser(data.user);
      setSession(data.session);

      if (typeof window !== "undefined") {
        localStorage.setItem("homey_user_profile", JSON.stringify(prof));
      }

      return { data: { user: data.user, session: data.session }, error: null };
    } catch (err: unknown) {
      return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Sign out notice:", err);
    } finally {
      setUser(null);
      setSupabaseUser(null);
      setSession(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("homey_user_profile");
      }
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      if (typeof window !== "undefined") {
        localStorage.setItem("homey_user_profile", JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        session,
        isLoading,
        signInWithOtp,
        verifyOtp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
