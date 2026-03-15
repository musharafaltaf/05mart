export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/lib/models/Product";

export async function GET(req: Request) {

try {

await connectDB();

const { searchParams } = new URL(req.url);
const query = searchParams.get("q");

/* EMPTY QUERY */

if (!query || query.length < 2) {
return NextResponse.json([]);
}

/* SEARCH PRODUCTS */

const products = await Product.find({
$or: [
{ name: { $regex: query, $options: "i" } },
{ category: { $regex: query, $options: "i" } }
]
}as any)
.select("name price mrp image")
.limit(6)
.sort({ createdAt: -1 });

return NextResponse.json(products);

} catch (error) {

console.error("SEARCH ERROR:", error);

return NextResponse.json([]);

}

}