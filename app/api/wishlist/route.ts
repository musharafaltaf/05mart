import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Wishlist from "@/app/lib/models/Wishlist";

export async function GET() {

  await connectDB();

  const wishlist = await Wishlist.findOne({ userId: "guest" });

  return NextResponse.json(wishlist || { items: [] });

}