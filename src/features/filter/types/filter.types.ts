import type { BaseComponentProps } from '@/types/ui';

/**
 * Represents a single filter option
 */
export interface FilterOption {
  readonly id: string;
  readonly name: string;
  readonly count?: number;
}

/**
 * Represents a group of filter options
 */
export interface FilterSection {
  readonly title: string;
  readonly key: string;
  readonly options: readonly FilterOption[];
  readonly type: 'checkbox' | 'radio';
}

/**
 * Filter state mapping section keys to selected option IDs
 */
export type FilterState = Readonly<Record<string, readonly string[]>>;

/**
 * Base props shared by all filter components
 */
export interface BaseFilterProps extends BaseComponentProps {
  readonly id?: string;
}

/**
 * Props for the root Filter component
 */
export interface FilterRootProps extends BaseFilterProps {
  readonly filters: readonly FilterSection[];
  readonly activeFilters: FilterState;
  readonly defaultExpanded?: boolean | readonly string[];
  readonly expanded?: readonly string[];
  readonly onExpandedChange?: (expanded: readonly string[]) => void;
  readonly onFilterChange: (key: string, value: string, checked: boolean) => void;
  readonly onClearFilters?: () => void;
}

/**
 * Props for the Filter Header component
 */
export interface FilterHeaderProps extends BaseFilterProps {
  readonly title?: string;
  readonly showClear?: boolean;
}

/**
 * Props for the Filter Section component
 */
export interface FilterSectionProps extends BaseFilterProps {
  readonly section: FilterSection;
}

/**
 * Props for the Filter Option component
 */
export interface FilterOptionProps extends BaseFilterProps {
  readonly option: FilterOption;
  readonly type: 'checkbox' | 'radio';
  readonly name?: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
}

/**
 * Props for the Active Filters component
 */
export interface ActiveFiltersProps extends BaseFilterProps {
  readonly filters: readonly FilterSection[];
  readonly activeFilters: FilterState;
  readonly onRemove: (key: string, value: string) => void;
}

/**
 * Context value for sharing filter state
 */
export interface FilterContextValue {
  readonly expanded: readonly string[];
  readonly toggleSection: (key: string) => void;
  readonly activeFilters: FilterState;
  readonly onFilterChange: (key: string, value: string, checked: boolean) => void;
  readonly onClearFilters?: () => void;
}

/**
 * Compound component type for Filter
 */
export interface FilterComponent extends React.FC<FilterRootProps> {
  Header: React.FC<FilterHeaderProps>;
  Section: React.FC<FilterSectionProps>;
  Option: React.FC<FilterOptionProps>;
  ActiveFilters: React.FC<ActiveFiltersProps>;
}