'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import PreviewContent from './PreviewContent';
import ImagePlaceholder from '@/components/ui/media/ImagePlaceholder';
import type { ArticlePreviewProps } from '@/types/preview.types';

export default function ArticlePreview({
  title,
  description,
  image,
  category,
  readTime,
  href = '#',
  className,
}: ArticlePreviewProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <a href={href} className={twMerge('group block', className)}>
      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
        {image && !imageError ? (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <ImagePlaceholder type="article" />
        )}
      </div>
      <div className="text-sm font-medium text-purple-600 mb-2">
        {category} • {readTime}
      </div>
      <PreviewContent title={title} description={description} titleSize="md" className="mt-4" />
    </a>
  );
}
