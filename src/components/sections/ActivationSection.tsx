'use client';

import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ProcessSteps from '@/components/ui/ProcessSteps';
import CallToAction from '@/components/ui/CallToAction';
import { activationContent } from '@/data/sections/activation';
import type { ActivationSectionProps } from '@/types/section';

export default function ActivationSection({
  content = activationContent,
  className
}: ActivationSectionProps) {

  return (
    <Section background="bg-white" className={className}>
        <SectionHeader
          title={content.header.title}
          description={content.header.description}
          centered
        />

        <ProcessSteps steps={content.steps} />

        <CallToAction
          title={content.callToAction.title}
          description={content.callToAction.description}
          features={content.callToAction.features}
          buttonText={content.callToAction.buttonText}
          supportText={content.callToAction.supportText}
          supportPhone={content.callToAction.supportPhone}
        />
    </Section>
  );
} 