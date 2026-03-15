import { NextResponse } from "next/server";
import  { connectDB }   from "@/app/lib/mongodb";
import Cart from "@/app/lib/models/Cart";

export async function GET() {

  try {

    await connectDB();

    const cart = await Cart.findOne({ userId: "guest" } as any);

    if (!cart) {
      return NextResponse.json({
        items: []
      });
    }

    return NextResponse.json({
      items: cart.items || []
    });

  } catch (error) {

    console.error("Cart API error:", error);

    return NextResponse.json(
      { items: [] },
      { status: 500 }
    );

  }

}