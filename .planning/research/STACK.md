# Stack Research

**Domain:** Developer Portfolio Website
**Researched:** 2026-02-16
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1+ | React framework with SSR/SSG | Industry standard for modern portfolios. Built-in image/font optimization, automatic code splitting, and perfect Vercel integration. Turbopack (default in v16) provides 2-5x faster builds and 10x faster Fast Refresh. |
| React | 19.2+ | UI library | React 19 is stable with Server Components, improved Suspense, and automatic batching. Required by Next.js 16. |
| TypeScript | 5.1+ | Type safety | 78% adoption in professional React projects (State of JS 2025). Catches errors at compile time, provides better IDE support, and is the default in create-next-app. |
| Tailwind CSS | 4.1+ | Utility-first CSS framework | Over 90% of 2025-2026 portfolio templates use Tailwind. CSS-first configuration in v4, automatic content detection, and built-in dark mode support. Perfect for rapid UI development with consistent design. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Motion | 2.9+ | Animation library | For fade-ins, hover effects, smooth transitions. Rebranded from Framer Motion. Hybrid engine delivers 120fps animations. React 19 compatible. Essential for portfolio polish. |
| shadcn/ui | Latest | Component primitives | For button, card, navigation components. Copy-paste components (not npm package). Built on Radix UI or Base UI. 65k+ GitHub stars, industry standard for Tailwind + React projects. |
| next/font | Built-in | Font optimization | Always use for Google Fonts or custom fonts. Automatic self-hosting eliminates external requests, prevents layout shift (CLS), and improves FCP/LCP. |
| next/image | Built-in | Image optimization | Always use for project screenshots, profile photos. Automatic WebP conversion, lazy loading, responsive srcsets, and blur placeholders. |
| @vercel/analytics | Latest | Web vitals tracking | For monitoring Core Web Vitals (LCP, CLS, FID, INP). Free on all Vercel plans. Zero config required. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Code linting | Flat config format (default in Next.js 16). Use eslint-config-next for Next.js-specific rules. |
| Prettier | Code formatting | Use eslint-config-prettier to prevent conflicts. Configure in .prettierrc.json. |
| Git | Version control | Standard for all projects. Essential for deployment via Vercel. |

## Installation

```bash
# Create new Next.js 16 project (recommended)
npx create-next-app@latest bjportfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Or upgrade existing project
npx @next/codemod@canary upgrade latest

# Core dependencies (if creating manually)
npm install next@latest react@latest react-dom@latest

# Animation and UI
npm install motion
npx shadcn@latest init

# Analytics (optional but recommended)
npm install @vercel/analytics

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom typescript eslint prettier eslint-config-prettier
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js 16 | Astro | If you need pure static site with zero JS. Astro is faster but less interactive. Not ideal for portfolios with animations. |
| Next.js 16 | Remix | If you need fine-grained control over data loading. More complex setup, less ecosystem support than Next.js. |
| Next.js 16 | Vite + React | If you want client-side only (no SSR). Faster dev server but loses SEO benefits and optimizations. |
| Tailwind CSS v4 | CSS Modules | If team strongly prefers traditional CSS. Loses utility-first benefits and slower development. |
| Tailwind CSS v4 | styled-components | If you need dynamic styling based on complex props. Adds runtime cost and bundle size. |
| Motion | tailwindcss-animate | If you only need basic CSS animations. Limited compared to Motion's gesture support and advanced animations. |
| shadcn/ui | Chakra UI | If you want an opinionated component system with theming. Heavier bundle, less customization. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated and unmaintained. No SSR/SSG, poor performance, outdated tooling. | Next.js 16 or Vite |
| Next.js 14 or earlier | Missing Turbopack (default), Cache Components, proxy.ts, and React 19.2 features. | Next.js 16.1+ |
| webpack with Next.js 16 | Turbopack is 2-5x faster for builds. webpack is legacy mode. | Use default Turbopack |
| Framer Motion (package name) | Rebranded to "motion". Old package still works but use new one. | motion package |
| Tailwind CSS v3 | Missing CSS-first config, automatic content detection, v4 performance improvements. | Tailwind CSS v4.1+ |
| React Three Fiber / Three.js | Overkill for simple portfolio. Heavy bundle size, complex setup, hurts mobile performance. Only use if 3D is core to your brand. | Motion for animations |
| Bootstrap | Outdated approach, requires custom CSS to look modern. Not standard in 2026. | Tailwind CSS |
| AMP (Next.js) | Removed in Next.js 16. No longer supported. | Focus on Core Web Vitals instead |
| Pages Router | Legacy routing system. App Router is standard in Next.js 13+. | App Router (app/ directory) |
| images.domains config | Deprecated in Next.js. Security risk. | images.remotePatterns |

## Stack Patterns by Variant

**If portfolio needs subtle animations (your case):**
- Use Motion for fade-ins, hover effects, page transitions
- Use next/image blur placeholders for smooth loading
- Target 60fps animations, avoid heavy 3D libraries
- Because recruiters view on various devices; performance matters

**If portfolio showcases 3D work (not your case):**
- Use React Three Fiber + Three.js for 3D scenes
- Use Motion for UI animations, R3F for canvas
- Implement aggressive lazy loading and code splitting
- Because 3D is heavy; show it only if it's your core skill

**If targeting international audience:**
- Use Next.js i18n routing
- Use next-intl for translations
- Configure lang attributes and hreflang tags
- Because you mentioned recruiters/hiring managers (likely US-focused), skip unless needed

**If blog is required (not your case):**
- Use MDX for markdown with React components
- Use Contentlayer or next-mdx-remote for parsing
- Use next-sitemap for XML sitemap generation
- Because you specified no blog, skip these dependencies

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 16.1 | React 19.2+ | React 19 is required. React 18 not supported. |
| Next.js 16.1 | Node.js 20.9+ | Node.js 18 no longer supported. Use Node 20 LTS or 22. |
| Motion 2.9 | React 19.2 | Officially tested with React 19. Works with React 18.2+. |
| Tailwind CSS 4.1 | Safari 16.4+, Chrome 111+, Firefox 128+ | Modern browsers only. Drops IE11, old Safari. |
| TypeScript 5.1+ | Next.js 16 | Minimum version. TypeScript 4.x not supported. |
| shadcn/ui | Tailwind CSS 4.x | Requires tailwind-merge v3.x for v4 compatibility. |
| @vercel/analytics | Next.js 13+ | Works with all modern Next.js versions. |

## Sources

**Verified with official documentation (HIGH confidence):**
- [Next.js 16 Official Release](https://nextjs.org/blog/next-16) - Features, breaking changes, upgrade guide
- [Next.js 16.1 Release](https://nextjs.org/blog/next-16-1) - Stable Turbopack File System Caching
- [React 19.2 Announcement](https://react.dev/blog/2025/10/01/react-19-2) - View Transitions, useEffectEvent, Activity
- [React v19 Stable](https://react.dev/blog/2024/12/05/react-19) - Server Components, Actions API
- [Motion.dev Official Docs](https://motion.dev) - Rebranding, React 19 compatibility
- [Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) - v4 migration, breaking changes
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) - Built-in optimization features

**Verified with web search and multiple sources (MEDIUM confidence):**
- [Next.js Developer Portfolio Best Practices 2026](https://kinsta.com/blog/next-js-portfolio/) - Industry patterns
- [Tailwind CSS Portfolio Templates](https://magicui.design/blog/nextjs-portfolio-template) - 90% adoption rate
- [shadcn/ui Guide 2026](https://designrevision.com/blog/shadcn-ui-guide) - 65k+ stars, adoption stats
- [TypeScript React Best Practices 2026](https://medium.com/@mernstackdevbykevin/typescript-with-react-best-practices-2026-78ce4546210b) - 78% adoption
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights) - Web Vitals tracking
- [Takuya Matsuyama Portfolio Stack](https://www.craftz.dog/) - Reference for craftz.dog inspiration

**Context7 not available for these libraries** - Brave API key not set, relied on official docs + web search

---
*Stack research for: Developer Portfolio Website (dark-themed, Vercel deployment)*
*Researched: 2026-02-16*
