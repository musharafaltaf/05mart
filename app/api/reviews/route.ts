import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/lib/mongodb";
import Review from "@/app/lib/models/Review";
import Product from "@/app/lib/models/Product";

/* ========================= */
/* GET REVIEWS */
/* ========================= */

export async function GET(req: Request){

try{

await connectDB();

const { searchParams } = new URL(req.url);
const productId = searchParams.get("productId");

if(!productId){
return NextResponse.json([], { status:200 });
}

const reviews = await Review
.find({ productId })
.sort({ createdAt:-1 });

return NextResponse.json(reviews);

}catch(err){

console.log("GET REVIEWS ERROR:",err);

return NextResponse.json(
{ error:"Failed to load reviews"},
{ status:500 }
);

}

}

/* ========================= */
/* CREATE REVIEW */
/* ========================= */

export async function POST(req: Request){

await connectDB();

try{

const body = await req.json();

const {
productId,
userId,
userName,
rating,
comment,
images
} = body;

/* ========================= */
/* VALIDATION */
/* ========================= */

if(!productId || !userId || !rating){

return NextResponse.json(
{ error:"Invalid review data"},
{ status:400 }
);

}

/* ========================= */
/* PREVENT DUPLICATE REVIEWS */
/* ========================= */

const existing = await Review.findOne({
productId,
userId
});

if(existing){

return NextResponse.json(
{ error:"You already reviewed this product" },
{ status:400 }
);

}

/* ========================= */
/* BASIC FAKE REVIEW DETECTION */
/* ========================= */

const suspicious =
comment?.length < 5 ||
/(http|www|cheap|buy now|visit)/i.test(comment || "");

if(suspicious){
console.log("⚠ Suspicious review detected");
}

/* ========================= */
/* CREATE REVIEW */
/* ========================= */

const review = await Review.create({

productId,
userId,
userName,
rating,
comment,
images,
helpful:0

});

/* ========================= */
/* UPDATE PRODUCT RATING */
/* ========================= */

const stats = await Review.aggregate([

{
$match:{
productId:new mongoose.Types.ObjectId(productId)
}
},

{
$group:{
_id:"$productId",
avgRating:{ $avg:"$rating" },
count:{ $sum:1 }
}
}

]);

if(stats.length){

await Product.findByIdAndUpdate(productId,{

rating:Number(stats[0].avgRating.toFixed(1)),
reviewCount:stats[0].count

}, {
    new: true,
    lean: true,
    includeResultMetadata: true
});

}

return NextResponse.json({
success:true,
review
});

}catch(err){

console.log("CREATE REVIEW ERROR:",err);

return NextResponse.json(
{ error:"Failed to create review"},
{ status:500 }
);

}

}