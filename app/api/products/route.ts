import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET() {

  try {

    await connectDB();

    const products = await Product.find();

    return NextResponse.json(products);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );

  }

}

export async function POST(req: Request) {

  try {

    const { name, price, discount, image, description, category, stock } =
      await req.json();

    await connectDB();

    const product = await Product.create({
      name,
      price,
      discount,
      image,
      description,
      category,
      stock
    });

    return NextResponse.json(product);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );

  }

}