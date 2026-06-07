import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import ScratchCard from "@/app/lib/models/ScratchCard";
import User from "@/app/lib/models/Users";

export async function POST(req: Request){

  try{

    await connectDB();

    const { userId } = await req.json();

    /* ❗ VALIDATION */
    if(!userId){
      return NextResponse.json(
        { error: "Invalid user" },
        { status: 400 }
      );
    }

    /* 🎯 GET FIRST UNSCRATCHED CARD */
    const card = await ScratchCard.findOne({
      user: userId,
      isScratched: false
    } as any).sort({ createdAt: 1 });

    if(!card){
      return NextResponse.json(
        { error: "No scratch card available" },
        { status: 400 }
      );
    }

    /* 🔒 PREVENT DOUBLE USE */
    if(card.isScratched){
      return NextResponse.json(
        { error: "Already used" },
        { status: 400 }
      );
    }

    /* 🎁 GENERATE REWARD (20–30) */
    const reward = Math.floor(Math.random()*11) + 20;

    /* 💰 UPDATE WALLET */
    await User.findByIdAndUpdate(
      userId,
      { $inc: { wallet: reward } },
      { new: true } as any
    );

    /* 🪙 MARK SCRATCHED */
    card.isScratched = true;
    card.amount = reward;

    await card.save();

    return NextResponse.json({
      success: true,
      reward
    });

  }catch(err){

    console.log("SCRATCH ERROR:", err);

    return NextResponse.json(
      { error: "Failed to reveal scratch card" },
      { status: 500 }
    );

  }

}