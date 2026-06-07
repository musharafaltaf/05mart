import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Combo from "@/app/lib/models/Combo";

export const dynamic = "force-dynamic";

/* GET ALL COMBOS */

export async function GET(){

await connectDB();

try{

const combos = await Combo.find().sort({createdAt:-1});

return NextResponse.json(combos);

}catch(err){

console.log("COMBO LOAD ERROR:",err);

return NextResponse.json([]);

}

}

/* CREATE COMBO */

export async function POST(req:Request){

await connectDB();

try{

const body = await req.json();

const combo = await Combo.create(body);

return NextResponse.json(combo);

}catch(err){

console.log("COMBO CREATE ERROR:",err);

return NextResponse.json({error:"Failed to create combo"});

}

}