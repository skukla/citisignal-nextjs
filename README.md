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

```
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
- Git (for submodules)

### Installation

1. **Clone the repository with submodules**

   ```bash
   git clone --recurse-submodules <repository-url>
   cd nextjs-citisignal
   ```

   > **Note:** The `--recurse-submodules` flag ensures the Demo Inspector is cloned automatically.
   >
   > If you already cloned without submodules, initialize them:
   >
   > ```bash
   > git submodule update --init --recursive
   > ```

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

## 🔍 Demo Inspector

This project includes the **Demo Inspector** - a development tool for visualizing GraphQL queries and data sources in real-time.

### What is the Demo Inspector?

The Demo Inspector is integrated as a **Git submodule** located at `src/demo-inspector/`. It provides:

- ✅ Real-time GraphQL query tracking
- ✅ Visual data source attribution (Commerce Core, Catalog Service, Live Search)
- ✅ Performance metrics for each query
- ✅ Interactive controls to toggle data source visibility
- ✅ Cache control for testing

### Using the Demo Inspector

**Toggle the inspector:**

- Press `Cmd/Ctrl + Shift + D` to show/hide
- Click the floating toggle button in the bottom-right corner

**View query details:**

- See which queries executed
- Check response times
- Identify which Adobe service provided the data

### Working with the Submodule

The Demo Inspector is maintained in its own repository and integrated via Git submodule.

**Update to latest version:**

```bash
git submodule update --remote src/demo-inspector
git add src/demo-inspector
git commit -m "chore: update demo-inspector to latest"
```

**Make changes to Demo Inspector:**

```bash
cd src/demo-inspector
# Make your changes
git add .
git commit -m "feat: your changes"
git push origin main

# Update parent repo to use new version
cd ../..
git add src/demo-inspector
git commit -m "chore: update demo-inspector submodule"
```

**Running without Demo Inspector** (optional):

```bash
# Clone without submodules
git clone <repository-url>
# Don't run: git submodule update --init
```

📖 **Full Documentation:** See [docs/DEMO_INSPECTOR.md](./docs/DEMO_INSPECTOR.md)

## 📚 Reference Implementations

`src/reference/` contains read-only examples of advanced patterns:

- `unified-query/` - Complete unified query example
  - Not actively used or maintained
  - Educational resource only
  - Shows end-to-end orchestrated query pattern

For production patterns, see `src/hooks/` and `src/components/`.

**Backend reference:** See commerce-mesh/resolvers-src/reference/category-page.js

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support:

- Create an issue in the repository
- Contact: support@citisignal.com
- Phone: 1-800-CITI-SIG

---

**Built with ❤️ using Next.js and modern web technologies**
