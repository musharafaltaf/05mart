import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function POST(req: Request){

await connectDB();

try{

const body = await req.json();

const order = await Order.findById(body.orderId);

if(!order){
return NextResponse.json({error:"Order not found"},{status:404});
}

/* ✅ MUST BE DELIVERED */
const delivered = order.tracking?.some(
(t:any)=>t.status === "Delivered"
);

if(!delivered){
return NextResponse.json({error:"Order not delivered"},{status:400});
}

/* ✅ 2 DAY CHECK */
const deliveredItem = order.tracking.find(
(t:any)=>t.status === "Delivered"
);

const diff = (new Date().getTime() - new Date(deliveredItem.date).getTime()) / (1000*60*60*24);

if(diff > 2){
return NextResponse.json({error:"Return window expired"},{status:400});
}

/* ✅ SAVE */
order.returnRequest = {
requested: true,
reason: body.reason,
images: body.images,
status: "requested",
requestedAt: new Date()
};

await order.save();

return NextResponse.json({success:true});

}catch(err){

console.log(err);
return NextResponse.json({error:"Return failed"},{status:500});

}

}