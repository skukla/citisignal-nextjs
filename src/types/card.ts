import { ElementType, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the Card component
 */
export interface CardProps<T extends ElementType = 'div'> {
  as?: T;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Props that are passed to the underlying element
 */
export type CardComponentProps<T extends ElementType> = CardProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardProps>;