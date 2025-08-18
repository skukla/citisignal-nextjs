'use client';

import { useState, useEffect } from 'react';
import { useDemoInspector } from '@/contexts/DemoInspectorContext';

const CACHE_KEY = 'citisignal_navigation_cache';
const CACHE_DISABLED_KEY = 'citisignal_cache_disabled';

export function CacheToggle() {
  const [cacheDisabled, setCacheDisabled] = useState(false);
  const { clearQueries } = useDemoInspector();
  
  // Load cache disabled state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const disabled = localStorage.getItem(CACHE_DISABLED_KEY) === 'true';
      setCacheDisabled(disabled);
    }
  }, []);
  
  const handleToggleCache = () => {
    if (typeof window !== 'undefined') {
      const newDisabledState = !cacheDisabled;
      
      if (newDisabledState) {
        // Disable cache: clear existing cache and set flag
        localStorage.removeItem(CACHE_KEY);
        localStorage.setItem(CACHE_DISABLED_KEY, 'true');
      } else {
        // Enable cache: remove flag (cache will be populated on next fetch)
        localStorage.removeItem(CACHE_DISABLED_KEY);
      }
      
      // Clear queries before reload to ensure clean state
      clearQueries();
      
      // Update state and reload to apply changes
      setCacheDisabled(newDisabledState);
      window.location.reload();
    }
  };
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">
        Disable Cache
      </span>
      <button
        onClick={handleToggleCache}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
          cacheDisabled ? 'bg-gray-600' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={cacheDisabled}
      >
        <span className="sr-only">Toggle cache</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            cacheDisabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}