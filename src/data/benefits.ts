'use client';

interface Benefit {
  emoji: string;
  title: string;
  description: string;
}

export const newsletterBenefits: Benefit[] = [
  {
    emoji: "📱",
    title: "Exclusive Deals",
    description: "First access to limited-time offers and discounts"
  },
  {
    emoji: "🚀",
    title: "New Releases",
    description: "Be the first to know about new device launches"
  },
  {
    emoji: "💡",
    title: "Tips & Updates",
    description: "Network updates and helpful tech tips"
  }
]; 