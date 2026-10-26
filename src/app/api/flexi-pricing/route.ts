import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("flexi_pricing_rules")
      .select("*")
      .order("created_at");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ rules: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, active, value } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing rule id" }, { status: 400 });
    }

    const updates: any = {};
    if (typeof active === "boolean") updates.active = active;
    if (value !== undefined) updates.value = Number(value);

    const { data, error } = await supabase
      .from("flexi_pricing_rules")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, rule: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
