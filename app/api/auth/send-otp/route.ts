import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { setOtp } from "@/app/lib/otpStore";

export async function POST(req:Request){

const { email } = await req.json();

const otp = Math.floor(1000 + Math.random()*9000).toString();

setOtp(email,otp);

/* EMAIL SEND */

const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
}
});

await transporter.sendMail({
from:`05Mart <${process.env.EMAIL_USER}>`,
to:email,
subject:"Your OTP Code",
html:`
<h2>05Mart Verification</h2>
<p>Your OTP is:</p>
<h1>${otp}</h1>
<p>This expires in 5 minutes</p>
`
});

return NextResponse.json({ success:true });

}