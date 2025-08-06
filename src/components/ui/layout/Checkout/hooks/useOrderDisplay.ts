'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { OrderDetails } from '@/types/order';

/**
 * Provides formatting and display utilities for order details.
 * @param {OrderDetails} order - The order to display
 * @returns {Object} Formatting methods and pre-formatted values
 * @example
 * const { formatPrice, formattedAddress } = useOrderDisplay(order);
 */
export function useOrderDisplay(order: OrderDetails) {
  const router = useRouter();

  const formatDate = useCallback((date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }, []);

  const navigateToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const getFormattedAddress = useCallback((shipping: OrderDetails['shipping']) => {
    return [
      shipping.name,
      shipping.address,
      `${shipping.city}, ${shipping.state} ${shipping.zip}`
    ].filter(Boolean);
  }, []);

  return {
    formatDate,
    formatPrice,
    navigateToHome,
    getFormattedAddress,
    formattedDate: formatDate(order.date),
    formattedTotal: formatPrice(order.total),
    formattedAddress: getFormattedAddress(order.shipping)
  };
}