import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";
import { createAdmin } from "@/app/lib/createAdmin";

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export async function POST(req: Request) {

try {

await connectDB();

/* CREATE DEFAULT ADMIN IF NOT EXISTS */
await createAdmin();

const { email, password } = await req.json();

if (!email || !password) {

return NextResponse.json(
{ error: "Email and password required" },
{ status: 400 }
);

}

const user = await User.findOne({ email } as any);

if (!user) {

return NextResponse.json(
{ error: "Invalid credentials" },
{ status: 401 }
);

}

const match = await bcrypt.compare(password, user.password);

if (!match) {

return NextResponse.json(
{ error: "Invalid credentials" },
{ status: 401 }
);

}

const token = jwt.sign(
{ userId: user._id, role: user.role },
JWT_SECRET,
{ expiresIn: "7d" }
);

return NextResponse.json({
token,
user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}
});

} catch (error) {

console.log("LOGIN ERROR:", error);

return NextResponse.json(
{ error: "Server error during login" },
{ status: 500 }
);

}

}