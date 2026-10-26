/**
 * 2-Way Calendar Synchronization Engine
 * Syncs between Airbnb, The Unique Haven Homes, and Homey India PMS
 */

export interface ParsedICalEvent {
  uid: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  summary: string;
  source: "Airbnb" | "The Unique Haven Homes" | "Homey India" | "Booking.com" | "Other";
}

/**
 * Parse standard RFC 5545 iCalendar (.ics) string into structured events
 */
export function parseICalString(icsData: string, source: ParsedICalEvent["source"] = "Other"): ParsedICalEvent[] {
  const events: ParsedICalEvent[] = [];
  const lines = icsData.split(/\r\n|\n|\r/);

  let inEvent = false;
  let currentUid = "";
  let currentStart = "";
  let currentEnd = "";
  let currentSummary = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "BEGIN:VEVENT") {
      inEvent = true;
      currentUid = "";
      currentStart = "";
      currentEnd = "";
      currentSummary = "";
      continue;
    }

    if (trimmed === "END:VEVENT") {
      if (currentStart && currentEnd) {
        events.push({
          uid: currentUid || `event-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          startDate: formatDateStr(currentStart),
          endDate: formatDateStr(currentEnd),
          summary: currentSummary || `${source} Booking`,
          source,
        });
      }
      inEvent = false;
      continue;
    }

    if (!inEvent) continue;

    if (trimmed.startsWith("UID:")) {
      currentUid = trimmed.substring(4);
    } else if (trimmed.startsWith("DTSTART")) {
      currentStart = extractDateValue(trimmed);
    } else if (trimmed.startsWith("DTEND")) {
      currentEnd = extractDateValue(trimmed);
    } else if (trimmed.startsWith("SUMMARY:")) {
      currentSummary = trimmed.substring(8);
    }
  }

  return events;
}

function extractDateValue(line: string): string {
  const colonIndex = line.indexOf(":");
  if (colonIndex !== -1) {
    return line.substring(colonIndex + 1);
  }
  return "";
}

function formatDateStr(raw: string): string {
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
