import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Review from "@/app/lib/models/Review";

export async function GET(req:Request){

await connectDB();

try{

const { searchParams } = new URL(req.url);

const productId = searchParams.get("productId");

let reviews;

if(productId){

reviews = await (Review as any).find({ productId });

}else{

reviews = await Review.find();

}

return NextResponse.json(reviews);

}catch(error){

return NextResponse.json(
{error:"Failed to fetch reviews"},
{status:500}
);

}

}

export async function POST(req:Request){

await connectDB();

try{

const body = await req.json();

const review = await Review.create(body);

return NextResponse.json(review);

}catch(error){

return NextResponse.json(
{error:"Failed to create review"},
{status:500}
);

}

}