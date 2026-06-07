import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";
import { getOtp, deleteOtp } from "@/app/lib/otpStore";

export async function POST(req: Request){

  try{

    await connectDB();

    const body = await req.json();

    const name = body.name?.trim();
    const email = body.email?.toLowerCase().trim();
    const password = body.password?.trim();
    const otp = body.otp;
    const deviceId = body.deviceId;

    /* ================= VALIDATION ================= */

    if(!name || !email || !password || !otp || !deviceId){
      return NextResponse.json(
        { error:"Missing required fields" },
        { status:400 }
      );
    }

    if(!/^[A-Za-z ]+$/.test(name)){
      return NextResponse.json(
        { error:"Invalid username" },
        { status:400 }
      );
    }

    if(!email.includes("@gmail.com")){
      return NextResponse.json(
        { error:"Invalid email" },
        { status:400 }
      );
    }

    if(password.length < 6){
      return NextResponse.json(
        { error:"Weak password" },
        { status:400 }
      );
    }

    /* ================= OTP CHECK ================= */

    const record = getOtp(email);

    if(!record){
      return NextResponse.json(
        { error:"OTP expired" },
        { status:400 }
      );
    }

    if(record.otp !== otp){
      return NextResponse.json(
        { error:"Invalid OTP" },
        { status:400 }
      );
    }

    if(Date.now() > record.expires){
      deleteOtp(email);
      return NextResponse.json(
        { error:"OTP expired" },
        { status:400 }
      );
    }

    /* ================= DEVICE LOCK ================= */

    const existingDevice = await User.findOne({ deviceId });

    if(existingDevice){
      return NextResponse.json(
        { error:"This device already has an account" },
        { status:400 }
      );
    }

    /* ================= USER CHECK ================= */

    const exist = await User.findOne({ email });

    if(exist){
      return NextResponse.json(
        { error:"User already exists" },
        { status:400 }
      );
    }

    /* ================= HASH ================= */

    const hashedPassword = await bcrypt.hash(password,10);

    /* ================= CREATE ================= */

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      deviceId,
      role:"user",
      createdAt: new Date()
    });

    deleteOtp(email);

    /* ================= TOKEN ================= */

    const token = jwt.sign(
      { userId:user._id },
      process.env.JWT_SECRET!,
      { expiresIn:"7d" }
    );

    /* ================= RESPONSE ================= */

    return NextResponse.json({
      success:true,
      token,
      user:{
        _id:user._id.toString(),
        name:user.name,
        email:user.email
      }
    });

  }catch(err){

    console.error("REGISTER ERROR:",err);

    return NextResponse.json(
      { error:"Server error" },
      { status:500 }
    );

  }

}