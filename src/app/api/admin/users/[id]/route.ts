// ─────────────────────────────────────────────────────────────────────────
// PATCH/DELETE /api/admin/users/[id] — edycja roli (ADMIN/PARTNER) lub
// usunięcie user'a panelu. Tylko dla zalogowanego ADMIN.
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

async function requireAdmin() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') return null;
  return session;
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if ((session.user as any).id === params.id)
    return NextResponse.json({ error: 'Sie können sich nicht selbst löschen' }, { status: 400 });
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
