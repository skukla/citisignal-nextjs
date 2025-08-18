'use client';

import type { SourceInfo } from '@/contexts/DemoInspectorContext';

interface DataSourceButtonProps {
  source: SourceInfo;
  isActive: boolean;
  onClick: () => void;
}

export function DataSourceButton({ source, isActive, onClick }: DataSourceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl transition-all transform hover:scale-[1.02] cursor-pointer ${
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
}