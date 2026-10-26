"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c1838] text-white pt-20 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-gray-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff3823] to-[#ff6b57] flex items-center justify-center text-white shadow-md shadow-[#ff3823]/25">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-display">
                HomeyIndia<span className="text-[#ff3823]">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Next-generation PMS and 2-way channel manager built exclusively for vacation rentals, homestays, and boutique villas. Zero double bookings, true P&L analytics, and automated direct bookings.
            </p>
            <div className="space-y-2 pt-2 text-sm text-gray-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff3823]" />
                <span>+91 98765 43210 (Toll-Free 24/7 Host Desk)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff3823]" />
                <span>hosts@homeyindia.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff3823]" />
                <span>Bangalore • Goa • Mumbai • New Delhi</span>
              </div>
            </div>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/unified-calendar" className="hover:text-white transition-colors">Unified Calendar</Link></li>
              <li><Link href="/channel-manager" className="hover:text-white transition-colors">Channel Manager</Link></li>
              <li><Link href="/direct-booking-website" className="hover:text-white transition-colors">Direct Booking Website</Link></li>
              <li><Link href="/magic-cluster" className="hover:text-white transition-colors">Magic Cluster™ Sync</Link></li>
              <li><Link href="/flexi-pricing" className="hover:text-white transition-colors">Flexi Pricing™ Rules</Link></li>
              <li><Link href="/expenses-and-profits" className="hover:text-white transition-colors">Expense Tracking & P&L</Link></li>
              <li><Link href="/unified-inbox" className="hover:text-white transition-colors">Unified Guest Inbox</Link></li>
              <li><Link href="/co-hosts-and-team" className="hover:text-white transition-colors">Co-Hosts & Team Access</Link></li>
            </ul>
          </div>

          {/* Solutions & Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Solutions & Guides</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/start-trial" className="hover:text-white transition-colors">For Homestays & Villas</Link></li>
              <li><Link href="/book-a-demo" className="hover:text-white transition-colors">For Property Managers</Link></li>
              <li><Link href="/offline-bookings" className="hover:text-white transition-colors">Offline Booking Invoicing</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Calculator</Link></li>
              <li><Link href="/ai-analytics" className="hover:text-white transition-colors">AI Revenue Insights</Link></li>
              <li><Link href="/book-a-demo" className="hover:text-white transition-colors">Book a Live Demo</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company & Support</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contactus" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cancellation-refund-policy" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Popular Locations */}
        <div className="py-8 border-b border-gray-800">
          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Popular Vacation Rental Destinations</h5>
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            {["North Goa", "South Goa", "Manali", "Shimla", "Lonavala", "Alibaug", "Munnar", "Wayanad", "Udaipur", "Jaipur", "Rishikesh", "Ooty", "Mussoorie", "Coorg"].map((loc) => (
              <span key={loc} className="px-2.5 py-1 bg-gray-900/60 rounded-md border border-gray-800 text-gray-400 hover:text-white cursor-pointer transition-colors">
                Homestays in {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Homey India Technologies Inc. All rights reserved. Built with love for global hosts.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <svg className="w-4 h-4 hover:text-white cursor-pointer transition-colors fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <svg className="w-4 h-4 hover:text-white cursor-pointer transition-colors fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            <svg className="w-4 h-4 hover:text-white cursor-pointer transition-colors fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            <svg className="w-4 h-4 hover:text-white cursor-pointer transition-colors fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
