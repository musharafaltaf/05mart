import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function POST(req: Request){

  await connectDB();

  const { orderId } = await req.json();

  const order = await Order.findById(orderId);

  if(!order){
    return NextResponse.json({ error:"Order not found" },{ status:404 });
  }

  order.status = "delivered";
  await order.save();

  return NextResponse.json({
    message:"Order delivered"
  });

}