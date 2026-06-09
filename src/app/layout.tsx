import type { Metadata } from 'next';
import { appConfig } from '@/config/app.config';
import './globals.css';

export const metadata: Metadata = {
  title: appConfig.appName,
  description: appConfig.header.title,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-cream text-gray-900 antialiased">{children}</body>
    </html>
  );
}
