'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ComparisonRowProps {
  title: string;
  description: string;
  values: boolean[];
}

export default function ComparisonRow({
  title,
  description,
  values
}: ComparisonRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="text-sm font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </td>
      {values.map((isAvailable, index) => (
        <td key={index} className="py-4 px-6 text-center">
          {isAvailable ? (
            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
          ) : (
            <XMarkIcon className="w-5 h-5 text-gray-300 mx-auto" />
          )}
        </td>
      ))}
    </tr>
  );
} 