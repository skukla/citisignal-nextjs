'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDemoInspector, DATA_SOURCES } from '@/contexts/DemoInspectorContext';
import { SourceOverlay } from './SourceOverlay';
import { InspectorPanel } from './InspectorPanel';
import { InspectorHeader } from './InspectorHeader';
import { InspectorToggleButton } from './InspectorToggleButton';
import { DataSourceButton } from './DataSourceButton';
import { QueryTracker } from './QueryTracker';
import { SourceToggle } from './SourceToggle';
import { SingleQueryToggle } from './SingleQueryToggle';
import { CacheToggle } from './CacheToggle';

export default function DemoInspector() {
  const pathname = usePathname();
  const {
    enabled,
    panelCollapsed,
    activeSources,
    trackedQueries,
    inspectorPosition,
    toggleInspector,
    setPanelCollapsed,
    toggleSource,
    clearSources,
    clearQueries,
    trackQuery
  } = useDemoInspector();
  
  // Clear queries when route changes
  useEffect(() => {
    clearQueries();
  }, [pathname, clearQueries]);
  
  // Set up query tracking function
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Extend window object for Demo Inspector
      const windowWithInspector = window as Window & { 
        __demoInspectorTrackQuery?: typeof trackQuery 
      };
      windowWithInspector.__demoInspectorTrackQuery = trackQuery;
    }
    
    return () => {
      const windowWithInspector = window as Window & { 
        __demoInspectorTrackQuery?: typeof trackQuery 
      };
      delete windowWithInspector.__demoInspectorTrackQuery;
    };
  }, [trackQuery]);
  
  if (!enabled) return null;
  
  const position = inspectorPosition === 'left' ? 'left-4' : 'right-4';
  
  return (
    <>
      {/* Source Overlay */}
      <SourceOverlay activeSources={activeSources} />
      
      {/* Floating Inspector Panel */}
      <div className={`fixed top-20 ${position} z-50 space-y-4`}>
        {/* Toggle Button (when collapsed) */}
        {panelCollapsed && (
          <InspectorToggleButton onClick={() => setPanelCollapsed(false)} />
        )}
        
        {/* Main Panel */}
        {!panelCollapsed && (
          <InspectorPanel>
            {/* Header */}
            <InspectorHeader
              onMinimize={() => setPanelCollapsed(true)}
              onClose={toggleInspector}
            />
            
            {/* Data Sources */}
            <div className="space-y-2">
              <div className="text-xs text-gray-500 uppercase font-medium mb-2">
                Data Sources
              </div>
              {DATA_SOURCES.map((source) => (
                <DataSourceButton
                  key={source.id}
                  source={source}
                  isActive={activeSources.has(source.id)}
                  onClick={() => toggleSource(source.id)}
                />
              ))}
            </div>
            
            {/* Query Settings */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <SingleQueryToggle />
              <CacheToggle />
            </div>
            
            {/* Toggle All Sources */}
            <SourceToggle
              isActive={activeSources.size === DATA_SOURCES.length}
              onChange={(active) => {
                if (active) {
                  // Show all sources
                  DATA_SOURCES.forEach(source => {
                    if (!activeSources.has(source.id)) {
                      toggleSource(source.id);
                    }
                  });
                } else {
                  // Clear all sources
                  clearSources();
                }
              }}
            />
            
            {/* Query Tracker */}
            <QueryTracker 
              queries={trackedQueries}
              onClearQueries={clearQueries}
            />
            
            {/* Help Text */}
            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
              <div>On/Off: Cmd+Shift+D</div>
              <div>Collapse/Expand: Cmd+Shift+E</div>
              <div>Move: Cmd+Shift+← →</div>
              <div>Click sources to highlight page sections</div>
            </div>
          </InspectorPanel>
        )}
      </div>
    </>
  );
}