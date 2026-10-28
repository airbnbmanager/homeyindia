import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import PwaRegistrar from "@/components/PwaRegistrar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { AuthProvider } from "@/context/AuthContext";

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

export const viewport: Viewport = {
  themeColor: "#ff2800",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://homeyindia.vercel.app"),
  title: "Homey India | All-in-One PMS & Channel Manager for Vacation Rentals & Homestays",
  description:
    "Manage your vacation rentals, villas, and homestays with zero double bookings. Real-time two-way sync across Airbnb, Booking.com, MakeMyTrip, Agoda, and your own direct booking website. Flagship: 18 luxury residences by The Unique Haven Homes in Lucknow.",
  applicationName: "Homey India",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Homey India",
  },
  keywords: [
    "Channel Manager",
    "Property Management Software",
    "PMS Software",
    "The Unique Haven Homes",
    "Lucknow Homestays",
    "Airbnb Management",
    "Homestay PMS",
    "Vacation Rental PMS",
    "MakeMyTrip Channel Manager",
    "Direct Booking Website",
    "Homey India"
  ],
  authors: [{ name: "Praveen Singh", url: "https://homeyindia.vercel.app" }],
  creator: "Praveen Singh",
  publisher: "Homey India Technologies",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Homey India | PMS & Channel Manager for Indian Vacation Rentals",
    description: "Two-way instant sync across 50+ channels. Explore 18 luxury stays by The Unique Haven Homes in Lucknow with 0% booking fees.",
    url: "https://homeyindia.vercel.app",
    siteName: "Homey India",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Homey India - Modern Vacation Rental PMS & Stays",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homey India | PMS & Channel Manager for Vacation Rentals",
    description: "Manage bookings, pricing, calendar sync, and direct reservations across 50+ channels. 18 Luxury stays in Lucknow.",
    images: ["/og-image.jpg"],
    creator: "@homeyindia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        <meta property="og:image" content="https://homeyindia.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:image" content="https://homeyindia.vercel.app/og-image.jpg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Homey India" />
      </head>
      <body className="antialiased selection:bg-[#ff2800]/10 selection:text-[#ff2800] pb-16 md:pb-0">
        <AuthProvider>
          <PwaRegistrar />
          {children}
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
