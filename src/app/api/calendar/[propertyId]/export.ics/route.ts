import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  try {
    const { propertyId } = await params;

    // Fetch property details
    const { data: property, error: propError } = await supabase
      .from("properties")
      .select("id, title, location")
      .eq("id", propertyId)
      .single();

    const propTitle = property ? property.title : `Property ${propertyId}`;

    // Fetch confirmed bookings for this property
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("id, start_date, end_date, guest_name, channel, status")
      .eq("property_id", propertyId)
      .neq("status", "cancelled");

    // Format iCalendar standard specification (RFC 5545)
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Homey India//PMS Channel Manager//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:${propTitle} (Homey India)`,
      "X-WR-TIMEZONE:Asia/Kolkata",
    ];

    if (bookings && bookings.length > 0) {
      for (const b of bookings) {
        const start = b.start_date.replace(/-/g, "");
        const end = b.end_date.replace(/-/g, "");
        const uid = `booking-${b.id}@homeyindia.com`;
        const summary = `Reserved (${b.channel || "Direct"})`;

        icsContent.push(
          "BEGIN:VEVENT",
          `UID:${uid}`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
          `DTSTART;VALUE=DATE:${start}`,
          `DTEND;VALUE=DATE:${end}`,
          `SUMMARY:${summary}`,
          `DESCRIPTION:Reserved on Homey India PMS via ${b.channel || "Direct"}`,
          "STATUS:CONFIRMED",
          "TRANSP:OPAQUE",
          "END:VEVENT"
        );
      }
    }

    icsContent.push("END:VCALENDAR");

    return new NextResponse(icsContent.join("\r\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${propertyId}.ics"`,
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "iCal generation error" }, { status: 500 });
  }
}
