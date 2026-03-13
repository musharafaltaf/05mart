import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Order from "../../lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders ?? []);

  } catch (error) {
    console.error("ORDERS API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load orders" },
      { status: 500 }
    );
  }
}