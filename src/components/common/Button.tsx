import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/common/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-tiktok text-white hover:bg-tiktok/90',
        variant === 'ghost' && 'bg-transparent text-tiktok hover:bg-black/5',
        className,
      )}
      {...props}
    />
  );
}
