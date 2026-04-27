import { NextRequest, NextResponse } from 'next/server';
import { generateSecret, generateURI } from 'otplib';
import QRCode from 'qrcode';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(_req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as any).id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const secret = generateSecret();
  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorSecret: secret, twoFactorEnabled: false },
  });

  const otpauth = generateURI({
    issuer: 'Skytech Solutions',
    user: user.email,
    secret,
    plugins: { base32: undefined as any },
  } as any);

  // Fallback: build URI manually if generateURI signature differs
  const uri = otpauth || `otpauth://totp/Skytech%20Solutions:${encodeURIComponent(user.email)}?secret=${secret}&issuer=Skytech%20Solutions`;

  const qr = await QRCode.toDataURL(uri);
  return NextResponse.json({ secret, qr });
}
