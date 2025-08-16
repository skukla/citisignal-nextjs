import useSWR from 'swr';
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import GET_SEARCH_SUGGESTIONS from '@/graphql/queries/GetSearchSuggestions.graphql';

export interface ProductSuggestion {
  id: string;
  name: string;
  sku: string;
  urlKey: string;
  price: string | null;
  image: string | null;
}

export interface SearchSuggestionsResult {
  suggestions: ProductSuggestion[];
  loading: boolean;
  error?: Error;
  totalCount: number;
}

interface UseSearchSuggestionsOptions {
  phrase: string;
  enabled?: boolean;
}

/**
 * Fetches product suggestions for search autocomplete.
 * Uses Live Search to get AI-powered suggestions.
 */
export function useSearchSuggestions({
  phrase,
  enabled = true
}: UseSearchSuggestionsOptions): SearchSuggestionsResult {
  
  // Only fetch if phrase is at least 2 characters and enabled
  const shouldFetch = enabled && phrase && phrase.length >= 2;
  
  const { data, error, isLoading } = useSWR(
    shouldFetch ? ['searchSuggestions', phrase] : null,
    () => graphqlFetcher(GET_SEARCH_SUGGESTIONS, { phrase }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 500, // Dedupe requests within 500ms
      keepPreviousData: true // Keep showing previous suggestions while loading new ones
    }
  );

  return {
    suggestions: data?.Citisignal_searchSuggestions?.suggestions || [],
    loading: isLoading,
    error,
    totalCount: data?.Citisignal_searchSuggestions?.totalCount || 0
  };
}