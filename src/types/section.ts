import { ElementType } from 'react';
import { BaseComponentProps } from './ui';

// Base Feature interface
export interface Feature {
  text: string;
  icon?: ElementType;
}

// Extended Feature interface for detailed features
export interface DetailedFeature {
  title: string;
  description: string;
}

export interface FeatureListProps extends BaseComponentProps {
  features: Feature[];
  iconColor?: string;
}

export interface CallToActionProps extends BaseComponentProps {
  title: string;
  description: string;
  features?: Feature[];
  buttonText: string;
  buttonHref: string;
  supportText?: string;
  supportPhone?: string;
  gradient?: string;
}

export interface HeroContent {
  promotional?: string;
  headline: {
    prefix: string;
    amount: string;
  };
  description: string;
  disclaimer: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  feature: {
    highlight: string;
    details: string;
  };
  planPreview: {
    price: string;
    title: string;
    subtitle: string;
  };
}

export interface ActivationContent {
  header: {
    title: string;
    description: string;
  };
  steps: Array<{
    icon: ElementType;
    title: string;
    description: string;
    details: string[];
  }>;
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    supportText: string;
    supportPhone: string;
    features: Array<{
      text: string;
      icon: ElementType;
    }>;
  };
}

export interface CoverageContent {
  header: {
    title: string;
    description: string;
  };
  coverageStats: Array<{
    label: string;
    value: number;
  }>;
  networkStats: Array<{
    icon: ElementType;
    text: string;
  }>;
}

export interface HeroSectionProps {
  content?: HeroContent;
  className?: string;
}

export interface ActivationSectionProps {
  content?: ActivationContent;
  className?: string;
}

export interface CoverageSectionProps {
  content?: CoverageContent;
  className?: string;
}