"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, LayoutDashboard, ClipboardList, BedDouble, Crown, Sparkles, MessageSquare, LucideIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  badge?: string;
  badgeColor?: string;
  isMasterPill?: boolean;
  highlight?: boolean;
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isMasterOwner =
    user?.isOwner ||
    user?.email?.toLowerCase() === "praveensinghaws@gmail.com" ||
    user?.email?.toLowerCase() === "uniquehaven@homeyindia.com";

  // Host-centric vs Guest-centric bottom bar
  const navItems: NavItem[] = isMasterOwner
    ? [
        {
          label: "Home",
          href: "/",
          icon: Home,
          isActive: pathname === "/",
        },
        {
          label: "Calendar",
          href: "/unified-calendar",
          icon: Calendar,
          badge: "Live",
          badgeColor: "bg-emerald-500",
          isActive: pathname === "/unified-calendar" || pathname.startsWith("/calendar"),
        },
        {
          label: "Master PMS",
          href: "/dashboard",
          icon: LayoutDashboard,
          isMasterPill: true,
          isActive: pathname === "/dashboard",
        },
        {
          label: "18 Stays",
          href: "/stays",
          icon: BedDouble,
          isActive: pathname.startsWith("/stays"),
        },
        {
          label: "Bookings",
          href: "/reservations",
          icon: ClipboardList,
          badge: "4",
          badgeColor: "bg-[#ff2800]",
          isActive: pathname === "/reservations" || pathname === "/offline-bookings",
        },
      ]
    : [
        {
          label: "Home",
          href: "/",
          icon: Home,
          isActive: pathname === "/",
        },
        {
          label: "Calendar",
          href: "/unified-calendar",
          icon: Calendar,
          isActive: pathname === "/unified-calendar" || pathname.startsWith("/calendar"),
        },
        {
          label: "Inbox",
          href: "/unified-inbox",
          icon: MessageSquare,
          badge: "3",
          badgeColor: "bg-[#ff2800]",
          isActive: pathname === "/unified-inbox",
        },
        {
          label: "Bookings",
          href: "/reservations",
          icon: ClipboardList,
          isActive: pathname === "/reservations" || pathname === "/offline-bookings",
        },
        {
          label: "18 Stays",
          href: "/stays",
          icon: BedDouble,
          highlight: true,
          isActive: pathname.startsWith("/stays"),
        },
      ];

  const handleTouchTap = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {
        // Ignore vibration errors
      }
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] transition-all pb-[max(env(safe-area-inset-bottom),0.5rem)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around px-1.5 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleTouchTap}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all duration-200 active:scale-95 ${
                active ? "text-[#ff2800]" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                {item.isMasterPill ? (
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      active
                        ? "bg-[#ff2800] text-white shadow-lg shadow-[#ff2800]/30 scale-105"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                ) : (
                  <>
                    <Icon
                      className={`w-5 h-5 transition-transform ${
                        active ? "stroke-[2.4] scale-110" : "stroke-[1.8]"
                      }`}
                    />
                    {item.badge && (
                      <span
                        className={`absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs ${
                          item.badgeColor || "bg-[#ff2800]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.highlight && !active && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff2800] animate-pulse" />
                    )}
                  </>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  active ? "font-extrabold text-[#ff2800]" : "font-medium text-gray-600"
                }`}
              >
                {item.label}
              </span>
              {active && !item.isMasterPill && (
                <span className="absolute bottom-0 w-3 h-0.5 rounded-full bg-[#ff2800]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
