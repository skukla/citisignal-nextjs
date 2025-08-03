'use client';

import { memo } from 'react';
import Section from '@/components/ui/layout/Section';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import ToolGrid from '@/components/ui/grids/ToolGrid';
import FeaturedTool from '@/components/ui/content/FeaturedTool';
import { interactiveToolsContent } from '@/data/sections/interactiveTools';
import type { InteractiveToolsContent } from '@/data/sections/interactiveTools';

export interface InteractiveToolsSectionProps {
  content?: InteractiveToolsContent;
  className?: string;
}

function InteractiveToolsSection({
  content = interactiveToolsContent,
  className
}: InteractiveToolsSectionProps) {


  return (
    <Section className={className}>
      <SectionHeader
        title={content.header.title}
        description={content.header.description}
        centered
        className="mb-16"
      />

      <ToolGrid tools={content.tools} />

      <FeaturedTool
        title={content.optimizer.title}
        description={content.optimizer.description}
        buttonText={content.optimizer.buttonText}
        buttonHref={content.optimizer.buttonLink}
        features={content.optimizer.features}
        className="mt-16"
      />
    </Section>
  );
}

export default memo(InteractiveToolsSection); 