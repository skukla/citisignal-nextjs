// Search Compound Component
export { SearchRoot } from './SearchRoot';
export { SearchTrigger } from './SearchTrigger';
export { SearchPanel } from './SearchPanel';
export { SearchInput } from './SearchInput';
export { SearchResults } from './SearchResults';

// Compound component namespace
import { SearchRoot } from './SearchRoot';
import { SearchTrigger } from './SearchTrigger';
import { SearchPanel } from './SearchPanel';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import type { SearchComponent } from './Search.types';

/**
 * Search compound component for building search functionality.
 * Provides a complete search interface with trigger, panel, input, and results.
 *
 * @example
 * <Search.Root>
 *   <Search.Trigger aria-label="Search products" />
 *   <Search.Panel>
 *     <Search.Input />
 *     <Search.Results />
 *   </Search.Panel>
 * </Search.Root>
 */
const Search: SearchComponent = {
  Root: SearchRoot,
  Trigger: SearchTrigger,
  Panel: SearchPanel,
  Input: SearchInput,
  Results: SearchResults
};

export default Search;

// Context
export { useSearchContext } from './SearchRoot';

// Hooks
export { useSearch } from './useSearch';
export { useSearchPanel } from './useSearchPanel';
export { useSearchLogic } from './useSearchLogic';

// Types
export type * from './Search.types';