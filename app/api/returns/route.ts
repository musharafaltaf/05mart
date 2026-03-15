import { NextResponse } from "next/server";
import { connectDB }   from "@/app/lib/mongodb";
import Return from "@/app/lib/models/Return";

export async function POST(req:Request){

try{

await connectDB();

const body = await req.json();

const returnRequest = await Return.create(body);

return NextResponse.json(returnRequest);

}catch(err){

console.log(err);

return NextResponse.json(
{error:"Return request failed"},
{status:500}
);

}

}