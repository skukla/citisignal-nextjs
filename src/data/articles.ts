interface Article {
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  image?: string;
  href?: string;
}

export const techNewsArticles: Article[] = [
  {
    category: '5G',
    readTime: '5 min read',
    title: 'Understanding 5G: The Future of Mobile Connectivity',
    excerpt: 'Learn how 5G technology is revolutionizing mobile communications and what it means for your daily digital experience.',
    href: '/blog/understanding-5g'
  },
  {
    category: 'Tips',
    readTime: '3 min read',
    title: 'Top 10 Ways to Extend Your Phone\'s Battery Life',
    excerpt: 'Simple yet effective strategies to make your smartphone battery last longer throughout the day.',
    href: '/blog/extend-battery-life'
  },
  {
    category: 'Security',
    readTime: '4 min read',
    title: 'Essential Mobile Security Tips for 2024',
    excerpt: 'Protect your mobile device and personal data with these up-to-date security practices and recommendations.',
    href: '/blog/mobile-security-tips'
  }
] as const; 