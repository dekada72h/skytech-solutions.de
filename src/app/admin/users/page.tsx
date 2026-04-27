import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import UsersClient from './UsersClient';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') {
    redirect('/admin');
  }
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: {
      id: true, email: true, name: true, role: true,
      twoFactorEnabled: true, lastLoginAt: true, createdAt: true,
    },
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Benutzer</h1>
        <p className="mt-1 text-sm text-gray-500">
          Konten verwalten — neuen Benutzer (z. B. für Partner) anlegen, Passwort zurücksetzen oder Konto löschen.
        </p>
      </div>
      <UsersClient initialUsers={users.map((u) => ({ ...u, lastLoginAt: u.lastLoginAt?.toISOString() ?? null, createdAt: u.createdAt.toISOString() }))} currentUserId={(session!.user as any).id} />
    </div>
  );
}
