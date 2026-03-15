import { NextResponse } from "next/server";
import { connectDB }  from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    // return ARRAY directly
    return NextResponse.json(orders);
  } catch (err) {
    console.log("GET /api/orders error:", err);
    return NextResponse.json([], { status: 200 });
  }
}