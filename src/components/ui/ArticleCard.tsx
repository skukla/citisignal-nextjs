'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ArticleCardProps {
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  className?: string;
}

export default function ArticleCard({
  category,
  readTime,
  title,
  excerpt,
  href,
  image,
  className
}: ArticleCardProps) {
  return (
    <Link href={href}>
      <div className={twMerge(
        'group cursor-pointer',
        className
      )}>
        {/* Article Image */}
        <div className="aspect-video bg-purple-50 rounded-xl mb-4 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
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
    </Link>
  );
} 