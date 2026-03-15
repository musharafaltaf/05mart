import { NextResponse } from "next/server";
import { connectDB }  from "@/app/lib/mongodb";
import Cart from "@/app/lib/models/Cart";

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const { productId, name, price, oldPrice, image } = body;

  let cart = await Cart.findOne({ userId: "guest" } as any);
  if (!cart) {
    cart = await Cart.create({
      userId: "guest",
      items: []
    });
  }

  const existingItem = cart.items.find(
    (item:any) => item.productId === productId
  );

  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cart.items.push({
      productId,
      name,
      price,
      oldPrice,
      image,
      quantity: 1
    });

  }

  await cart.save();

  return NextResponse.json(cart);

}