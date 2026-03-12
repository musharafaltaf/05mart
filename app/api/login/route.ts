import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/User";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "secretkey",
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "Login failed" });
  }
}