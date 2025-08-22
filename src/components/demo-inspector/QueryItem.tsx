'use client';

import type { TrackedQuery } from '@/contexts/DemoInspectorContext';
import { DATA_SOURCES } from '@/contexts/DemoInspectorContext';

interface QueryItemProps {
  query: TrackedQuery;
}

// Format query time to show seconds for times over 1000ms
function formatQueryTime(milliseconds: number): string {
  if (milliseconds >= 1000) {
    const seconds = (milliseconds / 1000).toFixed(1);
    // Remove trailing .0 for whole seconds
    return seconds.endsWith('.0') ? `${seconds.slice(0, -2)}s` : `${seconds}s`;
  }
  return `${milliseconds}ms`;
}

export function QueryItem({ query }: QueryItemProps) {
  const source = DATA_SOURCES.find((s) => s.id === query.source);

  return (
    <div className="text-xs p-2 bg-gray-50 rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>{source?.icon}</span>
        <span className="font-mono">{query.name}</span>
      </div>
      {query.responseTime && (
        <span className="text-gray-400">{formatQueryTime(query.responseTime)}</span>
      )}
    </div>
  );
}
