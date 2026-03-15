import { NextResponse } from "next/server";
import  { connectDB }  from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function POST(req:Request){

try{

await connectDB();

const body = await req.json();

const { id, status } = body;

await Order.findByIdAndUpdate(id, { status }, { new: true } as any);

return NextResponse.json({
  success: true
});

}catch(err){

return NextResponse.json(
{error:"Update failed"},
{status:500}
);

}

}