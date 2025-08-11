'use client';

import { HeaderRoot } from '@/components/layout/Header/HeaderRoot';
import { HeaderTopBar } from '@/components/layout/Header/HeaderTopBar';
import Container from '@/components/ui/layout/Container';
import { Logo } from '@/components/ui/foundations/Logo';
import { headerConfig } from '@/data/route-groups/home/header';

export default function CheckoutHeader() {
  return (
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
  );
}
