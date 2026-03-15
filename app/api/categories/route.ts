import { NextResponse } from "next/server";
import Category from "@/app/lib/models/Category";
import  { connectDB }   from "@/app/lib/mongodb";

export async function GET(){

await connectDB();
const data = await Category.find();

return NextResponse.json(data);

}

export async function POST(req:Request){

await connectDB();

const body = await req.json();

const category = await Category.create(body);

return NextResponse.json(category);

}