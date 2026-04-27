import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verify as totpVerify } from 'otplib';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const schema = z.object({ code: z.string().length(6) });

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { code } = schema.parse(body);
    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.twoFactorSecret) return NextResponse.json({ error: 'no setup' }, { status: 400 });
    const ok = totpVerify({ token: code, secret: user.twoFactorSecret });
    if (!ok) return NextResponse.json({ error: 'invalid' }, { status: 400 });
    await prisma.user.update({ where: { id: userId }, data: { twoFactorEnabled: true } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
}
