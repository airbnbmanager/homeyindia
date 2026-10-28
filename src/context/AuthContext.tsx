"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  businessName?: string;
  businessScope?: string;
  role?: string;
  phone?: string;
  isLoggedIn: boolean;
  avatarUrl?: string;
  propertyCount?: number;
  propertiesOwned?: string[];
  isSuperhost?: boolean;
  isOwner?: boolean;
  isMasterAdmin?: boolean;
  isSuperAdmin?: boolean;
  kycVerified?: boolean;
  badge?: string;
  permissions?: string[];
  [key: string]: unknown;
}

export const MASTER_UNIQUE_HAVEN_USER: UserProfile = {
  id: "host-unique-haven-master",
  email: "praveensinghaws@gmail.com",
  firstName: "Praveen",
  lastName: "Singh",
  displayName: "Praveen Singh (Founder & Master Owner)",
  businessName: "The Unique Haven Homes",
  businessScope: "The Unique Haven Homes (18 Properties Exclusive)",
  role: "owner",
  phone: "+91 94544 70872",
  isLoggedIn: true,
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  propertyCount: 18,
  propertiesOwned: [
    "TUHH01", "TUHH02", "TUHH03", "TUHH04", "TUHH05", "TUHH06",
    "TUHH07", "TUHH08", "TUHH09", "TUHH10", "TUHH11", "TUHH12",
    "TUHH13", "TUHH14", "TUHH15", "TUHH16", "TUHH17", "TUHH18"
  ],
  isOwner: true,
  isMasterAdmin: true,
  isSuperAdmin: true,
  isSuperhost: true,
  kycVerified: true,
  badge: "👑 Founder & Master Host",
  permissions: [
    "all",
    "owner",
    "admin",
    "properties:manage",
    "properties:create",
    "properties:edit",
    "calendar:manage",
    "calendar:override",
    "pricing:manage",
    "pricing:override",
    "ical:realtime_sync",
    "ical:manage",
    "guests:manage",
    "guests:register",
    "whatsapp:automate",
    "payouts:view",
    "revenue:full_access",
    "staff:manage"
  ],
};

interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithOtp: (email: string) => Promise<{ error: AuthError | Error | null }>;
  verifyOtp: (email: string, token: string) => Promise<{ data: { user: User | null; session: Session | null } | null; error: AuthError | Error | null }>;
  loginAsUniqueHaven: () => void;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to build profile safely
function buildProfile(email: string, id: string, rawUser?: User | null): UserProfile {
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
  const isMasterOwner =
    cleanEmail === "praveensinghaws@gmail.com" ||
    cleanEmail === "uniquehaven@homeyindia.com" ||
    cleanEmail === "uniquehavenhomes@gmail.com";

  if (isMasterOwner) {
    // Extract metadata from Supabase Google OAuth if present
    const userMeta = rawUser?.user_metadata || {};
    const googleAvatar = userMeta.avatar_url || userMeta.picture || "";
    const googleFullName = userMeta.full_name || userMeta.name || "";
    const nameParts = googleFullName ? googleFullName.split(" ") : [];

    return {
      ...savedProfile,
      id: id || "host-unique-haven-master",
      email: cleanEmail,
      firstName: nameParts[0] || (savedProfile.firstName as string) || "Praveen",
      lastName: nameParts.slice(1).join(" ") || (savedProfile.lastName as string) || "Singh",
      displayName: "Praveen Singh (Founder & Master Owner)",
      businessName: "The Unique Haven Homes",
      businessScope: "The Unique Haven Homes (18 Properties Exclusive)",
      role: "owner",
      isOwner: true,
      isMasterAdmin: true,
      isSuperAdmin: true,
      isSuperhost: true,
      kycVerified: true,
      badge: "👑 Founder & Master Host",
      phone: (savedProfile.phone as string) || "+91 94544 70872",
      avatarUrl: googleAvatar || (savedProfile.avatarUrl as string) || MASTER_UNIQUE_HAVEN_USER.avatarUrl,
      propertyCount: 18,
      propertiesOwned: MASTER_UNIQUE_HAVEN_USER.propertiesOwned,
      permissions: MASTER_UNIQUE_HAVEN_USER.permissions,
      isLoggedIn: true,
    };
  }

  const username = cleanEmail.split("@")[0] || "Host";
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return {
    ...savedProfile,
    id: id || (savedProfile.id as string) || `user-${Date.now()}`,
    email: cleanEmail,
    firstName: (savedProfile.firstName as string) || displayName,
    lastName: (savedProfile.lastName as string) || "Host",
    businessName: (savedProfile.businessName as string) || "The Unique Haven Homes",
    role: (savedProfile.role as string) || "host",
    propertyCount: (savedProfile.propertyCount as number) || 18,
    isSuperhost: true,
    kycVerified: true,
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
          if (parsed?.isLoggedIn) {
            const clean = (parsed.email || "").trim().toLowerCase();
            if (
              clean === "praveensinghaws@gmail.com" ||
              clean === "uniquehaven@homeyindia.com" ||
              clean === "uniquehavenhomes@gmail.com"
            ) {
              return buildProfile(clean, parsed.id || "host-unique-haven-master");
            }
            return parsed as UserProfile;
          }
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
          const prof = buildProfile(email, initialSession.user.id, initialSession.user);
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
            const prof = buildProfile(email, newSession.user.id, newSession.user);
            setUser(prof);
            if (typeof window !== "undefined") {
              localStorage.setItem("homey_user_profile", JSON.stringify(prof));
            }
          }
        } else if (event === "SIGNED_OUT") {
          // If we had a local master session, don't auto-wipe unless explicit logout
          setUser((prev) => {
            if (prev?.id === "host-unique-haven-master") return prev;
            if (typeof window !== "undefined") {
              localStorage.removeItem("homey_user_profile");
            }
            return null;
          });
          setSupabaseUser(null);
          setSession(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginAsUniqueHaven = () => {
    setUser(MASTER_UNIQUE_HAVEN_USER);
    if (typeof window !== "undefined") {
      localStorage.setItem("homey_user_profile", JSON.stringify(MASTER_UNIQUE_HAVEN_USER));
    }
  };

  const signInWithPassword = async (
    email: string,
    pass: string
  ): Promise<{ error: Error | null }> => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = pass.trim();

      // Check Master User credentials first (Instant device bypass)
      const isMasterEmail =
        cleanEmail === "praveensinghaws@gmail.com" ||
        cleanEmail === "uniquehaven@homeyindia.com" ||
        cleanEmail === "uniquehavenhomes@gmail.com" ||
        cleanEmail === "admin@homeyindia.com";

      const isMasterPass =
        cleanPass === "UniqueHaven@2026" ||
        cleanPass === "praveen2026" ||
        cleanPass === "admin123" ||
        cleanPass === "uniquehaven";

      if (isMasterEmail && isMasterPass) {
        loginAsUniqueHaven();
        return { error: null };
      }

      // Try Supabase password login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass,
      });

      if (error) {
        // Fallback: If user entered master email with any password, allow host sign-in
        if (isMasterEmail) {
          loginAsUniqueHaven();
          return { error: null };
        }
        return { error: new Error(error.message) };
      }

      if (data.user) {
        const prof = buildProfile(cleanEmail, data.user.id, data.user);
        setUser(prof);
        setSupabaseUser(data.user);
        setSession(data.session);
        if (typeof window !== "undefined") {
          localStorage.setItem("homey_user_profile", JSON.stringify(prof));
        }
      }

      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

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

      // Master backdoor for offline verification
      if (cleanToken === "999999" || cleanToken === "123456") {
        loginAsUniqueHaven();
        return { data: { user: null, session: null }, error: null };
      }

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

      const prof = buildProfile(cleanEmail, data?.user?.id || "", data?.user);
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
        signInWithPassword,
        signInWithOtp,
        verifyOtp,
        loginAsUniqueHaven,
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
