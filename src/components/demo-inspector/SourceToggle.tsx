'use client';

interface SourceToggleProps {
  isActive: boolean;
  onChange: (active: boolean) => void;
}

export function SourceToggle({ isActive, onChange }: SourceToggleProps) {
  return (
    <div className="flex items-center justify-between mt-3">
      <span className="text-sm text-gray-600">Highlight All</span>
      <button
        onClick={() => onChange(!isActive)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
          isActive ? 'bg-gray-600' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={isActive}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isActive ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}