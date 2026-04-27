import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const createSchema = z.object({
  email: z.string().email().max(200),
  name: z.string().min(2).max(120),
  role: z.enum(['ADMIN', 'PARTNER']),
});

async function requireAdmin() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return null;
  return session;
}

function makeTempPassword(): string {
  // 16 chars, alpha+digit, no ambiguous
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const b = 'abcdefghijkmnopqrstuvwxyz';
  const c = '23456789';
  const all = a + b + c;
  return Array.from(randomBytes(16)).map((x) => all[x % all.length]).join('');
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  try {
    const body = await req.json();
    const data = createSchema.parse(body);
    const exists = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (exists) return NextResponse.json({ error: 'E-Mail bereits vergeben' }, { status: 409 });
    const tempPassword = makeTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 12);
    const user = await prisma.user.create({
      data: { email: data.email.toLowerCase(), name: data.name, role: data.role, passwordHash },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json({
      user: { ...user, createdAt: user.createdAt.toISOString() },
      tempPassword,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validierung fehlgeschlagen' }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
