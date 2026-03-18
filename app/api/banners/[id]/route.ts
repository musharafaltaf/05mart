import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Banner from "@/app/lib/models/Banner";
import mongoose from "mongoose"; // ✅ ADD THIS

export const dynamic = "force-dynamic";

/* ========================= */
/* UPDATE BANNER */
/* ========================= */

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await req.json();

    const updated = await Banner.findByIdAndUpdate( 
  new mongoose.Types.ObjectId(params.id),
  body,
  { returnDocument: "after" }
);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

/* ========================= */
/* DELETE BANNER */
/* ========================= */

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const deleted = await Banner.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(params.id), // ✅ FIX
    } as any); // ✅ TYPE FIX

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}