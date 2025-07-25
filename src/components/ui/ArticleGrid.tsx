'use client';

import ArticleCard from './ArticleCard';
import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';

interface Article {
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  image?: string;
  href?: string;
}

interface ArticleGridProps {
  articles: Article[];
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ArticleGrid({
  articles,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'lg',
  className
}: ArticleGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      className={className}
    >
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          category={article.category}
          readTime={article.readTime}
          title={article.title}
          excerpt={article.excerpt}
          image={article.image}
          href={article.href || '/blog'}
        />
      ))}
    </BaseGrid>
  );
} 