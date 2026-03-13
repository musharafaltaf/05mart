import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET() {

  try {

    await connectDB();

    const products = await Product.find();

    return NextResponse.json(products);

  } catch (error) {

    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json([], { status: 200 });

  }

}

export async function POST(req: Request) {

  try {

    await connectDB();

    const body = await req.json();

    const product = await Product.create(body);

    return NextResponse.json(product);

  } catch (error) {

    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );

  }

}