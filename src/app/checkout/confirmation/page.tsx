'use client';

import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';


export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            We&apos;ll send you a confirmation email with your order details.
          </p>
          <div className="mt-8">
            <Link href="/" className="inline-flex justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}