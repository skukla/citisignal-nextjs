'use client';

import { useMemo } from 'react';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { getApolloClient } from '@/lib/apollo-client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export default function ApolloProvider({ children }: ApolloProviderProps) {
  // Create client once per component instance
  // This prevents hydration mismatches
  const client = useMemo(() => getApolloClient(), []);

  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
}