'use client';

import { memo } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

export interface ArticleCardProps {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image?: string;
  publishedAt?: string;
  author?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * ArticleCard component for displaying blog articles and news content.
 * 
 * @example
 * ```tsx
 * <ArticleCard
 *   category="Technology"
 *   title="The Future of 5G Networks"
 *   excerpt="Exploring the next generation of mobile connectivity..."
 *   readTime="5 min read"
 *   onClick={() => router.push(`/blog/${article.slug}`)}
 * />
 * ```
 */
function ArticleCard({
  category,
  title,
  excerpt,
  readTime,
  image,
  publishedAt,
  author,
  className,
  onClick
}: ArticleCardProps) {
  return (
    <Card 
      as="article"
      interactive
      className={twMerge('group border-0 shadow-none p-0 overflow-hidden', className)}
      onClick={onClick}
    >
      {/* Article Image */}
      <div className="aspect-video bg-purple-50 mb-4 overflow-hidden relative">
        {image ? (
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
            <span className="text-purple-600 font-medium">Article Image</span>
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="px-0">
        <div className="text-sm font-medium text-purple-600 mb-2">
          {category} • {readTime}
        </div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {excerpt}
        </p>
        
        {/* Optional metadata */}
        {(author || publishedAt) && (
          <div className="mt-3 text-xs text-gray-500">
            {author && <span>By {author}</span>}
            {author && publishedAt && <span> • </span>}
            {publishedAt && <span>{new Date(publishedAt).toLocaleDateString()}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}

export default memo(ArticleCard);