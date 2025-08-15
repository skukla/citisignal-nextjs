'use client';

import { ReactNode } from 'react';

interface AccountPageMainProps {
  children: ReactNode;
  className?: string;
}

export function AccountPageMain({ children, className }: AccountPageMainProps) {
  return (
    <div className={className || "flex-1 min-w-0"}>
      {children}
    </div>
  );
}