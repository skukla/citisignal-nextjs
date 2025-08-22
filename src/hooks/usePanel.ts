'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

interface UsePanelOptions {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface UsePanelReturn {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
  close: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Manages panel state with click-outside and keyboard handling.
 * @param {Object} [options] - Panel configuration
 * @param {boolean} [options.isOpen] - Controlled open state
 * @param {Function} [options.onOpenChange] - Callback when open state changes
 * @returns {Object} Panel state and refs
 */
export function usePanel(options: UsePanelOptions = {}): UsePanelReturn {
  const { isOpen: controlledIsOpen, onOpenChange } = options;

  // Handle controlled/uncontrolled state
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const setIsOpen = useCallback(
    (newIsOpen: boolean) => {
      setUncontrolledIsOpen(newIsOpen);
      onOpenChange?.(newIsOpen);
    },
    [onOpenChange]
  );

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  return {
    isOpen,
    setIsOpen,
    toggle,
    close,
    panelRef,
    triggerRef,
  };
}
