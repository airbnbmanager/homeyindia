import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("channel_settings")
      .select("*")
      .order("channel_name");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ channels: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { channel_id, connected, markup_percent, auto_sync_interval_mins, ical_import_url } = body;

    if (!channel_id) {
      return NextResponse.json({ error: "Missing channel_id" }, { status: 400 });
    }

    const updates: any = {};
    if (typeof connected === "boolean") updates.connected = connected;
    if (markup_percent !== undefined) updates.markup_percent = Number(markup_percent);
    if (auto_sync_interval_mins !== undefined) updates.auto_sync_interval_mins = Number(auto_sync_interval_mins);
    if (ical_import_url !== undefined) updates.ical_import_url = ical_import_url;
    updates.last_sync_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("channel_settings")
      .update(updates)
      .eq("channel_id", channel_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, channel: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
