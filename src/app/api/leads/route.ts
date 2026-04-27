import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  calculatorType: z.enum(['ERTRAGSVERLUST', 'REINIGUNGSKOSTEN', 'AMORTISATION', 'ROI', 'OTHER']),
  inputJson: z.unknown(),
  resultJson: z.unknown(),
  contactName: z.string().max(120).optional(),
  contactEmail: z.string().email().max(200).optional(),
  contactPhone: z.string().max(40).optional(),
  source: z.string().max(80).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? req.headers.get('x-real-ip') ?? null;
    const ua = req.headers.get('user-agent') ?? null;

    const lead = await prisma.lead.create({
      data: {
        calculatorType: data.calculatorType,
        inputJson: data.inputJson as any,
        resultJson: data.resultJson as any,
        contactName: data.contactName ?? null,
        contactEmail: data.contactEmail ?? null,
        contactPhone: data.contactPhone ?? null,
        source: data.source ?? null,
        ip,
        userAgent: ua,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: e.issues }, { status: 400 });
    }
    console.error('leads error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
