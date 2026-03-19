import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Notification from "@/app/lib/models/Notification";

/* GET ALL */
export async function GET(req: Request){

  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const data = await Notification.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json(data);
}

/* MARK AS READ */
export async function PUT(req: Request){

  await connectDB();

  const body = await req.json();

  await Notification.findByIdAndUpdate(body.id, {
    read: true
  });

  return NextResponse.json({ success: true });
}

/* DELETE */
export async function DELETE(req: Request){

  await connectDB();

  const body = await req.json();

  await Notification.findByIdAndDelete(body.id);

  return NextResponse.json({ success: true });
}