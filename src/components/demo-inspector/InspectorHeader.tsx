'use client';

interface InspectorHeaderProps {
  onPositionToggle: () => void;
  onMinimize: () => void;
  onClose: () => void;
  position: 'left' | 'right';
}

export function InspectorHeader({ 
  onPositionToggle, 
  onMinimize, 
  onClose, 
  position 
}: InspectorHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900 flex items-center">
        <span className="mr-2">🔍</span>
        Demo Inspector
      </h3>
      <div className="flex items-center gap-2">
        <button
          onClick={onPositionToggle}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          title={`Move to ${position === 'left' ? 'right' : 'left'}`}
        >
          ↔️
        </button>
        <button
          onClick={onMinimize}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          title="Minimize"
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