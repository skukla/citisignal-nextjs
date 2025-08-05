'use client';

import { useState, useCallback } from 'react';

export interface UseExpandableSectionsOptions {
  initialSections?: Record<string, boolean>;
  defaultExpanded?: boolean;
}

export interface UseExpandableSectionsReturn {
  expandedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
  expandSection: (key: string) => void;
  collapseSection: (key: string) => void;
  expandAll: (keys: string[]) => void;
  collapseAll: (keys: string[]) => void;
}

/**
 * Custom hook for managing expandable sections state
 * Provides functionality to toggle, expand, and collapse sections individually or in bulk
 * 
 * @param options Configuration options for the hook
 * @returns Object containing expanded state and control functions
 */
export function useExpandableSections(
  options: UseExpandableSectionsOptions = {}
): UseExpandableSectionsReturn {
  const { initialSections = {}, defaultExpanded = true } = options;
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    initialSections
  );

  /**
   * Toggle the expanded state of a specific section
   */
  const toggleSection = useCallback((key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: prev[key] !== undefined ? !prev[key] : !defaultExpanded
    }));
  }, [defaultExpanded]);

  /**
   * Expand a specific section
   */
  const expandSection = useCallback((key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: true
    }));
  }, []);

  /**
   * Collapse a specific section
   */
  const collapseSection = useCallback((key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: false
    }));
  }, []);

  /**
   * Expand all specified sections
   */
  const expandAll = useCallback((keys: string[]) => {
    setExpandedSections(prev => {
      const newState = { ...prev };
      keys.forEach(key => {
        newState[key] = true;
      });
      return newState;
    });
  }, []);

  /**
   * Collapse all specified sections
   */
  const collapseAll = useCallback((keys: string[]) => {
    setExpandedSections(prev => {
      const newState = { ...prev };
      keys.forEach(key => {
        newState[key] = false;
      });
      return newState;
    });
  }, []);

  return {
    expandedSections,
    toggleSection,
    expandSection,
    collapseSection,
    expandAll,
    collapseAll
  };
}