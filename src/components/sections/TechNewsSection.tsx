import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Container from '@/components/ui/Container';

export default function TechNewsSection() {
  const articles = [
    {
      category: "5G Technology",
      title: "The Future of 5G: What's Next for Mobile Connectivity",
      excerpt: "Explore how 5G is revolutionizing everything from gaming to remote work, and what's coming next.",
      readTime: "5 min read",
      image: "/blog/5g-future.jpg"
    },
    {
      category: "Smart Living",
      title: "Connected Home: Essential Smart Devices for 2024",
      excerpt: "Discover the must-have smart home devices that work seamlessly with your mobile plan.",
      readTime: "4 min read",
      image: "/blog/smart-home.jpg"
    },
    {
      category: "Tips & Tricks",
      title: "Maximize Your Phone's Battery Life: Expert Tips",
      excerpt: "Learn how to extend your phone's battery life with these proven techniques.",
      readTime: "3 min read",
      image: "/blog/battery-tips.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Tech News & Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Stay informed about the latest technology trends and get expert tips to enhance your mobile experience.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            View All Articles
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {articles.map((article, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Article Image */}
              <div className="aspect-video bg-purple-50 rounded-xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                  <span className="text-purple-600 font-medium">Article Image</span>
                </div>
              </div>

              {/* Article Content */}
              <div>
                <div className="text-sm font-medium text-purple-600 mb-2">
                  {article.category} • {article.readTime}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="md:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            View All Articles
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </Container>
    </section>
  );
} 