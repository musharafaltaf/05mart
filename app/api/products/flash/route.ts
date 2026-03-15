import { NextResponse } from "next/server";
import  { connectDB }  from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET() {

  try {

    await connectDB();

    // fetch only flash sale products
    const products = await (Product as any).find({ flashSale: true });

    return NextResponse.json(products);

  } catch (error) {

    console.error("Flash products error:", error);

    return NextResponse.json(
      { error: "Failed to fetch flash products" },
      { status: 500 }
    );

  }

}