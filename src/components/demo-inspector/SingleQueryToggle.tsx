'use client';

import { useDemoInspector } from '@/contexts/DemoInspectorContext';

export function SingleQueryToggle() {
  const { singleQueryMode, setSingleQueryMode } = useDemoInspector();
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">Single Query</span>
      <button
        onClick={() => setSingleQueryMode(!singleQueryMode)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
          singleQueryMode ? 'bg-gray-600' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={singleQueryMode}
        title="Toggle between single unified query and multiple focused queries"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            singleQueryMode ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}