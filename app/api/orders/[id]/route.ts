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
import Notification from "@/app/lib/models/Notification";

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

    return NextResponse.json(order);

  } catch (err) {

    console.log("GET ORDER ERROR:", err);

    return NextResponse.json(
      { error: "Failed to load order" },
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
    const pushData:any = {};

    /* ========================= */
    /* ORDER STATUS UPDATE */
    /* ========================= */

    if(body.status){

      updateData.status = body.status;

      pushData.tracking = {
        status: body.status,
        date: new Date()
      };

    }

    /* ========================= */
    /* CREATE RETURN REQUEST */
    /* ========================= */

    if(body.returnRequest){

      updateData.returnRequest = {
        ...body.returnRequest,
        requested: true,
        requestedAt: new Date(),
        timeline:[
          {
            status:"Return Requested",
            date:new Date()
          }
        ]
      };

    }

    /* ========================= */
    /* UPDATE RETURN STATUS */
    /* ========================= */

    if(body.returnStatus){

      updateData["returnRequest.status"] = body.returnStatus;

      pushData["returnRequest.timeline"] = {
        status: body.returnStatus,
        date: new Date()
      };

      if(body.returnStatus === "approved"){
        updateData["returnRequest.approvedAt"] = new Date();
      }

      if(body.returnStatus === "completed"){
        updateData["returnRequest.completedAt"] = new Date();
        updateData["returnRequest.refundStatus"] = "completed";
      }

    }

    /* ========================= */
    /* CREATE EXCHANGE REQUEST */
    /* ========================= */

    if(body.exchangeRequest){

      const existingOrder = await Order.findById(params.id);

      if(
        existingOrder?.exchangeRequest?.requested &&
        existingOrder?.exchangeRequest?.status !== "cancelled"
      ){
        return NextResponse.json(existingOrder);
      }

      updateData.exchangeRequest = {
        ...body.exchangeRequest,
        requested: true,
        requestedAt: new Date(),
        timeline:[
          {
            status:"Exchange Requested",
            date:new Date()
          }
        ]
      };

      /* ========================= */
      /* AUTO STOCK UPDATE */
      /* ========================= */

      try{

        const original = body.exchangeRequest.originalProduct;
        const replacement = body.exchangeRequest.replacementProduct;

        const Product = (await import("@/app/lib/models/Product")).default;

        /* RETURN ORIGINAL STOCK */

        if(original?.id && original?.size){

          await Product.updateOne(
            { _id: original.id },
            { $inc: { [`sizeStock.${original.size}`]: 1 } }
          );

        }

        /* REDUCE REPLACEMENT STOCK */

        if(replacement?.id && replacement?.size){

          await Product.updateOne(
            { _id: replacement.id },
            { $inc: { [`sizeStock.${replacement.size}`]: -1 } }
          );

        }

      }catch(err){
        console.log("EXCHANGE STOCK UPDATE ERROR:",err);
      }

    }

    /* ========================= */
    /* UPDATE EXCHANGE STATUS */
    /* ========================= */

    if(body.exchangeStatus){

      updateData["exchangeRequest.status"] = body.exchangeStatus;

      pushData["exchangeRequest.timeline"] = {
        status: body.exchangeStatus,
        date:new Date()
      };

      if(body.exchangeStatus === "approved"){
        updateData["exchangeRequest.approvedAt"] = new Date();
      }

      /* ========================= */
      /* CREATE REPLACEMENT ORDER */
      /* ========================= */

      if(body.exchangeStatus === "replacement_shipped"){

        const originalOrder:any = await Order.findById(params.id).lean();

        if(originalOrder){

          if(originalOrder.exchangeRequest?.replacementOrderId){
            return NextResponse.json(originalOrder);
          }

          const replacement = originalOrder.exchangeRequest?.replacementProduct;

          if(!replacement){
            console.log("Replacement product missing in db");
            return NextResponse.json(originalOrder);
          }

          const replacementOrder:any = await Order.create({
            userId: originalOrder.userId,
            items:[
              {
                _id: replacement.id,
                name: replacement.name,
                image: replacement.image,
                size: replacement.size,
                quantity: 1,
                price: replacement.price
              }
            ],
            total: replacement.price,
            status: "processing",
            parentOrder: originalOrder._id,
            customer: originalOrder.customer,
            tracking:[
              {
                status:"processing",
                date:new Date()
              }
            ]
          } as any);

          updateData["exchangeRequest.replacementOrderId"] = replacementOrder._id;

        }

      }

    }

    /* ========================= */
    /* CANCEL EXCHANGE */
    /* ========================= */

    if(body.cancelExchange){

      const existingOrder = await Order.findById(params.id);

      const replacement = existingOrder?.exchangeRequest?.replacementProduct;

      if(replacement?.id && replacement?.size){


          const Product = (await import("@/app/lib/models/Product")).default;

          try{
          await Product.updateOne(
            { _id: replacement.id },
            { $inc: { [`sizeStock.${replacement.size}`]: 1 } }
          );

        }catch(err){
          console.log("STOCK RESTORE ERROR:",err);
        }

      }

      updateData["exchangeRequest.status"] = "cancelled";

      pushData["exchangeRequest.timeline"] = {
        status:"Exchange Cancelled",
        date:new Date()
      };

      updateData["exchangeRequest.completedAt"] = new Date();

    }

    /* ========================= */
    /* PICKUP SCHEDULING */
    /* ========================= */

    if(body.pickup){

      updateData["returnRequest.pickup"] = body.pickup;

      pushData["returnRequest.timeline"] = {
        status:"Pickup Scheduled",
        date:new Date()
      };

    }

    /* ========================= */
    /* REFUND PROCESSING */
    /* ========================= */

    if(body.refundStatus){

      updateData["returnRequest.refundStatus"] = body.refundStatus;

      pushData["returnRequest.timeline"] = {
        status:`Refund ${body.refundStatus}`,
        date:new Date()
      };

    }

    const updateObject:any = { $set:updateData };

    if(Object.keys(pushData).length > 0){
      updateObject.$push = pushData;
    }

    const order = await Order.findByIdAndUpdate(
      params.id,
      updateObject,
      { new:true }
    );

    /* ========================= */
    /* USER NOTIFICATIONS */
    /* ========================= */

    /* ========================= */
/* USER NOTIFICATIONS */
/* ========================= */

if(order?.userId){

const item = order?.items?.[0];

if(item){

/* ================= ORDER STATUS ================= */

if(body.status){

await Notification.create({

userId: order.userId,

message: `Hello ${order.customer?.name}, your order status is now "${body.status}".`,

productId: item._id,
productName: item.name,
productImage: item.image,

link: `/orders/${order._id}`,

read:false

});

}

/* ================= RETURN STATUS ================= */

if(body.returnStatus){

await Notification.create({

userId: order.userId,

message: `Hello ${order.customer?.name}, your return request status is "${body.returnStatus}".`,

productId: item._id,
productName: item.name,
productImage: item.image,

link: `/returns/${order._id}`,

read:false

});

}

/* ================= EXCHANGE STATUS ================= */

if(body.exchangeStatus){

await Notification.create({

userId: order.userId,

message: `Hello ${order.customer?.name}, your exchange request status is "${body.exchangeStatus}".`,

productId: item._id,
productName: item.name,
productImage: item.image,

link: `/exchange/${order._id}`,

read:false

});

await Notification.create({

userId: order.userId,

message:`Hello ${order.customer?.name}, your replacement order has been shipped.`,

productId:item._id,
productName:item.name,
productImage:item.image,

link:`/replacement/${order.exchangeRequest?.replacementOrderId}`,

read:false

});

}

}



    }

    return NextResponse.json(order);

  }catch(err){

    console.log("PATCH ERROR:", err);

    return NextResponse.json(
      { error:"Update failed" },
      { status:500 }
    );

  }

}