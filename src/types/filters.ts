/**
 * Filter-related types for FilterSidebar component
 * These extend the base filter types with UI-specific functionality
 */

/**
 * Individual filter option for FilterSidebar
 */
export interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

/**
 * Group of filter options for FilterSidebar
 * Extends base filtering with UI-specific type field
 */
export interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio';
}

/**
 * Active filter entry with option details for display
 */
export interface ActiveFilterEntry {
  filterKey: string;
  optionId: string;
  option: FilterOption;
}

/**
 * Props for FilterSidebar component
 */
export interface FilterSidebarProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
}

/**
 * Props for FilterSidebarHeader component
 */
export interface FilterSidebarHeaderProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

/**
 * Props for FilterSidebarSection component
 */
export interface FilterSidebarSectionProps {
  section: FilterSection;
  isExpanded: boolean;
  activeFilters: Record<string, string[]>;
  onToggleSection: (key: string) => void;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
}

/**
 * Props for FilterSidebarOption component
 */
export interface FilterSidebarOptionProps {
  option: FilterOption;
  sectionKey: string;
  sectionType: 'checkbox' | 'radio';
  isSelected: boolean;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
}

/**
 * Props for FilterSidebarActiveFilters component
 */
export interface FilterSidebarActiveFiltersProps {
  activeFilterEntries: ActiveFilterEntry[];
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
}