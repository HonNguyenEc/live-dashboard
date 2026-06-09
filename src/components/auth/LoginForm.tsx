'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Spinner } from '@/components/common/Spinner';
import { appConfig } from '@/config/app.config';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Đăng nhập thất bại');
        return;
      }
      // Cookie is set by the response; navigate to the protected area.
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Không thể kết nối tới máy chủ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md ring-1 ring-black/5"
    >
      <div className="mb-6 text-center">
        <div className="text-3xl" aria-hidden>
          {appConfig.logo}
        </div>
        <h1 className="mt-2 text-xl font-semibold text-tiktok">{appConfig.appName}</h1>
        <p className="text-sm text-gray-500">Đăng nhập để xem dashboard</p>
      </div>

      <label className="mb-3 block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="admin@ecentric.vn"
          autoComplete="username"
        />
      </label>

      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Mật khẩu</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="••••••"
          autoComplete="current-password"
        />
      </label>

      {error && (
        <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Spinner className="text-white" /> : 'Đăng nhập'}
      </Button>
    </form>
  );
}
