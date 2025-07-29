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

export interface NavigationRootProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export interface NavigationListProps {
  items: readonly NavItem[];
  variant: NavVariant;
  className?: string;
}

export interface NavigationLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}