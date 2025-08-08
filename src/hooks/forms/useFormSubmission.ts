import { useState, useCallback } from 'react';

interface UseFormSubmissionOptions<T> {
  onSubmit: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface FormSubmissionState {
  isSubmitting: boolean;
  error: string;
  isSubmitted: boolean;
}

export function useFormSubmission<T>({ 
  onSubmit, 
  onSuccess, 
  onError 
}: UseFormSubmissionOptions<T>) {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    error: '',
    isSubmitted: false
  });

  const handleSubmit = useCallback(async (values: T) => {
    setState(prev => ({ ...prev, isSubmitting: true, error: '' }));

    try {
      await onSubmit(values);
      setState(prev => ({ ...prev, isSubmitting: false, isSubmitted: true }));
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        error: errorMessage 
      }));
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  }, [onSubmit, onSuccess, onError]);

  const resetError = useCallback(() => {
    setState(prev => ({ ...prev, error: '' }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      isSubmitting: false,
      error: '',
      isSubmitted: false
    });
  }, []);

  return {
    isSubmitting: state.isSubmitting,
    error: state.error,
    isSubmitted: state.isSubmitted,
    handleSubmit,
    resetError,
    resetState
  };
}