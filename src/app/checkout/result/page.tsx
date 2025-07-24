'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function OrderResultPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'success';
  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-xl mx-auto text-center">
          {isSuccess ? (
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          ) : (
            <XCircleIcon className="mx-auto h-16 w-16 text-red-500" />
          )}
          
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {isSuccess ? 'Thank you for your order!' : 'Order Processing Error'}
          </h1>
          
          <p className="mt-4 text-lg text-gray-500">
            {isSuccess ? (
              'Your order has been successfully placed. We\'ll send you a confirmation email with your order details shortly.'
            ) : (
              'We encountered an issue while processing your order. Your payment has not been processed. Please try again or contact customer support if the problem persists.'
            )}
          </p>
          
          <div className="mt-12 space-y-4">
            {isSuccess ? (
              <>
                <Link
                  href="/account/orders"
                  className="block w-full rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  View Order Status
                </Link>
                <Link
                  href="/"
                  className="block w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Continue Shopping
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/checkout"
                  className="block w-full rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Try Again
                </Link>
                <Link
                  href="/contact"
                  className="block w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Contact Support
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 