import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";
import Notification from "@/app/lib/models/Notification";
import Referral from "@/app/lib/models/Referral";

export async function POST(req: Request){

  try{

    await connectDB();

    const { userId, amount } = await req.json();

    if(!userId){
      return NextResponse.json(
        { error:"User required" },
        { status:400 }
      );
    }

    /* CREATE ORDER */
    const order = await Order.create({
      userId,
      total: amount,
      status: "pending"
    });

    /* ================= REFERRAL NOTIFICATION ================= */

    const referral = await Referral.findOne({
      referredUser: userId
    } as any);

    if(referral){

      await Notification.create({
        userId: referral.referrer.toString(),
        message: "Your referral placed an order 🛒",
        type: "order"
      });

    }

    return NextResponse.json({
      message:"Order placed",
      order
    });

  }catch(err){

    console.log("ORDER ERROR:", err);

    return NextResponse.json(
      { error:"Order failed" },
      { status:500 }
    );

  }

}