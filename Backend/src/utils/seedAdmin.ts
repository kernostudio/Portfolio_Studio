import { prisma } from "../config/config";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables"
    );
  }

  const adminExist = await prisma.user.findUnique({
    where: { email },
  });

  if (adminExist) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUND)
  );

  const payload = {
    password: hashedPassword,
    email,
    role: "admin",
    fullName: "Admin",
  };

  const admin = await prisma.user.create({
    data: payload,
  });

  console.log("Admin seeded successfully:", admin.email);
};
