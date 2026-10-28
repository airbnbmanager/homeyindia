"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1d4b] text-white pt-20 pb-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#ff2800] flex items-center justify-center text-white shadow-md shadow-[#ff2800]/25">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2L2 9.5V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V9.5L12 2ZM12 4.5L19.5 10.2V20H15V14H9V20H4.5V10.2L12 4.5Z" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-display">
                Homey India<span className="text-[#ff2800]">.</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed">
              PMS & Channel Manager for Vacation Rentals and Homestays. Sync Airbnb, Booking.com, MakeMyTrip, Agoda, and your own direct booking website with sub-second latency and zero double bookings.
            </p>
            <div className="space-y-2 pt-2 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff2800]" />
                <span>+91 94544 70872 (24/7 WhatsApp Host Concierge)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff2800]" />
                <span>support@homeyindia.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff2800]" />
                <span>India · Pan-India Vacation Rental & PMS Platform</span>
              </div>
            </div>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/unified-calendar" className="hover:text-white transition-colors">Unified Calendar</Link></li>
              <li><Link href="/channel-manager" className="hover:text-white transition-colors">Channel Manager</Link></li>
              <li><Link href="/direct-booking-website" className="hover:text-white transition-colors">Direct Booking Website</Link></li>
              <li><Link href="/magic-cluster" className="hover:text-white transition-colors">Magic Cluster™</Link></li>
              <li><Link href="/flexi-pricing" className="hover:text-white transition-colors">Flexi Pricing™</Link></li>
              <li><Link href="/expenses-and-profits" className="hover:text-white transition-colors">Expenses & Profits</Link></li>
              <li><Link href="/unified-inbox" className="hover:text-white transition-colors">Unified Inbox</Link></li>
              <li><Link href="/co-hosts-and-team" className="hover:text-white transition-colors">Co-Hosts & Team</Link></li>
              <li><Link href="/offline-bookings" className="hover:text-white transition-colors">Offline Bookings</Link></li>
              <li><Link href="/ai-analytics" className="hover:text-white transition-colors">AI Analytics</Link></li>
            </ul>
          </div>

          {/* For Hosts */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">For Hosts</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/stays" className="hover:text-white transition-colors font-semibold text-amber-300">Browse Stays</Link></li>
              <li><Link href="/start-trial" className="hover:text-white transition-colors">Start Free Trial</Link></li>
              <li><Link href="/book-a-demo" className="hover:text-white transition-colors">Book a Live Demo</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/#reviews" className="hover:text-white transition-colors">Host Case Studies</Link></li>
              <li><Link href="/about-us" className="hover:text-white transition-colors">Why List With Us</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contactus" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cancellation-refund-policy" className="hover:text-white transition-colors">Cancellation & Refund</Link></li>
            </ul>
          </div>
        </div>

        {/* Popular Locations */}
        <div className="py-6 border-b border-white/10">
          <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Locations</h5>
          <div className="flex flex-wrap gap-2 text-xs text-gray-300">
            {["North Goa", "South Goa", "Manali", "Rishikesh", "Udaipur", "Munnar", "Lonavala", "Nainital", "Bengaluru", "Lucknow", "Ooty", "Wayanad"].map((loc) => (
              <span key={loc} className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 text-gray-300 hover:text-white cursor-pointer transition-colors text-[11px]">
                Homestays in {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Homey India Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>PMS & Channel Manager</span>
            <span>•</span>
            <span>Zero Double Bookings Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
