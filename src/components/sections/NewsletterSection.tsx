'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline';
import BaseSection from '@/components/ui/layout/BaseSection';
import IconBadge from '@/components/ui/IconBadge';
import BenefitGrid from '@/components/ui/BenefitGrid';
import BenefitCard from '@/components/ui/BenefitCard';
import NewsletterForm from '@/components/ui/NewsletterForm';
import PrivacyNotice from '@/components/ui/PrivacyNotice';
import SuccessMessage from '@/components/ui/SuccessMessage';
import useNewsletterForm from '@/hooks/useNewsletterForm';
import { newsletterBenefits } from '@/data/benefits';

export default function NewsletterSection() {
  const { isSubmitted, handleSubmit, reset } = useNewsletterForm();

  if (isSubmitted) {
    return (
      <BaseSection bgColor="bg-gradient-to-br from-green-50 to-emerald-100">
        <SuccessMessage
          title="Thanks for subscribing!"
          description="You'll receive the latest deals and updates in your inbox."
          buttonText="Subscribe another email"
          onButtonClick={reset}
        />
      </BaseSection>
    );
  }

  return (
    <BaseSection 
      bgColor="bg-gradient-to-br from-[#8821f4] via-[#6a1b9a] to-[#4a148c]"
      maxWidth={false}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <IconBadge
            icon={<EnvelopeIcon />}
            bgColor="bg-white"
            iconColor="text-purple-600"
            size="lg"
            className="mx-auto mb-8"
          />

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Connected with CitiSignal
            </h2>
            <p className="text-purple-100 text-lg">
              Get exclusive deals, new device launches, and special offers delivered straight to your inbox.
            </p>
          </div>
        </div>

        <BenefitGrid 
          columns={{ sm: 1, md: 3, lg: 3 }}
          gap="md"
          className="mb-12"
        >
          {newsletterBenefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              emoji={benefit.emoji}
              title={benefit.title}
              description={benefit.description}
              titleColor="text-white"
              descriptionColor="text-purple-100"
            />
          ))}
        </BenefitGrid>

        <div className="text-center">
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
      </div>
    </BaseSection>
  );
} 