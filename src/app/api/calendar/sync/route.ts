import { NextRequest, NextResponse } from "next/server";
import {
  fetchRealtimePropertyCalendar,
  fetchAllRealtimePropertyCalendars,
  PROPERTY_ICAL_FEEDS,
} from "@/lib/calendar-sync";

// Helper to fetch guest records from TUHH central database for code matching
async function fetchGuestMap(): Promise<Record<string, { guestName: string; phone: string; amount: number }>> {
  const map: Record<string, { guestName: string; phone: string; amount: number }> = {};
  try {
    const res = await fetch(
      "https://vxxmigdzimnrbbmkjzoa.supabase.co/rest/v1/guest_register?select=airbnb_confirmation_code,guest_name,phone,total_amount&limit=300",
      {
        headers: {
          apikey: "sb_publishable_ZgssvBczAg9TPv4ihN8IfQ_FPcEnq1F",
          Authorization: "Bearer sb_publishable_ZgssvBczAg9TPv4ihN8IfQ_FPcEnq1F",
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const g of data) {
          if (g.airbnb_confirmation_code) {
            map[g.airbnb_confirmation_code.trim()] = {
              guestName: g.guest_name || "Airbnb Guest",
              phone: g.phone || "",
              amount: g.total_amount || 0,
            };
          }
        }
      }
    }
  } catch (err) {
    console.warn("[GuestMap] Non-blocking warning fetching guest register:", err);
  }
  return map;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("property_id") || "all";

    const guestMap = await fetchGuestMap();

    if (propertyId && propertyId !== "all" && PROPERTY_ICAL_FEEDS[propertyId]) {
      // Sync single property realtime
      const syncData = await fetchRealtimePropertyCalendar(propertyId);

      // Enrich reservations with real guest names from guest map
      const enrichedReservations = syncData.reservations.map((res) => {
        const guestInfo = res.confirmationCode ? guestMap[res.confirmationCode] : null;
        return {
          ...res,
          guestName: guestInfo?.guestName || (res.confirmationCode ? `Guest (${res.confirmationCode})` : "Airbnb Guest"),
          guestPhone: guestInfo?.phone || (res.phoneEnd ? `Ends in ${res.phoneEnd}` : ""),
          amount: guestInfo?.amount || 0,
        };
      });

      return NextResponse.json({
        success: true,
        isRealtime: true,
        lastSync: syncData.lastSyncedAt,
        property: {
          ...syncData,
          reservations: enrichedReservations,
        },
        activeChannels: [
          { name: "Airbnb", status: "Connected · Live iCal", syncType: "2-Way Realtime", color: "#ff385c" },
          { name: "The Unique Haven Homes Direct", status: "Connected", syncType: "Master PMS", color: "#0ea5e9" },
          { name: "Homey India Hub", status: "Connected", syncType: "Host Broadcast", color: "#ff2800" },
          { name: "Booking.com", status: "Connected", syncType: "2-Way iCal Lock", color: "#003580" },
        ],
      });
    }

    // Sync all 18 properties realtime
    const multiSync = await fetchAllRealtimePropertyCalendars();

    const enrichedAllReservations = multiSync.allReservations.map((res) => {
      const guestInfo = res.confirmationCode ? guestMap[res.confirmationCode] : null;
      return {
        ...res,
        guestName: guestInfo?.guestName || (res.confirmationCode ? `Guest (${res.confirmationCode})` : "Airbnb Guest"),
        guestPhone: guestInfo?.phone || (res.phoneEnd ? `Ends in ${res.phoneEnd}` : ""),
        amount: guestInfo?.amount || 0,
      };
    });

    return NextResponse.json({
      success: true,
      isRealtime: true,
      lastSync: multiSync.timestamp,
      totalProperties: multiSync.totalProperties,
      totalReservations: multiSync.totalReservations,
      totalBlocks: multiSync.totalBlocks,
      properties: multiSync.properties.map((p) => ({
        ...p,
        reservations: p.reservations.map((r) => {
          const g = r.confirmationCode ? guestMap[r.confirmationCode] : null;
          return {
            ...r,
            guestName: g?.guestName || (r.confirmationCode ? `Guest (${r.confirmationCode})` : "Airbnb Guest"),
            guestPhone: g?.phone || (r.phoneEnd ? `Ends in ${r.phoneEnd}` : ""),
            amount: g?.amount || 0,
          };
        }),
      })),
      allReservations: enrichedAllReservations,
      activeChannels: [
        { name: "Airbnb", status: "Connected · Live iCal (18 Units)", syncType: "2-Way Realtime", color: "#ff385c" },
        { name: "The Unique Haven Homes Direct", status: "Connected", syncType: "Master PMS Engine", color: "#0ea5e9" },
        { name: "Homey India Hub", status: "Connected", syncType: "Host Broadcast Hub", color: "#ff2800" },
        { name: "Booking.com", status: "Connected", syncType: "2-Way iCal Lock", color: "#003580" },
      ],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch realtime calendar sync" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const propertyId = body.propertyId || "all";

    const guestMap = await fetchGuestMap();

    if (propertyId && propertyId !== "all" && PROPERTY_ICAL_FEEDS[propertyId]) {
      const syncData = await fetchRealtimePropertyCalendar(propertyId);
      return NextResponse.json({
        success: true,
        message: `Realtime sync refreshed for ${syncData.propertyName} across Airbnb, TUHH & Homey India.`,
        lastSync: syncData.lastSyncedAt,
        property: syncData,
      });
    }

    const multiSync = await fetchAllRealtimePropertyCalendars();

    return NextResponse.json({
      success: true,
      message: `Realtime sync successfully refreshed for all 18 properties (${multiSync.totalReservations} active reservations, ${multiSync.totalBlocks} blocked dates).`,
      lastSync: multiSync.timestamp,
      totalProperties: multiSync.totalProperties,
      totalReservations: multiSync.totalReservations,
      totalBlocks: multiSync.totalBlocks,
      properties: multiSync.properties,
      allReservations: multiSync.allReservations.map((r) => {
        const g = r.confirmationCode ? guestMap[r.confirmationCode] : null;
        return {
          ...r,
          guestName: g?.guestName || (r.confirmationCode ? `Guest (${r.confirmationCode})` : "Airbnb Guest"),
          guestPhone: g?.phone || (r.phoneEnd ? `Ends in ${r.phoneEnd}` : ""),
          amount: g?.amount || 0,
        };
      }),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Calendar synchronization failed" },
      { status: 500 }
    );
  }
}
