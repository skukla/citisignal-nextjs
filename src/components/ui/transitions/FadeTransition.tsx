'use client';

import { ReactNode, useEffect, useState } from 'react';

interface FadeTransitionProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  className?: string;
}

export function FadeTransition({ 
  children, 
  show, 
  duration = 300,
  className = '' 
}: FadeTransitionProps) {
  const [shouldRender, setShouldRender] = useState(show);
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready for transition
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!shouldRender) return null;

  // Use Tailwind classes for consistency
  const durationClass = duration <= 200 ? 'duration-200' : 
                        duration <= 300 ? 'duration-300' : 
                        duration <= 500 ? 'duration-500' : 'duration-700';

  return (
    <div
      className={`transition-opacity ${durationClass} ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}