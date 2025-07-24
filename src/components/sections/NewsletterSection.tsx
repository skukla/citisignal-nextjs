'use client';

import { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import SearchInput from '@/components/ui/SearchInput';
import clsx from 'clsx';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="section-container max-w-4xl text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thanks for subscribing!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            You&apos;ll receive the latest deals and updates in your inbox.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className={clsx(
              'text-primary-600 hover:text-primary-700',
              'font-medium transition-colors'
            )}
          >
            Subscribe another email
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 text-white bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900">
      <div className="section-container max-w-4xl">
        <div className="text-center">
          {/* Icon */}
          <div className={clsx(
            'mx-auto w-16 h-16 bg-white rounded-full',
            'flex items-center justify-center mb-8'
          )}>
            <EnvelopeIcon className="w-8 h-8 text-primary-600" />
          </div>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Connected with CitiSignal
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get exclusive deals, new device launches, and special offers delivered straight to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <SearchInput
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter your email address"
                  color="light"
                  variant="white"
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                  'btn btn-primary',
                  'bg-yellow-400 hover:bg-yellow-300 text-gray-900',
                  'px-8 py-3 shadow-lg hover:shadow-xl',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all'
                )}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </form>

          {/* Privacy Notice */}
          <p className="text-sm text-primary-200 mt-4">
            We respect your privacy. Unsubscribe at any time.{' '}
            <a href="/privacy" className={clsx(
              'underline hover:text-white',
              'transition-colors'
            )}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
} 