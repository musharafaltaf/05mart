// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import Order from "@/app/lib/models/Order";

// export async function POST(req: Request) {

//   try {

//     await connectDB();

//     const body = await req.json();

//     const order = await Order.create({
//       userId: "guest",
//       items: body.items,
//       total: body.total,
//     customer: body.customer || {},
//       paymentMethod: body.paymentMethod,
//       paymentProof: body.paymentProof || null,
//       status: "pending",
//       reviewGiven: false,
//       returnStatus: null
//     });

//     return NextResponse.json(order);

//   } catch (error) {

//     console.error("ORDER CREATE ERROR:", error);

//     return NextResponse.json(
//       { error: "Failed to create order" },
//       { status: 500 }
//     );

//   }

// }

// export async function GET() {

//   try {

//     await connectDB();

//     const orders = await Order.find().sort({ createdAt: -1 });

//     return NextResponse.json(orders);

//   } catch (error) {

//     console.error("GET ORDERS ERROR:", error);

//     return NextResponse.json([], { status: 200 });

//   }

// }


import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

export async function POST(req:Request){

await connectDB();

const body = await req.json();

const order = await Order.create({

userId:"guest",

items:body.items,

total:body.total,

customer:body.customer,

paymentMethod:body.paymentMethod,

paymentProof:body.paymentProof || null,

status:"pending",

tracking:[
{
status:"Order Placed",
date:new Date()
}
]

});

return NextResponse.json(order);

}

export async function GET(){

await connectDB();

const orders = await Order.find().sort({createdAt:-1});

return NextResponse.json(orders);

}