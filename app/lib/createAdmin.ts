import bcrypt from "bcryptjs";
import User from "./models/Users";
import { connectDB } from "./mongodb";

export async function createAdmin() {

  await connectDB();

  const existing = await (User as any).findOne({
  email: "05mart.support@gmail.com"
});

  if (!existing) {

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "05mart.support@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin created");

  }

}
