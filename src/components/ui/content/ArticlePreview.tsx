'use client';

import { memo } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export interface ArticlePreviewProps {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * ArticlePreview component for displaying article teasers in a content feed or grid.
 * Unlike Card components which are bounded containers, previews are unbounded content teasers
 * that focus on typography and content hierarchy.
 * 
 * @example
 * ```tsx
 * <ArticlePreview
 *   category="Technology"
 *   title="Understanding 5G: The Future of Mobile Connectivity"
 *   excerpt="Learn how 5G technology is revolutionizing mobile communications..."
 *   readTime="5 min read"
 *   onClick={() => router.push(`/blog/${article.slug}`)}
 * />
 * ```
 */
function ArticlePreview({
  category,
  title,
  excerpt,
  readTime,
  image,
  className,
  onClick
}: ArticlePreviewProps) {
  return (
    <div 
      className={twMerge('group cursor-pointer overflow-hidden', className)}
      onClick={onClick}
    >
      {/* Article Image */}
      <div className="aspect-video bg-purple-50 mb-4 overflow-hidden relative">
        {image ? (
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
            <span className="text-purple-600 font-medium">Article Image</span>
          </div>
        )}
      </div>

      {/* Article Content */}
      <div>
        <div className="text-sm font-medium text-purple-600 mb-2">
          {category} • {readTime}
        </div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {excerpt}
        </p>
      </div>
    </div>
  );
}

export default memo(ArticlePreview);