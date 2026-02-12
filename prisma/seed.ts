import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  // Create super admin (without password - uses OTP for login)
  const admin = await prisma.user.upsert({
    where: { email: "admin@spacokebola.com" },
    update: {},
    create: {
      email: "admin@spacokebola.com",
      firstName: "Super",
      lastName: "Admin",
      role: "SUPER_ADMIN",
      emailVerified: true,
      isActive: true,
    },
  });

  console.log("✅ Created admin user:", admin.email);
  console.log("📧 Email: admin@spacokebola.com");
  console.log("🔐 Authentication: OTP-based (passwordless)");
  console.log("ℹ️  Request an OTP code via email to login");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });