'use client';

import { memo } from 'react';
import Section from '@/components/ui/layout/Section';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import ProcessSteps from '@/components/ui/content/ProcessSteps';
import CallToAction from '@/components/ui/feedback/CallToAction';
import { activationContent } from '@/data/sections/activation';
import type { ActivationSectionProps } from '@/types/section';

function ActivationSection({
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
          buttonHref={content.callToAction.buttonHref}
          supportText={content.callToAction.supportText}
          supportPhone={content.callToAction.supportPhone}
        />
    </Section>
  );
}

export default memo(ActivationSection); 