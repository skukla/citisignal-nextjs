export const headerConfig = {
  topBar: {
    announcement: "Free shipping on orders over $99",
    supportPhone: "1-800-CITI-SIG",
    authLinks: [
      { href: '/signin', label: 'Sign In' },
      { href: '/signup', label: 'Create Account' }
    ]
  },
  logo: {
    src: "/logo.svg",
    alt: "CitiSignal",
    width: 160,
    height: 50
  },
  responsive: {
    desktopBreakpoint: 'lg', // Standardized from min-[1148px]
    mobileBreakpoint: 'max-lg'
  },
  layout: {
    maxWidth: 'max-w-7xl',
    padding: 'px-4 sm:px-6 lg:px-8',
    spacing: 'gap-8',
    verticalPadding: 'py-4'
  }
} as const;

export type HeaderConfig = typeof headerConfig;