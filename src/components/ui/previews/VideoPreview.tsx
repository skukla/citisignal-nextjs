'use client';

import { twMerge } from 'tailwind-merge';
import { PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import PreviewContent from './PreviewContent';
import type { VideoPreviewProps } from '@/types/preview.types';

export default function VideoPreview({
  title,
  description,
  image,
  href = '#',
  className,
  placeholder = 'Review Video'
}: VideoPreviewProps) {
  return (
    <a href={href} className={twMerge('group block', className)}>
      <div className="aspect-video bg-purple-50 rounded-lg mb-4 overflow-hidden">
        {image ? (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
              <PlayIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center group-hover:bg-opacity-90 transition-opacity">
            <span className="text-purple-600 font-medium group-hover:opacity-0 transition-opacity">{placeholder}</span>
            <PlayIcon className="w-12 h-12 text-purple-600 opacity-0 group-hover:opacity-60 absolute transition-opacity" />
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