'use client';

import Grid from './Grid';
import ArticleCard from './ArticleCard';
import EmptyState from './EmptyState';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import type { GridGap, ResponsiveValue } from '@/types/grid';
import type { Article } from '@/types/content';

interface ArticleGridProps {
  articles: Article[];
  columns?: ResponsiveValue<number>;
  gap?: GridGap;
  className?: string;
  emptyState?: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
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
  className,
  emptyState
}: ArticleGridProps) {
  // Handle empty state
  if (articles.length === 0) {
    return (
      <EmptyState
        icon={DocumentTextIcon}
        title={emptyState?.title || "No articles found"}
        description={emptyState?.description || "There are no articles to display at the moment."}
        actionLabel={emptyState?.actionLabel}
        onAction={emptyState?.onAction}
      />
    );
  }

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
          publishedAt={article.publishedAt}
          author={article.author}
        />
      ))}
    </Grid>
  );
}