import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? 'admin@skytech-solutions.de').toLowerCase();
  const adminName = process.env.SEED_ADMIN_NAME ?? 'Admin';

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log(`Admin user already exists: ${adminEmail}`);
    return;
  }

  const all = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const tempPassword = Array.from(randomBytes(20)).map((x) => all[x % all.length]).join('');
  const passwordHash = await bcrypt.hash(tempPassword, 12);

  await prisma.user.create({
    data: {
      email: adminEmail,
      name: adminName,
      role: 'ADMIN',
      passwordHash,
    },
  });

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  ADMIN ACCOUNT CREATED');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  Email:    ${adminEmail}`);
  console.log(`  Password: ${tempPassword}`);
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  ⚠️  Save this password — it will not be shown again.');
  console.log('  ⚠️  Log in at https://skytech-solutions.de/login');
  console.log('  ⚠️  Change password after first login (Einstellungen).');
  console.log('═══════════════════════════════════════════════════════════════');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
