'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigationPanel } from './useNavigationPanel';

export interface UseNavigationProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export interface UseNavigationReturn {
  isMenuOpen: boolean;
  closeMenu: () => void;
  toggleMenu: () => void;
  isActive: (href: string) => boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export function useNavigation(props?: UseNavigationProps): UseNavigationReturn {
  const pathname = usePathname();
  const { isOpen, toggle, close, panelRef } = useNavigationPanel();

  const isMenuOpen = props?.isOpen ?? isOpen;
  const toggleMenu = useCallback(() => {
    if (props?.onToggle) {
      props.onToggle();
    } else {
      toggle();
    }
  }, [props, toggle]);

  const closeMenu = useCallback(() => {
    if (props?.onClose) {
      props.onClose();
    } else {
      close();
    }
  }, [props, close]);

  const isActive = useCallback((href: string) => {
    return pathname === href;
  }, [pathname]);

  return {
    isMenuOpen,
    closeMenu,
    toggleMenu,
    isActive,
    menuRef: panelRef
  };
} 