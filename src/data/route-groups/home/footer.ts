// Re-export from centralized navigation config
import { 
  socialLinks, 
  footerNavigation,
  companyInfo
} from '@/data/config/navigation';

export { socialLinks, footerNavigation, companyInfo };

// Legacy aliases for backward compatibility
export const shopLinks = footerNavigation.shop;
export const plansLinks = footerNavigation.plans;
export const supportLinks = footerNavigation.support;
export const companyLinks = footerNavigation.company;

export const footerContent = {
  logo: {
    description: companyInfo.description
  },
  bottom: {
    copyright: companyInfo.copyright,
    phone: companyInfo.phone,
    availability: companyInfo.availability
  }
} as const;