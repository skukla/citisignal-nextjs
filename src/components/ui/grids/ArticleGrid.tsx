'use client';

import Grid from './Grid';
import ArticlePreview from '../previews/ArticlePreview';
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
        <ArticlePreview
          key={index}
          title={article.title}
          description={article.excerpt}
          image={article.image}
          category={article.category}
          readTime={article.readTime}
          href={`/blog/${article.slug}`}
        />
      ))}
    </Grid>
  );
}