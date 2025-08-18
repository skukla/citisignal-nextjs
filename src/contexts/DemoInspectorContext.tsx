'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type DataSource = 'commerce' | 'catalog' | 'search';

export interface SourceInfo {
  id: DataSource;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface TrackedQuery {
  id: string;
  name: string;
  source: DataSource;
  timestamp: number;
  componentId?: string;
  responseTime?: number;
}

interface DemoInspectorContextValue {
  // State
  enabled: boolean;
  activeSources: Set<DataSource>;
  trackedQueries: TrackedQuery[];
  inspectorPosition: 'left' | 'right';
  
  // Actions
  toggleInspector: () => void;
  setEnabled: (enabled: boolean) => void;
  toggleSource: (source: DataSource) => void;
  clearSources: () => void;
  trackQuery: (query: TrackedQuery) => void;
  clearQueries: () => void;
  setInspectorPosition: (position: 'left' | 'right') => void;
}

const DemoInspectorContext = createContext<DemoInspectorContextValue | undefined>(undefined);

export const DATA_SOURCES: SourceInfo[] = [
  {
    id: 'commerce',
    name: 'Commerce Core',
    color: '#9333ea',
    icon: '🏪',
    description: 'Navigation, categories & store data'
  },
  {
    id: 'catalog',
    name: 'Catalog Service',
    color: '#2563eb',
    icon: '📦',
    description: 'Product listings & inventory'
  },
  {
    id: 'search',
    name: 'Live Search',
    color: '#16a34a',
    icon: '🔍',
    description: 'Search, facets & filtering'
  }
];

interface DemoInspectorProviderProps {
  children: ReactNode;
}

export function DemoInspectorProvider({ children }: DemoInspectorProviderProps) {
  const [enabled, setEnabled] = useState(false);
  const [activeSources, setActiveSources] = useState<Set<DataSource>>(new Set());
  const [trackedQueries, setTrackedQueries] = useState<TrackedQuery[]>([]);
  const [inspectorPosition, setInspectorPosition] = useState<'left' | 'right'>('right');
  
  // Load saved preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('demo-inspector-prefs');
      if (saved) {
        try {
          const prefs = JSON.parse(saved);
          setEnabled(prefs.enabled || false);
          setInspectorPosition(prefs.position || 'right');
        } catch (e) {
          console.error('Failed to load inspector preferences:', e);
        }
      }
    }
  }, []);
  
  // Save preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo-inspector-prefs', JSON.stringify({
        enabled,
        position: inspectorPosition
      }));
    }
  }, [enabled, inspectorPosition]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+Shift+D (Mac) or Ctrl+Shift+D (Windows/Linux)
      // D for "Demo Inspector" or "Debug"
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setEnabled(prev => !prev);
      }
      
      // Cmd+Shift+LeftArrow - Move inspector to left
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        setInspectorPosition('left');
      }
      
      // Cmd+Shift+RightArrow - Move inspector to right
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'ArrowRight') {
        e.preventDefault();
        setInspectorPosition('right');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const toggleInspector = useCallback(() => {
    setEnabled(prev => !prev);
  }, []);
  
  const toggleSource = useCallback((source: DataSource) => {
    setActiveSources(prev => {
      const newSources = new Set(prev);
      if (newSources.has(source)) {
        newSources.delete(source);
      } else {
        newSources.add(source);
      }
      return newSources;
    });
  }, []);
  
  const clearSources = useCallback(() => {
    setActiveSources(new Set());
  }, []);
  
  const trackQuery = useCallback((query: TrackedQuery) => {
    setTrackedQueries(prev => {
      // Keep only last 50 queries
      const updated = [query, ...prev].slice(0, 50);
      return updated;
    });
  }, []);
  
  const clearQueries = useCallback(() => {
    setTrackedQueries([]);
  }, []);
  
  const value: DemoInspectorContextValue = {
    enabled,
    activeSources,
    trackedQueries,
    inspectorPosition,
    toggleInspector,
    setEnabled,
    toggleSource,
    clearSources,
    trackQuery,
    clearQueries,
    setInspectorPosition
  };
  
  return (
    <DemoInspectorContext.Provider value={value}>
      {children}
    </DemoInspectorContext.Provider>
  );
}

export function useDemoInspector() {
  const context = useContext(DemoInspectorContext);
  if (!context) {
    throw new Error('useDemoInspector must be used within DemoInspectorProvider');
  }
  return context;
}