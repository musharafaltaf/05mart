import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request){

try{

const body = await req.json();

const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

const sign = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSign = crypto
.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
.update(sign.toString())
.digest("hex");

if(expectedSign === razorpay_signature){

return NextResponse.json({ success:true });

}else{

return NextResponse.json({ success:false });

}

}catch(err){

console.log("VERIFY PAYMENT ERROR:",err);

return NextResponse.json({ success:false });

}

}