import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST() {

try{

const razorpay = new Razorpay({
key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
key_secret: process.env.RAZORPAY_SECRET!
});

const order = await razorpay.orders.create({
amount: 7000, // ₹70
currency: "INR"
});

return NextResponse.json(order);

}catch(err){

console.log("RETURN PAYMENT ERROR:",err);

return NextResponse.json(
{error:"Payment failed"},
{status:500}
);

}

}