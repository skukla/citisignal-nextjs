'use client';

import { useDemoInspector } from '@/contexts/DemoInspectorContext';

export function SingleQueryToggle() {
  const { singleQueryMode, setSingleQueryMode, clearQueries } = useDemoInspector();
  
  // Invert the logic - toggle shows multiple queries when ON
  const showMultipleQueries = !singleQueryMode;
  
  const handleToggle = () => {
    setSingleQueryMode(!singleQueryMode);
    clearQueries(); // Clear the query list
    // Reload to apply the new query mode
    setTimeout(() => window.location.reload(), 100);
  };
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">Show Multiple Queries</span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
          showMultipleQueries ? 'bg-gray-600' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={showMultipleQueries}
        title="Toggle between single unified query and multiple focused queries"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            showMultipleQueries ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}