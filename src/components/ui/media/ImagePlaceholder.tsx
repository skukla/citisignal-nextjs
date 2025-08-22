'use client';

import { twMerge } from 'tailwind-merge';

export type PlaceholderType = 'article' | 'product' | 'video' | 'generic';

interface ImagePlaceholderProps {
  type?: PlaceholderType;
  className?: string;
  iconClassName?: string;
}

const placeholderConfigs = {
  article: {
    bgClass: 'bg-gradient-to-br from-purple-100 to-purple-50',
    iconColor: 'text-purple-400',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  product: {
    bgClass: 'bg-gradient-to-br from-gray-100 to-gray-50',
    iconColor: 'text-gray-400',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  video: {
    bgClass: 'bg-gradient-to-br from-purple-100 to-purple-50',
    iconColor: 'text-purple-400',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  generic: {
    bgClass: 'bg-gradient-to-br from-gray-200 to-gray-100',
    iconColor: 'text-gray-500',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
};

export default function ImagePlaceholder({
  type = 'generic',
  className,
  iconClassName,
}: ImagePlaceholderProps) {
  const config = placeholderConfigs[type];

  return (
    <div
      className={twMerge(
        'w-full h-full flex items-center justify-center',
        config.bgClass,
        className
      )}
    >
      <div className={twMerge(config.iconColor, iconClassName)}>{config.icon}</div>
    </div>
  );
}
