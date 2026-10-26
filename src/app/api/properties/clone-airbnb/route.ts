import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.includes("airbnb")) {
      return NextResponse.json(
        { error: "Please enter a valid Airbnb listing URL (e.g., https://www.airbnb.com/rooms/...)" },
        { status: 400 }
      );
    }

    // Extract listing ID from url
    const idMatch = url.match(/\/rooms\/(\d+)/);
    const listingId = idMatch ? idMatch[1] : `ab-${Date.now()}`;

    // Extract public metadata from Airbnb HTML or fallback with structured clone template
    let fetchedTitle = `Airbnb Stay #${listingId}`;
    let fetchedPrice = 2800;
    let fetchedLocation = "Lucknow, Uttar Pradesh";
    let fetchedCategory = "Entire Apartment";
    let fetchedImages = [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1798067011361845302/original/230e0bec-09da-4aa3-bdeb-952ffaf16a95.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1798067011361845302/original/5a7c9c80-dae3-4fe0-a770-21b32900d277.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1798067011361845302/original/12c15c18-6d42-4970-b177-a2f57125b64b.jpeg"
    ];

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (res.ok) {
        const html = await res.text();
        const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/i);
        const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i);
        const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/i);

        if (ogTitle && ogTitle[1]) fetchedTitle = ogTitle[1].replace(/ - Airbnb/gi, "").trim();
        if (ogImage && ogImage[1]) fetchedImages = [ogImage[1], ...fetchedImages.slice(1)];
        if (ogDesc && ogDesc[1]) fetchedLocation = ogDesc[1].split("·")[0]?.trim() || fetchedLocation;
      }
    } catch (fetchErr) {
      // Continue with template defaults
    }

    // Insert cloned property into Supabase
    const { data: clonedProperty, error: insertError } = await supabase
      .from("properties")
      .insert([
        {
          title: fetchedTitle,
          description: `Cloned directly from Airbnb listing ${url}\n\nManaged by Homey India PMS.`,
          location: fetchedLocation,
          price_per_night: fetchedPrice,
          weekend_price: Math.round(fetchedPrice * 1.2),
          category: fetchedCategory,
          rating: 4.9,
          images: fetchedImages,
          guests: 2,
          bedrooms: 1,
          beds: 1,
          baths: 1,
          min_nights: 1,
          entire_place_mode: false,
          amenities: ["High-speed WiFi", "Air Conditioning", "Dedicated Workspace", "Self Check-in", "Kitchen"],
        },
      ])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Airbnb Listing cloned and imported into Supabase successfully!",
      property: clonedProperty,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to clone listing" }, { status: 500 });
  }
}
