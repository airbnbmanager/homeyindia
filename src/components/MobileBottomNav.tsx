"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, MessageSquare, ClipboardList, BedDouble, Sparkles } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
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
      isActive: pathname === "/unified-inbox",
    },
    {
      label: "Bookings",
      href: "/reservations",
      icon: ClipboardList,
      badge: "2",
      isActive: pathname === "/reservations" || pathname === "/offline-bookings",
    },
    {
      label: "Stays",
      href: "/stays",
      icon: BedDouble,
      isActive: pathname.startsWith("/stays"),
      highlight: true,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/90 pb-safe transition-all shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all duration-200 ${
                active ? "text-[#ff2800] scale-105" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${active ? "stroke-[2.4]" : "stroke-[1.8]"}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#ff2800] text-white text-[9px] font-extrabold flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !active && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#266c62]" />
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight font-medium ${active ? "font-bold text-[#ff2800]" : "text-gray-600"}`}>
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-3 h-0.5 rounded-full bg-[#ff2800]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

