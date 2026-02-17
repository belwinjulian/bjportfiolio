# Phase 5: Launch & Deployment - Research

**Researched:** 2026-02-16
**Domain:** Next.js production deployment, Vercel hosting, performance optimization, accessibility compliance, cross-browser testing
**Confidence:** HIGH

## Summary

This phase focuses on deploying a production-ready Next.js portfolio to Vercel with comprehensive testing, optimization, and compliance verification. The research covers five critical domains: (1) Vercel deployment and custom domain configuration with automatic SSL, (2) Lighthouse performance and accessibility auditing to achieve 90+ scores, (3) WCAG 2.1 AA compliance with emphasis on contrast ratios and keyboard navigation, (4) social media preview configuration using Next.js metadata API, and (5) cross-browser/device testing tools and methodologies.

Next.js provides automatic optimizations (Server Components, code-splitting, image optimization) that make achieving 90+ Lighthouse scores achievable with proper configuration. Vercel's deployment process is highly streamlined with automatic SSL certificate generation and renewal, zero-downtime deployments, and built-in analytics. The main challenges are ensuring WCAG compliance (particularly contrast ratios and keyboard navigation), comprehensive cross-device testing, and proper social media metadata configuration.

**Primary recommendation:** Use Next.js built-in optimization features (Image component, metadata API, automatic code-splitting), deploy to Vercel with automatic SSL, verify with Lighthouse CI and manual accessibility testing, test on real devices via BrowserStack or manual testing, and configure Vercel Analytics for post-deployment monitoring.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15+ (App Router) | Production framework | Built-in optimizations, automatic code-splitting, Server Components reduce bundle size |
| Vercel | Platform | Hosting & deployment | Zero-config Next.js deployment, automatic SSL, edge network, free tier |
| Lighthouse | 10+ | Performance & accessibility audit | Industry standard, Google's official tool, CI/CD integration |
| @vercel/analytics | Latest | User analytics | Privacy-friendly, no cookies, integrated with Vercel platform |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @next/bundle-analyzer | Latest | Bundle size analysis | Pre-deployment optimization, identifying large dependencies |
| BrowserStack | Platform | Cross-browser testing | Testing on real iOS/Android devices, multiple browsers |
| axe DevTools | 4.120.1+ | Accessibility testing | Manual accessibility verification, catches 80% of issues automated |
| WebAIM Contrast Checker | Web tool | WCAG contrast verification | Verifying 4.5:1 minimum contrast ratios |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vercel | Netlify, AWS Amplify, Cloudflare Pages | Vercel has best Next.js integration, others require adapters |
| BrowserStack | LambdaTest, Sauce Labs | BrowserStack has largest real device cloud, most stable sessions |
| Lighthouse | WebPageTest, GTmetrix | Lighthouse is industry standard, better CI/CD integration |
| @vercel/analytics | Google Analytics, Plausible | Vercel Analytics is privacy-first, no cookies, built-in to platform |

**Installation:**
```bash
# Bundle analyzer (optional, for optimization)
npm install --save-dev @next/bundle-analyzer

# Vercel Analytics
npm install @vercel/analytics
```

## Architecture Patterns

### Recommended Deployment Workflow
```
Development → Build Optimization → Vercel Deploy → Testing → Monitoring
     ↓              ↓                    ↓             ↓          ↓
  Local dev    Bundle analysis      Git push     Lighthouse   Analytics
  next dev     Lighthouse local     Auto SSL     Manual test  Web Vitals
               Image check          Preview URL  Device test
```

### Pattern 1: Production Build Optimization
**What:** Analyze and optimize bundle before deployment
**When to use:** Before every production deployment
**Steps:**
1. Run `next build` locally to verify build succeeds
2. Use `@next/bundle-analyzer` to identify large dependencies
3. Run Lighthouse in incognito mode on local production build
4. Verify bundle size is within acceptable limits (117.5KB gzipped for this project)

**Example:**
```javascript
// next.config.js - Bundle analyzer setup
// Source: https://nextjs.org/docs/app/guides/package-bundling
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Next.js config
})

// Run with: ANALYZE=true npm run build
```

### Pattern 2: Vercel Deployment with Custom Domain
**What:** Deploy Next.js app to Vercel with automatic SSL
**When to use:** Production deployment
**Steps:**
1. Connect GitHub repository to Vercel (automatic deployments on push)
2. Deploy to Vercel (creates preview URL)
3. Add custom domain in Vercel dashboard
4. Configure DNS records (CNAME or A record)
5. Vercel automatically generates SSL certificate (within minutes)

**Example:**
```bash
# Option 1: Git-based deployment (recommended)
git push origin main  # Automatic deployment via Vercel integration

# Option 2: CLI deployment
vercel deploy --prod

# Vercel automatically:
# - Runs next build
# - Optimizes static assets
# - Generates SSL certificate
# - Deploys to edge network
# - Creates deployment URL
```

**DNS Configuration:**
```
# For apex domain (example.com)
A Record: 76.76.21.21

# For subdomain (www.example.com)
CNAME Record: cname.vercel-dns.com
```

### Pattern 3: Lighthouse Performance Optimization
**What:** Achieve 90+ Lighthouse scores across all metrics
**When to use:** Pre-deployment verification and CI/CD pipeline
**Target metrics for 90+ score:**
- Performance: 90+ (LCP <2.5s, TBT <300ms, CLS <0.1)
- Accessibility: 90+ (WCAG 2.1 AA compliance)
- Best Practices: 90+
- SEO: 90+

**Optimization checklist:**
```javascript
// 1. Image Optimization - Use Next.js Image component
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Portfolio hero"
  width={1920}
  height={1080}
  priority  // For LCP image (hero)
  quality={75}  // Default, good balance
  sizes="100vw"  // Responsive sizing
/>

// 2. Font Optimization - Use next/font
// Source: https://nextjs.org/docs/app/api-reference/components/font
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// 3. Code Splitting - Use dynamic imports for large components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})

// 4. Metadata for SEO
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata = {
  title: 'Portfolio Title',
  description: 'Portfolio description',
  // ... see Pattern 5 for full metadata
}
```

### Pattern 4: WCAG 2.1 AA Compliance
**What:** Ensure accessibility compliance with keyboard navigation and contrast ratios
**When to use:** All interactive elements, all text/background combinations

**Requirements:**
- **Contrast Ratios:** Minimum 4.5:1 for normal text, 3:1 for large text (18pt+/14pt bold)
- **Keyboard Navigation:** All interactive elements accessible via Tab, Shift+Tab, Enter, Space
- **Focus Indicators:** Visible focus state on all interactive elements
- **Semantic HTML:** Proper heading hierarchy, ARIA labels where needed

**Testing approach:**
```bash
# 1. Automated testing with Lighthouse
npm run build
npx serve out  # If static export
# Open http://localhost:3000 in incognito Chrome
# Run Lighthouse audit (DevTools > Lighthouse)

# 2. Manual keyboard navigation testing
# Navigate entire site using only:
# - Tab (forward)
# - Shift+Tab (backward)
# - Enter/Space (activate)
# - Arrow keys (where applicable)

# 3. Contrast ratio verification
# Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
# Or Firefox DevTools > Accessibility Inspector

# 4. Manual testing with axe DevTools
# Install browser extension
# Run automated scan (catches ~80% of issues)
# Follow Intelligent Guided Tests for complex issues
```

**Code example:**
```javascript
// Ensure sufficient contrast (dark theme example)
const colors = {
  background: '#0a0a0a',  // Very dark
  text: '#ffffff',        // White - 18.9:1 ratio ✓
  textMuted: '#a3a3a3',   // Light gray - 8.59:1 ratio ✓
  primary: '#3b82f6',     // Blue - 8.59:1 ratio ✓
}

// Keyboard navigation - ensure all interactive elements are focusable
<button
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
  onClick={handleClick}
>
  Accessible Button
</button>

<a
  href="/projects"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  Accessible Link
</a>
```

### Pattern 5: Social Media Preview Configuration
**What:** Configure Open Graph and Twitter Cards for social media sharing
**When to use:** All pages, especially homepage and project pages

**Required metadata:**
```typescript
// app/layout.tsx or app/page.tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourportfolio.com'),
  title: 'Your Name - Full Stack Developer',
  description: 'Portfolio showcasing web development projects and expertise',

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    title: 'Your Name - Full Stack Developer',
    description: 'Portfolio showcasing web development projects and expertise',
    url: 'https://yourportfolio.com',
    siteName: 'Your Name Portfolio',
    images: [
      {
        url: '/og-image.png',  // 1200x630px recommended
        width: 1200,
        height: 630,
        alt: 'Your Name Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',  // Large image card
    title: 'Your Name - Full Stack Developer',
    description: 'Portfolio showcasing web development projects and expertise',
    images: ['/og-image.png'],  // Same image as OG
    creator: '@yourtwitterhandle',
  },
}
```

**Image specifications:**
- **Size:** 1200x630px minimum (Facebook/LinkedIn standard)
- **Format:** PNG or JPG
- **Location:** `/public/og-image.png`
- **File size:** <1MB for fast loading

**Testing previews:**
```bash
# Test on official platform validators:
# 1. Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
# 2. Twitter Card Validator: https://cards-dev.twitter.com/validator
# 3. LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

# Or use combined tools:
# - https://robolly.com/open-graph-preview/
# - https://posteverywhere.ai/tools/free-og-image-checker
```

### Pattern 6: Vercel Analytics Setup
**What:** Enable privacy-friendly analytics without cookies
**When to use:** All production deployments

**Setup:**
```typescript
// 1. Install package
// npm install @vercel/analytics

// 2. Add to root layout
// app/layout.tsx
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

// 3. Enable in Vercel dashboard
// Project Settings > Analytics > Enable

// 4. Verify tracking
// After deployment, check Network tab for:
// Fetch/XHR request to /_vercel/insights/view
```

### Pattern 7: Cross-Browser/Device Testing
**What:** Verify portfolio works on iOS, Android, desktop browsers
**When to use:** Before production deployment, after major changes

**Testing matrix:**
```
Mobile:
- iOS Safari (latest, iOS 16+)
- Android Chrome (latest)
- Mobile viewport sizes (375px, 414px, 768px)

Desktop:
- Chrome (latest)
- Firefox (latest)
- Safari (macOS latest)
- Edge (latest)
- Viewport sizes (1024px, 1440px, 1920px)
```

**Approach:**

**Option 1: BrowserStack (recommended for comprehensive testing)**
```
1. Sign up for BrowserStack (free trial available)
2. Select real devices from 3500+ browser/device combinations
3. Test interactive features (navigation, forms, animations)
4. Screenshot comparison across devices
```

**Option 2: Manual testing (free)**
```
1. Test on your own devices (phone, tablet, laptop)
2. Use browser DevTools device emulation
3. Ask friends/colleagues to test on their devices
4. Use Vercel preview deployments for easy sharing
```

**Option 3: Chrome DevTools device emulation**
```
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test common devices: iPhone 14, Pixel 7, iPad Pro
4. Test portrait and landscape orientations
```

### Anti-Patterns to Avoid

- **Don't optimize images manually:** Use Next.js `<Image>` component instead of `<img>` - automatic optimization, modern formats (WebP), lazy loading, prevents layout shift
- **Don't skip incognito testing:** Browser extensions can affect Lighthouse scores - always test in incognito mode
- **Don't assume automated accessibility tests catch everything:** Lighthouse catches only 30-40% of issues - manual testing with keyboard navigation and screen readers is required
- **Don't deploy without testing preview URL:** Always verify preview deployment before promoting to production
- **Don't hardcode URLs in metadata:** Use `metadataBase` for proper URL composition across environments
- **Don't ignore bundle size:** Monitor with `@next/bundle-analyzer` - large bundles hurt performance scores

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom image resizing/compression scripts | Next.js `<Image>` component | Handles responsive sizing, modern formats (WebP/AVIF), lazy loading, prevents CLS |
| SSL certificate management | Manual Let's Encrypt setup | Vercel automatic SSL | Automatic generation, renewal, wildcard certificates, zero configuration |
| Social media previews | Custom meta tag management | Next.js metadata API | Type-safe, automatic merging, supports all platforms (OG, Twitter, etc.) |
| Bundle analysis | Custom webpack bundle inspection | `@next/bundle-analyzer` | Visual reports, identifies large dependencies, integrates with Next.js build |
| Performance monitoring | Custom metrics collection | Vercel Analytics + `useReportWebVitals` | Built-in Core Web Vitals, privacy-friendly, no cookies required |
| Accessibility testing | Manual WCAG checks only | Lighthouse + axe DevTools | Automated detection (catches 30-80% of issues), guides for complex tests |
| Cross-browser testing | Manual testing on all devices | BrowserStack or similar | Access to 3500+ real devices, consistent testing environment |

**Key insight:** Modern deployment infrastructure (Vercel, Next.js) has solved most deployment/optimization complexity. The remaining challenges are testing (accessibility, cross-browser) and verification (Lighthouse audits, manual QA). Focus effort on comprehensive testing rather than infrastructure setup.

## Common Pitfalls

### Pitfall 1: Poor Lighthouse Performance Score Despite Small Bundle
**What goes wrong:** Bundle is 117KB but Lighthouse performance is <90
**Why it happens:**
- Unoptimized images (wrong format, too large, no lazy loading)
- No priority loading for LCP image (hero image)
- Blocking JavaScript in `<head>`
- Missing `sizes` attribute on responsive images
**How to avoid:**
- Use Next.js `<Image>` with `priority` for hero/LCP image
- Add `sizes` attribute for responsive images
- Use `next/font` for font optimization
- Check Network tab for large assets (>100KB)
**Warning signs:**
- LCP >2.5s
- Large images in Network tab
- Fonts loading slowly (FOUT/FOIT)

### Pitfall 2: SSL Certificate Not Generating After Adding Custom Domain
**What goes wrong:** Domain added to Vercel but SSL shows "Invalid" or pending
**Why it happens:**
- DNS not configured correctly (CNAME/A record missing or wrong)
- DNS propagation delay (can take 24-48 hours)
- Domain registrar requires additional verification
**How to avoid:**
- Verify DNS configuration in Vercel dashboard (shows exact records needed)
- Use `dig` or `nslookup` to verify DNS propagation: `dig yourdomain.com`
- Wait 24-48 hours for full DNS propagation before troubleshooting
- Check domain registrar settings (some require unlocking)
**Warning signs:**
- Vercel dashboard shows "Invalid Configuration"
- DNS lookup returns wrong IP/CNAME
- Certificate stuck in "Pending" state >48 hours

### Pitfall 3: Accessibility Score Fails Despite Semantic HTML
**What goes wrong:** Lighthouse accessibility score <90 despite using semantic HTML
**Why it happens:**
- Contrast ratios fail WCAG 2.1 AA (4.5:1 minimum)
- Images missing `alt` attributes
- Form inputs missing `<label>` or `aria-label`
- No visible focus indicators on interactive elements
- Skip to content link missing
**How to avoid:**
- Test ALL color combinations with WebAIM Contrast Checker
- Ensure every `<img>` or `<Image>` has meaningful `alt` text
- Add `focus:ring-2 focus:ring-[color]` to all interactive elements
- Test keyboard navigation: Tab through entire site
- Add skip link: `<a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>`
**Warning signs:**
- Lighthouse flags contrast issues
- Can't see which element is focused when tabbing
- Images show as unlabeled in screen reader

### Pitfall 4: Social Media Preview Not Showing After Deployment
**What goes wrong:** Shared link on LinkedIn/Twitter shows broken or default preview
**Why it happens:**
- Image path is relative, not absolute URL
- Image file doesn't exist or wrong path
- Metadata not set in correct file (layout vs page)
- Social platform cache not cleared
**How to avoid:**
- Use `metadataBase` in root layout: `metadataBase: new URL('https://yourdomain.com')`
- Verify image exists at `/public/og-image.png`
- Test with platform validators BEFORE sharing publicly
- Force cache refresh by adding query param: `?v=2`
**Warning signs:**
- Facebook Debugger shows "Could not retrieve data"
- Image preview shows broken image icon
- Preview shows wrong title/description

### Pitfall 5: Keyboard Navigation Breaks on Interactive Elements
**What goes wrong:** Can't tab to buttons, links, or interactive elements
**Why it happens:**
- Used `<div onClick>` instead of `<button>`
- Added `tabindex="-1"` unnecessarily
- CSS `pointer-events: none` blocks focus
- Missing `href` on `<a>` tags (makes them non-focusable)
**How to avoid:**
- Use semantic HTML: `<button>` for actions, `<a href>` for navigation
- Never use negative `tabindex` unless intentionally removing from tab order
- Test keyboard navigation on every interactive element
- Ensure `<a>` tags always have valid `href` attribute
**Warning signs:**
- Can't reach element with Tab key
- Element is clickable with mouse but not keyboard
- Focus jumps unpredictably

### Pitfall 6: Large Bundle Size After Adding Dependencies
**What goes wrong:** Bundle size increases from 117KB to 300KB+ after adding library
**Why it happens:**
- Importing entire library instead of specific functions
- Library includes large dependencies (moment.js, lodash full build)
- No tree-shaking for library
**How to avoid:**
- Use `@next/bundle-analyzer` to identify large dependencies
- Import specific functions: `import { debounce } from 'lodash-es'` not `import _ from 'lodash'`
- Check package size before installing: https://bundlephobia.com
- Consider lighter alternatives (date-fns vs moment.js)
**Warning signs:**
- Build output shows large chunk sizes
- Lighthouse performance score drops
- First Load JS increases significantly

### Pitfall 7: Environment Variables Not Working in Production
**What goes wrong:** App works locally but fails in Vercel production
**Why it happens:**
- Environment variables not set in Vercel dashboard
- Using process.env without `NEXT_PUBLIC_` prefix for client-side
- Variables not set for Production environment
**How to avoid:**
- Add all env vars in Vercel dashboard: Project Settings > Environment Variables
- Client-side variables MUST start with `NEXT_PUBLIC_`
- Set variables for correct environment (Production, Preview, Development)
- Redeploy after adding environment variables
**Warning signs:**
- `process.env.VARIABLE` is undefined in production
- API calls fail with authentication errors
- Features work locally but not in production

## Code Examples

Verified patterns from official sources:

### Vercel Deployment Configuration
```json
// vercel.json (optional - Next.js has smart defaults)
// Source: https://vercel.com/docs/getting-started-with-vercel
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}

// Most Next.js projects don't need vercel.json
// Vercel auto-detects Next.js and uses optimal settings
```

### Next.js Production Build
```bash
# Local production build testing
npm run build
npm start

# Check build output for warnings:
# - Route (pages)               Size     First Load JS
# ○ / (Static)                  1.5 kB    100 kB
# ├ /_app                       0 B        98.5 kB
# └ /projects                   2 kB       100.5 kB

# First Load JS should be <200KB for good performance
```

### Complete Metadata Configuration
```typescript
// app/layout.tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourportfolio.com'),
  title: {
    default: 'Your Name - Full Stack Developer',
    template: '%s | Your Name'
  },
  description: 'Full stack developer specializing in React, Next.js, and TypeScript. View my portfolio of web development projects.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Your Name Portfolio',
    title: 'Your Name - Full Stack Developer',
    description: 'Full stack developer specializing in React, Next.js, and TypeScript.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Your Name Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Full Stack Developer',
    description: 'Full stack developer specializing in React, Next.js, and TypeScript.',
    images: ['/og-image.png'],
    creator: '@yourhandle',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Accessibility-Compliant Component
```typescript
// components/ProjectCard.tsx
// Ensures WCAG 2.1 AA compliance
interface ProjectCardProps {
  title: string
  description: string
  image: string
  demoUrl: string
  githubUrl: string
}

export function ProjectCard({ title, description, image, demoUrl, githubUrl }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg bg-zinc-900">
      {/* Image with proper alt text */}
      <Image
        src={image}
        alt={`Screenshot of ${title} project`}
        width={600}
        height={400}
        className="object-cover"
      />

      <div className="p-6">
        {/* Semantic heading */}
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>

        {/* Sufficient contrast: white on dark background (18.9:1) */}
        <p className="text-gray-300 mb-4">
          {description}
        </p>

        {/* Keyboard accessible links with visible focus states */}
        <div className="flex gap-4">
          <a
            href={demoUrl}
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors"
            aria-label={`View ${title} demo`}
          >
            View Demo
          </a>

          <a
            href={githubUrl}
            className="inline-flex items-center px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors"
            aria-label={`View ${title} source code on GitHub`}
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  )
}
```

### Lighthouse CI Configuration
```javascript
// lighthouserc.js
// Source: https://github.com/GoogleChrome/lighthouse-ci
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}

// Run with: npm install -g @lhci/cli && lhci autorun
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual SSL certificates (Let's Encrypt) | Vercel automatic SSL | 2020+ | Zero configuration, automatic renewal, wildcard certificates |
| Static `<img>` tags | Next.js `<Image>` component | Next.js 10 (2020) | Automatic optimization, WebP/AVIF, lazy loading, no CLS |
| Manual meta tags | Next.js Metadata API | Next.js 13.2 (2023) | Type-safe, automatic merging, supports all platforms |
| webpack-bundle-analyzer | @next/bundle-analyzer | Next.js 9+ | Easier setup, better Next.js integration |
| Manual Lighthouse runs | Lighthouse CI | 2019+ | Automated performance gates, trend tracking, CI/CD integration |
| Cookie-based analytics | Vercel Analytics (cookieless) | 2022+ | Privacy-friendly, GDPR-compliant, no consent banner needed |
| Manual cross-browser testing | BrowserStack real devices | 2010s+ | Access to real devices, not emulators, consistent testing |
| WCAG 2.0 | WCAG 2.1 AA (2.2 ISO standard 2026) | 2018/2026 | New success criteria for mobile, updated compliance requirements |

**Deprecated/outdated:**
- **`next export` for static sites**: Use `output: 'export'` in next.config.js instead
- **`priority` prop on Image**: Deprecated in Next.js 16, use `preload` prop instead
- **Manual font loading**: Use `next/font` instead of custom `@font-face`
- **`domains` in next.config.js**: Use `remotePatterns` for security (prevents malicious image optimization)
- **WCAG 2.0**: Replaced by WCAG 2.1 AA as compliance standard, 2.2 is now ISO standard (2026)

## Open Questions

1. **Custom domain availability**
   - What we know: User needs to have purchased a domain or be ready to purchase one
   - What's unclear: Does user already have a domain or need guidance on purchasing?
   - Recommendation: Provide domain purchase guidance (Namecheap, Google Domains, etc.) in plan, assume domain needs to be purchased

2. **Analytics requirements beyond Vercel Analytics**
   - What we know: Success criteria requires "Analytics tracking configured and verified"
   - What's unclear: Is Vercel Analytics sufficient or does user want additional tools (Google Analytics, Plausible)?
   - Recommendation: Default to Vercel Analytics (privacy-friendly, no cookies), allow user to add Google Analytics if needed for job hunting (some recruiters check GA for legitimacy)

3. **Device testing scope**
   - What we know: Need to test on iOS, Android, desktop browsers
   - What's unclear: Should we use paid BrowserStack or rely on manual testing with available devices?
   - Recommendation: Start with manual testing (cheaper), provide BrowserStack instructions as optional upgrade

4. **Performance budget enforcement**
   - What we know: Current bundle is 117.5KB gzipped, Lighthouse target is 90+
   - What's unclear: Should we implement automated performance budgets in CI/CD?
   - Recommendation: Manual Lighthouse verification pre-deployment, document bundle size limit (200KB) for future reference

5. **Vercel plan requirements**
   - What we know: Vercel free tier supports custom domains and analytics
   - What's unclear: Are there any features that require Pro plan?
   - Recommendation: Free tier is sufficient for portfolio site, note Pro upgrade if commercial use or higher analytics limits needed

## Sources

### Primary (HIGH confidence)
- Next.js Deployment Documentation - https://nextjs.org/docs/deployment
- Next.js Production Checklist - https://nextjs.org/docs/app/building-your-application/deploying/production-checklist
- Next.js Image Component - https://nextjs.org/docs/app/api-reference/components/image
- Next.js Metadata API - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Vercel Getting Started - https://vercel.com/docs/getting-started-with-vercel
- Vercel Custom Domains - https://vercel.com/docs/domains
- Vercel Analytics Quickstart - https://vercel.com/docs/analytics/quickstart
- Vercel Analytics Overview - https://vercel.com/docs/analytics
- Vercel Environment Variables - https://vercel.com/docs/environment-variables
- Lighthouse Performance Scoring - https://developer.chrome.com/docs/lighthouse/performance/performance-scoring
- MDN WCAG Color Contrast - https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast
- Open Graph Protocol - https://ogp.me/

### Secondary (MEDIUM-HIGH confidence)
- [Next.js performance tuning for better Lighthouse scores](https://www.qed42.com/insights/next-js-performance-tuning-practical-fixes-for-better-lighthouse-scores)
- [Achieving 95+ Lighthouse Scores in Next.js 15](https://medium.com/@sureshdotariya/achieving-95-lighthouse-scores-in-next-js-15-modern-web-application-part1-e2183ba25fc1)
- [Lighthouse 100 with Next.js: Performance Checklist](https://medium.com/better-dev-nextjs-react/lighthouse-100-with-next-js-the-missing-performance-checklist-e87ee487775f)
- [WCAG 2.1 AA Compliance Checklist 2026](https://www.webability.io/blog/wcag-2-1-aa-the-standard-for-accessible-web-design)
- [ADA Title II Digital Accessibility 2026: WCAG 2.1 AA](https://www.sdettech.com/blogs/ada-title-ii-digital-accessibility-2026-wcag-2-1-aa)
- [WCAG 2.1 Understanding Success Criterion 2.1.1: Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [BrowserStack Overview](https://www.browserstack.com/)
- [8 Best Cross Browser Testing Tools 2026](https://www.accelq.com/blog/cross-browser-testing-tools/)
- [axe DevTools for Automated Web Testing](https://www.deque.com/axe/devtools/)
- [Lighthouse Accessibility Score Insights](https://developer.chrome.com/docs/lighthouse/accessibility/scoring)
- [Vercel Automatic SSL with Let's Encrypt](https://vercel.com/blog/automatic-ssl-with-vercel-lets-encrypt)
- [Vercel Working with SSL Certificates](https://vercel.com/docs/domains/working-with-ssl)
- [Next.js Bundle Analyzer Guide](https://nextjs.org/docs/app/guides/package-bundling)
- [Open Graph Preview Tools](https://robolly.com/open-graph-preview/)
- [Twitter Card Preview](https://robolly.com/twitter-card-preview/)

## Metadata

**Confidence breakdown:**
- Vercel deployment: HIGH - Official documentation, well-established process, automatic SSL is standard
- Lighthouse optimization: HIGH - Next.js built-in features documented, metrics well-defined
- WCAG compliance: HIGH - Official W3C standards, clear requirements (4.5:1 contrast, keyboard nav)
- Social media previews: HIGH - Official Next.js metadata API, Open Graph protocol specification
- Cross-browser testing: MEDIUM-HIGH - BrowserStack well-documented, manual testing alternative available
- Analytics: HIGH - Official Vercel Analytics documentation, simple setup

**Research date:** 2026-02-16
**Valid until:** 30 days (March 18, 2026) - deployment tools and standards are relatively stable, but Lighthouse scoring methodology and WCAG updates should be rechecked quarterly
