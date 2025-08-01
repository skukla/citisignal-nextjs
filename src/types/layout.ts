import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

/**
 * Container component props with polymorphic 'as' prop
 */
export type ContainerProps<T extends ElementType = 'div'> = {
  children: ReactNode;
  as?: T;
  fullWidth?: boolean;
  noPadding?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>;

/**
 * Section component props extending container functionality
 */
export interface SectionProps extends Omit<ContainerProps<'section'>, 'as'> {
  background?: string;
  gradient?: string;
}