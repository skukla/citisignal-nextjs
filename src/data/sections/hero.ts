import type { HeroContent } from '@/types/section';

export const heroContent: HeroContent = {
  promotional: "Our lowest-priced plans ever",
  headline: {
    prefix: "Starting at only",
    amount: "$20/month"
  },
  description: "Unlimited talk and text, plus 2.5GB of high-speed data. And we'll increase your data by 500MB each year through 2025.",
  disclaimer: "Plus taxes & fees. Domestic use only.",
  primaryCTA: {
    text: "Shop Plans",
    href: "/plans"
  },
  secondaryCTA: {
    text: "Shop Phones",
    href: "/phones"
  },
  feature: {
    highlight: 'Max coverage, Super speed.',
    details: 'Our prepaid plans use the same great CitiSignal 5G network that covers more than 200 million Americans nationwide.'
  },
  planPreview: {
    price: "$10/month",
    title: "Unlimited Talk & Text",
    subtitle: "+ 2.5GB High-Speed Data"
  }
};