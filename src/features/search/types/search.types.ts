import type { BaseComponentProps, BasePanelProps, BasePanelContextValue, CompoundComponent } from '@/types/ui';

// Search result type
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
}

// Context type
export interface SearchContextValue extends BasePanelContextValue {
  query: string;
  results: readonly SearchResult[];
  isLoading: boolean;
  setQuery: (query: string) => void;
  selectResult: (result: SearchResult) => void;
}

// Component props
export interface SearchRootProps extends BaseComponentProps {}
export interface SearchTriggerProps extends BasePanelProps {}
export interface SearchPanelProps extends BasePanelProps {}
export interface SearchInputProps extends BasePanelProps {}
export interface SearchResultsProps extends BaseComponentProps {}

// Compound component type
export type SearchComponent = CompoundComponent<
  SearchRootProps,
  SearchTriggerProps,
  SearchPanelProps,
  {
    Input: React.FC<SearchInputProps>;
    Results: React.FC<SearchResultsProps>;
  }
>; 