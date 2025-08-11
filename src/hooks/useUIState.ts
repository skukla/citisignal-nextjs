'use client';

import { useState, useCallback, useEffect } from 'react';

interface ModalState {
  [modalId: string]: boolean;
}

interface PanelState {
  [panelId: string]: boolean;
}

interface AccordionState {
  [accordionId: string]: string | null; // null means no item is open
}

interface LoadingState {
  [key: string]: boolean;
}

export interface UseUIStateReturn {
  // Modal state
  isModalOpen: (modalId: string) => boolean;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  
  // Panel state  
  isPanelOpen: (panelId: string) => boolean;
  openPanel: (panelId: string) => void;
  closePanel: (panelId: string) => void;
  togglePanel: (panelId: string) => void;
  closeAllPanels: () => void;
  
  // Accordion state
  getActiveAccordionItem: (accordionId: string) => string | null;
  setActiveAccordionItem: (accordionId: string, itemId: string | null) => void;
  toggleAccordionItem: (accordionId: string, itemId: string) => void;
  
  // Loading state
  isLoading: (key: string) => boolean;
  setLoading: (key: string, loading: boolean) => void;
  
  // Utility
  hasAnyModalOpen: boolean;
  hasAnyPanelOpen: boolean;
}

/**
 * Centralized UI state management hook.
 * Manages modals, panels, accordions, and loading states across the application.
 * 
 * @returns {Object} UI state and control functions
 * @example
 * const {
 *   isModalOpen,
 *   openModal,
 *   closeModal,
 *   isPanelOpen,
 *   togglePanel,
 *   isLoading,
 *   setLoading
 * } = useUIState();
 * 
 * // Modal usage
 * <button onClick={() => openModal('product-details')}>
 *   View Details
 * </button>
 * {isModalOpen('product-details') && <ProductModal />}
 * 
 * // Panel usage  
 * <button onClick={() => togglePanel('filters')}>
 *   Toggle Filters
 * </button>
 * 
 * // Loading state
 * {isLoading('checkout') && <LoadingSpinner />}
 */
export function useUIState(): UseUIStateReturn {
  const [modals, setModals] = useState<ModalState>({});
  const [panels, setPanels] = useState<PanelState>({});
  const [accordions, setAccordions] = useState<AccordionState>({});
  const [loading, setLoadingState] = useState<LoadingState>({});

  // Modal functions
  const isModalOpen = useCallback((modalId: string): boolean => {
    return modals[modalId] || false;
  }, [modals]);

  const openModal = useCallback((modalId: string) => {
    setModals(prev => ({ ...prev, [modalId]: true }));
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback((modalId: string) => {
    setModals(prev => {
      const newModals = { ...prev };
      delete newModals[modalId];
      return newModals;
    });
    
    // Restore body scroll if no modals are open
    const hasOpenModals = Object.values(modals).some(isOpen => isOpen && modalId !== Object.keys(modals).find(key => modals[key]));
    if (!hasOpenModals) {
      document.body.style.overflow = '';
    }
  }, [modals]);

  const closeAllModals = useCallback(() => {
    setModals({});
    document.body.style.overflow = '';
  }, []);

  // Panel functions
  const isPanelOpen = useCallback((panelId: string): boolean => {
    return panels[panelId] || false;
  }, [panels]);

  const openPanel = useCallback((panelId: string) => {
    setPanels(prev => ({ ...prev, [panelId]: true }));
  }, []);

  const closePanel = useCallback((panelId: string) => {
    setPanels(prev => {
      const newPanels = { ...prev };
      delete newPanels[panelId];
      return newPanels;
    });
  }, []);

  const togglePanel = useCallback((panelId: string) => {
    setPanels(prev => ({
      ...prev,
      [panelId]: !prev[panelId]
    }));
  }, []);

  const closeAllPanels = useCallback(() => {
    setPanels({});
  }, []);

  // Accordion functions
  const getActiveAccordionItem = useCallback((accordionId: string): string | null => {
    return accordions[accordionId] || null;
  }, [accordions]);

  const setActiveAccordionItem = useCallback((accordionId: string, itemId: string | null) => {
    setAccordions(prev => ({
      ...prev,
      [accordionId]: itemId
    }));
  }, []);

  const toggleAccordionItem = useCallback((accordionId: string, itemId: string) => {
    setAccordions(prev => ({
      ...prev,
      [accordionId]: prev[accordionId] === itemId ? null : itemId
    }));
  }, []);

  // Loading functions
  const isLoading = useCallback((key: string): boolean => {
    return loading[key] || false;
  }, [loading]);

  const setLoading = useCallback((key: string, loadingState: boolean) => {
    setLoadingState(prev => ({
      ...prev,
      [key]: loadingState
    }));
  }, []);

  // Computed values
  const hasAnyModalOpen = Object.values(modals).some(Boolean);
  const hasAnyPanelOpen = Object.values(panels).some(Boolean);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle ESC key for modals
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && hasAnyModalOpen) {
        closeAllModals();
      }
    };

    if (hasAnyModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [hasAnyModalOpen, closeAllModals]);

  return {
    // Modal state
    isModalOpen,
    openModal,
    closeModal,
    closeAllModals,
    
    // Panel state
    isPanelOpen,
    openPanel,
    closePanel,
    togglePanel,
    closeAllPanels,
    
    // Accordion state
    getActiveAccordionItem,
    setActiveAccordionItem,
    toggleAccordionItem,
    
    // Loading state
    isLoading,
    setLoading,
    
    // Utility
    hasAnyModalOpen,
    hasAnyPanelOpen
  };
}