import { ElementType } from 'react';
import type { HeroIcon } from './hero-icons';
import type { ThemeTextColor } from './theme';

export interface CallToActionFeature {
  text: string;
  icon?: ElementType;
}

export interface CheckmarkFeature {
  title: string;
  description: string;
}

export interface HighlightFeature {
  highlight: string;
  details?: string;
  dotColor?: string;
}

export interface CoreFeature {
  value: string;
  label: string;
}

export interface FeaturedToolFeature {
  title: string;
  description: string;
}

export interface PlanDetail {
  label: string;
  value: string;
}

export interface BuyingGuide {
  icon: HeroIcon;
  title: string;
  description: string;
  href: string;
}

export interface TechReview {
  title: string;
  description: string;
  image?: string;
  href?: string;
}

export interface Tip {
  category: string;
  title: string;
  description: string;
  href: string;
  categoryColor?: ThemeTextColor;
} 