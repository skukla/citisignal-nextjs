'use client';

import { twMerge } from 'tailwind-merge';

interface ArticleMetaProps {
  category: string;
  readTime: string;
  textColor?: string;
  className?: string;
}

export default function ArticleMeta({
  category,
  readTime,
  textColor = 'text-purple-600',
  className
}: ArticleMetaProps) {
  return (
    <div className={twMerge(
      'text-sm font-medium',
      textColor,
      className
    )}>
      {category} • {readTime}
    </div>
  );
} 