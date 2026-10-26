import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateICalFeed } from "@/lib/calendar-sync";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  try {
    const { propertyId } = await params;

    const { data: property } = await supabase
      .from("properties")
      .select("id, title")
      .eq("id", propertyId)
      .single();

    const title = property ? property.title : "The Unique Haven Stay";

    const { data: bookings } = await supabase
      .from("bookings")
      .select("id, start_date, end_date, guest_name, channel")
      .eq("property_id", propertyId)
      .neq("status", "cancelled");

    const events = (bookings || []).map((b) => ({
      id: b.id,
      startDate: b.start_date,
      endDate: b.end_date,
      summary: `Booked (${b.channel || "Direct"})`,
      channel: b.channel,
    }));

    const icsString = generateICalFeed(`${title} - The Unique Haven Homes Feed`, events);

    return new NextResponse(icsString, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="unique-haven-${propertyId}.ics"`,
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to generate feed" }, { status: 500 });
  }
}
