import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const schema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(10).max(200),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { oldPassword, newPassword } = schema.parse(body);
    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    const ok = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!ok) return NextResponse.json({ error: 'Aktuelles Passwort falsch.' }, { status: 400 });
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
}
