// ─────────────────────────────────────────────────────────────────────────
// POST /api/admin/me/2fa/disable — wyłącza 2FA dla zalogowanego user'a.
// Wymaga: aktualne hasło + (jeśli 2FA aktywne) kod TOTP. Zapobiega
// wyłączeniu 2FA przy przejęciu samej cookie sesji.
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { verify as totpVerify } from 'otplib';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const schema = z.object({
  password: z.string().min(1).max(200),
  totp: z.string().length(6).optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { password, totp } = schema.parse(body);
    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: 'Aktuelles Passwort falsch.' }, { status: 400 });

    // If 2FA is currently enabled, also require a fresh TOTP code so a stolen
    // cookie alone (without phone) can't disable 2FA.
    if (user.twoFactorEnabled && user.twoFactorSecret) {
      if (!totp) return NextResponse.json({ error: '2FA-Code erforderlich.' }, { status: 400 });
      const valid = totpVerify({ token: totp, secret: user.twoFactorSecret });
      if (!valid) return NextResponse.json({ error: 'Ungültiger 2FA-Code.' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: false, twoFactorSecret: null },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validierung fehlgeschlagen' }, { status: 400 });
    }
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
}
