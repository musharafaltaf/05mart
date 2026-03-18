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


// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import Order from "@/app/lib/models/Order";

// export async function GET(
// req: Request,
// { params }: { params: { id: string } }
// ){

// try{

// await connectDB();

// const order = await (Order as any).findById(params.id);

// if(!order){
// return NextResponse.json(
// { error: "Order not found" },
// { status:404 }
// );
// }

// return NextResponse.json(order);

// }catch(err){

// console.log("ORDER FETCH ERROR:",err);

// return NextResponse.json(
// { error:"Server error" },
// { status:500 }
// );

// }

// }




// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import Order from "@/app/lib/models/Order";

// /* ========================= */
// /* UPDATE ORDER STATUS */
// /* ========================= */

// export async function PATCH(req: Request, { params }: any){

// await connectDB();

// try{

// const { id } = params;
// const body = await req.json();

// /* ✅ VALIDATION */
// if(!body.status){
// return NextResponse.json({ error:"Status required" },{ status:400 });
// }

// /* ✅ UPDATE */
// const order = await Order.findByIdAndUpdate(
// id,
// {
// status: body.status,

// /* OPTIONAL TRACKING */
// $push:{
// tracking:{
// status: body.status,
// date: new Date()
// }
// }
// },

//    {new:true}
// );

// if(!order){
// return NextResponse.json({ error:"Order not found" },{ status:404 });
// }

// return NextResponse.json(order);

// }catch(error){

// console.log("STATUS UPDATE ERROR:", error);

// return NextResponse.json({ error:"Update failed" },{ status:500 });

// }

// }


import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

/* ========================= */
/* GET SINGLE ORDER */
/* ========================= */

export async function GET(req: Request, { params }: any) {

  await connectDB();

  try {

    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const safeTracking = Array.isArray(order.tracking)
      ? order.tracking
      : [];

    const safeOrder = {
      ...order.toObject(),
      tracking: safeTracking
    };

    return NextResponse.json(safeOrder);

  } catch (err) {

    console.log("GET ORDER ERROR:", err);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}

/* ========================= */
/* UPDATE ORDER */
/* ========================= */

export async function PATCH(req: Request, { params }: any){

  await connectDB();

  try{

    const body = await req.json();

    const updateData:any = {};

    /* ========================= */
    /* EXISTING STATUS */
    /* ========================= */

    if(body.status){
      updateData.status = body.status;

      updateData.$push = {
        tracking:{
          status: body.status,
          date: new Date()
        }
      };
    }

    /* ========================= */
    /* ✅ NEW RETURN APPROVAL */
    /* ========================= */

    if(body.returnStatus){

      updateData["returnRequest.status"] = body.returnStatus;

      if(body.returnStatus === "approved"){
        updateData["returnRequest.approvedAt"] = new Date();
      }

    }

    const order = await Order.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    return NextResponse.json(order);

  }catch(err){

    console.log("PATCH ERROR:", err);

    return NextResponse.json(
      { error:"Update failed" },
      { status:500 }
    );

  }

}