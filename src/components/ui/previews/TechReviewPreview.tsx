'use client';

import { twMerge } from 'tailwind-merge';
import { PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
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
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
              <PlayIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
              <PlayIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-purple-600 font-medium group-hover:opacity-0 transition-opacity">Review Video</span>
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