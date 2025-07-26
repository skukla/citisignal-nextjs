'use client';

import { twMerge } from 'tailwind-merge';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

interface BaseSectionProps {
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
  bgColor?: string;
  maxWidth?: boolean;
  padding?: boolean;
  className?: string;
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