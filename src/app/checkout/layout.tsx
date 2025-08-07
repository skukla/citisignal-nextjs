'use client';

import { ReactNode } from 'react';
import { HeaderRoot, HeaderTopBar } from '@/components/layout/Header';
import Container from '@/components/ui/layout/Container';
import { Logo } from '@/components/ui/foundations/Logo';
import { headerConfig } from '@/data/header';

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: CheckoutLayoutProps) {
  return (
    <>
      <HeaderRoot>
        <HeaderTopBar />
        <Container>
          <div className="flex items-center justify-center py-4">
            <Logo
              src={headerConfig.logo.src}
              alt={headerConfig.logo.alt}
              width={headerConfig.logo.width}
              height={headerConfig.logo.height}
            />
          </div>
        </Container>
      </HeaderRoot>
      {children}
    </>
  );
}