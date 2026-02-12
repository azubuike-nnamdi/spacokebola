import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

async function main() {
  // Create super admin
  const hashedPassword = await bcrypt.hash("Admin123@#!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@spacokebola.com" },
    update: {},
    create: {
      email: "admin@spacokebola.com",
      password: hashedPassword,
      firstName: "Super",
      lastName: "Admin",
      role: "SUPER_ADMIN",
      isFirstLogin: false,
      emailVerified: true,
      isActive: true,
    },
  });

  console.log("✅ Created admin user:", admin.email);
  console.log("📧 Email: admin@spacokebola.com");
  console.log("🔑 Password: Admin123!");
  console.log("⚠️  Change this password after first login!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });