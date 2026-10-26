import json
import re
import urllib.request
import uuid

SUPABASE_URL = "https://yzjlrijukgohavsvefwn.supabase.co"
SUPABASE_KEY = "sb_publishable_1deaNni5Goagc-VfK-mYGg_wewaKvHD"

def req(endpoint, data=None, method="GET"):
    url = f"{SUPABASE_URL}/rest/v1/{endpoint}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    body = json.dumps(data).encode("utf-8") if data is not None else None
    request = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"Error on {endpoint} [{method}]:", e.read().decode("utf-8"))
        raise

# 1. Parse properties from src/data/properties.ts
with open("/Users/praveen/Developer/homeyindia/src/data/properties.ts") as f:
    content = f.read()

# Extract JSON array
match = re.search(r"export const PROPERTIES: Property\[\] = (\[.*\]);", content, re.DOTALL)
if not match:
    raise Exception("Could not find PROPERTIES array")

properties_raw = json.loads(match.group(1))
print(f"Loaded {len(properties_raw)} properties from properties.ts")

# 2. Prepare payload for properties
properties_payload = []
property_id_map = {}

for p in properties_raw:
    prop_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"homeyindia.{p['id']}"))
    property_id_map[p["id"]] = prop_uuid
    
    # gallery + main image combined without duplicates
    images = [p["image"]]
    for g in p.get("gallery", []):
        if g not in images:
            images.append(g)

    # description with metadata
    desc = f"{p.get('tagline', '')}\n\n{p.get('description', '')}\n\n[PropertyCode: {p['id']} | Slug: {p['slug']}]"

    properties_payload.append({
        "id": prop_uuid,
        "title": p["name"],
        "description": desc,
        "location": f"{p['location']}, Lucknow ({p['zone']})",
        "price_per_night": p["price"],
        "weekend_price": int(p["price"] * 1.2),
        "category": p["type"],
        "rating": p.get("rating", 4.9),
        "images": images[:15], # top 15 high-res photos
        "guests": p.get("maxGuests", 2),
        "bedrooms": p.get("bedrooms", 1),
        "beds": p.get("bedrooms", 1) + 1,
        "baths": p.get("bathrooms", 1),
        "min_nights": 1,
        "entire_place_mode": False,
        "amenities": p.get("amenities", [])
    })

print(f"Upserting {len(properties_payload)} properties to Supabase...")
# Upsert properties in batches
for i in range(0, len(properties_payload), 5):
    batch = properties_payload[i:i+5]
    res = req("properties", batch, method="POST")
    print(f"Batch {i//5 + 1} inserted ({len(batch)} properties)")

print("✅ All 18 properties seeded successfully!")

# 3. Seed Host Profile
profile_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, "homeyindia.host.praveen"))
profile_payload = [{
    "id": profile_id,
    "phone": "+91 94544 70872",
    "role": "host",
    "aadhaar_number": "XXXX-XXXX-8921",
    "aadhaar_verified": True,
    "company_name": "The Unique Haven Homes Private Limited"
}]
try:
    req("profiles", profile_payload, method="POST")
    print("✅ Host profile seeded")
except Exception as e:
    print("Host profile note:", e)

# 4. Seed Expenses (Video 01)
sample_expenses = [
    {
        "property_id": properties_payload[0]["id"],
        "category": "Repairs",
        "amount": 1200,
        "description": "Geyser plumbing fixture and bathroom valve replacement",
        "expense_date": "2026-10-20",
        "paid_by": "Praveen Singh",
        "payment_mode": "UPI"
    },
    {
        "property_id": properties_payload[0]["id"],
        "category": "Utilities",
        "amount": 3450,
        "description": "UPPCL Electricity bill - Shaheed Path Flat",
        "expense_date": "2026-10-18",
        "paid_by": "Praveen Singh",
        "payment_mode": "Net Banking"
    },
    {
        "property_id": properties_payload[1]["id"],
        "category": "Cleaning",
        "amount": 800,
        "description": "Deep cleaning & linen turnover for upcoming guest",
        "expense_date": "2026-10-22",
        "paid_by": "Caretaker Rajesh",
        "payment_mode": "Cash"
    },
    {
        "property_id": properties_payload[2]["id"],
        "category": "Toiletries",
        "amount": 1500,
        "description": "Restocking boutique shampoo, conditioners, dental kits & teas",
        "expense_date": "2026-10-24",
        "paid_by": "Praveen Singh",
        "payment_mode": "UPI"
    }
]

req("expenses", sample_expenses, method="POST")
print("✅ Expenses seeded successfully!")

# 5. Seed Bookings (Videos 07, 10, 11, 15)
sample_bookings = [
    {
        "property_id": properties_payload[0]["id"],
        "guest_name": "Aditya Verma",
        "guest_phone": "+91 98711 23456",
        "guest_email": "aditya.verma@gmail.com",
        "channel": "Direct",
        "net_payout": 5300,
        "advance_paid": 2000,
        "balance_due": 3300,
        "payment_status": "Advance Paid",
        "booking_status": "upcoming"
    },
    {
        "property_id": properties_payload[1]["id"],
        "guest_name": "Rohan & Sneha Kapoor",
        "guest_phone": "+91 98200 45678",
        "guest_email": "rohan.kapoor@outlook.com",
        "channel": "Airbnb",
        "net_payout": 8200,
        "advance_paid": 8200,
        "balance_due": 0,
        "payment_status": "Paid in Full",
        "booking_status": "upcoming"
    },
    {
        "property_id": properties_payload[2]["id"],
        "guest_name": "Dr. Manan Joshi",
        "guest_phone": "+91 94150 99887",
        "guest_email": "dr.manan@yahoo.com",
        "channel": "MakeMyTrip",
        "net_payout": 4600,
        "advance_paid": 4600,
        "balance_due": 0,
        "payment_status": "Paid in Full",
        "booking_status": "checked_in"
    }
]

req("bookings", sample_bookings, method="POST")
print("✅ Bookings seeded successfully!")
