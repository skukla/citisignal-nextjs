'use client';

import { twMerge } from 'tailwind-merge';
import ArticleCard from './ArticleCard';

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
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
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
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const getColumnsClass = () => {
    const classes = [];
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    return classes.join(' ');
  };

  return (
    <div className={twMerge(
      'grid',
      getColumnsClass(),
      gapClasses[gap],
      className
    )}>
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
    </div>
  );
} 