import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Banner from "@/app/lib/models/Banner";

export const dynamic = "force-dynamic";

/* GET BANNER */

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  await connectDB();

  const banner = await Banner.findById(params.id);

  if (!banner) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(banner);

}

/* UPDATE */

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  await connectDB();

  const body = await req.json();

  const updated = await Banner.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return NextResponse.json(updated);

}

/* DELETE */

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {

  await connectDB();

  await Banner.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });

}