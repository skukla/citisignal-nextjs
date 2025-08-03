import type { ElementType, ReactNode, RefObject } from 'react';

// Base props shared by all components
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Props shared by all panel-related components
export interface BasePanelProps extends BaseComponentProps {
  id?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// Context value shared by all panel features
export interface BasePanelContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
}

// Generic compound component type
export type CompoundComponent<
  RootProps extends BaseComponentProps = BaseComponentProps,
  TriggerProps extends BasePanelProps = BasePanelProps,
  PanelProps extends BasePanelProps = BasePanelProps,
  ExtraComponents extends Record<string, React.FC<BaseComponentProps>> = Record<string, never>
> = {
  Root: React.FC<RootProps>;
  Trigger: React.FC<TriggerProps>;
  Panel: React.FC<PanelProps>;
} & ExtraComponents;

// Base types
export interface BaseUIProps {
  className?: string;
  children?: ReactNode;
}

// Auth types
export interface AuthLink {
  href: string;
  label: string;
}

// Logo types
export interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  href?: string;
  linkClassName?: string;
}

// Spinner types
export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends BaseComponentProps {
  size?: SpinnerSize;
  'aria-label'?: string;
}

// Icon types
export type IconSize = 'sm' | 'md' | 'lg';

export interface IconWrapperProps extends BaseComponentProps {
  icon: ElementType;
  size?: IconSize;
  'aria-hidden'?: boolean;
}

 