import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  { connectDB }   from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";

export async function POST(req:Request){

try{

await connectDB();

const {name,email,password} = await req.json();

if(!name || !email || !password){
return NextResponse.json(
{error:"All fields are required"},
{status:400}
);
}

const existingUser = await User.findOne({email}as any);

if(existingUser){
return NextResponse.json(
{error:"User already registered with this email"},
{status:400}
);
}

const hashedPassword = await bcrypt.hash(password,10);

const user = await User.create({
name,
email,
password:hashedPassword
});

return NextResponse.json({
message:"Registration successful",
user:{
_id:user._id,
name:user.name,
email:user.email,
role:user.role
}
});

}catch(error){

console.log(error);

return NextResponse.json(
{error:"Server error during registration"},
{status:500}
);

}

}