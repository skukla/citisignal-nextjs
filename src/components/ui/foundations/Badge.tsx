import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gray' | 'purple' | 'success' | 'warning' | 'error';
  className?: string;
}

export default function Badge({ children, variant = 'gray', className }: BadgeProps) {
  const variantStyles = {
    gray: 'bg-gray-100 text-gray-800',
    purple: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}