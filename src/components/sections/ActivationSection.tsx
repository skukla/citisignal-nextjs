'use client';

import BaseSection from '@/components/ui/layout/BaseSection';
import ProcessSteps from '@/components/ui/ProcessSteps';
import CallToAction from '@/components/ui/CallToAction';
import { activationSteps, activationFeatures } from '@/data/activation';

export default function ActivationSection() {
  return (
    <BaseSection
      header={{
        title: "Get Started in 4 Easy Steps",
        description: "Switching to CitiSignal is simple. Follow these easy steps to get your new device activated and start enjoying our reliable network.",
        centered: true,
        titleSize: "md",
        descriptionSize: "lg"
      }}
    >
      <ProcessSteps steps={activationSteps} />

      <CallToAction
        title="Ready to make the switch?"
        description="Join millions of satisfied customers who trust CitiSignal for their wireless needs. Start your journey today with our easy activation process."
        features={activationFeatures}
        buttonText="Start Your Activation"
        supportText="Questions? Call us at"
        supportPhone="1-800-CITI-SIG"
      />
    </BaseSection>
  );
} 