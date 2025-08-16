'use client';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  className,
  checked,
  onChange,
  onCheckedChange,
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onCheckedChange?.(e.target.checked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          className="sr-only"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div className={twMerge(
          "block w-10 h-6 rounded-full transition-colors duration-200",
          checked ? "bg-purple-600" : "bg-gray-300",
          className
        )} />
        <div className={twMerge(
          "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200",
          checked ? "translate-x-4" : "translate-x-0"
        )} />
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
    </label>
  );
});

Switch.displayName = 'Switch';

export default Switch;