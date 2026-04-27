import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login | Skytech Solutions Admin',
  robots: { index: false, follow: false },
};

export default function LoginPage({ searchParams }: { searchParams: { callbackUrl?: string; error?: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin-Login</h1>
          <p className="mt-1 text-sm text-gray-500">Skytech Solutions · Privater Bereich</p>
        </div>
        <LoginForm callbackUrl={searchParams.callbackUrl ?? '/admin'} initialError={searchParams.error} />
      </div>
    </main>
  );
}
