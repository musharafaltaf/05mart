import { NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import Combo from "@/app/lib/models/Combo"
import mongoose from "mongoose"

export const dynamic = "force-dynamic"

/* GET SINGLE COMBO */

export async function GET(
req:Request,
{ params }: { params:{ id:string } }
){

await connectDB()

try{

const combo = await Combo.findOne({ _id: params.id } as any)

if(!combo){
return NextResponse.json(
{ error:"Combo not found" },
{ status:404 }
) 
}

return NextResponse.json(combo)

}catch(err){

console.log("COMBO LOAD ERROR:",err)

return NextResponse.json(
{ error:"Failed to load combo" },
{ status:500 }
)

}

}

/* DELETE COMBO */

export async function DELETE(
req:Request,
{ params }: { params:{ id:string } }
){

await connectDB()

await (Combo as any).findByIdAndDelete(params.id)

return NextResponse.json({ success:true } as any ) 

}