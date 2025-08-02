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
      category: "5G Technology",
      title: "The Future of 5G: What's Next for Mobile Connectivity",
      excerpt: "Explore how 5G is revolutionizing everything from gaming to remote work, and what's coming next.",
      readTime: "5 min read",
      image: "/blog/5g-future.jpg",
      slug: "future-of-5g-mobile-connectivity",
      publishedAt: "2024-01-15",
      author: "Sarah Chen"
    },
    {
      category: "Smart Living",
      title: "Connected Home: Essential Smart Devices for 2024",
      excerpt: "Discover the must-have smart home devices that work seamlessly with your mobile plan.",
      readTime: "4 min read",
      image: "/blog/smart-home.jpg",
      slug: "connected-home-smart-devices-2024",
      publishedAt: "2024-01-12",
      author: "Michael Rodriguez"
    },
    {
      category: "Tips & Tricks",
      title: "Maximize Your Phone's Battery Life: Expert Tips",
      excerpt: "Learn how to extend your phone's battery life with these proven techniques.",
      readTime: "3 min read",
      image: "/blog/battery-tips.jpg",
      slug: "maximize-phone-battery-life-tips",
      publishedAt: "2024-01-10",
      author: "Lisa Thompson"
    }
  ],
  viewAllLink: "/blog"
};