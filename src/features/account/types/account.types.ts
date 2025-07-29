import type { BaseComponentProps, BasePanelProps, BasePanelContextValue, CompoundComponent } from '@/types/ui';

// User types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Menu item type
export interface AccountMenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Context types
export interface AccountContextValue extends BasePanelContextValue {
  isAuthenticated: boolean;
  user: UserProfile | null;
  signIn: () => void;
  signOut: () => void;
}

// Component props
export interface AccountRootProps extends BaseComponentProps {}
export interface AccountIconProps extends BasePanelProps {}
export interface AccountPanelProps extends BasePanelProps {}

// Compound component type
export type AccountComponent = CompoundComponent<
  AccountRootProps,
  AccountIconProps,
  AccountPanelProps
>;