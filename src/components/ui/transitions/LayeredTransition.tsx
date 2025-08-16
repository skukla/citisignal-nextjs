'use client';

import { ReactNode } from 'react';
import { FadeTransition } from './FadeTransition';

interface LayeredTransitionProps {
  skeleton: ReactNode;
  content: ReactNode;
  showContent: boolean;
  duration?: number;
  className?: string;
  skeletonClassName?: string;
  contentClassName?: string;
}

/**
 * Layered transition that keeps skeleton in DOM for layout stability.
 * When content loads, it replaces the skeleton in the normal document flow.
 * This prevents layout shifts during loading transitions.
 */
export function LayeredTransition({
  skeleton,
  content,
  showContent,
  duration = 300,
  className = '',
  skeletonClassName = '',
  contentClassName = ''
}: LayeredTransitionProps) {
  // When content is shown, render it in normal flow (not absolute)
  // This ensures proper height calculation for the container
  if (showContent) {
    return (
      <div className={className}>
        <FadeTransition show={true} duration={duration} className={contentClassName}>
          {content}
        </FadeTransition>
      </div>
    );
  }
  
  // Show skeleton when content is not ready
  return (
    <div className={className}>
      <div className={skeletonClassName}>
        {skeleton}
      </div>
    </div>
  );
}