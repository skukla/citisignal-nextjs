'use client';

import type { TrackedQuery } from '@/contexts/DemoInspectorContext';
import { DATA_SOURCES } from '@/contexts/DemoInspectorContext';

interface QueryItemProps {
  query: TrackedQuery;
}

export function QueryItem({ query }: QueryItemProps) {
  const source = DATA_SOURCES.find(s => s.id === query.source);
  
  return (
    <div className="text-xs p-2 bg-gray-50 rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>{source?.icon}</span>
        <span className="font-mono">{query.name}</span>
      </div>
      {query.responseTime && (
        <span className="text-gray-400">
          {query.responseTime}ms
        </span>
      )}
    </div>
  );
}