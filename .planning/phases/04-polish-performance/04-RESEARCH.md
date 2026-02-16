# Phase 4: Polish & Performance - Research

**Researched:** 2026-02-16
**Domain:** Web animations, scroll-triggered effects, performance optimization, accessibility
**Confidence:** HIGH

## Summary

Phase 4 focuses on adding polish through scroll-triggered animations, hover effects, and micro-interactions while maintaining Lighthouse Performance score 90+ and full accessibility compliance. The key challenge is implementing smooth animations that enhance UX without degrading performance or violating accessibility standards.

The modern web platform offers three primary approaches for scroll animations: (1) CSS scroll-driven animations with `animation-timeline: view()` (experimental, limited browser support), (2) Intersection Observer API with CSS transitions (production-ready, widely supported), and (3) animation libraries like Framer Motion/Motion (React 19 compatibility issues as of Feb 2026).

For a Next.js 16 portfolio with React 19, the **Intersection Observer + CSS approach** is optimal. It provides excellent performance (compositor-only animations), browser compatibility, and doesn't require heavy animation libraries. The react-intersection-observer package (compatible with Next.js) simplifies implementation while keeping bundle size minimal.

**Primary recommendation:** Use `react-intersection-observer` to detect element visibility and trigger CSS classes that drive `transform`/`opacity` animations. Respect existing `prefers-reduced-motion` CSS (already implemented in Phase 2). Keep hover effects GPU-accelerated using `transform` and `opacity` only. Test Lighthouse scores against production builds, not dev server.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-intersection-observer | 9.x | Scroll visibility detection | Production-ready, Next.js compatible, React 19 ready, minimal bundle (2.5KB), reuses IntersectionObserver instances |
| Tailwind CSS | 4.1.18 (installed) | Animation utilities | Already in project, provides transition/duration utilities, v4 supports CSS-first config with @keyframes |
| CSS Intersection Observer API | Native | Browser-native visibility detection | Zero bundle cost, async/non-blocking, 97%+ browser support |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @midudev/tailwind-animations | Latest | Pre-built animation utilities | If you want ready-made fade/slide animations via Tailwind classes (80+ animations, view timeline support) |
| next/dynamic | 16.1.6 (built-in) | Code splitting | Lazy-load animation-heavy components to reduce initial bundle |
| @next/bundle-analyzer | Latest | Bundle size analysis | Verify animations don't bloat bundle size beyond acceptable limits |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Intersection Observer | CSS scroll-driven animations (`animation-timeline: view()`) | Cutting-edge but experimental (Safari 26+, Chrome 115+, no Firefox support as of Feb 2026), risky for production |
| react-intersection-observer | Framer Motion / Motion | Framer Motion has React 19 compatibility issues; Motion (successor) is production-ready but adds 50KB+ to bundle vs 2.5KB for intersection observer |
| CSS transitions | JavaScript-based scroll listeners | JS scroll listeners are synchronous, block main thread, cause jank; Intersection Observer is async and performant |
| Custom implementation | GSAP ScrollTrigger | GSAP is 50KB+ and overkill for simple fade/slide animations; better for complex timeline animations |

**Installation:**
```bash
npm install react-intersection-observer
# Optional if using animation plugin:
npm install @midudev/tailwind-animations
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── AnimatedSection.tsx         # Reusable wrapper for scroll-triggered sections
├── Hero.tsx                     # (existing - add entrance animation)
├── Projects.tsx                 # (existing - add scroll fade-in)
├── ProjectCard.tsx              # (existing - enhance hover effects)
├── About.tsx                    # (existing - add scroll fade-in)
├── Resume.tsx                   # (existing - add scroll fade-in)
└── Footer.tsx                   # (existing - add scroll fade-in)
app/
├── globals.css                  # Add @keyframes, enhance existing prefers-reduced-motion
lib/
└── animations.ts                # (optional) Animation variant configs
```

### Pattern 1: Scroll-Triggered Fade-In with Intersection Observer

**What:** Detect when sections enter viewport and add CSS class to trigger fade-in animation.

**When to use:** For sections that should animate once when scrolled into view (Projects, About, Resume, Footer).

**Example:**
```typescript
// components/AnimatedSection.tsx
'use client'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
}

export function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,      // Trigger when 10% visible
    triggerOnce: true,   // Animate only once
  })

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Usage in Projects.tsx
export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20">
      <AnimatedSection>
        <h2>Projects</h2>
        {/* content */}
      </AnimatedSection>
    </section>
  )
}
```

**Source:** [React Intersection Observer - Builder.io](https://www.builder.io/blog/react-intersection-observer), [React Intersection Observer with Tailwind and Next.js](https://www.franciscomoretti.com/blog/how-to-animate-on-scroll-with-react-intersection-observer-and-tailwind-in-a-nextjs-app)

### Pattern 2: GPU-Accelerated Hover Effects

**What:** Use `transform` and `opacity` for hover effects to leverage GPU compositing, avoiding expensive reflows.

**When to use:** Project cards, buttons, interactive elements.

**Example:**
```typescript
// components/ProjectCard.tsx (enhanced version)
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-lg border border-border bg-card overflow-hidden
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-primary/5
                        hover:-translate-y-1"> {/* GPU-accelerated transform */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300
                     group-hover:scale-105" // GPU-accelerated scale
        />
      </div>
      {/* content */}
    </article>
  )
}
```

**Why this works:** `transform` and `opacity` are compositor-only properties—they skip reflow AND repaint, running purely on GPU. Animating `width`, `height`, `left`, `top`, or `margin` triggers expensive reflows.

**Source:** [CSS GPU Acceleration: will-change & translate3d Guide](https://www.lexo.ch/blog/2025/01/boost-css-performance-with-will-change-and-transform-translate3d-why-gpu-acceleration-matters/), [Reflow vs Repaint: What Every Developer Should Know](https://rahuulmiishra.medium.com/reflow-vs-repaint-what-every-developer-should-know-226f073c9ad8)

### Pattern 3: Accessibility-First Animation Strategy

**What:** Respect `prefers-reduced-motion` by reducing or eliminating animations for users who request it.

**When to use:** All animations and transitions (global requirement for WCAG compliance).

**Example:**
```css
/* app/globals.css - ALREADY IMPLEMENTED in Phase 2 */
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

**Enhancement for Phase 4:**
```css
/* Add custom keyframes for fade-in */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Utility class (if not using Tailwind plugin) */
.animate-fade-in-up {
  animation: fadeInUp 0.7s ease-out forwards;
}

/* prefers-reduced-motion will automatically override via existing global CSS */
```

**Best practices:**
- Don't eliminate ALL animations—some aid accessibility (e.g., expanding containers to show new content)
- Choose fade/dissolve effects over scaling/rotating for reduced-motion users
- Animations should last 300-500ms max (micro-interactions philosophy)

**Source:** [W3C WCAG Technique C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39), [prefers-reduced-motion - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), [Designing With Reduced Motion - Smashing Magazine](https://www.smashingmagazine.com/2020/09/design-reduced-motion-sensitivities/)

### Pattern 4: Micro-Interactions for Engagement

**What:** Small, purposeful animations on buttons, links, and interactive elements (duration: 200-300ms).

**When to use:** CTAs, navigation links, form inputs.

**Example:**
```typescript
// Hero CTA buttons (enhance existing)
<a
  href="#projects"
  className="inline-flex items-center justify-center px-6 py-3
             bg-primary text-primary-foreground rounded-lg font-medium
             transition-all duration-200
             hover:bg-primary/90 hover:scale-105
             active:scale-95
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
>
  View My Work
</a>
```

**Timing best practices:**
- Hover feedback: 150-200ms (feels instant)
- State transitions: 200-300ms (smooth but not sluggish)
- Page transitions: 300-500ms (noticeable but not blocking)
- Scroll animations: 500-700ms (graceful entrance)

**Source:** [UI/UX Evolution 2026: Micro-Interactions](https://primotech.com/ui-ux-evolution-2026-why-micro-interactions-and-motion-matter-more-than-ever/), [Micro-Interactions: Why, When and How to Use Them](https://uxdesign.cc/micro-interactions-why-when-and-how-to-use-them-to-boost-the-ux-17094b3baaa0)

### Anti-Patterns to Avoid

- **Animating layout properties:** Never animate `width`, `height`, `top`, `left`, `margin`, `padding`—these trigger reflows. Use `transform: scale()` or `transform: translate()` instead.
- **Layout thrashing:** Don't alternate reading/writing layout in loops (e.g., reading `offsetHeight` then setting `style.height`). Batch DOM reads, then batch DOM writes.
- **Overusing will-change:** Don't apply `will-change` to many elements simultaneously—creates excessive compositor layers, increases memory usage. Apply on hover parent, remove after animation.
- **Blocking animations:** Don't use animations longer than 500ms that block user interaction. Keep micro-interactions under 300ms.
- **Ignoring reduced motion:** Never skip `prefers-reduced-motion` support—affects 70M+ users with vestibular disorders.
- **Testing on dev server:** Dev server injects extra code that tanks Lighthouse scores. Always test production builds with `next build && next start`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll visibility detection | Custom scroll event listeners | Intersection Observer API (or react-intersection-observer) | Custom scroll listeners run synchronously, block main thread, cause jank. IO runs async, browser-optimized, debounced automatically |
| Animation timing curves | Custom easing functions | CSS cubic-bezier or Tailwind's timing utilities | CSS easing is GPU-accelerated and battle-tested |
| Reduced motion detection | JavaScript media query listeners | CSS `@media (prefers-reduced-motion)` | CSS automatically applies, no JS required, works even if JS fails |
| Image lazy loading | Custom IntersectionObserver for images | next/image component | Already handles lazy loading, blur placeholders, responsive sizing, format conversion |
| Animation state management | Complex useState/useEffect chains | CSS classes + react-intersection-observer | Simpler, more performant, leverages browser's compositor |

**Key insight:** The browser's compositor thread can run animations independently of the main JavaScript thread IF you use `transform` and `opacity`. Custom JS animation loops block the main thread and compete with React renders, causing jank. Let CSS + Intersection Observer handle animations; reserve JS for conditional logic only.

## Common Pitfalls

### Pitfall 1: Testing Lighthouse on Development Server

**What goes wrong:** Lighthouse Performance score is 50-60 in dev mode, causing panic.

**Why it happens:** Next.js dev server injects React DevTools, Fast Refresh, HMR websockets, source maps, and unoptimized bundles—all tank performance metrics.

**How to avoid:**
```bash
# ALWAYS test with production build
npm run build
npm run start
# Then run Lighthouse (preferably in incognito mode)
```

**Warning signs:** Performance score jumps 30-40 points when switching from dev to production, excessive JS bundle size in Lighthouse report.

**Source:** [Next.js Performance Tuning for Lighthouse](https://www.qed42.com/insights/next-js-performance-tuning-practical-fixes-for-better-lighthouse-scores), [Low Performance Scores in Lighthouse - Next.js Discussion](https://github.com/vercel/next.js/discussions/13674)

### Pitfall 2: Cumulative Layout Shift (CLS) from Animations

**What goes wrong:** Adding animations causes layout shift penalties, tanking CLS score from 0.0 to 0.15+.

**Why it happens:** Animating properties that trigger layout (width, height, top, left) causes elements to shift unexpectedly. Or, not reserving space for animated elements.

**How to avoid:**
- Only animate `transform` and `opacity` (compositor-only properties)
- CSS transforms DON'T count as CLS—`translate`, `scale`, `rotate` are safe
- For containers that expand, set `min-height` or `aspect-ratio` to reserve space
- Wrap animations in containers with defined dimensions

**Warning signs:** CLS score increases after adding animations, elements "jump" during animation, Lighthouse flags "Avoid large layout shifts."

**Source:** [Preventing Layout Shifts: Mastering CSS Transitions](https://blog.pixelfreestudio.com/preventing-layout-shifts-mastering-css-transitions-and-animations/), [Cumulative Layout Shift Guide 2026](https://medium.com/@sahoo.arpan7/cumulative-layout-shift-cls-guide-to-one-of-the-most-misunderstood-core-web-vitals-5f135c68cb6f)

### Pitfall 3: Animation Performance Degradation on Mobile

**What goes wrong:** Animations are smooth on desktop but janky (stuttering, low FPS) on mobile devices.

**Why it happens:** Mobile devices have less GPU/CPU power. Animating too many elements simultaneously, or using non-compositor properties, overwhelms the device.

**How to avoid:**
- Limit simultaneous animations (max 3-5 elements animating at once)
- Use `will-change: transform` on parent hover (not globally)—hints browser to create compositor layer
- Prefer staggered animations over all-at-once (50-100ms delay between elements)
- Test on real mobile devices or Chrome DevTools CPU throttling (4x slowdown)
- Use `translateZ(0)` or `translate3d(0,0,0)` as fallback to force GPU rendering

**Warning signs:** Smooth on desktop Chrome, janky on iPhone Safari; high CPU usage in performance profiler; FPS drops below 60.

**Source:** [Boosting Web Performance With CSS GPU Acceleration](https://www.testmuai.com/blog/css-gpu-acceleration/), [Website Animations in 2026: Pros, Cons & Best Practices](https://www.shadowdigital.cc/resources/do-you-need-website-animations)

### Pitfall 4: Bundle Size Bloat from Animation Libraries

**What goes wrong:** Adding Framer Motion or similar library increases bundle by 50KB+, degrading First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

**Why it happens:** Animation libraries bundle complex timeline engines, gesture handlers, and spring physics—most unused in simple scroll animations.

**How to avoid:**
- For simple fade/slide animations: use Intersection Observer + CSS (2.5KB vs 50KB+)
- If using animation library: lazy-load with `next/dynamic` and `ssr: false`
```typescript
const HeavyAnimation = dynamic(() => import('./HeavyAnimation'), {
  ssr: false, // Don't render server-side
  loading: () => <div>Loading...</div>
})
```
- Use `@next/bundle-analyzer` to monitor bundle size before/after additions
- Target: Keep First Load JS under 100KB for 90+ performance score

**Warning signs:** Lighthouse flags "Reduce JavaScript execution time," Total Blocking Time (TBT) increases, bundle size jumps 50KB+ after adding library.

**Source:** [Code Splitting in Next.js: 70% Bundle Reduction](https://medium.com/@sohail_saifi/code-splitting-in-next-js-how-i-reduced-initial-bundle-size-by-70-73a4c328cc6c), [Next.js Bundle Optimization with Webpack](https://ujjwaltiwari2.medium.com/effective-next-js-bundle-optimization-with-webpack-cca8632ea03e)

### Pitfall 5: Ignoring Core Web Vitals INP (Interaction to Next Paint)

**What goes wrong:** Animations cause sluggish interactions—buttons feel slow to respond, clicks feel delayed.

**Why it happens:** Heavy animations block the main thread during the critical input response window (0-200ms). New in 2026: INP (replacing FID) measures responsiveness more strictly.

**How to avoid:**
- Keep animations under 300ms duration
- Use compositor-only properties (`transform`, `opacity`)
- Don't run expensive JS during animations (defer with `requestIdleCallback`)
- Test with Chrome DevTools "Interaction to Next Paint" profiler
- Good INP score: <200ms, Needs improvement: 200-500ms, Poor: >500ms

**Warning signs:** Lighthouse flags "Minimize main-thread work," "Reduce JavaScript execution time," INP score >200ms in field data.

**Source:** [Core Web Vitals 2026: Key Updates](https://www.seologist.com/knowledge-sharing/core-web-vitals-whats-changed/), [A Quick Guide to Core Web Vitals](https://medium.com/@ignatovich.dm/a-quick-guide-to-core-web-vitals-96ee4d8c1dfe)

## Code Examples

Verified patterns from official sources and production implementations:

### Example 1: Intersection Observer Hook for Scroll Animations

```typescript
// hooks/useScrollAnimation.ts (custom alternative to library)
'use client'
import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Optionally unobserve after first trigger
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return { ref, isVisible }
}

// Usage
export function Projects() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* content */}
    </section>
  )
}
```

**Source:** [React Intersection Observer - Practical Guide](https://www.builder.io/blog/react-intersection-observer), [Scroll-Reveal Animation with Next.js](https://medium.com/@codewithmarish/scroll-reveal-hide-animation-with-intersection-observer-in-next-js-ad558c777fd5)

### Example 2: Staggered Animation for Project Cards

```typescript
// components/Projects.tsx (enhanced)
'use client'
import { useInView } from 'react-intersection-observer'
import { projects } from '@/lib/projects-data'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="projects" className="min-h-screen py-20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold mb-12 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: inView ? `${index * 100}ms` : '0ms' // Stagger effect
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Example 3: GPU-Accelerated Button Hover with will-change

```typescript
// components/Button.tsx
export function Button({ children, href }: ButtonProps) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center px-6 py-3
                 bg-primary text-primary-foreground rounded-lg font-medium
                 transition-all duration-200 ease-out
                 hover:bg-primary/90 hover:shadow-lg
                 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                 will-change-transform" // Hint for GPU layer
    >
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        {children}
      </span>
    </a>
  )
}
```

**Note:** Only use `will-change` on elements that WILL animate. Remove after animation completes (or use `:hover` pseudo-class to auto-remove).

### Example 4: Tailwind CSS v4 Custom Animations

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* existing theme vars */
}

/* Custom keyframes for Phase 4 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Utility classes (if not using plugin) */
.animate-fade-in-up {
  animation: fadeInUp 0.7s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out forwards;
}

/* prefers-reduced-motion overrides (already implemented in Phase 2) */
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

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Scroll event listeners | Intersection Observer API | 2019-2020 | 10x better performance, async, browser-optimized, no throttle/debounce needed |
| Animating left/top/width/height | transform + opacity only | 2015-present | GPU acceleration, 60fps on mobile, no reflows |
| Framer Motion for simple animations | CSS + Intersection Observer | 2024-2026 | 95% smaller bundle (2.5KB vs 50KB+), same visual result |
| JS animation libraries | CSS `animation-timeline: view()` | 2026 (experimental) | Zero JS, but Safari-only as of Feb 2026, not production-ready |
| FID (First Input Delay) | INP (Interaction to Next Paint) | 2024-2026 Core Web Vitals update | Stricter responsiveness measurement, penalties for blocking animations |
| `scroll-behavior: smooth` in JS | CSS `scroll-behavior: smooth` | Already done in Phase 2 | Simpler, automatic prefers-reduced-motion support |

**Deprecated/outdated:**
- **jQuery animation libraries** (e.g., Animate.css with jQuery): Replaced by CSS transitions/animations + vanilla JS/React
- **AOS (Animate on Scroll) library**: Superseded by Intersection Observer (AOS uses scroll listeners, less performant)
- **Framer Motion for React 19**: Compatibility issues as of Feb 2026; use Motion library (successor) or CSS approach
- **Custom scroll event handlers**: Replaced by Intersection Observer API (async, debounced, optimized)

## Open Questions

1. **Should we use @midudev/tailwind-animations plugin or hand-write keyframes?**
   - What we know: Plugin provides 80+ ready-made animations, supports `timeline-view` for CSS scroll-driven animations
   - What's unclear: Bundle size impact, whether plugin animations respect existing prefers-reduced-motion CSS
   - Recommendation: Start with hand-written keyframes (3-4 animations: fadeInUp, slideInLeft, fadeIn, scaleIn). Add plugin only if we need 5+ unique animations or want to experiment with CSS scroll-driven animations.

2. **How many simultaneous animations are acceptable before performance degrades?**
   - What we know: Mobile devices struggle with 5+ simultaneous animations, desktop handles 10+
   - What's unclear: Exact threshold for this specific portfolio (depends on animation complexity, device testing)
   - Recommendation: Stagger animations by 100ms intervals (max 3-5 elements animating at exact same time). Test on iPhone Safari with CPU throttling.

3. **Should Hero section have entrance animation or appear immediately?**
   - What we know: Hero is above-the-fold, users expect immediate content per Core Web Vitals (LCP)
   - What's unclear: Whether subtle fade-in (300ms) improves polish or delays perceived load time
   - Recommendation: Test both. If Hero has entrance animation, keep it very short (200-300ms) and don't block interaction. Consider skipping Hero animation entirely to optimize LCP.

4. **Motion library (Framer Motion successor) compatibility with React 19/Next.js 16?**
   - What we know: Motion is the official successor to Framer Motion, designed for React 19 compatibility
   - What's unclear: Production stability, bundle size compared to Framer Motion, API differences
   - Recommendation: Monitor Motion library adoption. As of Feb 2026, stick with Intersection Observer + CSS for simplicity and proven stability. Revisit Motion if complex gesture/drag interactions become requirements.

## Sources

### Primary (HIGH confidence)

- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) - Official specification, browser support
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) - Accessibility standard
- [Next.js Official Docs: Package Bundling](https://nextjs.org/docs/app/guides/package-bundling) - Code splitting, optimization
- [W3C WCAG Technique C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) - prefers-reduced-motion technique
- [Builder.io: React Intersection Observer Guide](https://www.builder.io/blog/react-intersection-observer) - Production patterns
- [CSS-Tricks: prefers-reduced-motion](https://css-tricks.com/almanac/rules/m/media/prefers-reduced-motion/) - Implementation guide

### Secondary (MEDIUM confidence)

- [Next.js Performance Tuning for Lighthouse](https://www.qed42.com/insights/next-js-performance-tuning-practical-fixes-for-better-lighthouse-scores) - Verified optimization strategies
- [Lighthouse 100 with Next.js Checklist](https://medium.com/better-dev-nextjs-react/lighthouse-100-with-next-js-the-missing-performance-checklist-e87ee487775f) - Best practices Dec 2025
- [CSS GPU Acceleration Guide](https://www.lexo.ch/blog/2025/01/boost-css-performance-with-will-change-and-transform-translate3d-why-gpu-acceleration-matters/) - will-change and transform optimization
- [Reflow vs Repaint Guide Jan 2026](https://rahuulmiishra.medium.com/reflow-vs-repaint-what-every-developer-should-know-226f073c9ad8) - Performance fundamentals
- [UI/UX Evolution 2026: Micro-Interactions](https://primotech.com/ui-ux-evolution-2026-why-micro-interactions-and-motion-matter-more-than-ever/) - Design trends
- [Core Web Vitals 2026 Updates](https://www.seologist.com/knowledge-sharing/core-web-vitals-whats-changed/) - INP introduction
- [Code Splitting in Next.js: 70% Reduction](https://medium.com/@sohail_saifi/code-splitting-in-next-js-how-i-reduced-initial-bundle-size-by-70-73a4c328cc6c) - Bundle optimization
- [Preventing Layout Shifts with CSS Animations](https://blog.pixelfreestudio.com/preventing-layout-shifts-mastering-css-transitions-and-animations/) - CLS prevention
- [Smashing Magazine: Designing With Reduced Motion](https://www.smashingmagazine.com/2020/09/design-reduced-motion-sensitivities/) - Accessibility best practices
- [Francisco Moretti: React Intersection Observer with Tailwind](https://www.franciscomoretti.com/blog/how-to-animate-on-scroll-with-react-intersection-observer-and-tailwind-in-a-nextjs-app) - Implementation tutorial

### Tertiary (LOW confidence, requires validation)

- [Framer Motion React 19 Discussion](https://github.com/vercel/next.js/discussions/72228) - Community reports of compatibility issues
- [Motion Library Official Site](https://motion.dev) - Framer Motion successor, needs production validation
- [@midudev/tailwind-animations](https://tailwind-animations.com/) - Plugin claims, bundle size needs verification
- [TAOS Library](https://versoly.com/taos) - Small library (600 bytes claimed), needs testing with Tailwind v4

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Intersection Observer API is production-proven, react-intersection-observer is Next.js compatible, Tailwind v4 is already installed
- Architecture: HIGH - Patterns are verified from official MDN docs, Builder.io guides, and Next.js documentation
- Pitfalls: HIGH - Based on verified sources (MDN, Next.js GitHub, Core Web Vitals documentation, performance profiling guides)
- Animation libraries: MEDIUM - Framer Motion/Motion compatibility issues reported by community but not officially documented; bundle size estimates from multiple sources but not verified in this specific setup
- CSS scroll-driven animations: MEDIUM - Experimental feature, browser support limited to Safari 26+ and Chrome 115+ as of Feb 2026, not production-ready

**Research date:** 2026-02-16
**Valid until:** 30-45 days (stable APIs: Intersection Observer, CSS transitions; fast-moving: animation libraries, browser support for scroll-timeline)
