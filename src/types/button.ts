import { ElementType, MouseEvent } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'yellow';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
  loading?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-describedby'?: string;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  href?: never;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  onClick?: never;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;