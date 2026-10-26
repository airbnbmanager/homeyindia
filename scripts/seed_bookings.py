import json
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

# 1. Fetch properties to get their IDs
props = req("properties?select=id,title&limit=10")
print(f"Found {len(props)} properties in Supabase")

if len(props) >= 3:
    # 2. Seed Bookings with valid schema
    sample_bookings = [
        {
            "property_id": props[0]["id"],
            "start_date": "2026-10-28",
            "end_date": "2026-10-31",
            "total_price": 7950,
            "status": "confirmed",
            "guest_name": "Aditya Verma",
            "guest_phone": "+91 98711 23456",
            "guest_email": "aditya.verma@gmail.com",
            "channel": "Direct",
            "net_payout": 7950,
            "advance_paid": 3000,
            "balance_due": 4950,
            "payment_status": "Advance Paid",
            "booking_status": "upcoming"
        },
        {
            "property_id": props[1]["id"],
            "start_date": "2026-10-27",
            "end_date": "2026-10-29",
            "total_price": 8200,
            "status": "confirmed",
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
            "property_id": props[2]["id"],
            "start_date": "2026-10-25",
            "end_date": "2026-10-27",
            "total_price": 5200,
            "status": "confirmed",
            "guest_name": "Dr. Manan Joshi",
            "guest_phone": "+91 94150 99887",
            "guest_email": "dr.manan@yahoo.com",
            "channel": "MakeMyTrip",
            "net_payout": 4600,
            "advance_paid": 5200,
            "balance_due": 0,
            "payment_status": "Paid in Full",
            "booking_status": "checked_in"
        }
    ]

    res = req("bookings", sample_bookings, method="POST")
    print(f"✅ {len(res)} bookings seeded successfully!")
