export interface Property {
  id: string;
  slug: string;
  name: string;
  type: string;
  city: string;
  location: string;
  price: number;
  airbnbPrice: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  description: string;
  amenities: string[];
  hostName: string;
  phone: string;
}

export const UNIQUE_HAVEN_PROPERTIES: Property[] = [
  {
    id: "GOM-302",
    slug: "the-unique",
    name: "The Unique — 3BHK Luxury Residence",
    type: "3BHK Luxury Residence",
    city: "Lucknow",
    location: "Vikalp Khand, Gomti Nagar, Lucknow",
    price: 5500,
    airbnbPrice: 6499,
    guests: 8,
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.96,
    reviewsCount: 142,
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    description: "The flagship residence of The Unique Haven Homes. Ultra-spacious 3BHK with plush Italian leather seating, dedicated dining lounge, 3 king ensuite bedrooms, and private sunset balconies.",
    amenities: ["High-Speed WiFi", "100% Power Backup", "Smart 4K TVs in all rooms", "Modular Kitchen", "Daily Housekeeping", "Private Chef on demand", "Free Gated Parking"],
    hostName: "Firoz & Praveen (Superhosts)",
    phone: "+91 94500 55554",
  },
  {
    id: "GOM-201",
    slug: "the-dark-blue",
    name: "The Dark Blue — Royal 3BHK Flat",
    type: "3BHK Royal Flat",
    city: "Lucknow",
    location: "Vikalp Khand, Gomti Nagar, Lucknow",
    price: 4500,
    airbnbPrice: 5499,
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.94,
    reviewsCount: 118,
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Draped in deep royal sapphire tones, The Dark Blue offers ambient velvet interiors, bespoke chandelier lighting, and hotel-grade 400-thread Egyptian cotton linen.",
    amenities: ["High-Speed WiFi", "Split AC in all rooms", "RO Water Purifier", "Refrigerator", "Gated Security 24/7", "Lift Access"],
    hostName: "Firoz & Praveen",
    phone: "+91 94500 55554",
  },
  {
    id: "GOM-102",
    slug: "black-beauty",
    name: "Black Beauty — Executive 3BHK Suite",
    type: "3BHK Luxury Flat",
    city: "Lucknow",
    location: "Vikalp Khand, Gomti Nagar, Lucknow",
    price: 4500,
    airbnbPrice: 5499,
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.92,
    reviewsCount: 96,
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    description: "A masterpiece of contemporary monochrome aesthetics with charcoal matte finishes, gold trims, and state-of-the-art work-from-anywhere high-speed fiber internet.",
    amenities: ["High-Speed WiFi", "Work Desk", "Modern Kitchenette", "Full Air Conditioning", "Self Check-in Smart Lock"],
    hostName: "Firoz & Praveen",
    phone: "+91 94500 55554",
  },
  {
    id: "VIL-101",
    slug: "gomti-grand-villa",
    name: "Gomti Grand Villa — Private Estate",
    type: "Private Luxury Villa",
    city: "Lucknow",
    location: "Gomti Nagar Extension, Lucknow",
    price: 8000,
    airbnbPrice: 9599,
    guests: 14,
    bedrooms: 5,
    bathrooms: 5,
    rating: 4.98,
    reviewsCount: 174,
    coverImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
    description: "Expansive 5-bedroom private villa featuring lush landscaped private lawn, open-air terrace dining, barbecue setup, and sprawling hall for family gatherings and celebrations.",
    amenities: ["Private Lawn Garden", "Bonfire & BBQ setup", "Chef on call", "In-house Caretaker", "EV Charger", "Sound System"],
    hostName: "The Unique Haven Team",
    phone: "+91 94500 55554",
  },
  {
    id: "GOM-501",
    slug: "starlight-blue-penthouse",
    name: "Starlight Blue — Panoramic Penthouse",
    type: "Top-Floor Penthouse",
    city: "Lucknow",
    location: "Gomti Nagar, Lucknow",
    price: 6000,
    airbnbPrice: 7299,
    guests: 10,
    bedrooms: 4,
    bathrooms: 4,
    rating: 4.95,
    reviewsCount: 88,
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    description: "Perched on the top floor with 270-degree skyline views of Gomti Nagar. Floor-to-ceiling glass windows, stargazing rooftop deck, and designer ambient lighting.",
    amenities: ["Panoramic Skyline Views", "Private Rooftop Terrace", "Fully Equipped Kitchen", "Power Backup", "Smart Home Automation"],
    hostName: "The Unique Haven Team",
    phone: "+91 94500 55554",
  },
  {
    id: "LUL-101",
    slug: "the-luxe-haven",
    name: "The Luxe Haven — Romantic 1BHK Suite",
    type: "1BHK Luxury Suite",
    city: "Lucknow",
    location: "Near Lulu Mall / Shaheed Path, Lucknow",
    price: 2650,
    airbnbPrice: 2981,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.91,
    reviewsCount: 165,
    coverImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    description: "Cozy, intimate, and impeccably furnished 1BHK right next to Lulu Mall and Ekana Stadium. Perfect for couples, solo business travelers, and medical visits.",
    amenities: ["High-Speed WiFi", "King Bed", "Kitchenette with Microwave & Induction", "Smart LED TV", "Elevator Access"],
    hostName: "Firoz & Praveen",
    phone: "+91 94500 55554",
  }
];
