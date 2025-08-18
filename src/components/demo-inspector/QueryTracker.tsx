'use client';

import { useState } from 'react';
import type { TrackedQuery } from '@/contexts/DemoInspectorContext';
import { QueryItem } from './QueryItem';

interface QueryTrackerProps {
  queries: TrackedQuery[];
  onClearQueries: () => void;
}

export function QueryTracker({ queries, onClearQueries }: QueryTrackerProps) {
  const [showQueries, setShowQueries] = useState(false);
  
  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <button
        onClick={() => setShowQueries(!showQueries)}
        className="w-full text-left flex items-center justify-between text-sm cursor-pointer hover:text-gray-700"
      >
        <span className="text-gray-600">
          Recent Queries ({queries.length})
        </span>
        <span className="text-gray-400">
          {showQueries ? '▼' : '▶'}
        </span>
      </button>
      
      {showQueries && (
        <>
          <div className="mt-2 max-h-40 overflow-y-auto">
            {queries.length === 0 ? (
              <div className="text-xs text-gray-400 py-2">
                No queries tracked yet
              </div>
            ) : (
              <div className="space-y-1">
                {queries.slice(0, 10).map((query) => (
                  <QueryItem key={query.id} query={query} />
                ))}
              </div>
            )}
          </div>
          {queries.length > 0 && (
            <button
              onClick={onClearQueries}
              className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Clear queries
            </button>
          )}
        </>
      )}
    </div>
  );
}