import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";

export async function POST(req:Request){

try{

  await connectDB();

  const { email, password } = await req.json();

  const cleanEmail = email?.toLowerCase().trim();

  if(!cleanEmail || !password){
    return NextResponse.json(
      { error:"Email and password required" },
      { status:400 }
    );
  }

  /* CASE-INSENSITIVE SEARCH */
  const query = {
    email: { $regex: new RegExp(`^${cleanEmail}$`, "i") }
  } as any;

  const user = await User.findOne(query);

  if(!user){
    return NextResponse.json(
      { error:"User not found" },
      { status:400 }
    );
  }

  /* PASSWORD CHECK */
  let match = false;

  try{
    match = await bcrypt.compare(password, user.password);
  }catch{
    match = false;
  }

  /* fallback for old users */
  if(!match && user.password === password){
    match = true;

    const hashed = await bcrypt.hash(password,10);
    user.password = hashed;
    await user.save();
  }

  if(!match){
  return NextResponse.json(
    {
      error:"Incorrect password or outdated account. Please reset your password.",
      suggestReset:true
    },
    { status:400 }
  );
}

  /* TOKEN */
  const token = jwt.sign(
    { userId:user._id },
    process.env.JWT_SECRET!,
    { expiresIn:"7d" }
  );

  return NextResponse.json({
    success:true,
    token,
    user:{
  _id:user._id.toString(),
  name:user.name,
  email:user.email,
  referralCode: user.referralCode   // ⭐ ADD THIS
}
  });

}catch(err){

  console.log("LOGIN ERROR:",err);

  return NextResponse.json(
    { error:"Server error" },
    { status:500 }
  );

}

}