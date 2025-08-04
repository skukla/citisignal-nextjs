'use client';

import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import PreviewContent from '../previews/PreviewContent';

interface ArticlePreviewProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  readTime?: string;
  href?: string;
  className?: string;
}

export default function ArticlePreview({
  title,
  description,
  image,
  category,
  readTime,
  href = '#',
  className
}: ArticlePreviewProps) {
  return (
    <a href={href} className={twMerge('group block', className)}>
      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
        {image ? (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center relative">
            <span className="text-gray-600 font-medium">Article Image</span>
          </div>
        )}
      </div>
      <div className="text-sm font-medium text-purple-600 mb-2">
        {category} • {readTime}
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