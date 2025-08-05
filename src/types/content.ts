import type { HeroIcon } from './hero-icons';

/**
 * Content model interfaces for cards and grids.
 * These represent the data structures for various content types
 * used across the application.
 */

export interface Article {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image?: string;
  slug?: string;
  publishedAt?: string;
  author?: string;
}

export interface TechReview {
  id: string;
  title: string;
  description: string;
  videoThumbnail?: string;
  duration?: string;
  href?: string;
  slug?: string;
}

export interface BuyingGuide {
  id: string;
  icon: HeroIcon;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
  slug?: string;
}

export interface Accessory {
  id: string;
  icon: HeroIcon;
  name: string;
  price?: string;
  href?: string;
  slug?: string;
}

export interface Tip {
  id: string;
  category: string;
  title: string;
  description: string;
  href?: string;
  slug?: string;
}

export interface Tool {
  icon: HeroIcon;
  title: string;
  description: string;
  link: string;
}

export interface Solution {
  icon: HeroIcon;
  title: string;
  description: string;
  features: string[];
  link: string;
}