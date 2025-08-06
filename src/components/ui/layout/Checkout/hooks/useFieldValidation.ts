'use client';

import type { TouchedFields } from '../types/forms';
import type { ValidationErrors } from '../types/validation';

interface UseFieldValidationOptions {
  isSubmitted: boolean;
  touchedFields: TouchedFields;
}

/**
 * Manages form field validation display logic.
 * @template T - The form data type
 * @param {Object} options - Validation options
 * @returns {Object} Field error helper methods
 * @example
 * const { getFieldError } = useFieldValidation<FormData>({ isSubmitted, touchedFields });
 */
export function useFieldValidation<T>({ isSubmitted, touchedFields }: UseFieldValidationOptions) {
  const getFieldError = (
    fieldName: keyof T,
    errors: ValidationErrors<T> | undefined
  ): string | undefined => {
    if (!errors) return undefined;
    
    const shouldShowError = isSubmitted || touchedFields[fieldName as string];
    return shouldShowError ? errors[fieldName]?.message : undefined;
  };

  return { getFieldError };
}