-- ========================================================
-- HOMEY INDIA PMS & CHANNEL MANAGER DATABASE SCHEMA
-- Dedicated Database: yzjlrijukgohavsvefwn.supabase.co
-- Organization: Homey India
-- ========================================================

-- 1. PROPERTIES & LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  zone TEXT NOT NULL,
  price NUMERIC NOT NULL,
  airbnb_price NUMERIC,
  rating NUMERIC DEFAULT 4.9,
  reviews_count INT DEFAULT 25,
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  max_guests INT NOT NULL,
  image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,
  is_superhost BOOLEAN DEFAULT true,
  host_name TEXT DEFAULT 'Praveen Singh',
  host_phone TEXT DEFAULT '+91 94544 70872',
  description TEXT,
  entire_place_mode BOOLEAN DEFAULT false,
  parent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RESERVATIONS & BOOKINGS LEDGER
CREATE TABLE IF NOT EXISTS public.reservations (
  id TEXT PRIMARY KEY,
  property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
  property_name TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT,
  adults INT DEFAULT 2,
  children INT DEFAULT 0,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INT NOT NULL,
  channel TEXT NOT NULL,
  channel_color TEXT DEFAULT '#ff3823',
  base_amount NUMERIC NOT NULL,
  tax_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL,
  platform_fee NUMERIC DEFAULT 0,
  net_payout NUMERIC NOT NULL,
  advance_paid NUMERIC DEFAULT 0,
  balance_due NUMERIC DEFAULT 0,
  payment_status TEXT DEFAULT 'Paid in Full',
  payout_status TEXT DEFAULT 'Upcoming Payout',
  booking_status TEXT DEFAULT 'upcoming',
  security_deposit_amount NUMERIC DEFAULT 0,
  security_deposit_status TEXT DEFAULT 'none',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXPENSES & TRUE P&L TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
  id TEXT PRIMARY KEY,
  property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT NOT NULL,
  expense_date DATE NOT NULL,
  paid_by TEXT DEFAULT 'Praveen Singh',
  payment_mode TEXT DEFAULT 'UPI',
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FLEXI PRICING & YIELD MANAGEMENT RULES
CREATE TABLE IF NOT EXISTS public.flexi_pricing_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rule_type TEXT NOT NULL,
  adjustment_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CHANNEL SETTINGS & OTA MARKUPS
CREATE TABLE IF NOT EXISTS public.channel_settings (
  channel_id TEXT PRIMARY KEY,
  channel_name TEXT NOT NULL,
  connected BOOLEAN DEFAULT true,
  markup_percent NUMERIC DEFAULT 0,
  auto_sync_interval_mins INT DEFAULT 15,
  ical_export_url TEXT,
  ical_import_url TEXT,
  last_sync_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. HOST PROFILES & IDENTITY KYC
CREATE TABLE IF NOT EXISTS public.host_profiles (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT DEFAULT 'The Unique Haven Homes Private Limited',
  aadhaar_number TEXT,
  aadhaar_verified BOOLEAN DEFAULT true,
  passport_verified BOOLEAN DEFAULT false,
  verified_host_badge BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flexi_pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_profiles ENABLE ROW LEVEL SECURITY;

-- CREATE OPEN POLICIES FOR HOMEY INDIA WEB APP ACCESS
CREATE POLICY "Allow public read properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Allow all reservations access" ON public.reservations FOR ALL USING (true);
CREATE POLICY "Allow all expenses access" ON public.expenses FOR ALL USING (true);
CREATE POLICY "Allow all flexi pricing access" ON public.flexi_pricing_rules FOR ALL USING (true);
CREATE POLICY "Allow all channel settings access" ON public.channel_settings FOR ALL USING (true);
CREATE POLICY "Allow all host profiles access" ON public.host_profiles FOR ALL USING (true);
