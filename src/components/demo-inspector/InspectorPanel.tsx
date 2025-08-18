'use client';

import { ReactNode } from 'react';

interface InspectorPanelProps {
  children: ReactNode;
}

export function InspectorPanel({ children }: InspectorPanelProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-4 w-80">
      {children}
    </div>
  );
}