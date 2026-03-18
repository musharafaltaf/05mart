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


// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import Order from "@/app/lib/models/Order";
// import Product from "@/app/lib/models/Product";

// /* ========================= */
// /* CREATE ORDER */
// /* ========================= */

// export async function POST(req:Request){

// await connectDB();

// try{

// const body = await req.json();

// const order = await Order.create({

// userId: body.userId || "guest",

// items: body.items,

// total: body.total,

// customer: body.customer,

// paymentMethod: body.paymentMethod,

// paymentProof: body.paymentProof || null,

// status: body.status || "pending",

// tracking:[
// {
// status:"Order Placed",
// date:new Date()
// }
// ]

// });

// /* REDUCE STOCK */

// for(const item of body.items){

// await (Product as any).findByIdAndUpdate(
// item._id,
// {
// $inc:{
// stock:-item.quantity,
// [`sizeStock.${item.size}`]:-item.quantity
// }
// }
// );

// }

// return NextResponse.json(order);

// }catch(err){

// console.log("ORDER CREATE ERROR:",err);

// return NextResponse.json({ error:"Order failed" },{ status:500 });

// }

// }

// /* ========================= */
// /* GET ORDERS */
// /* ========================= */

// export async function GET(req: Request){

// await connectDB();

// try{

// const { searchParams } = new URL(req.url);
// const userId = searchParams.get("userId");

// let orders;

// /* ✅ CORRECT FILTER */
// if(userId){

// orders = await Order.find({
// userId: userId
// }).sort({ createdAt:-1 });

// }else{

// /* ADMIN */
// orders = await Order.find().sort({ createdAt:-1 });

// }

// return NextResponse.json(orders);

// }catch(error){

// console.log("GET ORDERS ERROR:",error);

// return NextResponse.json([], { status:200 });

// }

// }


import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";
import Product from "@/app/lib/models/Product";

/* ========================= */
/* CREATE ORDER */
/* ========================= */

export async function POST(req: Request) {

  await connectDB();

  try {

    const body = await req.json();

    if (!body.items || !body.customer) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    const order = await Order.create({

      userId: body.userId || "guest",
      items: body.items,
      total: body.total,
      customer: body.customer,

      paymentMethod: body.paymentMethod || "cod",
      paymentProof: body.paymentProof || null,

      status:
        body.paymentMethod === "razorpay"
          ? "paid"
          : body.paymentMethod === "upi"
          ? "pending_verification"
          : "pending",

      tracking: [
        {
          status: "Order Placed",
          date: new Date()
        }
      ]

    });

    /* UPDATE STOCK */
    for (const item of body.items) {

      try {

        await (Product as any).findByIdAndUpdate(
          item._id,
          {
            $inc: {
              stock: -item.quantity,
              ...(item.size && {
                [`sizeStock.${item.size}`]: -item.quantity
              })
            }
          }
        );

      } catch (err) {
        console.log("STOCK ERROR:", err);
      }

    }

    return NextResponse.json(order);

  } catch (err) {

    console.log("ORDER ERROR:", err);

    return NextResponse.json(
      { error: "Order failed" },
      { status: 500 }
    );
  }
}

/* ========================= */
/* GET ORDERS (FINAL FIX) */
/* ========================= */

export async function GET(req: Request) {

  try {

    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    console.log("Fetching orders for:", userId);

    let orders;

    if (userId) {
      orders = await Order.find({ userId }).sort({ createdAt: -1 });
    } else {
      orders = await Order.find().sort({ createdAt: -1 });
    }

    /* ✅ SAFETY FIX */
    if (!orders || !Array.isArray(orders)) {
      console.log("Orders not array, returning empty");
      return NextResponse.json([]);
    }

    /* ✅ CONVERT TO JSON SAFE */
    const safeOrders = orders.map((o:any) => ({
      ...o.toObject(),
      _id: o._id.toString()
    }));

    return NextResponse.json(safeOrders);

  } catch (err) {

    console.log("GET ORDERS ERROR:", err);

    return NextResponse.json([], { status: 200 });
  }
}