import { ReactNode } from 'react';
import { HeroIcon } from '@/types/hero-icons';

export type PreviewTitleSize = 'sm' | 'md' | 'lg';

// Base props shared by all previews
export interface BasePreviewProps {
  title: string;
  description: string;
  className?: string;
  href?: string;
}

// Specific preview types
export interface ArticlePreviewProps extends BasePreviewProps {
  image?: string;
  category?: string;
  readTime?: string;
}

export interface VideoPreviewProps extends BasePreviewProps {
  image?: string;
  placeholder?: string;
}

export interface BuyingGuidePreviewProps extends BasePreviewProps {
  icon: HeroIcon;
}

export interface PreviewContentProps {
  title: string;
  description: string;
  titleSize?: PreviewTitleSize;
  titleColor?: string;
  descriptionColor?: string;
  className?: string;
  children?: ReactNode;
}