'use client';

import Grid from './Grid';
import TechReviewPreview from '../previews/TechReviewPreview';
import type { GridProps } from '@/types/grid';
import type { TechArticle } from '@/data/sections/techNews';

interface ArticleGridProps {
  articles: TechArticle[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
}

export default function ArticleGrid({
  articles,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'xl',
  className
}: ArticleGridProps) {
  return (
    <Grid
      columns={columns}
      gap={gap}
      className={className}
    >
      {articles.map((article, index) => (
        <TechReviewPreview
          key={index}
          title={article.title}
          description={article.excerpt}
          image={article.image}
          href={`/blog/${article.slug}`}
        />
      ))}
    </Grid>
  );
}