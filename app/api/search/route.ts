export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET(req: Request){

try{

await connectDB();

const { searchParams } = new URL(req.url);
const q = searchParams.get("q");

if(!q){
return NextResponse.json([]);
}

const products = await Product.find({

name:{
$regex:q,
$options:"i"
}

}as any).limit(8);

return NextResponse.json(products);

}catch(err){

console.log("Search error:",err);

return NextResponse.json([]);

}

}