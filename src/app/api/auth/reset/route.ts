// ─────────────────────────────────────────────────────────────────────────
// POST /api/auth/reset — ustawienie nowego hasła z tokenem. Hashuje
// otrzymany token, sprawdza w bazie + nieprzeterminowany, zapisuje
// nowy passwordHash (bcrypt) i unieważnia token.
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createHash } from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const schema = z.object({
  token: z.string().min(10),
  password: z.string().min(10).max(200),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = schema.parse(body);
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
    if (!record || record.usedAt || record.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Token ungültig oder abgelaufen' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.$transaction([
      prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      // Invalidate all other unused tokens for this user
      prisma.passwordResetToken.updateMany({
        where: { userId: record.userId, usedAt: null, id: { not: record.id } },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validierung fehlgeschlagen' }, { status: 400 });
    }
    console.error('reset error:', e);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}
