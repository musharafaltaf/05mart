import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";
import Referral from "@/app/lib/models/Referral";
import Notification from "@/app/lib/models/Notification";

export const dynamic = "force-dynamic";

/* ================= REFERRAL CODE GENERATOR ================= */
function generateReferralCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

export async function POST(req: Request) {

  try {

    await connectDB();


    /* GET DATA */
    const { name, email, password, referralCode } = await req.json();

    /* ================= VALIDATION ================= */

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

    /* ================= CLEAN EMAIL ================= */

    const cleanEmail = email.toLowerCase().trim();

    /* ================= CHECK EXIST ================= */

    const existingUser = await User.findOne({ email: cleanEmail } as any);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered with this email" },
        { status: 400 }
      );
    }

    /* ================= HASH PASSWORD ================= */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ================= GENERATE REF CODE ================= */

    let newReferralCode = generateReferralCode();

    let codeExists = await User.findOne({ referralCode: newReferralCode } as any);

    while (codeExists) {
      newReferralCode = generateReferralCode();
      codeExists = await User.findOne({ referralCode: newReferralCode } as any);
    }

    /* ================= FIND REFERRER ================= */

    // 🔥 ALWAYS READ FROM URL
const url = new URL(req.url);
const refFromUrl = url.searchParams.get("ref");

const refUser = refFromUrl ? await User.findOne({ referralCode: refFromUrl } as any) : null;

    /* ================= CREATE USER ================= */

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "user",

      referralCode: newReferralCode,
      referredBy: refUser ? refUser.referralCode : null
    });

    /* ================= CREATE REFERRAL RECORD ================= */

    if (refUser) {

  const existingReferral = await Referral.findOne({
    referredUser: user._id
  } as any);
  if (!existingReferral) {
    await Referral.create({
      referrer: refUser._id,
      referredUser: user._id
    });
  }
}

  if (refUser) {

  await Referral.create({
    referrer: refUser._id,
    referredUser: user._id,
    status: {
      registered: true,
      ordered: false,
      delivered: false,
      rewardGiven: false
    }
  });

  await Notification.create({
    userId: refUser._id.toString(),
    message: `${user.name} joined using your referral 🎉`
  });

}

    /* ================= RESPONSE ================= */

    return NextResponse.json({
      message: "Registration successful",
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode
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