import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PROPERTY_ICAL_FEEDS, fetchRealtimePropertyCalendar } from "@/lib/calendar-sync";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  try {
    const { propertyId } = await params;
    const feed = PROPERTY_ICAL_FEEDS[propertyId];
    const propTitle = feed ? feed.name : `The Unique Haven Homes ${propertyId}`;

    // 1. Fetch confirmed direct bookings for this property from Homey India DB
    const { data: dbBookings } = await supabase
      .from("bookings")
      .select("id, start_date, end_date, guest_name, channel, status")
      .eq("property_id", propertyId)
      .neq("status", "cancelled");

    // 2. Fetch live reservations from external Airbnb feed (to broadcast to other OTAs)
    let liveSyncReservations: any[] = [];
    if (feed?.airbnbIcalUrl) {
      try {
        const syncData = await fetchRealtimePropertyCalendar(propertyId);
        liveSyncReservations = syncData.reservations || [];
      } catch (e) {
        console.warn("[ExportICal] Warning fetching live feed:", e);
      }
    }

    // Format iCalendar standard specification (RFC 5545)
    const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Homey India & The Unique Haven Homes//PMS Channel Master//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:${propTitle} (Homey India Master)`,
      "X-WR-TIMEZONE:Asia/Kolkata",
    ];

    const addedRanges = new Set<string>();

    // Add Homey India Direct bookings
    if (dbBookings && dbBookings.length > 0) {
      for (const b of dbBookings) {
        const start = b.start_date.replace(/-/g, "");
        const end = b.end_date.replace(/-/g, "");
        const rangeKey = `${start}_${end}`;
        addedRanges.add(rangeKey);

        icsContent.push(
          "BEGIN:VEVENT",
          `UID:homey-${b.id}@homeyindia.com`,
          `DTSTAMP:${timestamp}`,
          `DTSTART;VALUE=DATE:${start}`,
          `DTEND;VALUE=DATE:${end}`,
          `SUMMARY:Reserved (${b.channel || "Direct"})`,
          `DESCRIPTION:Reserved on Homey India PMS via ${b.channel || "Direct"}`,
          "STATUS:CONFIRMED",
          "TRANSP:OPAQUE",
          "END:VEVENT"
        );
      }
    }

    // Add live Airbnb reservations so OTAs (like Booking.com) importing this link block double-bookings
    for (const r of liveSyncReservations) {
      const start = r.startDate.replace(/-/g, "");
      const end = r.endDate.replace(/-/g, "");
      const rangeKey = `${start}_${end}`;

      if (!addedRanges.has(rangeKey)) {
        addedRanges.add(rangeKey);
        icsContent.push(
          "BEGIN:VEVENT",
          `UID:sync-${r.uid}`,
          `DTSTAMP:${timestamp}`,
          `DTSTART;VALUE=DATE:${start}`,
          `DTEND;VALUE=DATE:${end}`,
          `SUMMARY:Reserved (Airbnb Synchronized)`,
          `DESCRIPTION:Synchronized via Homey India Master Hub · Airbnb Ref: ${r.confirmationCode || "Confirmed"}`,
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
        "Content-Disposition": `attachment; filename="${propertyId}-master.ics"`,
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "iCal generation error" }, { status: 500 });
  }
}
