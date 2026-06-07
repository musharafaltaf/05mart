import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";

export async function POST(req:Request){

try{

  await connectDB();

  const { email, password } = await req.json();

  const cleanEmail = email?.toLowerCase().trim();

  if(!cleanEmail || !password){
    return NextResponse.json(
      { error:"Missing fields" },
      { status:400 }
    );
  }

  if(password.length < 6){
    return NextResponse.json(
      { error:"Password too weak" },
      { status:400 }
    );
  }

  const user = await User.findOne({ email: cleanEmail } as any);

  if(!user){
    return NextResponse.json(
      { error:"User not found" },
      { status:400 }
    );
  }

  const hashed = await bcrypt.hash(password,10);

  user.password = hashed;
  await user.save();

  return NextResponse.json({
    success:true,
    message:"Password updated"
  });

}catch(err){

  console.log("RESET ERROR:",err);

  return NextResponse.json(
    { error:"Server error" },
    { status:500 }
  );

}
}