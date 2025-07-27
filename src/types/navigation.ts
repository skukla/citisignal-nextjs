export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface NavigationLink {
  name: string;
  href: string;
  icon?: React.ComponentType;
  isExternal?: boolean;
} 