import type { BaseComponentProps, BasePanelProps, BasePanelContextValue } from '@/types/ui';

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
export type AccountRootProps = BaseComponentProps;
export type AccountIconProps = BasePanelProps;
export type AccountPanelProps = BasePanelProps;

// Compound component type
export interface AccountComponent {
  Root: React.FC<AccountRootProps>;
  Icon: React.FC<AccountIconProps>;
  Panel: React.FC<AccountPanelProps>;
}