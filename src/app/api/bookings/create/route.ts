import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      property_id,
      start_date,
      end_date,
      guest_name,
      guest_phone,
      guest_email,
      channel = "Direct",
      total_price,
      advance_paid = 0,
      balance_due = 0,
      payment_status = "Paid in Full",
      booking_status = "upcoming",
      adults = 2,
      children = 0,
    } = body;

    if (!property_id || !start_date || !end_date || !total_price || !guest_name) {
      return NextResponse.json(
        { error: "Missing required booking details (property_id, start_date, end_date, total_price, guest_name)" },
        { status: 400 }
      );
    }

    // Step 1: Video 10 Concurrency Guard - Check if date range overlaps with any confirmed booking
    // An overlap occurs if (existing_start < new_end) AND (existing_end > new_start)
    const { data: conflicts, error: conflictErr } = await supabase
      .from("bookings")
      .select("id, start_date, end_date, guest_name, channel")
      .eq("property_id", property_id)
      .neq("status", "cancelled")
      .lt("start_date", end_date)
      .gt("end_date", start_date);

    if (conflictErr) {
      return NextResponse.json({ error: conflictErr.message }, { status: 500 });
    }

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        {
          error: "Double-Booking Conflict detected! Dates are already locked by an active reservation.",
          conflictingBooking: conflicts[0],
        },
        { status: 409 }
      );
    }

    // Step 2: Insert confirmed booking into Supabase
    const { data: newBooking, error: insertErr } = await supabase
      .from("bookings")
      .insert([
        {
          property_id,
          start_date,
          end_date,
          total_price: Number(total_price),
          status: "confirmed",
          guest_name,
          guest_phone: guest_phone || "",
          guest_email: guest_email || "",
          channel,
          net_payout: Number(total_price),
          advance_paid: Number(advance_paid),
          balance_due: Number(balance_due),
          payment_status,
          booking_status,
        },
      ])
      .select()
      .single();

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create booking" }, { status: 500 });
  }
}
