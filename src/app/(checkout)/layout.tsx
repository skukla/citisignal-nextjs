import { ReactNode } from 'react';
import CheckoutHeader from '@/components/layout/Header/CheckoutHeader';

export default function CheckoutLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <>
      <CheckoutHeader />
      {children}
    </>
  );
}