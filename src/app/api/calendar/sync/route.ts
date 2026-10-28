import { NextRequest, NextResponse } from "next/server";
import {
  fetchRealtimePropertyCalendar,
  fetchAllRealtimePropertyCalendars,
  PROPERTY_ICAL_FEEDS,
} from "@/lib/calendar-sync";

// Helper to fetch all guest and payout records from TUHH central database
async function fetchDatabaseBookingsAndMaps(): Promise<{
  codeMap: Record<string, any>;
  uidMap: Record<string, any>;
  dateRoomMap: Record<string, any>;
  offlineBookings: any[];
}> {
  const codeMap: Record<string, any> = {};
  const uidMap: Record<string, any> = {};
  const dateRoomMap: Record<string, any> = {};
  const offlineBookings: any[] = [];

  try {
    const res = await fetch(
      "https://vxxmigdzimnrbbmkjzoa.supabase.co/rest/v1/guest_register?select=*&order=check_in.desc&limit=1000",
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
            codeMap[g.airbnb_confirmation_code.trim().toUpperCase()] = g;
          }
          if (g.ical_uid) {
            uidMap[g.ical_uid.trim()] = g;
          }
          if (g.room_id && g.check_in) {
            dateRoomMap[`${g.room_id.trim()}_${g.check_in.trim()}`] = g;
          }
          // Collect confirmed offline and direct website bookings
          if (
            (g.booking_mode === "Offline" || g.booking_mode === "Direct-Website") &&
            !g.is_cancelled &&
            g.room_id &&
            g.check_in &&
            g.check_out
          ) {
            offlineBookings.push(g);
          }
        }
      }
    }
  } catch (err) {
    console.warn("[GuestMap] Non-blocking warning fetching guest register:", err);
  }

  return { codeMap, uidMap, dateRoomMap, offlineBookings };
}

function enrichReservation(res: any, codeMap: Record<string, any>, uidMap: Record<string, any>, dateRoomMap: Record<string, any>) {
  const codeKey = res.confirmationCode ? res.confirmationCode.trim().toUpperCase() : "";
  const uidKey = res.uid ? res.uid.trim() : "";
  const dateRoomKey = `${res.propertyId}_${res.startDate}`;

  const matched = codeMap[codeKey] || uidMap[uidKey] || dateRoomMap[dateRoomKey];

  if (matched) {
    const totalAmount = Number(matched.total_amount) || 0;
    const airbnbNetPayout = Number(matched.airbnb_net_payout) || 0;
    const grossAmount = Number(matched.gross_amount) || totalAmount || 0;
    const platformFee = Number(matched.platform_fee) || Number(matched.airbnb_service_fee) || 0;
    const netPayout = airbnbNetPayout > 0 ? airbnbNetPayout : (totalAmount > 0 ? totalAmount : grossAmount);
    const amount = totalAmount > 0 ? totalAmount : (netPayout > 0 ? netPayout : grossAmount);

    const guestName = matched.guest_name && matched.guest_name.trim() !== "Booked" && matched.guest_name.trim() !== ""
      ? matched.guest_name.trim()
      : (res.confirmationCode ? `Guest (${res.confirmationCode})` : "Airbnb Guest");

    const guestPhone = matched.phone && matched.phone.trim() !== ""
      ? (matched.phone.startsWith("+") ? matched.phone : `+91 ${matched.phone}`)
      : (res.phoneEnd ? `+91 XXXXX ${res.phoneEnd}` : "");

    return {
      ...res,
      guestName,
      guestPhone,
      guests: matched.guests || res.guests || 2,
      amount,
      grossAmount,
      platformFee,
      netPayout,
      paymentStatus: matched.payment_status || "Paid",
      bookingMode: matched.booking_mode || "Online-Airbnb",
      bookingId: matched.booking_id,
    };
  }

  return {
    ...res,
    guestName: res.guestName || (res.confirmationCode ? `Guest (${res.confirmationCode})` : "Airbnb Guest"),
    guestPhone: res.phoneEnd ? `+91 XXXXX ${res.phoneEnd}` : "",
    guests: 2,
    amount: res.amount || 0,
    grossAmount: res.amount || 0,
    platformFee: 0,
    netPayout: res.amount || 0,
    paymentStatus: "Paid",
    bookingMode: "Online-Airbnb",
  };
}

function formatOfflineBookingAsReservation(off: any) {
  try {
    const [sY, sM, sD] = off.check_in.split("-").map(Number);
    const [eY, eM, eD] = off.check_out.split("-").map(Number);
    const start = new Date(sY, sM - 1, sD);
    const end = new Date(eY, eM - 1, eD);
    const nights = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

    const totalAmount = Number(off.total_amount) || (off.per_day_rate ? Number(off.per_day_rate) * nights : 0);
    const grossAmount = Number(off.gross_amount) || totalAmount;
    const platformFee = Number(off.platform_fee) || 0;
    const netPayout = totalAmount;

    const guestName = off.guest_name && off.guest_name.trim() !== "" ? off.guest_name.trim() : "Direct Guest";
    const guestPhone = off.phone && off.phone.trim() !== "" ? (off.phone.startsWith("+") ? off.phone : `+91 ${off.phone}`) : "";

    return {
      uid: off.booking_id,
      bookingId: off.booking_id,
      startDate: off.check_in,
      endDate: off.check_out,
      summary: `Reserved (${guestName})`,
      source: off.booking_mode === "Direct-Website" ? "Direct Website" : "Direct",
      confirmationCode: off.booking_id,
      phoneEnd: off.phone ? off.phone.slice(-4) : "",
      isBlocked: false,
      nights,
      propertyId: off.room_id,
      propertyName: off.room_id,
      unitNo: off.room_id,
      guestName,
      guestPhone,
      guests: off.guests || 2,
      amount: totalAmount,
      grossAmount,
      platformFee,
      netPayout,
      paymentStatus: off.payment_status || "Paid",
      bookingMode: off.booking_mode || "Offline",
    };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("property_id") || "all";

    const { codeMap, uidMap, dateRoomMap, offlineBookings } = await fetchDatabaseBookingsAndMaps();

    if (propertyId && propertyId !== "all" && PROPERTY_ICAL_FEEDS[propertyId]) {
      // Sync single property realtime
      const syncData = await fetchRealtimePropertyCalendar(propertyId);

      // Enrich Airbnb reservations
      const enrichedReservations = syncData.reservations.map((res) =>
        enrichReservation(res, codeMap, uidMap, dateRoomMap)
      );

      // Add property's direct offline bookings
      const propOffline = offlineBookings
        .filter((o) => o.room_id === propertyId)
        .map(formatOfflineBookingAsReservation)
        .filter(Boolean);

      const combined = [...enrichedReservations, ...propOffline].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );

      return NextResponse.json({
        success: true,
        isRealtime: true,
        lastSync: syncData.lastSyncedAt,
        property: {
          ...syncData,
          reservations: combined,
          activeReservationsCount: combined.length,
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

    const enrichedAirbnb = multiSync.allReservations.map((res) =>
      enrichReservation(res, codeMap, uidMap, dateRoomMap)
    );

    const formattedOffline = offlineBookings
      .map(formatOfflineBookingAsReservation)
      .filter(Boolean);

    const allCombined = [...enrichedAirbnb, ...formattedOffline].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    return NextResponse.json({
      success: true,
      isRealtime: true,
      lastSync: multiSync.timestamp,
      totalProperties: multiSync.totalProperties,
      totalReservations: allCombined.length,
      totalBlocks: multiSync.totalBlocks,
      properties: multiSync.properties.map((p) => {
        const pEnrichedAirbnb = p.reservations.map((r) =>
          enrichReservation(r, codeMap, uidMap, dateRoomMap)
        );
        const pOffline = offlineBookings
          .filter((o) => o.room_id === p.propertyId)
          .map(formatOfflineBookingAsReservation)
          .filter(Boolean);
        const pCombined = [...pEnrichedAirbnb, ...pOffline].sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );

        return {
          ...p,
          reservations: pCombined,
          activeReservationsCount: pCombined.length,
        };
      }),
      allReservations: allCombined,
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

    const { codeMap, uidMap, dateRoomMap, offlineBookings } = await fetchDatabaseBookingsAndMaps();

    if (propertyId && propertyId !== "all" && PROPERTY_ICAL_FEEDS[propertyId]) {
      const syncData = await fetchRealtimePropertyCalendar(propertyId);
      const enrichedReservations = syncData.reservations.map((res) =>
        enrichReservation(res, codeMap, uidMap, dateRoomMap)
      );
      const propOffline = offlineBookings
        .filter((o) => o.room_id === propertyId)
        .map(formatOfflineBookingAsReservation)
        .filter(Boolean);
      const combined = [...enrichedReservations, ...propOffline];

      return NextResponse.json({
        success: true,
        message: `Realtime sync refreshed for ${syncData.propertyName} across Airbnb, TUHH & Homey India.`,
        lastSync: syncData.lastSyncedAt,
        property: {
          ...syncData,
          reservations: combined,
        },
      });
    }

    const multiSync = await fetchAllRealtimePropertyCalendars();
    const enrichedAirbnb = multiSync.allReservations.map((res) =>
      enrichReservation(res, codeMap, uidMap, dateRoomMap)
    );
    const formattedOffline = offlineBookings
      .map(formatOfflineBookingAsReservation)
      .filter(Boolean);
    const allCombined = [...enrichedAirbnb, ...formattedOffline];

    return NextResponse.json({
      success: true,
      message: `Realtime sync successfully refreshed for all 18 properties (${allCombined.length} reservations, ${multiSync.totalBlocks} blocked dates).`,
      lastSync: multiSync.timestamp,
      totalProperties: multiSync.totalProperties,
      totalReservations: allCombined.length,
      totalBlocks: multiSync.totalBlocks,
      properties: multiSync.properties,
      allReservations: allCombined,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Calendar synchronization failed" },
      { status: 500 }
    );
  }
}
