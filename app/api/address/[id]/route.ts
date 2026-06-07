import { connectDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req: Request, { params }: any) {

  await connectDB();

  const body = await req.json();

  const db = mongoose.connection.db;

  await db.collection("addresses").updateOne(
    { _id: new mongoose.Types.ObjectId(params.id) },
    { $set: body }
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: any) {

  await connectDB();

  const db = mongoose.connection.db;

  await db.collection("addresses").deleteOne({
    _id: new mongoose.Types.ObjectId(params.id)
  });

  return NextResponse.json({ success: true });
}