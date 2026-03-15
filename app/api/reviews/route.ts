import { NextResponse } from "next/server";
import { connectDB }  from "@/app/lib/mongodb";
import Review from "@/app/lib/models/Review";

export async function POST(req:Request){

await connectDB();

const body = await req.json();

const review = await Review.create(body);

return NextResponse.json(review);

}

export async function GET(req:Request){

await connectDB();

const {searchParams} = new URL(req.url);

const productId = searchParams.get("productId");

const reviews = await Review.find({productId}as any);

return NextResponse.json(reviews);

}