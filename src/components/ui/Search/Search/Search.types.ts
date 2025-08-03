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
export type SearchRootProps = BaseComponentProps;
export type SearchTriggerProps = BasePanelProps;
export type SearchPanelProps = BasePanelProps;
export interface SearchInputProps extends BasePanelProps {
  placeholder?: string;
}
export type SearchResultsProps = BaseComponentProps;

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