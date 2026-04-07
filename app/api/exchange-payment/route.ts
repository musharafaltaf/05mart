import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {

try{

const body = await req.json();

const razorpay = new Razorpay({
key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
key_secret: process.env.RAZORPAY_KEY_SECRET!
});

const order = await razorpay.orders.create({
amount: body.amount * 100,
currency: "INR"
});

return NextResponse.json(order);

}catch(err){

console.log("EXCHANGE PAYMENT ERROR:", err);

return NextResponse.json(
{ error: "Payment failed" },
{ status: 500 }
);

}

}