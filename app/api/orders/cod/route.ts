import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function POST(req: Request){

await connectDB();

try{

const body = await req.json();

console.log("COD ORDER:", body);

/* BASIC VALIDATION */
if(!body.items || !body.customer){
return NextResponse.json({error:"Invalid data"},{status:400});
}

/* CREATE ORDER (NO PAYMENT LOGIC) */
const order = await Order.create({

userId: body.userId || "guest",

items: body.items,

total: Number(body.total) || 0,

customer: body.customer,

paymentMethod: "cod",

status: "pending",

tracking:[
{
status:"Order Placed",
date:new Date()
}
]

});

/* ✅ NO STOCK RISK (OPTIONAL ADD LATER) */

return NextResponse.json(order);

}catch(err){

console.log("COD ERROR:", err);

return NextResponse.json({error:"COD failed"},{status:500});

}

}