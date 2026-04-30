// ─────────────────────────────────────────────────────────────────────────
// /admin/settings — ustawienia konta zalogowanego użytkownika.
// SettingsClient pozwala: zmienić własne hasło, włączyć/wyłączyć 2FA (TOTP).
// ─────────────────────────────────────────────────────────────────────────
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  const userId = (session.user as any).id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, twoFactorEnabled: true },
  });
  if (!user) redirect('/login');

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Einstellungen</h1>
        <p className="mt-1 text-sm text-gray-500">Konto-Einstellungen, Passwort und Zwei-Faktor-Authentifizierung.</p>
      </div>
      <SettingsClient user={user} />
    </div>
  );
}
