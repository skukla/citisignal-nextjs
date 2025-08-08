import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/components/ui/layout/Account';
import { useFormSubmission } from './useFormSubmission';

export type AuthMode = 'login' | 'signup';

interface AuthFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

export function useAuthForm() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { login, signup } = useAuthContext();
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const signupEmailRef = useRef<HTMLInputElement>(null);
  const initialRenderRef = useRef(true);
  const prevSearchParamsRef = useRef(searchParams);

  const {
    isSubmitting,
    error,
    handleSubmit: submitForm,
    resetError
  } = useFormSubmission<AuthFormValues>({
    onSubmit: async (values) => {
      if (mode === 'signup') {
        if (values.password !== values.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signup(values.email, values.password);
      } else {
        await login(values.email, values.password);
      }
    }
  });

  // Update mode when URL changes (after initial render)
  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    // Check if searchParams actually changed
    if (prevSearchParamsRef.current !== searchParams) {
      prevSearchParamsRef.current = searchParams;
      const newMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
      setMode(newMode);
      setIsTransitioning(true);
      resetError();
    }
  }, [searchParams, resetError]);

  // Focus appropriate input after mode change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mode === 'login') {
        loginEmailRef.current?.focus();
      } else {
        signupEmailRef.current?.focus();
      }
    }, 500); // Match transition duration
    return () => clearTimeout(timer);
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await submitForm({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: mode === 'signup' ? formData.get('confirmPassword') as string : undefined
    });
  };

  return {
    mode,
    setMode,
    isTransitioning,
    isLoading: isSubmitting,
    error,
    loginEmailRef,
    signupEmailRef,
    handleSubmit
  };
}