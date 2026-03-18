import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET(req: Request) {

try {

await connectDB();

/* GET QUERY PARAMS */

const { searchParams } = new URL(req.url);

const category = searchParams.get("category");
const featured = searchParams.get("featured");
const flashSale = searchParams.get("flashSale");

/* BUILD FILTER */

let filter:any = {};

if(category){
filter.category = { $regex: new RegExp(`^${category}$`, "i") };
}

if(featured){
filter.featured = true;
}

if(flashSale){
filter.flashSale = true;
}

/* FETCH PRODUCTS */

const products = await Product.find(filter)
.sort({ createdAt:-1 })
.limit(50);

return NextResponse.json(products);

} catch (error) {

console.error("GET PRODUCTS ERROR:", error);

return NextResponse.json([], { status:200 });

}

}

/* =============================== */
/* 🔥 FIXED POST (IMPORTANT) */
/* =============================== */

export async function POST(req: Request) {

try {

await connectDB();

const body = await req.json();

/* ============================= */
/* 🔥 FIX IMAGES */
/* ============================= */

let images = body.images || [];

/* Convert string → array */
if(typeof images === "string"){
images = images.split(",").map((i:string)=>i.trim());
}

/* Remove empty values */
images = images.filter((img:string)=>img);

/* Remove duplicates */
images = [...new Set(images)];

/* Remove main image from gallery */
images = images.filter((img:string)=>img !== body.image);

/* Limit to 4 images */
images = images.slice(0,4);

/* ============================= */
/* CREATE PRODUCT */
/* ============================= */

const product = await Product.create({

...body,

image: body.image,
images: images, // ✅ CLEAN GALLERY

});

return NextResponse.json(product);

} catch (error) {

console.error("CREATE PRODUCT ERROR:", error);

return NextResponse.json(
{ error:"Failed to create product" },
{ status:500 }
);

}

}



