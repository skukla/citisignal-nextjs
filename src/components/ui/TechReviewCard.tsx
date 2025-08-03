'use client';

import { memo } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

export interface TechReviewCardProps {
  title: string;
  description: string;
  videoThumbnail?: string;
  duration?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * TechReviewCard component for displaying tech review content with video thumbnails.
 * Built on the base Card component following our established architecture.
 * 
 * @example
 * ```tsx
 * <TechReviewCard
 *   title="iPhone 15 Pro vs Galaxy S24 Ultra: Camera Showdown"
 *   description="We put these flagship phones head-to-head in real-world photography tests..."
 *   duration="12:45"
 *   onClick={() => router.push(`/reviews/${review.slug}`)}
 * />
 * ```
 */
function TechReviewCard({
  title,
  description,
  videoThumbnail,
  duration,
  href,
  className,
  onClick
}: TechReviewCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      as="article"
      interactive
      className={twMerge('group p-0 overflow-hidden cursor-pointer', className)}
      onClick={handleClick}
    >
      {/* Video Thumbnail */}
      <div className="aspect-video bg-purple-50 relative overflow-hidden">
        {videoThumbnail ? (
          <Image 
            src={videoThumbnail} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
            <span className="text-purple-600 font-medium">Review Video</span>
          </div>
        )}
        
        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-purple-600 ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default memo(TechReviewCard);