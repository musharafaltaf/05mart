import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {

  try {

    await connectDB();

    const { id } = context.params;

    const product = await Product.findById(id);

    return NextResponse.json(product);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Product not found" },
      { status: 500 }
    );

  }

}