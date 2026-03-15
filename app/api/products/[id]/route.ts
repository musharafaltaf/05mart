// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import Product from "@/app/lib/models/Product";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {

//   await connectDB();

//   try {

//     const product = await Product.findById(params.id);

//     return NextResponse.json(product);

//   } catch (error) {

//     console.error(error);

//     return NextResponse.json(
//       { error: "Failed to fetch product" },
//       { status: 500 }
//     );

//   }

// }  


// app/api/products/[id]/route.ts

// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { connectDB } from "@/app/lib/mongodb";
// import Product from "@/app/lib/models/Product";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {

//   try {

//     await connectDB();

//     const id = params.id;

//     // convert id string -> ObjectId
//     const objectId = new mongoose.Types.ObjectId(id);

//     const product = await Product.findOne({ _id: objectId });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" });
//     }

//     return NextResponse.json(product);

//   } catch (error) {

//     console.error("Product fetch error:", error);

//     return NextResponse.json({ error: "Invalid product ID" });

//   }

// }
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET(
req: Request,
{ params }: { params: { id: string } }
){

try{

await connectDB();

const product = await (Product as any).findById(params.id);
if(!product){
return NextResponse.json({error:"Product not found"},{status:404});
}

return NextResponse.json(product);

}catch(error){

console.log("PRODUCT FETCH ERROR:",error);

return NextResponse.json({error:"Server error"},{status:500});

}

}