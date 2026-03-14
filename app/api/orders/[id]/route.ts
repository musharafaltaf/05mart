import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Order from "../../../lib/models/Order";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    await Order.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Order deleted",
    });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}