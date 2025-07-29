import type { ReactNode, ReactElement } from 'react';

// Base types for layout components
export interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

// Header types
export interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export type HeaderSectionProps = BaseLayoutProps;

export interface HeaderLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export type HeaderActionsProps = BaseLayoutProps;

// Compound component types
export type HeaderComponent = {
  (props: HeaderProps): ReactElement;
  Top: (props: HeaderSectionProps) => ReactElement;
  Main: (props: HeaderSectionProps) => ReactElement;
  Logo: (props: HeaderLogoProps) => ReactElement;
  Actions: (props: HeaderActionsProps) => ReactElement;
  Mobile: (props: HeaderSectionProps) => ReactElement;
}; 