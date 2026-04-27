import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(_req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  await prisma.user.update({
    where: { id: (session.user as any).id },
    data: { twoFactorEnabled: false, twoFactorSecret: null },
  });
  return NextResponse.json({ ok: true });
}
