import { cookies } from 'next/headers';
import { AppShell } from '@/components/layout/AppShell';
import { COOKIE_NAME } from '@/constants/auth.constants';
import { verifyToken } from '@/lib/common/token';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Middleware already guarantees auth here; read the email for the header.
  const token = cookies().get(COOKIE_NAME)?.value;
  const email = (await verifyToken(token)) ?? '';

  return <AppShell email={email}>{children}</AppShell>;
}
