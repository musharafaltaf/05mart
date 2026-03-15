import { NextResponse } from "next/server";
import  { connectDB }   from "@/app/lib/mongodb";
import Cart from "@/app/lib/models/Cart";

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const { productId, action } = body;

  const cart = await Cart.findOne({ userId: "guest" } as any);

  if (!cart) {
    return NextResponse.json({ items: [] });
  }

  const item = cart.items.find(
    (i:any) => String(i.productId) === String(productId)
  );

  if (!item) {
    return NextResponse.json(cart);
  }

  if (action === "increase") {
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i:any) => String(i.productId) !== String(productId)
      );
    }
  }

  await cart.save();

  return NextResponse.json({
    items: cart.items
  });

}