import { NextResponse } from "next/server";
import Banner from "@/app/lib/models/Banner";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(){

await connectDB();

const banners = await Banner.find();

return NextResponse.json(banners);

}

export async function POST(req:Request){

await connectDB();

const body = await req.json();

const banner = await Banner.create(body);

return NextResponse.json(banner);

}