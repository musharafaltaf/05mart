import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {

  try {

    await connectDB();

    const { name, email, password } = await req.json();

    /* VALIDATION */

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    /* LOWERCASE EMAIL */

    const cleanEmail = email.toLowerCase().trim();

    /* CHECK EXISTING USER */

    const existingUser = await User.findOne({ email: cleanEmail } as any);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered with this email" },
        { status: 400 }
      );
    }

    /* HASH PASSWORD */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* CREATE USER */

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,

      /* IMPORTANT */
      role: "user"
    });

    /* RESPONSE */

    return NextResponse.json({
      message: "Registration successful",
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Server error during registration" },
      { status: 500 }
    );

  }

}