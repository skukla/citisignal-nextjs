'use client';

import { useEffect, useState } from 'react';
import { useDemoInspector, DATA_SOURCES } from '@/contexts/DemoInspectorContext';
import { SourceOverlay } from './SourceOverlay';

export default function DemoInspector() {
  const {
    enabled,
    activeSources,
    trackedQueries,
    inspectorPosition,
    toggleInspector,
    toggleSource,
    clearSources,
    clearQueries,
    setInspectorPosition,
    trackQuery
  } = useDemoInspector();
  
  const [panelOpen, setPanelOpen] = useState(true);
  const [showQueries, setShowQueries] = useState(false);
  
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
        {/* Toggle Button (when closed) */}
        {!panelOpen && (
          <button
            onClick={() => setPanelOpen(true)}
            className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            aria-label="Open Demo Inspector"
          >
            🔍
          </button>
        )}
        
        {/* Main Panel */}
        {panelOpen && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-4 w-80">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="mr-2">🔍</span>
                Demo Inspector
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectorPosition(inspectorPosition === 'left' ? 'right' : 'left')}
                  className="text-gray-400 hover:text-gray-600"
                  title={`Move to ${inspectorPosition === 'left' ? 'right' : 'left'}`}
                >
                  ↔️
                </button>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Minimize"
                >
                  −
                </button>
                <button
                  onClick={toggleInspector}
                  className="text-gray-400 hover:text-gray-600"
                  title="Close Inspector (Cmd+Shift+D)"
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* Data Sources */}
            <div className="space-y-2">
              <div className="text-xs text-gray-500 uppercase font-medium mb-2">
                Data Sources
              </div>
              {DATA_SOURCES.map((source) => {
                const isActive = activeSources.has(source.id);
                return (
                  <button
                    key={source.id}
                    onClick={() => toggleSource(source.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all transform hover:scale-[1.02] ${
                      isActive
                        ? 'shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${source.color}, ${source.color}cc)`
                        : undefined
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{source.icon}</span>
                        <div>
                          <div className={`font-medium ${
                            isActive ? 'text-white' : 'text-gray-900'
                          }`}>
                            {source.name}
                          </div>
                          <div className={`text-xs ${
                            isActive ? 'text-white opacity-90' : 'text-gray-500'
                          }`}>
                            {source.description}
                          </div>
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Actions */}
            {activeSources.size > 0 && (
              <button
                onClick={clearSources}
                className="w-full mt-3 bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Clear All
              </button>
            )}
            
            {/* Query Tracker */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowQueries(!showQueries)}
                className="w-full text-left flex items-center justify-between text-sm"
              >
                <span className="text-gray-600">
                  Recent Queries ({trackedQueries.length})
                </span>
                <span className="text-gray-400">
                  {showQueries ? '▼' : '▶'}
                </span>
              </button>
              
              {showQueries && (
                <div className="mt-2 max-h-40 overflow-y-auto">
                  {trackedQueries.length === 0 ? (
                    <div className="text-xs text-gray-400 py-2">
                      No queries tracked yet
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {trackedQueries.slice(0, 10).map((query) => {
                        const source = DATA_SOURCES.find(s => s.id === query.source);
                        return (
                          <div
                            key={query.id}
                            className="text-xs p-2 bg-gray-50 rounded flex items-center justify-between"
                          >
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
                      })}
                    </div>
                  )}
                  {trackedQueries.length > 0 && (
                    <button
                      onClick={clearQueries}
                      className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear queries
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Help Text */}
            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
              <div>Toggle: Cmd+Shift+D</div>
              <div>Click sources to highlight page sections</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}