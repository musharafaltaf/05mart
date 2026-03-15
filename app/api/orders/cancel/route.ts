import { NextResponse } from "next/server";
import  { connectDB }  from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function POST(req: Request) {

  try {

    await connectDB();

    const body = await req.json();
    const { orderId } = body;

    const order = await (Order as any).findById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    /* cancel allowed only before shipped */

    if (
      order.status === "shipped" ||
      order.status === "out_for_delivery" ||
      order.status === "delivered"
    ) {
      return NextResponse.json(
        { error: "Order cannot be cancelled now" },
        { status: 400 }
      );
    }

    order.status = "cancelled";

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order cancelled"
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Cancel failed" },
      { status: 500 }
    );

  }

}