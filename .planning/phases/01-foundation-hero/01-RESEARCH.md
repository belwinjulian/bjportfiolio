# Phase 1: Foundation & Hero - Research

**Researched:** 2026-02-16
**Domain:** Next.js 15 App Router, Tailwind CSS v4, Dark Theme Implementation, Responsive Design
**Confidence:** HIGH

## Summary

Phase 1 establishes the foundational Next.js 15 portfolio with App Router, TypeScript, Tailwind CSS v4, dark theme implementation, responsive design, and performance optimization. The research confirms that Next.js 15 with App Router and Tailwind CSS v4 is the current standard for modern web applications in 2026, with significant improvements in developer experience and performance compared to previous versions.

The stack is mature and well-documented, with clear patterns for dark mode implementation using CSS custom properties, frosted-glass navigation using backdrop-blur utilities, and performance optimization through Next.js's built-in features like Image optimization, font optimization, and React Server Components. The main challenges involve proper client/server component boundaries, avoiding common performance pitfalls, and ensuring WCAG 2.1 AA accessibility compliance for dark theme contrast ratios.

**Primary recommendation:** Use create-next-app with recommended defaults (TypeScript, Tailwind v4, App Router, ESLint), implement dark theme using CSS custom properties instead of class-based dark mode for cleaner codebase, leverage React Server Components by default with minimal "use client" boundaries, and optimize for Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS minimal) from day one.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x (latest) | React framework with App Router | Official recommendation, excellent DX, built-in optimizations, 47% of React production sites use Next.js |
| React | 19.x | UI library | Required by Next.js App Router, Server Components standard |
| TypeScript | 5.1+ | Type safety | Effectively standard in 2026, included in Next.js defaults, improves maintainability |
| Tailwind CSS | 4.x | Utility-first CSS | v4 uses CSS-first configuration with @theme directive, smaller bundles, integrates seamlessly with Next.js |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-themes | 0.3+ | Dark mode management | Recommended for dark mode - no flash on load, syncs across tabs, 2 lines of code setup |
| next/font | Built-in | Font optimization | Always use for Google Fonts or custom fonts - self-hosting, no layout shift, build-time optimization |
| next/image | Built-in | Image optimization | Always use for images - automatic WebP/AVIF, lazy loading, responsive sizing |
| ESLint | Latest | Linting | Included in Next.js defaults, enforces framework-specific best practices |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-themes | Manual dark mode | Manual approach requires custom logic for no-flash, system preference, persistence - next-themes solves all edge cases |
| Tailwind CSS | CSS Modules | CSS Modules work but Tailwind's utility-first approach is faster for responsive design and theming |
| TypeScript | JavaScript | JavaScript works but TypeScript is recommended for better DX, refactoring, and type safety in 2026 |

**Installation:**
```bash
# Create new Next.js app with recommended defaults
npx create-next-app@latest my-portfolio --yes

# Or with custom settings
npx create-next-app@latest

# Add dark mode support
npm install next-themes

# Already included: next, react, react-dom, tailwindcss, typescript, eslint
```

## Architecture Patterns

### Recommended Project Structure
```
bjportfolio/
├── app/                      # App Router (routes + layouts)
│   ├── layout.tsx           # Root layout (required, contains <html> and <body>)
│   ├── page.tsx             # Home page (landing with hero)
│   └── globals.css          # Global styles + Tailwind directives
├── components/              # Reusable components
│   ├── ui/                  # Atomic UI components (Button, Card, etc.)
│   ├── Navigation.tsx       # Frosted-glass navigation (client component)
│   └── Hero.tsx             # Hero section (server component)
├── lib/                     # Third-party integrations
├── utils/                   # Pure utility functions
├── public/                  # Static assets (images, fonts)
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js configuration
```

### Pattern 1: Dark Theme with CSS Custom Properties
**What:** Define color tokens as CSS variables in globals.css, use @theme directive in Tailwind v4 to reference them
**When to use:** Always - cleaner than class-based dark mode, single source of truth for colors, no dark: prefix needed everywhere
**Example:**
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-accent: #06b6d4;
}

/* Use in components: bg-background, text-foreground, etc. */
```

### Pattern 2: Frosted-Glass Navigation
**What:** Sticky navigation with backdrop-blur and semi-transparent background
**When to use:** For portfolio navigation - modern, professional aesthetic
**Example:**
```tsx
// components/Navigation.tsx
'use client'

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="container mx-auto px-4 py-4">
        {/* Navigation content */}
      </div>
    </nav>
  )
}
```
**Source:** [Tailwind CSS Backdrop Blur Documentation](https://tailwindcss.com/docs/backdrop-blur)

### Pattern 3: Smooth Scroll to Sections
**What:** Enable smooth scrolling for anchor links while respecting Next.js Link behavior
**When to use:** For single-page portfolio navigation
**Example:**
```css
/* app/globals.css */
html {
  scroll-behavior: smooth;
}
```
```tsx
// app/layout.tsx - disable smooth scroll for route changes
<html lang="en" data-scroll-behavior="smooth">
```
**Source:** [Next.js Missing Data Scroll Behavior](https://nextjs.org/docs/messages/missing-data-scroll-behavior)

### Pattern 4: Server Components by Default
**What:** Keep components as Server Components unless interactivity is needed
**When to use:** Always - default to Server Components, only add "use client" for state, effects, or browser APIs
**Example:**
```tsx
// components/Hero.tsx - Server Component (no 'use client')
export function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <h1>Belwin Julian</h1>
      <p>Full Stack Developer</p>
    </section>
  )
}

// components/Navigation.tsx - Client Component (needs interactivity)
'use client'
import { useState } from 'react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  // Interactive navigation
}
```
**Source:** [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

### Pattern 5: Responsive Design - Mobile First
**What:** Apply base styles for mobile, use breakpoint prefixes (sm:, md:, lg:) to override for larger screens
**When to use:** Always - Tailwind uses mobile-first breakpoints
**Example:**
```tsx
// Mobile first approach
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-3xl md:text-5xl lg:text-7xl">Hero Title</h1>
</div>
```
**Breakpoints:**
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

**Source:** [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)

### Anti-Patterns to Avoid
- **Using "use client" everywhere:** Defeats React Server Components benefits, increases bundle size, hurts performance
- **Manual font loading:** Use next/font instead - handles optimization, prevents layout shift, self-hosts fonts
- **Ignoring Image optimization:** Always use next/image, not <img> tags - automatic format conversion, lazy loading, sizing
- **Deep folder nesting:** Keep structure flat, avoid creating many levels of subfolders
- **Mixing business logic with UI:** Separate concerns - components render, utils/lib handle logic

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dark mode toggle | Custom theme switcher with localStorage | next-themes | Handles SSR/SSG flash prevention, system preference sync, tab synchronization, multiple themes, all edge cases |
| Font optimization | Manual font loading with <link> | next/font/google or next/font/local | Automatic self-hosting, no layout shift, subsetting, build-time optimization, privacy (no Google requests) |
| Image optimization | Custom responsive images | next/image | Automatic format conversion (WebP/AVIF), lazy loading, responsive sizes, blur placeholders, prevents CLS |
| Smooth scroll | Custom scroll behavior | CSS scroll-behavior: smooth | Native browser support, works with accessibility preferences (respects prefers-reduced-motion) |
| Responsive breakpoints | Custom media queries | Tailwind breakpoint utilities | Consistent breakpoints, mobile-first, easier to maintain, smaller CSS bundle |

**Key insight:** Next.js and Tailwind CSS have solved most common UI/UX problems at the framework level. Custom solutions introduce edge cases (SSR flash, layout shift, accessibility issues) that built-in tools already handle. For a portfolio that needs to ship fast, use the framework's built-in optimizations.

## Common Pitfalls

### Pitfall 1: Client Component Boundary Pollution
**What goes wrong:** Adding "use client" at the top level propagates to all children, inflating the client bundle
**Why it happens:** Developers add "use client" reactively when they hit errors, without understanding the boundary
**How to avoid:**
- Default to Server Components
- Only add "use client" to the smallest component that needs interactivity
- Extract interactive parts into separate client components
- Keep client components as leaf nodes in the tree
**Warning signs:** Large bundle size, slow initial page load, "use client" in many files
**Source:** [App Router Pitfalls: Common Next.js Mistakes](https://imidef.com/en/2026-02-11-app-router-pitfalls)

### Pitfall 2: Dark Mode Flash on Load
**What goes wrong:** Page loads in light mode then flashes to dark mode
**Why it happens:** Theme preference stored in localStorage isn't available during SSR/SSG
**How to avoid:**
- Use next-themes library (prevents flash with inline script)
- Don't manually implement dark mode with useState
- Set `attribute="class"` in ThemeProvider for Tailwind compatibility
**Warning signs:** Visible flash when page loads, users report flickering
**Source:** [Light & Dark Mode in Next.js App Router + Tailwind with No Flicker](https://www.davegray.codes/posts/light-dark-mode-nextjs-app-router-tailwind)

### Pitfall 3: WCAG Contrast Ratio Violations
**What goes wrong:** Dark theme colors don't meet WCAG 2.1 AA standards (4.5:1 for normal text)
**Why it happens:** Developers choose aesthetically pleasing colors without checking contrast ratios
**How to avoid:**
- Use contrast checker tools during color selection
- Test with Lighthouse accessibility audit
- Aim for 7:1 contrast in dark mode for better readability
- Use semantic color tokens (foreground/background) not arbitrary grays
**Warning signs:** Lighthouse accessibility score < 90, text hard to read
**Tools:** [Tailwind Contrast Checker](https://tailwindcolor.tools/tailwind-contrast-checker), [InclusiveColors](https://www.inclusivecolors.com/)
**Source:** [Tailwind CSS dark mode WCAG contrast ratio accessibility](https://github.com/tailwindlabs/tailwindcss/discussions/12164)

### Pitfall 4: Core Web Vitals Degradation
**What goes wrong:** LCP > 2.5s, INP > 200ms, CLS from layout shifts
**Why it happens:** Unoptimized images, fonts, too many client components, blocking scripts
**How to avoid:**
- Use next/image for all images (automatic WebP/AVIF, lazy loading)
- Use next/font for fonts (self-hosting, no layout shift)
- Add priority prop to hero images for above-the-fold content
- Minimize client components to reduce JavaScript bundle
- Enable Turbopack for faster builds (default in Next.js 15)
**Warning signs:** Lighthouse Performance score < 90, slow page load, layout shifts visible
**Source:** [Achieving 95+ Lighthouse Scores in Next.js 15](https://medium.com/@sureshdotariya/achieving-95-lighthouse-scores-in-next-js-15-modern-web-application-part1-e2183ba25fc1)

### Pitfall 5: Backdrop Blur Browser Compatibility
**What goes wrong:** Frosted-glass effect doesn't work in older browsers
**Why it happens:** backdrop-filter support is not universal (Safari 9+, Chrome 76+)
**How to avoid:**
- Provide fallback background opacity
- Test in target browsers (Safari 16.4+, Chrome 111+, Firefox 111+)
- Use semi-transparent background as base, backdrop-blur as enhancement
**Warning signs:** Navigation bar looks different across browsers
**Example fallback:**
```tsx
className="bg-background/80 backdrop-blur-md"
// bg-background/80 provides fallback if backdrop-blur not supported
```
**Source:** [Tailwind CSS Backdrop Blur Documentation](https://tailwindcss.com/docs/backdrop-blur)

## Code Examples

Verified patterns from official sources:

### Complete Root Layout with Dark Mode Setup
```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Belwin Julian - Full Stack Developer',
  description: 'Portfolio showcasing full stack development projects and expertise',
  openGraph: {
    title: 'Belwin Julian - Full Stack Developer',
    description: 'Portfolio showcasing full stack development projects and expertise',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```
**Source:** [Next.js Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

### Theme Provider Wrapper
```tsx
// components/theme-provider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```
**Source:** [next-themes GitHub](https://github.com/pacocoursey/next-themes)

### Global CSS with Tailwind v4 and Dark Theme
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Dark theme colors (portfolio is dark-only) */
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
  --color-muted: #3f3f46;
  --color-border: #27272a;
  --color-primary: #3b82f6;
  --color-primary-foreground: #f0f9ff;
  --color-accent: #06b6d4;
  --color-accent-foreground: #ecfeff;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### Responsive Hero Section
```tsx
// components/Hero.tsx
export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
          Belwin Julian
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-muted mb-6">
          Full Stack Developer
        </p>
        <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
          Building scalable web applications with modern technologies.
          Passionate about clean code, user experience, and continuous learning.
        </p>
      </div>
    </section>
  )
}
```

### Frosted-Glass Navigation with Smooth Scroll
```tsx
// components/Navigation.tsx
'use client'

export function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <ul className="flex gap-6 justify-center">
          <li>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
```
**Source:** [How to create scroll links in Next.js](https://glensea.com/article/how-to-create-scroll-links-to-navigate-to-specific-sections-of-an-spa-in-nextjs)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router | App Router | Next.js 13 (stable in 15) | Server Components default, better performance, improved routing |
| Tailwind v3 JavaScript config | Tailwind v4 CSS-first config | v4.0 (2025) | @theme directive, smaller bundles, CSS custom properties |
| Manual dark mode | next-themes | 2023-2024 | No flash on load, system preference sync, 2-line setup |
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 2024 | Stricter responsiveness metric (≤200ms vs ≤100ms FID) |
| Webpack | Turbopack | Next.js 15 default | Faster builds, HMR, development experience |
| next lint command | ESLint/Biome CLI | Next.js 16 | More control, explicit linting, no automatic build linting |

**Deprecated/outdated:**
- **Pages Router (pages/):** Still supported but App Router (app/) is recommended for new projects, better DX and performance
- **Tailwind darkMode: "class" in JS config:** Tailwind v4 uses CSS-first configuration, no tailwind.config.js needed
- **Manual font optimization:** next/font built-in since Next.js 13, no excuse to load fonts manually
- **First Input Delay (FID):** Replaced by INP as Core Web Vital metric in March 2024

## Open Questions

1. **Custom domain setup on Vercel**
   - What we know: Vercel supports custom domains, requires DNS configuration
   - What's unclear: Specific DNS records needed, SSL certificate automation details
   - Recommendation: Defer to Phase 5 (Launch & Deployment), well-documented in Vercel docs

2. **Analytics implementation**
   - What we know: Next.js supports web vitals tracking with useReportWebVitals hook
   - What's unclear: Which analytics provider (Vercel Analytics, Google Analytics, Plausible)?
   - Recommendation: Defer to Phase 5, not critical for Phase 1 foundation

3. **Favicon and app icons**
   - What we know: Next.js supports favicon.ico and app icons in app/ directory
   - What's unclear: Specific sizes needed for all platforms
   - Recommendation: Use standard favicon.ico for Phase 1, create full icon set in Phase 5

## Sources

### Primary (HIGH confidence)
- [Next.js 15 Official Documentation](https://nextjs.org/docs/app/getting-started/installation) - Installation, App Router, configuration (verified 2026-02-11)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/responsive-design) - Responsive design, dark mode, backdrop-blur (current)
- [next-themes GitHub Repository](https://github.com/pacocoursey/next-themes) - Dark mode implementation, API reference
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) - Font optimization with next/font (verified 2026-02-11)
- [Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images) - Image component API, WebP/AVIF support
- [Next.js Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - SEO, meta tags, Open Graph

### Secondary (MEDIUM confidence)
- [Achieving 95+ Lighthouse Scores in Next.js 15](https://medium.com/@sureshdotariya/achieving-95-lighthouse-scores-in-next-js-15-modern-web-application-part1-e2183ba25fc1) - Performance optimization strategies
- [App Router Pitfalls: Common Next.js Mistakes](https://imidef.com/en/2026-02-11-app-router-pitfalls) - Common mistakes and best practices (2026-02-11)
- [Light & Dark Mode in Next.js App Router + Tailwind with No Flicker](https://www.davegray.codes/posts/light-dark-mode-nextjs-app-router-tailwind) - Dark mode implementation
- [Tailwind Contrast Checker](https://tailwindcolor.tools/tailwind-contrast-checker) - WCAG accessibility tool
- [Core Web Vitals 2026 Complete Guide](https://senorit.de/en/blog/core-web-vitals-2026) - LCP, INP, CLS metrics
- [The Ultimate Guide to Organizing Your Next.js 15 Project Structure](https://www.wisp.blog/blog/the-ultimate-guide-to-organizing-your-nextjs-15-project-structure) - Folder structure best practices
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) - RSC vs client components
- [Responsive Design Superpowers: Tailwind CSS 4 with Next.js 15](https://medium.com/@sureshdotariya/responsive-design-superpowers-tailwind-css-4-with-next-js-15-4920329508ec) - Responsive design patterns

### Tertiary (LOW confidence)
- Various Medium articles and blog posts on Next.js portfolio implementation - used for pattern validation, not as primary source

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All tools are official releases with current documentation, widely adopted in 2026
- Architecture: HIGH - Patterns sourced from Next.js and Tailwind official docs, verified with current best practices
- Pitfalls: MEDIUM-HIGH - Validated through official discussions, recent blog posts (2026), and community patterns

**Research date:** 2026-02-16
**Valid until:** ~30 days (2026-03-16) - Stack is stable, no breaking changes expected in Tailwind v4 or Next.js 15 during this period
