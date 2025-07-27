import { useMemo, useCallback } from 'react';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio';
}

interface UseFiltersProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onChange: (newFilters: Record<string, string[]>) => void;
}

interface UseFiltersReturn {
  hasActiveFilters: boolean;
  getFilterOption: (filterKey: string, value: string) => FilterOption | undefined;
  getActiveFiltersBySection: () => Array<{
    filterKey: string;
    values: Array<{
      value: string;
      option: FilterOption;
    }>;
  }>;
  handleFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  handleClearFilters: () => void;
}

export default function useFilters({
  filters,
  activeFilters,
  onChange
}: UseFiltersProps): UseFiltersReturn {
  // Check if there are any active filters
  const hasActiveFilters = useMemo(() => 
    Object.values(activeFilters).some(values => values.length > 0),
    [activeFilters]
  );

  // Find a specific filter option
  const getFilterOption = useCallback((filterKey: string, value: string): FilterOption | undefined => {
    const filter = filters.find(f => f.key === filterKey);
    return filter?.options.find(o => o.id === value);
  }, [filters]);

  // Get all active filters organized by section
  const getActiveFiltersBySection = useCallback(() => {
    return Object.entries(activeFilters)
      .filter(([_, values]) => values.length > 0)
      .map(([filterKey, values]) => ({
        filterKey,
        values: values
          .map(value => {
            const option = getFilterOption(filterKey, value);
            return option ? { value, option } : null;
          })
          .filter((item): item is { value: string; option: FilterOption } => item !== null)
      }));
  }, [activeFilters, getFilterOption]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterKey: string, value: string, checked: boolean) => {
    const section = filters.find(f => f.key === filterKey);
    if (!section) return;

    const newFilters = { ...activeFilters };
    
    if (section.type === 'radio') {
      // For radio buttons, replace the entire selection
      newFilters[filterKey] = checked ? [value] : [];
    } else {
      // For checkboxes, add or remove from the selection
      const currentValues = new Set(newFilters[filterKey] || []);
      if (checked) {
        currentValues.add(value);
      } else {
        currentValues.delete(value);
      }
      newFilters[filterKey] = Array.from(currentValues);
    }

    onChange(newFilters);
  }, [filters, activeFilters, onChange]);

  // Handle clearing all filters
  const handleClearFilters = useCallback(() => {
    const emptyFilters = Object.keys(activeFilters).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {} as Record<string, string[]>);
    
    onChange(emptyFilters);
  }, [activeFilters, onChange]);

  return {
    hasActiveFilters,
    getFilterOption,
    getActiveFiltersBySection,
    handleFilterChange,
    handleClearFilters
  };
} 