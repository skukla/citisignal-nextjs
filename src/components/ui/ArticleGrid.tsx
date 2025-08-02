'use client';

import Grid from './Grid';
import ArticleCard from './ArticleCard';
import type { GridGap, ResponsiveValue } from '@/types/grid';

interface Article {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image?: string;
  slug?: string;
  publishedAt?: string;
  author?: string;
}

interface ArticleGridProps {
  articles: Article[];
  columns?: ResponsiveValue<number>;
  gap?: GridGap;
  className?: string;
}

/**
 * A grid component for displaying article cards in a responsive layout.
 * Built on the base Grid component.
 *
 * @example
 * ```tsx
 * <ArticleGrid
 *   articles={articles}
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 *   gap="lg"
 * />
 * ```
 */
export default function ArticleGrid({
  articles,
  columns = {
    sm: 1,
    md: 3
  },
  gap = 'lg',
  className
}: ArticleGridProps) {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {articles.map((article) => (
        <ArticleCard
          key={article.slug || article.title}
          category={article.category}
          title={article.title}
          excerpt={article.excerpt}
          readTime={article.readTime}
          image={article.image}
          slug={article.slug}
          publishedAt={article.publishedAt}
          author={article.author}
        />
      ))}
    </Grid>
  );
}