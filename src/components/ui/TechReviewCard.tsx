'use client';

import { twMerge } from 'tailwind-merge';

interface TechReviewCardProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
  className?: string;
}

export default function TechReviewCard({
  title,
  description,
  image,
  href = '#',
  className
}: TechReviewCardProps) {
  return (
    <a href={href} className={twMerge('group block', className)}>
      <div className="aspect-video bg-purple-50 rounded-lg mb-4 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
            <span className="text-purple-600 font-medium">Review Video</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2">
        {description}
      </p>
    </a>
  );
} 