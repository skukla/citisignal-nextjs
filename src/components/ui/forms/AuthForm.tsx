'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import Input from '@/components/ui/foundations/Input';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import { useAuthContext } from '@/components/ui/layout/Account';

type AuthMode = 'login' | 'signup';

export default function AuthForm() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { login, signup, isLoading, error: authError } = useAuthContext();
  const [error, setError] = useState('');
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const signupEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get('mode') === 'signup') {
      setMode('signup');
    }
    // Enable transitions after initial render
    const timer = setTimeout(() => setIsTransitioning(true), 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    // Focus the appropriate input after transition
    const timer = setTimeout(() => {
      if (mode === 'login') {
        loginEmailRef.current?.focus();
      } else {
        signupEmailRef.current?.focus();
      }
    }, 500); // Match the transition duration
    return () => clearTimeout(timer);
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (mode === 'signup') {
        const confirmPassword = formData.get('confirmPassword') as string;
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch {
      // Error handled by auth context
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <SectionHeader
        title="Welcome to CitiSignal"
        description={mode === 'login' 
          ? 'Sign in to your account to continue'
          : 'Create a new account to get started'
        }
      />
      <div className="relative w-full overflow-hidden mt-6">
        <div 
          className={twMerge(
            'flex w-[200%] -ml-0',
            isTransitioning && 'transition-transform duration-500 ease-in-out',
            mode === 'signup' ? '-translate-x-1/2' : ''
          )}
        >
          {/* Login Form */}
          <div className="w-full px-4 pb-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                ref={loginEmailRef}
                label="Email"
                type="email"
                name="email"
                required
                autoComplete="email"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
              />
              {(error || authError) && (
                <div className="text-red-600 text-sm">{error || authError}</div>
              )}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">
                    Don&apos;t have an account?
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="link"
                className="w-full text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMode('signup')}
              >
                Create Account
              </Button>
            </form>
          </div>

          {/* Signup Form */}
          <div className="w-full px-4 pb-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                ref={signupEmailRef}
                label="Email"
                type="email"
                name="email"
                required
                autoComplete="email"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                required
                autoComplete="new-password"
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                required
                autoComplete="new-password"
              />
              {(error || authError) && (
                <div className="text-red-600 text-sm">{error || authError}</div>
              )}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="link"
                className="w-full text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMode('login')}
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}