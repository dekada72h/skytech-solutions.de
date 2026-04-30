// ─────────────────────────────────────────────────────────────────────────
// lib/auth.ts — konfiguracja NextAuth dla panelu admina. Provider:
// Credentials (email + hasło + opcjonalny TOTP/2FA). Hashowanie haseł
// przez bcryptjs, weryfikacja TOTP przez otplib. User pochodzi z Prismy.
// ─────────────────────────────────────────────────────────────────────────
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { verify as totpVerify } from 'otplib';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 }, // 8 h
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'E-Mail', type: 'email' },
        password: { label: 'Passwort', type: 'password' },
        totp: { label: 'TOTP-Code', type: 'text' },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? '').trim().toLowerCase();
        const password = String(credentials?.password ?? '');
        const totp = String(credentials?.totp ?? '').trim();
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        if (user.twoFactorEnabled) {
          if (!user.twoFactorSecret) return null;
          if (!totp) {
            // Signal to login page that 2FA is required (handled via error redirect)
            throw new Error('2FA_REQUIRED');
          }
          const valid = totpVerify({ token: totp, secret: user.twoFactorSecret });
          if (!valid) throw new Error('INVALID_TOTP');
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});
