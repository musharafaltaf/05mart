// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import Order from "@/app/lib/models/Order";

// export async function GET(req: Request, { params }: any) {

//   try {

//     await connectDB();

//     const order = await Order.findById(params.id);

//     if (!order) {
//       return NextResponse.json({ error: "Order not found" }, { status: 404 });
//     }

//     return NextResponse.json(order);

//   } catch (error) {

//     console.log("ORDER FETCH ERROR:", error);

//     return NextResponse.json({ error: "Server error" }, { status: 500 });

//   }

// }


import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function GET(
req: Request,
{ params }: { params: { id: string } }
){

try{

await connectDB();

const order = await (Order as any).findById(params.id);

if(!order){
return NextResponse.json(
{ error: "Order not found" },
{ status:404 }
);
}

return NextResponse.json(order);

}catch(err){

console.log("ORDER FETCH ERROR:",err);

return NextResponse.json(
{ error:"Server error" },
{ status:500 }
);

}

}