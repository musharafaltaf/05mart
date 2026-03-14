import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Cart from "@/app/lib/models/Cart";

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const { productId } = body;

  const cart = await Cart.findOne({ userId: "guest" } as any);

  if (!cart) {
    return NextResponse.json({ items: [] });
  }

  cart.items = cart.items.filter(
    (item:any) => String(item.productId) !== String(productId)
  );

  await cart.save();

  return NextResponse.json({
    items: cart.items
  });

}