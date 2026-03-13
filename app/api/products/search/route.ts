import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET(req: Request) {

  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const products = await Product.find({
    name: { $regex: query, $options: "i" }
  });

  return NextResponse.json(products);

}