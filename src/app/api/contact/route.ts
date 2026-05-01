// ─────────────────────────────────────────────────────────────────────────
// POST /api/contact — endpoint dla formularza kontaktowego (publiczny).
// Walidacja przez Zod, zapis do bazy (tabela Message), wysyłka maila do
// admina przez mailer. Anti-spam: sprawdzanie honeypot field.
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().or(z.literal('')),
  subject: z.string().max(200).optional().or(z.literal('')),
  message: z.string().min(5).max(5000),
  source: z.string().max(80).optional(),
  // Optional: associate with an existing lead by id
  leadId: z.string().optional(),
  // Honeypot: if filled by a bot we silently accept and discard.
  website: z.string().max(200).optional(),
  // Submit timestamp (ms) set by client on form mount — drops sub-second submits.
  ts: z.number().int().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Spam guards: honeypot must be empty, form filled in for ≥ 1.5 s
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true, id: null });
    }
    if (data.ts && Date.now() - data.ts < 1500) {
      return NextResponse.json({ ok: true, id: null });
    }
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? req.headers.get('x-real-ip') ?? null;
    const ua = req.headers.get('user-agent') ?? null;
    const locale = req.headers.get('accept-language')?.split(',')[0].trim() ?? null;

    const message = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        source: data.source ?? 'kontakt-form',
        ip,
        userAgent: ua,
        locale,
        leadId: data.leadId ?? null,
      },
    });

    // If lead was attached, bump status to CONTACTED if it was NEW
    if (data.leadId) {
      await prisma.lead.updateMany({
        where: { id: data.leadId, status: 'NEW' },
        data: {
          status: 'CONTACTED',
          contactName: data.name,
          contactEmail: data.email,
          contactPhone: data.phone || null,
        },
      });
    }

    return NextResponse.json({ ok: true, id: message.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: e.issues }, { status: 400 });
    }
    console.error('contact error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
