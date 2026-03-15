export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import  { connectDB }   from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET(req: Request) {

  try {

    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    }as any).limit(6);

    return NextResponse.json(products);

  } catch (error) {

    console.error("Product search error:", error);

    return NextResponse.json([]);

  }

}