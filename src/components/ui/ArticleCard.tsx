'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import ImagePlaceholder from './ImagePlaceholder';
import ArticleMeta from './ArticleMeta';

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
        <ImagePlaceholder
          image={image ? { url: image, label: title } : undefined}
          aspectRatio="video"
          placeholderText="Article Image"
          bgColor="bg-purple-100"
          textColor="text-purple-600"
          className="mb-4"
        />

        <div>
          <ArticleMeta
            category={category}
            readTime={readTime}
            className="mb-2"
          />
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