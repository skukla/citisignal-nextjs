'use client';

import { ReactNode, useEffect } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';

interface ProductsLayoutClientProps {
  children: ReactNode;
  initialBreadcrumbs?: {
    items: Array<{
      name: string;
      urlPath: string;
    }>;
  } | null;
}

export default function ProductsLayoutClient({ 
  children, 
  initialBreadcrumbs 
}: ProductsLayoutClientProps) {
  const { setBreadcrumbs } = useNavigation();

  // Set breadcrumbs in context when they're provided from SSR
  useEffect(() => {
    if (initialBreadcrumbs) {
      setBreadcrumbs(initialBreadcrumbs);
    }
  }, [initialBreadcrumbs, setBreadcrumbs]);

  return (
    <div className="products-layout">
      {children}
    </div>
  );
}