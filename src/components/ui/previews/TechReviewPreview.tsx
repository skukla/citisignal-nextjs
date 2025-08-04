'use client';

import { twMerge } from 'tailwind-merge';
import PreviewContent from './PreviewContent';

interface TechReviewPreviewProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
  className?: string;
}

export default function TechReviewPreview({
  title,
  description,
  image,
  href = '#',
  className
}: TechReviewPreviewProps) {
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
      <PreviewContent
        title={title}
        description={description}
        titleSize="md"
        className="mt-4"
      />
    </a>
  );
}