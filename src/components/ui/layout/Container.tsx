'use client';

import { twMerge } from 'tailwind-merge';
import type { BaseComponentProps } from '@/types/ui';

interface ContainerProps extends BaseComponentProps {
  noPadding?: boolean;
}

export default function Container({ children, className, noPadding = false }: ContainerProps) {
  return (
    <div className={twMerge(
      'max-w-7xl mx-auto',
      !noPadding && 'px-4 sm:px-6 lg:px-8',
      className
    )}>
      {children}
    </div>
  );
}