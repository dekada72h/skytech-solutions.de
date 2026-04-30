// ─────────────────────────────────────────────────────────────────────────
// POST /api/auth/forgot — żądanie resetu hasła. Generuje token (random
// 32 bajty), zapisuje hash do bazy (PasswordResetToken), wysyła e-mail
// z linkiem /reset-password?token=<plain>. Token ważny 1h.
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { randomBytes, createHash } from 'crypto';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    // Always return success — never leak whether email exists
    if (!user) return NextResponse.json({ ok: true });

    const rawToken = randomBytes(32).toString('base64url');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/reset-password?token=${rawToken}`;

    // No SMTP configured — log to server console for now (visible via docker logs)
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`[PASSWORD RESET] User: ${user.email}`);
    console.log(`[PASSWORD RESET] URL: ${resetUrl}`);
    console.log(`[PASSWORD RESET] Expires: ${expiresAt.toISOString()}`);
    console.log('═══════════════════════════════════════════════════════════');

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    console.error('forgot error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
