import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";

export async function POST(req: Request) {

  try {

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    /* check if user already exists */

    const existingUser = await User.findOne({ email } as any);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    /* hash password */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* create user */

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    /* return user for auto login */

    return NextResponse.json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );

  }

}