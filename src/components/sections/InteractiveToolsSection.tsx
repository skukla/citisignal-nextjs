'use client';

import BaseSection from '@/components/ui/layout/BaseSection';
import ToolGrid from '@/components/ui/ToolGrid';
import ToolCard from '@/components/ui/ToolCard';
import FeaturedTool from '@/components/ui/FeaturedTool';
import { interactiveTools, optimizerFeatures } from '@/data/tools';

export default function InteractiveToolsSection() {
  return (
    <BaseSection
      header={{
        title: "Interactive Tools",
        description: "Make informed decisions with our suite of interactive tools designed to help you get the most from your mobile service.",
        centered: true
      }}
    >
      <ToolGrid>
        {interactiveTools.map((tool, index) => (
          <ToolCard
            key={index}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            href={tool.link}
          />
        ))}
      </ToolGrid>

      <FeaturedTool
        title="Try Our Plan Optimizer"
        description="Answer a few questions about your usage and let our AI recommend the perfect plan for you. Save up to 30% on your monthly bill!"
        buttonText="Start Optimization"
        buttonHref="/tools/plan-optimizer"
        features={optimizerFeatures}
        className="mt-16"
      />
    </BaseSection>
  );
} 