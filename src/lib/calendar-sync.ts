/**
 * 2-Way Realtime Calendar Synchronization Engine
 * Bridges live Airbnb iCal feeds with The Unique Haven Homes (TUHH) & Homey India PMS
 */

import { PROPERTY_ICAL_FEEDS } from "@/data/properties";
export { PROPERTY_ICAL_FEEDS };

export interface ParsedICalEvent {
  uid: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  summary: string;
  source: "Airbnb" | "The Unique Haven Homes" | "Homey India" | "Booking.com" | "Other";
  confirmationCode?: string | null;
  phoneEnd?: string | null;
  reservationUrl?: string | null;
  isBlocked?: boolean;
  nights?: number;
}

export interface RealtimePropertySyncData {
  propertyId: string;
  propertyName: string;
  unitNo: string;
  airbnbIcalUrl?: string;
  masterExportPath: string;
  lastSyncedAt: string;
  totalEvents: number;
  activeReservationsCount: number;
  blockedDatesCount: number;
  reservations: ParsedICalEvent[];
  blockedSlots: ParsedICalEvent[];
  allEvents: ParsedICalEvent[];
}

/**
 * Format date string from iCal RFC 5545 formats to YYYY-MM-DD
 */
export function formatDateStr(raw: string): string {
  if (!raw) return "";
  // If formatted as YYYYMMDD
  if (raw.length === 8 && /^\d+$/.test(raw)) {
    return `${raw.substring(0, 4)}-${raw.substring(4, 6)}-${raw.substring(6, 8)}`;
  }
  // If formatted as YYYYMMDDTHHMMSSZ
  if (raw.length >= 8 && raw.includes("T")) {
    const datePart = raw.split("T")[0];
    if (datePart.length === 8) {
      return `${datePart.substring(0, 4)}-${datePart.substring(4, 6)}-${datePart.substring(6, 8)}`;
    }
  }
  // If already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.substring(0, 10);
  }
  return raw;
}

/**
 * Compute nights between two YYYY-MM-DD dates
 */
export function calculateNights(start: string, end: string): number {
  try {
    const d1 = new Date(start).getTime();
    const d2 = new Date(end).getTime();
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  } catch {
    return 1;
  }
}

/**
 * Parse standard RFC 5545 iCalendar (.ics) string into structured events with deep metadata extraction
 */
export function parseICalString(
  icsData: string,
  source: ParsedICalEvent["source"] = "Other"
): ParsedICalEvent[] {
  if (!icsData) return [];

  // RFC 5545 line unfolding: join folded lines that start with space or tab
  const unfolded = icsData.replace(/\r?\n[ \t]/g, "");
  const blocks = unfolded.split("BEGIN:VEVENT").slice(1);
  const events: ParsedICalEvent[] = [];

  for (const block of blocks) {
    const getVal = (key: string): string => {
      const match = block.match(new RegExp(`${key}(?:;[^:]*)?:(.*)`));
      return match ? match[1].trim() : "";
    };

    const dtStartRaw = getVal("DTSTART;VALUE=DATE") || getVal("DTSTART");
    const dtEndRaw = getVal("DTEND;VALUE=DATE") || getVal("DTEND");
    const summary = getVal("SUMMARY") || `${source} Booking`;
    const uid = getVal("UID") || `ev-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const description = getVal("DESCRIPTION");

    const startDate = formatDateStr(dtStartRaw);
    const endDate = formatDateStr(dtEndRaw);

    if (!startDate || !endDate) continue;

    // Check if event is blocked / unavailable slot
    const summaryLower = summary.toLowerCase();
    const isBlocked =
      summaryLower.includes("not available") ||
      summaryLower.includes("unavailable") ||
      summaryLower.includes("blocked");

    // Extract confirmation code (e.g., HMJ5JF99PB, HM292PJ83P)
    const codeMatch = (description + " " + block).match(/\b(HM[A-Z0-9]{8,12})\b/);
    const confirmationCode = codeMatch ? codeMatch[1] : null;

    // Extract phone last 4 digits
    const phoneMatch = description.match(/Phone Number[^:]*:\s*([0-9]{4})/i);
    const phoneEnd = phoneMatch ? phoneMatch[1] : null;

    // Extract reservation URL
    const urlMatch = description.match(/https?:\/\/[^\s\\]+/i);
    const reservationUrl = urlMatch ? urlMatch[0] : null;

    const nights = calculateNights(startDate, endDate);

    events.push({
      uid,
      startDate,
      endDate,
      summary,
      source: isBlocked ? "Other" : source,
      confirmationCode,
      phoneEnd,
      reservationUrl,
      isBlocked,
      nights,
    });
  }

  return events;
}

/**
 * Fetch raw iCal text with proxy fallbacks for resilient realtime updates
 */
export async function fetchLiveIcalText(url: string): Promise<string> {
  const proxies = [
    url, // Try direct first
    `https://vxxmigdzimnrbbmkjzoa.supabase.co/functions/v1/ical-proxy?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  ];

  let lastError: any = null;

  for (const target of proxies) {
    try {
      const res = await fetch(target, {
        method: "GET",
        headers: {
          Accept: "text/calendar, text/plain, */*",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
        },
        cache: "no-store",
      });

      if (!res.ok) continue;

      const text = await res.text();
      if (text.includes("BEGIN:VCALENDAR")) {
        return text;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`Failed to fetch iCal feed from: ${url}. Error: ${lastError?.message || "Unknown"}`);
}

/**
 * Fetch realtime synchronized calendar for a specific property
 */
export async function fetchRealtimePropertyCalendar(propertyId: string): Promise<RealtimePropertySyncData> {
  const feed = PROPERTY_ICAL_FEEDS[propertyId];
  const now = new Date().toISOString();

  if (!feed || !feed.airbnbIcalUrl) {
    return {
      propertyId,
      propertyName: feed?.name || `Property ${propertyId}`,
      unitNo: feed?.unitNo || "",
      masterExportPath: `/api/calendar/${propertyId}/export.ics`,
      lastSyncedAt: now,
      totalEvents: 0,
      activeReservationsCount: 0,
      blockedDatesCount: 0,
      reservations: [],
      blockedSlots: [],
      allEvents: [],
    };
  }

  try {
    const rawIcs = await fetchLiveIcalText(feed.airbnbIcalUrl);
    const parsed = parseICalString(rawIcs, "Airbnb");

    const reservations = parsed.filter((e) => !e.isBlocked);
    const blockedSlots = parsed.filter((e) => e.isBlocked);

    return {
      propertyId,
      propertyName: feed.name,
      unitNo: feed.unitNo,
      airbnbIcalUrl: feed.airbnbIcalUrl,
      masterExportPath: feed.masterExportPath,
      lastSyncedAt: now,
      totalEvents: parsed.length,
      activeReservationsCount: reservations.length,
      blockedDatesCount: blockedSlots.length,
      reservations,
      blockedSlots,
      allEvents: parsed,
    };
  } catch (err: any) {
    console.warn(`[CalendarSync] Warning fetching iCal for ${propertyId}:`, err.message);
    return {
      propertyId,
      propertyName: feed.name,
      unitNo: feed.unitNo,
      airbnbIcalUrl: feed.airbnbIcalUrl,
      masterExportPath: feed.masterExportPath,
      lastSyncedAt: now,
      totalEvents: 0,
      activeReservationsCount: 0,
      blockedDatesCount: 0,
      reservations: [],
      blockedSlots: [],
      allEvents: [],
    };
  }
}

/**
 * Fetch realtime calendar sync for ALL 18 properties simultaneously
 */
export async function fetchAllRealtimePropertyCalendars(): Promise<{
  timestamp: string;
  totalProperties: number;
  totalReservations: number;
  totalBlocks: number;
  properties: RealtimePropertySyncData[];
  allReservations: Array<ParsedICalEvent & { propertyId: string; propertyName: string; unitNo: string }>;
}> {
  const propertyIds = Object.keys(PROPERTY_ICAL_FEEDS);

  const results = await Promise.all(
    propertyIds.map((propId) => fetchRealtimePropertyCalendar(propId))
  );

  const allReservations: Array<ParsedICalEvent & { propertyId: string; propertyName: string; unitNo: string }> = [];
  let totalReservations = 0;
  let totalBlocks = 0;

  for (const prop of results) {
    totalReservations += prop.activeReservationsCount;
    totalBlocks += prop.blockedDatesCount;

    for (const res of prop.reservations) {
      allReservations.push({
        ...res,
        propertyId: prop.propertyId,
        propertyName: prop.propertyName,
        unitNo: prop.unitNo,
      });
    }
  }

  // Sort upcoming reservations chronologically
  allReservations.sort((a, b) => a.startDate.localeCompare(b.startDate));

  return {
    timestamp: new Date().toISOString(),
    totalProperties: results.length,
    totalReservations,
    totalBlocks,
    properties: results,
    allReservations,
  };
}

/**
 * Generate standard RFC 5545 iCal string from booking events
 */
export function generateICalFeed(
  calendarName: string,
  events: Array<{
    id: string;
    startDate: string;
    endDate: string;
    summary: string;
    channel?: string;
  }>
): string {
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Homey India & The Unique Haven Homes//Calendar Sync Engine//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${calendarName}`,
    "X-WR-TIMEZONE:Asia/Kolkata",
  ];

  for (const event of events) {
    const start = event.startDate.replace(/-/g, "");
    const end = event.endDate.replace(/-/g, "");
    const uid = `sync-${event.id}@homeyindia.com`;
    const summary = event.summary || `Reserved (${event.channel || "Direct"})`;

    icsLines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${timestamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:Synchronized via Homey India PMS & Channel Manager (Channel: ${event.channel || "Direct"})`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT"
    );
  }

  icsLines.push("END:VCALENDAR");
  return icsLines.join("\r\n");
}
