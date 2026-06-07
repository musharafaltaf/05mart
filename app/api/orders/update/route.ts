import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";

/* 🔥 ADD THESE */
import Referral from "@/app/lib/models/Referral";
import User from "@/app/lib/models/Users";
import ScratchCard from "@/app/lib/models/ScratchCard";
import Notification from "@/app/lib/models/Notification";

export async function POST(req: Request){

try{

await connectDB();

const { orderId, status } = await req.json();

/* UPDATE ORDER */
await Order.findByIdAndUpdate(orderId as any, { status });

const order = await Order.findById(orderId);
/* ================= REFERRAL SYSTEM ================= */

/* 🔥 ONLY RUN WHEN DELIVERED */
if(order && status === "delivered"){

  const referral = await Referral.findOne({
    referredUser: order.userId.toString()
  } as any);

  if(referral && referral.status){

    if(!referral.status.ordered){
      referral.status.ordered = true;
    }

    if(!referral.status.delivered){

      referral.status.delivered = true;

      if(referral.status.rewardGiven === false){

        const reward = Math.floor(Math.random()*11) + 20;

        referral.status.rewardGiven = true;

        await User.findByIdAndUpdate(
          referral.referrer,
          { $inc: { wallet: reward } },
          { new: true } as any
        );

        await ScratchCard.create({
          user: referral.referrer,
          amount: reward,
          isScratched: false
        });

        /* ✅ NOTIFICATION HERE */
        await Notification.create({
          userId: referral.referrer.toString(),
          message: `You earned ₹${reward} 🎁`,
          type: "reward"
        });

        console.log("💰 Reward given:", reward);
      }

    }

    await referral.save();
  }
}



return NextResponse.json({
  success: true
});

}catch(err){

console.log(err);

return NextResponse.json({
error:"Failed to update order"
});

}

}