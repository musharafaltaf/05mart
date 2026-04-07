import Razorpay from "razorpay";
import { NextResponse } from "next/server";



const razorpay = new Razorpay({
key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {

try{

const { amount } = await req.json();

/* ✅ VALIDATION */
if(!amount){
return NextResponse.json({ error: "Amount missing" }, { status: 400 });
}

const options = {
amount: Number(amount) * 100,
currency: "INR",
receipt: "order_" + Date.now(),
};

const order = await razorpay.orders.create(options);

return NextResponse.json(order);

}catch(error){

console.log("RAZORPAY ERROR:", error);

return NextResponse.json(
{ error: "Razorpay failed" },
{ status: 500 }
);

}

}