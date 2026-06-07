import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Wishlist from "@/app/lib/models/Wishlist";

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const { productId, name, price, image, userId } = body;

  const uid = userId || "guest";

  let wishlist = await (Wishlist as any).findOne({ userId: uid });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      userId: uid,
      items: []
    });
  }

  const exists = wishlist.items.find(
    (item:any)=> item.productId === productId
  );

  if (!exists) {
    wishlist.items.push({
      productId,
      name,
      price,
      image
    });
  }

  await wishlist.save();

  return NextResponse.json({
    success: true,
    items: wishlist.items
  });

}