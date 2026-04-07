import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Notification from "@/app/lib/models/Notification";

/* GET USER NOTIFICATIONS */

export async function GET(req: Request){

await connectDB();

const { searchParams } = new URL(req.url);
const userId = searchParams.get("userId");

if(!userId){
return NextResponse.json([]);
}

const data = await Notification
.find({ userId } as any)
.sort({ createdAt:-1 });

return NextResponse.json(data);

}


/* MARK AS READ */

export async function PUT(req: Request){

await connectDB();

const body = await req.json();

await Notification.findByIdAndUpdate(
body.id,
{ read:true },
{
  new: true,
  lean: true,
  includeResultMetadata: true
}
);

return NextResponse.json({ success:true });

}


/* DELETE */

export async function DELETE(req: Request){

await connectDB();

const body = await req.json();

await Notification.deleteOne({ _id: body.id });

return NextResponse.json({ success:true });

}