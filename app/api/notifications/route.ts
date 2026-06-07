import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Notification from "@/app/lib/models/Notification";

/* ================= GET ================= */
export async function GET(req: Request){

await connectDB();

const { searchParams } = new URL(req.url);
const userId = searchParams.get("userId");

if(!userId){
return NextResponse.json([]);
}

const data = await Notification
.find({ userId } as any)
.sort({ createdAt:-1 })
.limit(50); // 🔥 prevent overload

return NextResponse.json(data);

}

/* ================= MARK AS READ ================= */
export async function PUT(req: Request){

await connectDB();

const body = await req.json();

if(!body.id){
return NextResponse.json({ error:"Invalid id" },{ status:400 });
}

await Notification.findByIdAndUpdate(
body.id,
{ read:true, Read:true } // 🔥 handle both cases
);

return NextResponse.json({ success:true });

}


/* ================= DELETE ================= */
export async function DELETE(req: Request){

await connectDB();

const body = await req.json();

if(!body.id){
return NextResponse.json({ error:"Invalid id" },{ status:400 });
}

await Notification.deleteOne({ _id: body.id });

return NextResponse.json({ success:true });

}