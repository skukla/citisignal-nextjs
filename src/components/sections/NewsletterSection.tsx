'use client';

import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeader from '@/components/ui/SectionHeader';
import IconBadge from '@/components/ui/IconBadge';
import BenefitGrid from '@/components/ui/BenefitGrid';
import NewsletterForm from '@/components/ui/NewsletterForm';
import PrivacyNotice from '@/components/ui/PrivacyNotice';
import SuccessMessage from '@/components/ui/SuccessMessage';

export default function NewsletterSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SectionContainer bgColor="bg-gradient-to-br from-green-50 to-emerald-100">
        <SuccessMessage
          title="Thanks for subscribing!"
          description="You'll receive the latest deals and updates in your inbox."
          buttonText="Subscribe another email"
          onButtonClick={() => setIsSubmitted(false)}
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer 
      bgColor="bg-gradient-to-br from-[#8821f4] via-[#6a1b9a] to-[#4a148c]"
    >
      <div className="text-center">
        <IconBadge
          icon={<EnvelopeIcon />}
          bgColor="bg-white"
          iconColor="text-purple-600"
          size="lg"
          className="mx-auto mb-8"
        />

        <SectionHeader
          title="Stay Connected with CitiSignal"
          description="Get exclusive deals, new device launches, and special offers delivered straight to your inbox."
          centered
          titleColor="text-white"
          descriptionColor="text-purple-100"
          className="mb-12"
        />

        <BenefitGrid 
          benefits={benefits}
          className="mb-12"
        />

        <NewsletterForm
          onSubmit={handleSubmit}
          className="mx-auto mb-4"
        />

        <PrivacyNotice
          text="We respect your privacy. Unsubscribe at any time."
          linkText="Privacy Policy"
          linkHref="/privacy"
        />
      </div>
    </SectionContainer>
  );
} 