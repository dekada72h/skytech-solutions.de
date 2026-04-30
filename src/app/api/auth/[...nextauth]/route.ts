// ─────────────────────────────────────────────────────────────────────────
// /api/auth/[...nextauth] — catch-all endpoint NextAuth (signIn, signOut,
// session, callback). Re-eksportuje handlers z lib/auth.ts. nodejs runtime
// żeby bcrypt + otplib działały (Edge runtime by się posypał).
// ─────────────────────────────────────────────────────────────────────────
import { handlers } from '@/lib/auth';
export const { GET, POST } = handlers;
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
