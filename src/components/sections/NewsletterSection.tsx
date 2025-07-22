'use client';

import { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thanks for subscribing!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            You&apos;ll receive the latest deals and updates in your inbox.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Subscribe another email
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #8821f4 0%, #6a1b9a 50%, #4a148c 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8">
            <EnvelopeIcon className="w-8 h-8 text-purple-600" />
          </div>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Connected with CitiSignal
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get exclusive deals, new device launches, and special offers delivered straight to your inbox.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Exclusive Deals</h3>
              <p className="text-sm text-purple-100">First access to limited-time offers and discounts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">New Releases</h3>
              <p className="text-sm text-purple-100">Be the first to know about new device launches</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-semibold mb-2">Tips & Updates</h3>
              <p className="text-sm text-purple-100">Network updates and helpful tech tips</p>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white border-2 border-white shadow-lg focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 focus:border-yellow-400 focus:outline-none transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
          <p className="text-sm text-purple-200 mt-4">
            We respect your privacy. Unsubscribe at any time.{' '}
            <a href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
} 