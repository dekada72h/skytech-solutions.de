import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const postSchema = z.object({
  content: z.string().min(1).max(5000),
});

async function requireSession() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session?.user || (role !== 'ADMIN' && role !== 'PARTNER')) return null;
  return session;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireSession())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const notes = await prisma.leadNote.findMany({
    where: { leadId: params.id },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  });
  return NextResponse.json({ notes });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { content } = postSchema.parse(body);
    const note = await prisma.leadNote.create({
      data: {
        leadId: params.id,
        authorId: (session.user as any).id,
        content,
      },
      include: { author: { select: { name: true } } },
    });
    return NextResponse.json({ note });
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
}
