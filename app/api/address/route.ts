import { connectDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request) {

  await connectDB();

  const userId = req.headers.get("userid");

  const db = mongoose.connection.db;

  const data = await db
    .collection("addresses")
    .find({ userId })
    .toArray();

  return NextResponse.json(data);
}

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const db = mongoose.connection.db;

  const result = await db
    .collection("addresses")
    .insertOne(body);

  return NextResponse.json(result);
}