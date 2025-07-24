# CitiSignal - Next.js Website

A modern, responsive telecommunications website built with Next.js, TypeScript, and Tailwind CSS. This project recreates a professional mobile carrier website featuring device sales, service plans, and customer engagement.

## 🚀 Features

### Core Sections

- **Header & Navigation** - Responsive header with mobile menu, search, cart, and user account links
- **Hero Section** - Eye-catching promotional banner highlighting $10/month unlimited plans
- **Coverage Section** - Interactive network coverage information with statistics and coverage map
- **Popular Phones** - Product showcase with device cards, pricing, and features
- **Activation Process** - Step-by-step guide for new customer onboarding
- **Newsletter Signup** - Email subscription with form validation and success states
- **Footer** - Comprehensive site links, customer support, and company information

### Design & UX

- **Fully Responsive** - Mobile-first design that works on all screen sizes
- **Modern UI** - Clean, professional design with gradient backgrounds and smooth animations
- **Interactive Elements** - Hover states, animated icons, and engaging micro-interactions
- **Accessibility** - Semantic HTML, proper ARIA labels, and keyboard navigation support

### Technical Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Heroicons** for consistent iconography
- **Component Architecture** - Modular, reusable components
- **Performance Optimized** - Fast loading with Next.js optimizations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Package Manager**: npm

## 📁 Project Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── CoverageSection.tsx
│       ├── PopularPhonesSection.tsx
│       ├── ActivationSection.tsx
│       └── NewsletterSection.tsx
├── types/
├── utils/
└── data/
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nextjs-citisignal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Key Components

### Header Component

- Responsive navigation with mobile hamburger menu
- Search functionality with dropdown
- Shopping cart with item count badge
- User account access
- Utility bar with support information

### Hero Section

- Compelling value proposition ($10/month plans)
- Gradient background with animated elements
- Clear call-to-action buttons
- Feature highlights (5G, No Contracts, Free Activation)

### Coverage Section

- Network reliability statistics
- Interactive coverage map placeholder
- Feature breakdown with icons
- Coverage check call-to-action

### Popular Phones Section

- Product grid with device cards
- Pricing with discount badges
- Star ratings and reviews
- Color options and storage info
- "Buy Now" and "Learn More" actions

### Activation Section

- 4-step process visualization
- Connected flow with progress indicators
- Feature benefits and guarantees
- Multiple call-to-action options

### Newsletter Section

- Email capture form with validation
- Loading and success states
- Benefit highlights with emojis
- Privacy policy compliance

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#2563eb` (blue-600)
- **Secondary**: `#4f46e5` (indigo-600)
- **Accent Yellow**: `#fbbf24` (yellow-400)
- **Success Green**: `#10b981` (green-500)
- **Error Red**: `#ef4444` (red-500)
- **Gray Scale**: `#111827` to `#f9fafb`

### Typography

- **Headings**: Bold, large scale (text-4xl to text-6xl)
- **Body**: Regular weight, readable sizes
- **CTAs**: Medium to bold weight for emphasis

### Spacing & Layout

- **Container**: Max width 7xl (1280px) with responsive padding
- **Sections**: Consistent 20 (80px) vertical padding
- **Grid**: Responsive grid system (1-4 columns)

## 🔧 Customization

### Adding New Sections

1. Create component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`
3. Follow existing patterns for consistency

### Modifying Styles

- Edit Tailwind classes directly in components
- Extend theme in `tailwind.config.js` if needed
- Global styles in `src/app/globals.css`

### Adding New Pages

1. Create new route in `src/app/`
2. Use existing layout components
3. Follow Next.js App Router conventions

## 📈 Performance Considerations

- **Image Optimization**: Use Next.js Image component for all images
- **Code Splitting**: Automatic with Next.js App Router
- **CSS Optimization**: Tailwind CSS purges unused styles
- **Bundle Analysis**: Use `npm run build` to analyze

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically on push

### Other Platforms

1. Build the project: `npm run build`
2. Upload `out/` directory to hosting provider
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support:

- Create an issue in the repository
- Contact: <support@citisignal.com>
- Phone: 1-800-CITI-SIG

---

### Built with ❤️ using Next.js and modern web technologies
