import type { BaseComponentProps } from '@/types/ui';

// Base types
export interface BaseItem {
  href: string;
  label: string;
}

// Navigation types
export type NavItem = BaseItem;

export type NavVariant = 'desktop' | 'mobile';

export interface NavigationState {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

// Component props
export interface NavigationRootProps extends BaseComponentProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export interface NavigationListProps extends BaseComponentProps {
  items: readonly NavItem[];
  variant: NavVariant;
}

export interface NavigationDesktopProps extends BaseComponentProps {
  items: readonly NavItem[];
}

export interface NavigationMobileProps extends BaseComponentProps {
  items: readonly NavItem[];
}

export interface NavigationLinkProps extends BaseComponentProps {
  href: string;
}

// Compound component type
export interface NavigationComponent {
  Root: React.FC<NavigationRootProps>;
  Desktop: React.FC<NavigationDesktopProps>;
  Mobile: React.FC<NavigationMobileProps>;
  Link: React.FC<NavigationLinkProps>;
}