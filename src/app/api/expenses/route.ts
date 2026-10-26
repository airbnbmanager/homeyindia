import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("property_id");

    let query = supabase
      .from("expenses")
      .select("*")
      .order("expense_date", { ascending: false });

    if (propertyId && propertyId !== "all") {
      query = query.eq("property_id", propertyId);
    }

    const { data: expenses, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ expenses: expenses || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      property_id,
      category,
      amount,
      description,
      expense_date = new Date().toISOString().split("T")[0],
      paid_by = "Praveen Singh",
      payment_mode = "UPI",
      receipt_url = null,
    } = body;

    if (!category || !amount || !description) {
      return NextResponse.json(
        { error: "Missing required fields (category, amount, description)" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("expenses")
      .insert([
        {
          property_id,
          category,
          amount: Number(amount),
          description,
          expense_date,
          paid_by,
          payment_mode,
          receipt_url,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, expense: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to add expense" }, { status: 500 });
  }
}
