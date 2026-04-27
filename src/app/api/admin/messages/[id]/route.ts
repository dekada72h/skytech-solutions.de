import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const patchSchema = z.object({
  status: z.enum(['UNREAD', 'READ', 'ARCHIVED']),
});

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session?.user || (role !== 'ADMIN' && role !== 'PARTNER')) {
    return null;
  }
  return session;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { status } = patchSchema.parse(body);
    await prisma.message.update({ where: { id: params.id }, data: { status } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if ((session.user as any).role !== 'ADMIN')
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  await prisma.message.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
