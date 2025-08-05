'use client';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  containerClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  className,
  containerClassName,
  ...props
}, ref) => {
  return (
    <label className={twMerge("flex items-center cursor-pointer", containerClassName)}>
      <input
        type="checkbox"
        ref={ref}
        className={twMerge(
          "w-4 h-4 accent-purple-600 border-gray-300 rounded",
          className
        )}
        {...props}
      />
      {label && (
        <span className="ml-3 text-sm text-gray-700">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;