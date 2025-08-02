/**
 * Newsletter Section Data
 * Content for the newsletter signup section
 */

export interface NewsletterBenefit {
  emoji: string;
  title: string;
  description: string;
}

export interface NewsletterContent {
  header: {
    title: string;
    description: string;
  };
  benefits: NewsletterBenefit[];
  form: {
    placeholder: string;
    buttonText: string;
    privacyText: string;
  };
  successMessage: string;
}

export const newsletterContent: NewsletterContent = {
  header: {
    title: "Stay Connected with CitiSignal",
    description: "Get exclusive deals, new device launches, and special offers delivered straight to your inbox."
  },
  benefits: [
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
  ],
  form: {
    placeholder: "Enter your email address",
    buttonText: "Subscribe Now",
    privacyText: "We respect your privacy. Unsubscribe at any time."
  },
  successMessage: "Thanks for subscribing! Check your email to confirm your subscription."
};