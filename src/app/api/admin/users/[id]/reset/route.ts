import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

async function requireAdmin() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return null;
  return session;
}

function makeTempPassword(): string {
  const all = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  return Array.from(randomBytes(16)).map((x) => all[x % all.length]).join('');
}

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const tempPassword = makeTempPassword();
  const passwordHash = await bcrypt.hash(tempPassword, 12);
  await prisma.user.update({ where: { id: params.id }, data: { passwordHash } });
  return NextResponse.json({ tempPassword });
}
