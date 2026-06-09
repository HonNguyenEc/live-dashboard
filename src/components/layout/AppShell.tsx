import type { ReactNode } from 'react';
import { Header } from './Header';

/** Page chrome for authenticated pages: header + cream content area. */
export function AppShell({ email, children }: { email: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <Header email={email} />
      <main className="mx-auto max-w-[1400px] px-4 py-4">{children}</main>
    </div>
  );
}
