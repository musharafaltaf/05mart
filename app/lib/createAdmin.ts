import bcrypt from "bcryptjs";
import User from "./models/Users";
import { connectDB } from "./mongodb";

export async function createAdmin() {

  await connectDB();

  const existing = await (User as any).findOne({
  email: "admin@05mart.com"
});

  if (!existing) {

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "admin@05mart.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin created");

  }

}