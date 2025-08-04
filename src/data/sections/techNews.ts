/**
 * Tech News Section Data
 * Content for the technology news and articles section
 */

export interface TechArticle {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  slug?: string;
  publishedAt?: string;
  author?: string;
}

export interface TechNewsContent {
  header: {
    title: string;
    description: string;
  };
  articles: TechArticle[];
  viewAllLink: string;
}

export const techNewsContent: TechNewsContent = {
  header: {
    title: "Latest Tech News & Insights",
    description: "Stay informed with the latest technology trends, tips, and insights from our mobile experts."
  },
  articles: [
    {
      category: "5G",
      title: "Understanding 5G: The Future of Mobile Connectivity",
      excerpt: "Learn how 5G technology is revolutionizing mobile communications and what it means for your daily digital experience.",
      readTime: "5 min read",
      image: "/blog/5g-future.jpg",
      slug: "understanding-5g"
    },
    {
      category: "Tips",
      title: "Top 10 Ways to Extend Your Phone's Battery Life",
      excerpt: "Simple yet effective strategies to make your smartphone battery last longer throughout the day.",
      readTime: "3 min read",
      image: "/blog/battery-tips.jpg",
      slug: "extend-battery-life"
    },
    {
      category: "Security",
      title: "Essential Mobile Security Tips for 2024",
      excerpt: "Protect your mobile device and personal data with these up-to-date security practices and recommendations.",
      readTime: "4 min read",
      image: "/blog/security-tips.jpg",
      slug: "mobile-security-tips"
    }
  ],
  viewAllLink: "/blog"
};