interface HeroFeature {
  highlight: string;
  details: string;
}

interface HeroPlan {
  price: string;
  title: string;
  subtitle: string;
}

export const heroFeatures: HeroFeature[] = [
  {
    highlight: 'Max coverage, Super speed.',
    details: 'Our prepaid plans use the same great CitiSignal 5G network that covers more than 200 million Americans nationwide.'
  }
] as const;

export const heroPlan: HeroPlan = {
  price: '$10/month',
  title: 'Unlimited Talk & Text',
  subtitle: '+ 2.5GB High-Speed Data'
} as const; 