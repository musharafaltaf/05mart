import { NextResponse } from "next/server";
import  { connectDB }   from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function POST(req:Request){

try{

await connectDB();

const { orderId, status } = await req.json();

await Order.findByIdAndUpdate(
  orderId as any,
  { status },
  { new: true } as any
);

return NextResponse.json({
  success: true
});
}catch(err){

console.log(err);

return NextResponse.json({
error:"Failed to update order"
});

}

}