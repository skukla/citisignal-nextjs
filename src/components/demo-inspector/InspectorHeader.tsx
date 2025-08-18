'use client';

interface InspectorHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

export function InspectorHeader({ 
  onMinimize, 
  onClose
}: InspectorHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900 flex items-center">
        <span className="mr-2">🔍</span>
        Demo Inspector
      </h3>
      <div className="flex items-center gap-2">
        <button
          onClick={onMinimize}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          title="Expand/Collapse Panel (Cmd+Shift+E)"
        >
          −
        </button>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          title="Close Inspector (Cmd+Shift+D)"
        >
          ×
        </button>
      </div>
    </div>
  );
}