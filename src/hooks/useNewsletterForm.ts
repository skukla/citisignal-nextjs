'use client';

import { useState } from 'react';

interface UseNewsletterFormResult {
  isSubmitted: boolean;
  handleSubmit: (email: string) => Promise<void>;
  reset: () => void;
}

export default function useNewsletterForm(): UseNewsletterFormResult {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  const reset = () => setIsSubmitted(false);

  return {
    isSubmitted,
    handleSubmit,
    reset
  };
} 