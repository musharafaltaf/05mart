import {NextResponse} from "next/server";
import {connectDB} from "@/app/lib/mongodb";
import Review from "@/app/lib/models/Review";

export async function GET(req:Request,{params}:any){

await connectDB();

try{

const reviews=await Review
.find({productId:params.productId})
.sort({createdAt:-1});

return NextResponse.json(reviews);

}catch(err){

return NextResponse.json(
{error:"Failed to load reviews"},
{status:500}
);

}

}