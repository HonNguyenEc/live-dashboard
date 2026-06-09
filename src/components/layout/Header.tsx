import { appConfig } from '@/config/app.config';
import { Button } from '@/components/common/Button';

/** Top bar: app logo/title on the left, user email + Logout on the right. */
export function Header({ email }: { email: string }) {
  return (
    <header className="flex items-center justify-between border-b border-black/10 bg-white px-6 py-3">
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden>
          {appConfig.logo}
        </span>
        <span className="text-lg font-semibold text-tiktok">{appConfig.header.title}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{email}</span>
        {/* Logout via form POST so the server can clear the cookie and redirect. */}
        <form action="/api/auth/logout" method="post">
          <Button type="submit" variant="ghost">
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}
