'use client';

import { useState, useEffect, ReactNode } from 'react';

interface DelayedLoaderProps {
  children: ReactNode;
  delay?: number; // milliseconds
}

/**
 * Delays rendering of loading state to prevent flickers on fast transitions.
 * Only shows loading UI if the transition takes longer than the delay threshold.
 */
export default function DelayedLoader({ children, delay = 300 }: DelayedLoaderProps) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showLoader) {
    // Return empty div to maintain layout
    return <div className="min-h-screen" />;
  }

  return <>{children}</>;
}