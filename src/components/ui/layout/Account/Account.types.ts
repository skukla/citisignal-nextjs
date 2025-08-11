import { ReactNode } from 'react';
import { BaseComponentProps, BasePanelProps, BasePanelContextValue } from '@/types/ui';

// User types
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

// Auth types
export interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

// Account panel types
export interface AccountContextValue extends BasePanelContextValue {
  isAuthenticated: boolean;
  user: UserProfile | null;
}

export interface AccountProviderProps {
  children: ReactNode;
}

export interface AccountRootProps extends BaseComponentProps {
  children: ReactNode;
}

export type AccountPanelProps = BasePanelProps;
export type AccountIconProps = BaseComponentProps;
export type AccountMenuProps = BaseComponentProps;
export interface AccountProfileProps extends BaseComponentProps {
  user: UserProfile;
}

// Menu item type
export interface AccountMenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Dashboard types
export type DashboardSectionId = 'profile' | 'orders' | 'addresses' | 'payment' | 'wishlists' | 'rewards';

export interface DashboardSection {
  title: string;
  description: string;
}

// Compound component type
export interface AccountComponent {
  Root: React.FC<AccountRootProps>;
  Icon: React.FC<AccountIconProps>;
  Panel: React.FC<AccountPanelProps>;
  Menu: React.FC<AccountMenuProps>;
  Profile: React.FC<AccountProfileProps>;
}