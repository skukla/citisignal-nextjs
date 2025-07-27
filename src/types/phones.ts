import type { HeroIcon } from './hero-icons';

export interface TechReview {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export interface BuyingGuide {
  icon: HeroIcon;
  title: string;
  description: string;
  href: string;
}

export interface PhoneTip {
  category: string;
  title: string;
  description: string;
  href: string;
  categoryColor: string;
}

export interface FilterSection {
  title: string;
  key: string;
  options: Array<{ id: string; name: string }>;
  type: 'checkbox';
} 