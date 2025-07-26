'use client';

import { useState, useCallback } from 'react';

interface UseExpandableSectionsProps {
  sections: string[];
  defaultExpanded?: boolean;
}

interface UseExpandableSectionsResult {
  expandedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
  isExpanded: (key: string) => boolean;
  expandAll: () => void;
  collapseAll: () => void;
}

export default function useExpandableSections({
  sections,
  defaultExpanded = true
}: UseExpandableSectionsProps): UseExpandableSectionsResult {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, section) => ({ ...acc, [section]: defaultExpanded }), {})
  );

  const toggleSection = useCallback((key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const isExpanded = useCallback((key: string) => {
    return expandedSections[key] || false;
  }, [expandedSections]);

  const expandAll = useCallback(() => {
    setExpandedSections(
      sections.reduce((acc, section) => ({ ...acc, [section]: true }), {})
    );
  }, [sections]);

  const collapseAll = useCallback(() => {
    setExpandedSections(
      sections.reduce((acc, section) => ({ ...acc, [section]: false }), {})
    );
  }, [sections]);

  return {
    expandedSections,
    toggleSection,
    isExpanded,
    expandAll,
    collapseAll
  };
} 