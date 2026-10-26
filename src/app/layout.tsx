import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Homey India | All-in-One PMS & Channel Manager for Vacation Rentals & Homestays",
  description:
    "Manage your vacation rentals, villas, and homestays with zero double bookings. Real-time two-way sync across Airbnb, Booking.com, MakeMyTrip, Agoda, and your own direct booking website.",
  keywords: [
    "Channel Manager",
    "Property Management Software",
    "PMS Software",
    "Airbnb Management",
    "Homestay PMS",
    "Vacation Rental PMS",
    "MakeMyTrip Channel Manager",
    "Direct Booking Website",
    "Homey India"
  ],
  openGraph: {
    title: "Homey India | All-in-One PMS & Channel Manager for Vacation Rentals",
    description: "Manage bookings, pricing, calendar sync, and direct reservations across 50+ channels in real-time.",
    url: "https://homeyindia.com",
    siteName: "Homey India",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="antialiased selection:bg-[#ff3823]/10 selection:text-[#ff3823]">
        {children}
      </body>
    </html>
  );
}
