# Phase 2: Projects Showcase - Research

**Researched:** 2026-02-16
**Domain:** Next.js Image optimization, Portfolio UI/UX patterns, Responsive design
**Confidence:** HIGH

## Summary

Phase 2 implements a project showcase section with optimized images, responsive grid layout, and accessible hover effects. The core technical challenge is efficiently loading and displaying project images while maintaining excellent performance metrics (Lighthouse 90+).

Next.js 16.1.6 provides built-in image optimization through the `next/image` component, which automatically handles WebP/AVIF conversion, lazy loading, and responsive sizing. Combined with Tailwind CSS v4's responsive grid utilities, this creates a performant showcase without custom optimization pipelines.

For 3-5 projects with static content, a TypeScript-typed data array is the optimal choice over a headless CMS. This approach eliminates external dependencies, reduces complexity, improves build performance, and provides full type safety—all critical for a portfolio site where content changes infrequently.

**Primary recommendation:** Use `next/image` with static imports for project screenshots, store project data in a TypeScript array with proper interfaces, implement a responsive Tailwind grid (mobile-first: 1 col → tablet: 2 cols → desktop: 3 cols), and add accessible hover effects respecting `prefers-reduced-motion`.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/image | 16.1.6 (built-in) | Image optimization | Official Next.js component, automatic WebP/AVIF conversion, lazy loading, prevents layout shift |
| Tailwind CSS | 4.1.18 (installed) | Responsive grid & styling | Already in project, utility-first approach, responsive variants, no additional dependencies |
| TypeScript | 5.9.3 (installed) | Type-safe data modeling | Enforces data shape consistency, prevents runtime errors, excellent DX with autocomplete |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Sharp | (via Next.js) | Image processing | Automatic via next/image, no manual installation needed |
| @types/node | 25.2.3 (installed) | TypeScript definitions | Already installed, enables typing for static imports |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static TS array | Headless CMS (Sanity, Payload, Prismic) | CMS adds complexity, external dependencies, and latency for 3-5 static projects that rarely change |
| next/image | Manual img tags + sharp | Loses automatic optimization, lazy loading, format conversion, responsive sizing, and layout shift prevention |
| Tailwind grid | CSS Grid manually | Requires custom media queries, more verbose code, loses utility-first benefits already established in Phase 1 |
| Static imports | Remote URLs | Requires remotePatterns config, loses automatic blurDataURL, adds external dependency risk |

**Installation:**
```bash
# No new packages required - everything is already installed
# next@16.1.6, tailwindcss@4.1.18, typescript@5.9.3 are in package.json
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── page.tsx                    # Landing page (imports Projects component)
components/
├── Projects.tsx                # Main projects section component
├── ProjectCard.tsx             # Individual project card component
├── Navigation.tsx              # (existing)
└── Hero.tsx                    # (existing)
public/
└── projects/                   # Project images directory
    ├── project-1.webp
    ├── project-2.webp
    └── project-3.webp
lib/
└── projects-data.ts           # TypeScript array of project data
types/
└── project.ts                 # Project interface definition
```

### Pattern 1: Type-Safe Project Data Model

**What:** Define a strict TypeScript interface for project data and export a typed array.

**When to use:** For static content with predictable schema (3-5 projects).

**Example:**
```typescript
// types/project.ts
export interface Project {
  id: string
  title: string
  description: string
  image: StaticImageData // from 'next/image'
  techStack: string[]
  demoUrl: string
  githubUrl: string
}

// lib/projects-data.ts
import { Project } from '@/types/project'
import project1Image from '@/public/projects/project-1.webp'
import project2Image from '@/public/projects/project-2.webp'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Full-stack online store with payment integration',
    image: project1Image,
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/username/repo'
  },
  // ... more projects
]
```

**Why this works:**
- TypeScript enforces all required fields at compile time
- Static imports enable automatic image optimization and blurDataURL
- Autocomplete helps during development
- Easy to add/edit projects without touching component code

### Pattern 2: Optimized Image Component

**What:** Use `next/image` with static imports for automatic optimization.

**When to use:** For all project screenshots, hero images, and media.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image'
import projectImage from '@/public/projects/my-project.webp'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <Image
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  )
}
```

**Key props explained:**
- `fill` - Makes image fill parent container (requires `position: relative` on parent)
- `sizes` - Tells browser which image size to download per viewport width
- `className="object-cover"` - Crops image to fill container while maintaining aspect ratio
- Static import automatically provides `width`, `height`, and `blurDataURL`

### Pattern 3: Responsive Grid Layout

**What:** Mobile-first responsive grid using Tailwind utilities.

**When to use:** For any card-based layout (projects, skills, testimonials).

**Example:**
```typescript
// Source: https://tailwindcss.com/docs/grid-template-columns
export function Projects() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Responsive behavior:**
- Mobile (< 768px): 1 column (`grid-cols-1`)
- Tablet (768px - 1024px): 2 columns (`md:grid-cols-2`)
- Desktop (> 1024px): 3 columns (`lg:grid-cols-3`)
- Consistent 2rem gap between cards (`gap-8`)

### Pattern 4: Accessible Hover Effects

**What:** CSS transitions respecting motion preferences.

**When to use:** For all interactive elements (cards, buttons, links).

**Example:**
```typescript
// Source: Best practices from Inclusive Components and WCAG guidelines
export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted mb-4">{project.description}</p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
```

**CSS for reduced motion:**
```css
/* Already exists in globals.css from Phase 1 */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Add this pattern to globals.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Anti-Patterns to Avoid

- **Using `<img>` tags directly**: Loses automatic optimization, lazy loading, format conversion (WebP/AVIF), responsive sizing, and layout shift prevention
- **Remote image URLs without static imports**: Requires `remotePatterns` configuration, loses automatic `blurDataURL`, adds security risks, external dependency on CDN uptime
- **Missing `alt` text**: Fails accessibility audits, hurts SEO, violates WCAG 2.1 AA standards
- **Missing `sizes` prop with `fill`**: Browser downloads largest image size for all viewports, wastes bandwidth on mobile, hurts performance scores
- **Hover-only information**: Users on touch devices cannot access the information, violates WCAG 2.1 success criterion 1.4.13
- **Forgetting `target="_blank"` security**: External links without `rel="noopener noreferrer"` create security vulnerabilities and performance issues

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom sharp pipeline with multiple sizes | `next/image` | Handles format detection (WebP/AVIF), generates srcset, caches at edge, prevents layout shift, supports lazy loading natively |
| Lazy loading | Custom Intersection Observer | `next/image` default behavior | Built-in browser lazy loading with fallback, handles loading priority automatically, integrates with React Suspense |
| Responsive images | Manual srcset generation | `next/image` + `sizes` prop | Automatically generates optimal sizes based on deviceSizes config, no manual breakpoint management |
| Tech stack color coding | Complex color mapping system | Simple Tailwind utilities | For 3-5 projects, manual color assignment is clearer and maintainable; complex systems add unnecessary abstraction |
| Content management | Custom CMS, database, API | TypeScript array | For static, infrequently-changing content (3-5 projects), database adds latency, deployment complexity, security surface area |

**Key insight:** Next.js Image component is production-grade image optimization that would take weeks to replicate correctly. Edge cases like Safari bugs, AVIF browser support detection, cache invalidation, and memory management are already handled. Don't rebuild what Next.js provides.

## Common Pitfalls

### Pitfall 1: Missing `sizes` Prop with `fill`

**What goes wrong:** Browser downloads the largest image size for all viewport widths, wasting bandwidth on mobile devices.

**Why it happens:** The `sizes` prop is optional but critical for performance. Without it, browser assumes image is 100vw (full viewport width).

**How to avoid:** Always provide `sizes` when using `fill` prop. Match your responsive grid breakpoints.

**Warning signs:** Large Network payloads on mobile devices, poor Lighthouse Performance score despite using next/image.

**Example:**
```typescript
// BAD - Missing sizes
<Image src={img} fill alt="Project" />

// GOOD - Sizes match grid breakpoints
<Image
  src={img}
  fill
  alt="Project"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Pitfall 2: External URLs Without remotePatterns

**What goes wrong:** Images from external domains fail to load with 400 Bad Request error.

**Why it happens:** Next.js 14+ requires explicit allowlist for remote images for security reasons.

**How to avoid:** Use static imports for project images stored in `public/` directory. If using external URLs, configure `remotePatterns` in `next.config.ts`.

**Warning signs:** Images load in development but fail in production, 400 errors in Network tab.

**Example:**
```typescript
// next.config.ts - Only needed if using external URLs
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      }
    ]
  }
}
```

### Pitfall 3: Poor Alt Text Quality

**What goes wrong:** Accessibility audits fail, screen readers announce unhelpful text, SEO impact.

**Why it happens:** Developers treat alt text as an afterthought or use generic descriptions.

**How to avoid:** Write descriptive alt text that describes what the image shows, not just the project title. Use format: "Screenshot of [project] showing [key feature]".

**Warning signs:** Lighthouse Accessibility score below 90, generic alt text like "image1" or "project".

**Example:**
```typescript
// BAD
<Image src={img} alt="My project" />

// GOOD
<Image
  src={img}
  alt="Screenshot of e-commerce dashboard showing sales analytics and product inventory"
/>
```

### Pitfall 4: Layout Shift from Images

**What goes wrong:** Content jumps as images load, poor Cumulative Layout Shift (CLS) score.

**Why it happens:** Not reserving space for images before they load.

**How to avoid:** Use `fill` with parent container aspect ratio, or provide explicit `width` and `height` props. Static imports handle this automatically.

**Warning signs:** Content jumps during page load, poor Lighthouse CLS score, visual instability.

**Example:**
```typescript
// BAD - No dimensions or fill
<div><Image src={img} alt="Project" /></div>

// GOOD - Fixed aspect ratio container
<div className="relative aspect-video">
  <Image src={img} alt="Project" fill className="object-cover" />
</div>

// GOOD - Explicit dimensions
<Image src={img} alt="Project" width={800} height={450} />
```

### Pitfall 5: Hover Effects Without Focus States

**What goes wrong:** Keyboard users cannot see which element is focused, fails accessibility audits.

**Why it happens:** Developers style `:hover` but forget `:focus` or remove outline.

**How to avoid:** Always pair `hover:` with `focus:` utilities. Use `focus:outline-none` only when providing alternative focus indicator (like ring).

**Warning signs:** Lighthouse Accessibility issues, keyboard navigation invisible, blue outline removed globally.

**Example:**
```typescript
// BAD - Hover only
<a href={url} className="hover:underline">Demo</a>

// GOOD - Hover + Focus with ring
<a
  href={url}
  className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
>
  Demo
</a>
```

### Pitfall 6: Animations for Motion-Sensitive Users

**What goes wrong:** Users with vestibular disorders experience discomfort or nausea from animations.

**Why it happens:** Developers don't respect `prefers-reduced-motion` media query.

**How to avoid:** Add CSS rule to disable/minimize animations when user has motion preference set.

**Warning signs:** Accessibility audits flag motion issues, user complaints about dizziness.

**Example:**
```css
/* Add to globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Code Examples

Verified patterns from official sources:

### Static Image Import with Optimization

```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image'
import projectScreenshot from '@/public/projects/ecommerce.webp'

export function FeaturedProject() {
  return (
    <Image
      src={projectScreenshot}
      alt="E-commerce platform dashboard showing order management"
      // width and height automatically inferred from static import
      placeholder="blur" // Automatic blur-up while loading
      quality={90} // 75 is default, increase for hero images
    />
  )
}
```

### Responsive Image with Fill

```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image'

export function ProjectCard({ project }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <Image
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        loading="lazy" // Default behavior
      />
    </div>
  )
}
```

### Complete Project Card Component

```typescript
// Combines patterns from official docs and accessibility best practices
import Image, { StaticImageData } from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image: StaticImageData
  techStack: string[]
  demoUrl: string
  githubUrl: string
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground">
          {project.title}
        </h3>
        <p className="text-muted mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            Live Demo
            <span className="sr-only"> of {project.title}</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            GitHub
            <span className="sr-only"> repository for {project.title}</span>
          </a>
        </div>
      </div>
    </article>
  )
}
```

### Projects Grid Section

```typescript
// Source: Tailwind CSS responsive grid documentation
import { projects } from '@/lib/projects-data'
import { ProjectCard } from '@/components/ProjectCard'

export function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            A selection of projects showcasing full-stack development,
            clean architecture, and modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### TypeScript Project Data

```typescript
// types/project.ts
import { StaticImageData } from 'next/image'

export interface Project {
  id: string
  title: string
  description: string
  image: StaticImageData
  techStack: string[]
  demoUrl: string
  githubUrl: string
}

// lib/projects-data.ts
import { Project } from '@/types/project'
import ecommerceImg from '@/public/projects/ecommerce.webp'
import dashboardImg from '@/public/projects/dashboard.webp'
import apiImg from '@/public/projects/api.webp'

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack online store with Stripe payment integration, inventory management, and admin dashboard.',
    image: ecommerceImg,
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'],
    demoUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/username/ecommerce'
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with interactive charts and customizable widgets.',
    image: dashboardImg,
    techStack: ['React', 'TypeScript', 'D3.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://dashboard-demo.example.com',
    githubUrl: 'https://github.com/username/dashboard'
  },
  {
    id: 'rest-api',
    title: 'RESTful API Service',
    description: 'Scalable REST API with authentication, rate limiting, and comprehensive API documentation.',
    image: apiImg,
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
    demoUrl: 'https://api-demo.example.com/docs',
    githubUrl: 'https://github.com/username/api'
  }
]
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual image optimization | next/image component | Next.js 10 (2020), refined in v13-16 | Automatic WebP/AVIF, lazy loading, responsive images without build scripts |
| priority prop | preload prop | Next.js 16 (2025) | Clearer semantics for above-fold images, better control over preloading behavior |
| domains config | remotePatterns | Next.js 14 (2023) | Enhanced security, wildcard support, pathname/protocol restrictions |
| CSS Grid media queries | Tailwind responsive utilities | Tailwind v2+ (2020-present) | Faster development, consistent breakpoints, utility-first workflow |
| Custom blur placeholders | Automatic blur from static imports | Next.js 11 (2021) | No manual blur generation, better UX during image load |
| Global CSS animations | Tailwind transition utilities | Tailwind v3+ (2021-present) | Scoped animations, easier maintenance, performance optimization |

**Deprecated/outdated:**
- **onLoadingComplete prop**: Deprecated in Next.js 14, use `onLoad` instead
- **priority prop**: Deprecated in Next.js 16 in favor of `preload` for clearer intent
- **domains config**: Deprecated in Next.js 14 in favor of stricter `remotePatterns`
- **next/legacy/image**: Old image component, use `next/image` (current API since v13)

## Open Questions

1. **Should project images be stored in Git or external CDN?**
   - What we know: Static imports work best with `public/` directory, provide automatic optimization
   - What's unclear: Repository size implications for 3-5 WebP images (typically 100-500KB each)
   - Recommendation: Store in Git for simplicity. Total size: ~1-2MB for 5 images. Only move to CDN if repo size becomes problematic (unlikely for portfolio).

2. **How to handle projects without live demos?**
   - What we know: Success criteria requires "All demo links work and load functioning applications"
   - What's unclear: Whether to show projects that only have GitHub repos (e.g., private/internal work)
   - Recommendation: Phase 2 should only include projects with working live demos. Consider Phase 3 expansion for "case studies" section if showcasing non-public work.

3. **Should tech stack pills be color-coded?**
   - What we know: Some portfolios use brand colors for technologies (React=blue, Vue=green)
   - What's unclear: Maintenance burden vs visual benefit for 3-5 projects
   - Recommendation: Use single primary color for all pills initially. Color-coding can be added in Phase 4 (Polish) if desired without data model changes.

## Sources

### Primary (HIGH confidence)

- [Next.js Image Component API Reference](https://nextjs.org/docs/app/api-reference/components/image) - Official documentation, last updated 2026-02-11, version 16.1.6
- [Next.js Image Optimization Guide](https://nextjs.org/docs/app/getting-started/images) - Official getting started guide
- [Tailwind CSS Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns) - Official Tailwind documentation

### Secondary (MEDIUM confidence)

- [Optimizing Images in Next.js: Beyond the Image Component](https://medium.com/@narayanansundar02/optimizing-images-in-next-js-beyond-the-image-component-b1353236408b) - Advanced optimization techniques
- [Next.js Image Optimization: A Guide for Web Developers](https://strapi.io/blog/nextjs-image-optimization-developers-guide) - Comprehensive guide with examples
- [Accessible Cards](https://kittygiraudel.com/2022/04/02/accessible-cards/) - Accessibility best practices for card components
- [UI Anatomy: Card state styles with accessibility in mind](https://blog.prototypr.io/ui-case-study-state-styles-of-card-component-with-accessibility-in-mind-2f30137c6108) - WCAG-compliant hover states
- [React & Next.js Best Practices in 2026](https://fabwebstudio.com/blog/react-nextjs-best-practices-2026-performance-scale) - Performance optimization strategies
- [Next.js Tips for 2026](https://medium.com/@Amanda0/next-js-tips-for-2026-a-comprehensive-guide-to-building-high-performance-scalable-web-c1898366c28d) - Current best practices

### Tertiary (LOW confidence)

- [Portfolio-2026 GitHub Repository](https://github.com/kyrkematias/Portfolio-2026) - Example implementation with tech stack pills
- [Best Next.js Headless CMS Platforms in 2026](https://prismic.io/blog/best-nextjs-headless-cms-platforms) - CMS comparison (not recommended for this use case)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Next.js and Tailwind documentation verified, all dependencies already installed
- Architecture: HIGH - Patterns verified from official sources, tested in Next.js 16
- Pitfalls: HIGH - Common issues documented in official Next.js docs and accessibility guidelines
- Performance: HIGH - Metrics validated against Lighthouse audit criteria and Next.js optimization guide

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (30 days - stable stack, unlikely to change significantly)

**Next.js version:** 16.1.6 (installed)
**Tailwind CSS version:** 4.1.18 (installed)
**TypeScript version:** 5.9.3 (installed)
