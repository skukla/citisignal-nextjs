'use client';

import { useState, memo } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Section from '@/components/ui/layout/Section';
import Badge from '@/components/ui/foundations/Badge';
import BenefitGrid from '@/components/ui/grids/BenefitGrid';
import NewsletterForm from '@/components/ui/forms/NewsletterForm';
import PrivacyNotice from '@/components/ui/feedback/PrivacyNotice';
import SuccessMessage from '@/components/ui/feedback/SuccessMessage';
import { newsletterContent } from '@/data/sections/newsletter';
import type { NewsletterContent } from '@/data/sections/newsletter';

export interface NewsletterSectionProps {
  content?: NewsletterContent;
  className?: string;
}

function NewsletterSection({
  content = newsletterContent,
  className
}: NewsletterSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);



  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Section background="bg-gradient-to-br from-green-50 to-emerald-100" className={className}>
        <SuccessMessage
          title={content.successState.title}
          description={content.successState.description}
          buttonText={content.successState.buttonText}
          onButtonClick={() => setIsSubmitted(false)}
        />
      </Section>
    );
  }

  return (
    <Section 
      className={`bg-gradient-to-br from-[#8821f4] via-[#6a1b9a] to-[#4a148c] ${className || ''}`}
    >
      <div className="text-center">
        <Badge
          icon={EnvelopeIcon}
          size="lg"
          className="mx-auto mb-8 w-12 h-12 bg-white text-purple-600"
        />

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {content.header.title}
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            {content.header.description}
          </p>
        </div>

        <BenefitGrid 
          benefits={content.benefits}
          className="mb-12"
        />

        <NewsletterForm
          onSubmit={handleSubmit}
          className="mx-auto mb-4"
        />

        <PrivacyNotice
          text={content.privacyNotice.text}
          linkText={content.privacyNotice.linkText}
          linkHref={content.privacyNotice.linkHref}
        />
      </div>
    </Section>
  );
}

export default memo(NewsletterSection); 