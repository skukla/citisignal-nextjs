'use client';

import { twMerge } from 'tailwind-merge';
import SectionHeader from '@/components/ui/SectionHeader';
import type { SectionConfig } from '@/types/layout';

interface BaseSectionProps extends SectionConfig {
  children: React.ReactNode;
  header?: {
    title: string;
    description?: string;
    action?: React.ReactNode;
    centered?: boolean;
    titleSize?: 'sm' | 'md' | 'lg';
    descriptionSize?: 'sm' | 'md' | 'lg';
    className?: string;
  };
  footer?: React.ReactNode;
}

export default function BaseSection({
  children,
  header,
  footer,
  bgColor = 'bg-white',
  maxWidth = true,
  padding = true,
  className
}: BaseSectionProps) {
  const content = (
    <>
      {header && (
        <SectionHeader
          title={header.title}
          description={header.description}
          action={header.action}
          centered={header.centered}
          titleSize={header.titleSize}
          descriptionSize={header.descriptionSize}
          className={twMerge('mb-12', header.className)}
        />
      )}
      {children}
      {footer && (
        <div className="mt-12">
          {footer}
        </div>
      )}
    </>
  );

  return (
    <section className={twMerge(
      bgColor,
      padding && 'py-20',
      className
    )}>
      {maxWidth ? (
        <Container>
          {content}
        </Container>
      ) : content}
    </section>
  );
} 