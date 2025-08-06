'use client';

import { useCallback } from 'react';
import { useCheckoutContext } from '../CheckoutContext';
import type { CheckoutStepId } from '../types';

/**
 * Handles checkout step navigation with validation.
 * @returns {Object} Navigation methods and current step state
 * @example
 * const { navigateToStep, navigateBack, navigateNext } = useCheckoutNavigation();
 */
export function useCheckoutNavigation() {
  const { setStep, isStepComplete, canProceedToStep, currentStep } = useCheckoutContext();

  const navigateToStep = useCallback((stepId: CheckoutStepId) => {
    if (canProceedToStep(stepId)) {
      setStep(stepId);
      return true;
    }
    return false;
  }, [canProceedToStep, setStep]);

  const navigateBack = useCallback(() => {
    const steps: CheckoutStepId[] = ['shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
      return true;
    }
    return false;
  }, [currentStep, setStep]);

  const navigateNext = useCallback(() => {
    const steps: CheckoutStepId[] = ['shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1 && isStepComplete(currentStep)) {
      setStep(steps[currentIndex + 1]);
      return true;
    }
    return false;
  }, [currentStep, isStepComplete, setStep]);

  return {
    navigateToStep,
    navigateBack,
    navigateNext,
    currentStep,
    isStepComplete,
    canProceedToStep
  };
}