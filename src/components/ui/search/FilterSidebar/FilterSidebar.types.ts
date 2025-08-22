/**
 * FilterSidebar component types
 * Component-specific interfaces for the compound FilterSidebar architecture
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
  attributeCode?: string; // Original Adobe attribute code for filtering
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
 * Props for FilterSidebar main component
 */
export interface FilterSidebarProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
  isValidating?: boolean;
}

/**
 * Props for FilterSidebarHeader sub-component
 */
export interface FilterSidebarHeaderProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

/**
 * Props for FilterSidebarSection sub-component
 */
export interface FilterSidebarSectionProps {
  section: FilterSection;
  isExpanded: boolean;
  activeFilters: Record<string, string[]>;
  onToggleSection: (key: string) => void;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  isValidating?: boolean;
}

/**
 * Props for FilterSidebarOption sub-component
 */
export interface FilterSidebarOptionProps {
  option: FilterOption;
  sectionKey: string;
  sectionType: 'checkbox' | 'radio';
  isSelected: boolean;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
}

/**
 * Props for FilterSidebarActiveFilters sub-component
 */
export interface FilterSidebarActiveFiltersProps {
  activeFilterEntries: ActiveFilterEntry[];
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
}
