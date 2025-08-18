'use client';

interface InspectorToggleButtonProps {
  onClick: () => void;
}

export function InspectorToggleButton({ onClick }: InspectorToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors cursor-pointer"
      aria-label="Open Demo Inspector"
    >
      🔍
    </button>
  );
}