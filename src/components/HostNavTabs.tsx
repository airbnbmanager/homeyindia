"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  Building2,
  BookOpen,
  Layers,
  TrendingUp,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calendar", label: "Calendar & Pricing", icon: Calendar },
  { href: "/unified-calendar", label: "Unified Timeline", icon: CalendarDays },
  { href: "/properties", label: "Properties (18)", icon: Building2 },
  { href: "/reservations", label: "Reservations", icon: BookOpen },
  { href: "/channel-manager", label: "Channel Manager", icon: Layers },
  { href: "/flexi-pricing", label: "Flexi Pricing", icon: TrendingUp },
  { href: "/expenses-and-profits", label: "True P&L", icon: DollarSign },
  { href: "/account", label: "Account & KYC", icon: ShieldCheck },
];

export default function HostNavTabs({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const pathname = usePathname();

  const isLight = variant === "light";

  return (
    <div
      className={`flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold ${
        isLight
          ? "border-b border-gray-200 pb-3"
          : "max-w-7xl mx-auto mt-4 sm:mt-6 border-t border-slate-800/80 pt-3 sm:pt-4"
      }`}
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname?.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 sm:px-4 py-2 rounded-xl whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 transition-all ${
              isActive
                ? "bg-[#ff3823] text-white font-bold shadow-lg shadow-[#ff3823]/25 scale-[1.02]"
                : isLight
                ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                : "text-slate-300 hover:text-white hover:bg-slate-800/90"
            }`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
