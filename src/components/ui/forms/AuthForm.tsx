'use client';

import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Button from '@/components/ui/foundations/Button';
import Input from '@/components/ui/foundations/Input';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import { useAuthForm } from '@/hooks/forms/useAuthForm';

export default function AuthForm() {
  const {
    mode,
    isTransitioning,
    isLoading,
    error,
    loginEmailRef,
    signupEmailRef,
    handleSubmit
  } = useAuthForm();

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
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
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
              <Link href="/account/auth?mode=signup" className="block">
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-gray-600 hover:text-gray-900 font-medium focus:outline-none"
                >
                  Create Account
                </Button>
              </Link>
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
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
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
              <Link href="/account/auth" className="block">
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-gray-600 hover:text-gray-900 font-medium focus:outline-none"
                >
                  Sign In
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}