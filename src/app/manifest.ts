import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Homey India — Vacation Rental PMS & Stays",
    short_name: "Homey India",
    description: "All-in-One PMS & Channel Manager for Homestays, Villas & Stays across India. Featuring The Unique Haven Homes in Lucknow.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1838",
    theme_color: "#ff2800",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["travel", "business", "productivity"],
    shortcuts: [
      {
        name: "Explore 18 Stays",
        short_name: "Stays",
        description: "Browse 18 luxury residences in Lucknow by The Unique Haven Homes",
        url: "/stays",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Start Free Trial",
        short_name: "Free Trial",
        description: "Start your 30-day PMS free trial",
        url: "/start-trial",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Book a Demo",
        short_name: "Demo",
        description: "Schedule a live demo with Lucknow expert Praveen Singh",
        url: "/book-a-demo",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
