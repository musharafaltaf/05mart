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

    /* ✅ VALIDATION */
    if (!body.items || !body.customer) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    /* 🔒 REQUIRE LOGIN */
    if (!body.userId) {
      return NextResponse.json(
        { error: "Login required" },
        { status: 401 }
      );
    }

    const order = await Order.create({

      /* ✅ USER LINKED ORDER */
      userId: body.userId,

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

    /* ========================= */
    /* UPDATE STOCK */
/* ========================= */

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
/* GET ORDERS (FINAL SECURE) */
/* ========================= */

export async function GET(req: Request) {

  try {

    await connectDB();

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    const role = searchParams.get("role");

    console.log("Fetching orders:", userId, role);

    let orders;

    /* ✅ ADMIN: ALL ORDERS */
    if (role === "admin") {
      orders = await Order.find().sort({ createdAt: -1 });
    }

    /* ✅ USER: ONLY THEIR ORDERS */
    else if (userId) {
      orders = await Order.find({ userId }).sort({ createdAt: -1 });
    }

    /* ❌ BLOCK */
    else {
      return NextResponse.json([], { status: 403 });
    }

    /* SAFETY */
    if (!orders || !Array.isArray(orders)) {
      return NextResponse.json([]);
    }

    /* CLEAN RESPONSE */
    const safeOrders = orders.map((o: any) => ({
      ...o.toObject(),
      _id: o._id.toString()
    }));

    return NextResponse.json(safeOrders);

  } catch (err) {

    console.log("GET ORDERS ERROR:", err);

    return NextResponse.json([], { status: 200 });
  }
}