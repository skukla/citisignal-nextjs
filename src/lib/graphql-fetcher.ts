import { DocumentNode } from 'graphql';
import { print } from 'graphql';

/**
 * GraphQL fetcher for SWR
 * Converts DocumentNode from .graphql files to string and sends to API
 */
export async function graphqlFetcher<T = any>(
  query: DocumentNode | string,
  variables?: Record<string, any>
): Promise<T> {
  // Convert DocumentNode to string if needed
  const queryString = typeof query === 'string' ? query : print(query);
  
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
  });

  const json = await response.json();

  // Handle GraphQL errors but ignore mesh validation errors that don't affect data
  if (json.errors) {
    const realErrors = json.errors.filter((err: any) => {
      // Filter out mesh validation errors that don't prevent data from being returned
      return !err.message?.includes('Unknown type \'_Any\'') && 
             !err.message?.includes('Field \'_entities\'');
    });
    
    if (realErrors.length > 0) {
      throw new Error(realErrors[0].message);
    }
  }

  return json.data;
}