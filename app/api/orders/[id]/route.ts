import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Order from "../../../lib/models/Order";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const order = await Order.findById(params.id);

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
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    await Order.findByIdAndDelete(params.id);

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