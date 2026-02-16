# Project Research Summary

**Project:** Belwin Julian Developer Portfolio
**Domain:** Developer Portfolio Website (Job Hunting)
**Researched:** 2026-02-16
**Confidence:** HIGH

## Executive Summary

Developer portfolios in 2026 follow a well-established pattern: Next.js-based component architecture with static content, performance-first implementation, and recruiter-optimized design. The research reveals a clear consensus around modern tooling (Next.js 16 + React 19 + TypeScript + Tailwind CSS) with minimal controversy. The key success factor isn't technical sophistication but execution quality: working demos, fast load times, and clear project context matter far more than impressive animations or cutting-edge tech.

The recommended approach prioritizes recruiter needs over developer aesthetics. Hiring managers spend 55 seconds evaluating a portfolio, with 80% spending under 3 minutes total. This drives architecture decisions toward static site generation for instant loads, mobile-first responsive design (60%+ view on mobile), and above-fold placement of best projects with visible CTAs. The dark theme aesthetic inspired by craftz.dog is achievable through subtle Framer Motion animations and optional 3D elements, but only after core functionality is rock-solid and performance budget allows.

Critical risks center on three areas: dead project demos (the #1 killer of portfolio credibility), performance bottlenecks from unoptimized images/animations, and mobile responsiveness failures. All three are preventable through disciplined use of Next.js built-in optimizations (next/image, next/font), persistent hosting on Vercel, and mobile-first design methodology. The research identified no major technical unknowns—this is a solved domain with established patterns.

## Key Findings

### Recommended Stack

**Next.js 16 + React 19 ecosystem** is the dominant choice for modern developer portfolios, with near-universal adoption in 2025-2026 examples. This stack provides server-side rendering for SEO, automatic code splitting for performance, built-in image/font optimization, and seamless Vercel deployment. Turbopack (default in v16) delivers 2-5x faster builds compared to webpack, making iteration rapid.

**Core technologies:**
- **Next.js 16.1+**: React framework with App Router — industry standard with built-in optimizations (image/font), automatic code splitting, perfect Vercel integration, and Turbopack for fast builds
- **React 19.2+**: UI library — required by Next.js 16, stable Server Components and improved Suspense
- **TypeScript 5.1+**: Type safety — 78% adoption in professional React projects, demonstrates code quality, catches errors at compile time
- **Tailwind CSS 4.1+**: Utility-first CSS — 90%+ adoption in 2025-2026 portfolio templates, CSS-first config, rapid UI development with consistent design
- **Motion (Framer Motion) 2.9+**: Animation library — for subtle fade-ins, hover effects, transitions at 120fps; React 19 compatible
- **shadcn/ui**: Component primitives — copy-paste components (not npm), 65k+ GitHub stars, built on Radix UI for accessibility
- **next/font & next/image**: Built-in optimizations — automatic font self-hosting and image WebP conversion, lazy loading, blur placeholders

**Critical versions:** Node.js 20.9+ required (18 no longer supported). React 19 is required by Next.js 16 (React 18 not compatible). Tailwind v4 requires modern browsers (Safari 16.4+, Chrome 111+).

### Expected Features

**Must have (table stakes):**
- **Hero/Landing Section** — first impression showing name, role, brief value prop; hiring managers spend 55 seconds evaluating
- **Projects Showcase** — 3-5 quality projects with live demos, GitHub links, screenshots, tech stack, problem/solution/results
- **Responsive Design** — mobile-first implementation; 60%+ of recruiters view on mobile
- **Fast Load Performance** — <1s initial load target; slow site signals poor technical awareness
- **Resume Access** — hybrid approach with on-page view + PDF download
- **Professional Contact** — email link or simple static form (no backend needed)
- **Social Links** — GitHub and LinkedIn visible in header/footer
- **About Me Section** — concise background, what makes you unique, scannable format

**Should have (competitive):**
- **Subtle Animations** — Framer Motion for fade-ins, hover states, page transitions (craftz.dog aesthetic); must not block interactivity
- **Dark Theme (default)** — developer-friendly, matches inspiration; skip light/dark toggle to reduce scope
- **Project Process Documentation** — problem statement, architecture decisions, tradeoffs made; rare differentiator that demonstrates communication
- **Project Metrics/Results** — quantifiable impact when available ("Reduced load time 60%", "Supports 1000+ users")
- **Custom Domain** — yourname.com signals professionalism
- **Micro-interactions** — polish on hover states, smooth transitions, loading states

**Defer (v2+):**
- **3D Interactive Elements** — Three.js voxel dog inspired by craftz.dog; HIGH effort, HIGH impact but risky (performance-critical); only add if performance budget allows after core complete
- **Blog Section** — time-consuming to maintain; empty blog worse than no blog; focus project READMEs instead
- **Technical Writing Samples** — 4-5 quality posts powerful but high effort; defer until job search momentum proves need
- **Light/Dark Theme Toggle** — adds complexity for minimal value; commit to dark theme
- **Contact Form with Backend** — use mailto: or static form service (Formspree); custom backend adds deployment complexity

**Anti-features (explicitly avoid):**
- Excessive animation/effects (distracts from work, hurts performance)
- Auto-playing music/video (instant tab close)
- Generic technology logo grids without context
- Testimonials (more relevant for freelancers than job seekers)
- Every project you've built (quality over quantity: 3-5 curated > 10 mediocre)

### Architecture Approach

**Component-based, file-system routed architecture** using Next.js App Router with server-first rendering. Portfolio content lives as TypeScript constants (static content as code pattern), eliminating need for database/CMS while maintaining type safety and instant deployments. Server Components handle static content rendering; Client Components limited to interactive elements (animations, hover effects) to minimize JavaScript bundle size.

**Major components:**
1. **Root Layout (app/layout.tsx)** — provides navigation, theme, fonts, global styles; persists across page navigation; uses next/font for automatic font optimization
2. **Page Components (app/*/page.tsx)** — server components by default; static rendering for instant CDN delivery; import presentational components
3. **Section Components (components/sections/)** — reusable page sections (Hero, ProjectsGrid, About) with semantic HTML
4. **Card Components (components/cards/)** — content containers (ProjectCard, SkillBadge) with Tailwind styling
5. **Animation Wrappers (components/animations/)** — composition-based Framer Motion components (FadeIn, SlideUp, HoverScale); declarative API for consistent animation timing
6. **Data Layer (lib/data/)** — TypeScript constants defining projects, experience, skills; single source of truth for content; changes don't require touching component code
7. **Static Assets (public/)** — project screenshots (optimized via next/image), resume PDF, profile photo

**Key architectural patterns:**
- **Static Content as Code** — define portfolio content as TypeScript constants with strong typing; no database overhead, content versioned with code
- **Server-First Rendering** — use Server Components by default, add 'use client' only for interactive components; better performance, smaller bundles, SEO-friendly
- **Composition-Based Animation** — reusable animation wrapper components that accept children; DRY principle, consistent timing, declarative
- **Shared Layout** — App Router layout.tsx provides nav/footer automatically; prevents re-renders during navigation

### Critical Pitfalls

1. **Dead/Broken Project Demos** — links to 404s, crashed free-tier apps, or non-loading demos immediately question technical competence. **Prevention:** Use persistent free tiers (Vercel, Netlify, not Heroku), set 3-month calendar reminder to verify links, ensure environment variables set for both Production AND Preview environments.

2. **Portfolio Optimized for Developers, Not Recruiters** — showcases technical prowess but buries critical info recruiters need in first 30 seconds. **Prevention:** Put best project FIRST (above fold), "View Live" and "View Code" buttons visible without scrolling, contact info on every page, <1s hero load time, Lighthouse Performance score 90+.

3. **Projects Without Context (Code Dumps)** — screenshots with generic descriptions but no explanation of problem solved, why it matters, or specific contribution. **Prevention:** Each project needs problem statement, solution, technology rationale, challenges overcome, results/impact; avoid "Built with React/Node" — specify unique complexity.

4. **Performance Killers (Images, Fonts, Animations)** — unoptimized images, synchronous font loading, excessive animations cause slow load and high bounce rate. **Prevention:** ALWAYS use next/image with priority for hero, lazy loading below fold; ALWAYS use next/font; limit simultaneous animations; defer non-critical animations; test Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1).

5. **Mobile Responsiveness Afterthought** — looks great on desktop but breaks on mobile (60%+ of recruiters view on mobile). **Prevention:** Mobile-first design approach, viewport meta tag, responsive units (rem/em/%), touch targets minimum 44x44px, test on real devices not just DevTools.

6. **Accessibility Barriers (Dark Theme Edition)** — insufficient contrast, no keyboard navigation, missing focus indicators, inaccessible animations. **Prevention:** WCAG 2.1 AA contrast minimums (4.5:1 normal text, 3:1 large text), NEVER remove focus outlines, full keyboard navigation, respect prefers-reduced-motion, semantic HTML, alt text for images.

7. **Missing or Poor SEO/Social Metadata** — portfolio shared on LinkedIn/Twitter shows generic preview instead of professional branding. **Prevention:** Required Open Graph tags (og:title, og:type, og:image 1200x630px, og:url), use absolute URLs, test with Facebook Debugger/Twitter Card Validator/LinkedIn Post Inspector before launch.

## Implications for Roadmap

Based on research, suggested phase structure prioritizes foundation first (design system, performance budget, responsive framework), then content showcase (projects doing 80% of heavy lifting), then polish (animations, refinements). This ordering respects dependencies discovered in architecture research and avoids pitfalls from recruiter perspective research.

### Phase 1: Foundation & Design System
**Rationale:** Everything depends on solid foundation. Mobile-first responsive framework, performance budget, and dark theme design system must be established before building features. Prevents costly retrofitting later (mobile responsiveness anti-pattern) and ensures consistent implementation.

**Delivers:** Next.js 16 project setup, TypeScript configuration, Tailwind CSS design system with dark theme, root layout with navigation/footer structure, performance budget established (<1s load target, Lighthouse 90+), responsive breakpoints defined, accessibility baseline (contrast ratios, focus states).

**Addresses:**
- Foundation for all table stakes features
- Fast Load Performance (performance budget)
- Responsive Design (mobile-first framework)
- Dark Theme (design system)

**Avoids:**
- Mobile Responsiveness Afterthought (design mobile-first from start)
- Accessibility Barriers (establish contrast ratios, focus states in design system)
- Performance Killers (establish next/image, next/font patterns from start)

**Research flag:** Standard patterns (Next.js setup well-documented) — skip research-phase.

### Phase 2: Project Showcase Implementation
**Rationale:** Projects do 80% of heavy lifting for portfolio success. Must be executed perfectly: working demos, clear context, performance-optimized. This is highest-impact feature and should come early to validate recruiter appeal.

**Delivers:** Projects data structure (lib/data/projects.ts with TypeScript types), ProjectCard component with hover effects, Projects page with grid layout, project screenshots optimized via next/image, live demo links and GitHub links above fold, project descriptions with problem/solution/results/tech stack, deployment strategy for demo persistence.

**Addresses:**
- Projects Showcase (table stakes)
- Project Process Documentation (differentiator)
- Project Metrics/Results (differentiator)

**Avoids:**
- Dead/Broken Project Demos (establish Vercel deployment, link verification)
- Portfolio Optimized for Developers Not Recruiters (best project first, CTAs above fold)
- Projects Without Context (problem/solution/results template)
- Performance Killers (next/image for screenshots, lazy loading below fold)

**Research flag:** Standard patterns (project card component well-documented) — skip research-phase.

### Phase 3: About/Resume/Contact Sections
**Rationale:** With project showcase proven, complete remaining table stakes content. These sections provide necessary context but are less differentiated. About section and resume establish personal brand; contact enables recruiter reach-out.

**Delivers:** About Me section with concise background, Resume page with on-page view + PDF download, PDF optimized (<1MB), contact method (email link or static form), social links (GitHub, LinkedIn) in footer, personal branding copy consistent across sections, SEO metadata (page titles, descriptions), Open Graph tags for social sharing.

**Addresses:**
- About Me Section (table stakes)
- Resume Access (table stakes)
- Professional Contact (table stakes)
- Social Links (table stakes)

**Avoids:**
- Missing SEO/Social Metadata (OG tags, social preview testing)
- Projects Without Context (consistent storytelling across About and Projects)

**Research flag:** Standard patterns (static content pages) — skip research-phase.

### Phase 4: Polish & Animations
**Rationale:** With all content complete and tested, add subtle animations for craftz.dog-inspired aesthetic. Animations are enhancement, not requirement—only add after core is rock-solid and performance budget confirmed.

**Delivers:** Framer Motion animation wrappers (FadeIn, SlideUp, HoverScale), hero section entrance animation, project card hover effects, smooth page transitions, navigation scroll behavior, prefers-reduced-motion support, performance testing confirms animations don't exceed budget, micro-interactions on buttons/links.

**Addresses:**
- Subtle Animations (differentiator)
- Micro-interactions (differentiator)

**Avoids:**
- Performance Killers (defer non-critical animations, lazy load, test Core Web Vitals)
- Accessibility Barriers (prefers-reduced-motion support)
- Portfolio Optimized for Developers Not Recruiters (animations serve purpose, don't block content)

**Research flag:** Standard patterns (Framer Motion examples well-documented) — skip research-phase.

### Phase 5: Pre-Launch QA & Optimization
**Rationale:** Before deployment, systematic verification prevents critical failures. This phase catches issues that would harm first impressions with recruiters.

**Delivers:** All demo links verified working, tested on real iPhone/Android devices (not just DevTools), Lighthouse audit passed (Performance ≥90, Accessibility ≥90), contrast ratios verified (≥4.5:1), keyboard navigation tested, social previews tested (LinkedIn, Twitter, Facebook), resume PDF optimized, 404 page customized, environment variables configured (Production and Preview), analytics configured (Vercel Analytics).

**Addresses:**
- Verification of all table stakes features
- Quality assurance before live deployment

**Avoids:**
- Dead/Broken Project Demos (final link verification)
- Mobile Responsiveness Afterthought (real device testing)
- Accessibility Barriers (contrast audit, keyboard nav verification)
- Missing SEO/Social Metadata (social preview testing)

**Research flag:** Standard patterns (testing checklists available) — skip research-phase.

### Phase 6 (Optional): Advanced Enhancements
**Rationale:** Only pursue after core portfolio deployed and feedback received. These are high-effort, high-impact features that require validation of need before investment.

**Delivers (conditionally):** 3D interactive element (Three.js voxel character inspired by craftz.dog's voxel dog) — ONLY if performance budget allows and personal brand benefits from 3D showcase; enhanced project documentation (deeper case studies with architecture diagrams, technical decision rationale); technical writing section — ONLY if committed to maintaining with 4-5 quality posts.

**Addresses:**
- 3D Interactive Elements (differentiator, optional)
- Enhanced project documentation (differentiator)
- Technical Writing (v2+ feature)

**Avoids:**
- Performance Killers (3D lazy loaded, performance-tested before adding)
- Blog Section Anti-Feature (only add technical writing if committed to quality content)

**Research flag:** 3D implementation needs research-phase (performance optimization techniques, Three.js best practices for portfolio context).

### Phase Ordering Rationale

**Why Foundation First:**
- Mobile-first design is easier than retrofitting responsiveness later (architecture research shows high cost of recovery)
- Performance budget prevents accumulation of technical debt (pitfalls research: unoptimized images/fonts are immediate issues)
- Design system ensures consistency across all subsequent features

**Why Projects Second:**
- Does 80% of heavy lifting for job search success (features research: hiring managers prioritize working demos)
- Validates recruiter appeal early in process
- Depends on foundation (responsive framework, next/image optimization) but not on About/Resume
- Allows early deployment for feedback before completing remaining sections

**Why About/Resume Third:**
- Necessary context but less differentiated than projects
- Benefits from project content being finalized (consistent storytelling)
- SEO/social metadata depends on personal branding copy being finalized

**Why Animations Fourth:**
- Enhancement, not requirement (features research: subtle > excessive)
- Easier to implement when structure is stable
- Requires performance budget confirmation from completed content
- Risky if added early (pitfalls research: animations blocking content is critical failure)

**Why QA Fifth:**
- Final verification before launch prevents critical failures
- All features must be complete to test integration
- Social preview testing requires finalized copy and imagery

**Why Advanced Enhancements Optional/Last:**
- High effort, needs validation of benefit before investment
- 3D requires significant performance optimization (pitfalls research: can destroy performance)
- Technical writing requires ongoing commitment (anti-feature if not maintained)

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** Next.js setup, Tailwind configuration, responsive design — extremely well-documented, official docs comprehensive
- **Phase 2:** Project card components, image optimization — well-established patterns, multiple examples
- **Phase 3:** Static content pages, PDF handling — straightforward implementation
- **Phase 4:** Framer Motion animations — extensive examples, official documentation comprehensive
- **Phase 5:** Testing checklists, Lighthouse audits — standard tooling with clear documentation

**Phases potentially needing research-phase:**
- **Phase 6 (3D elements):** Three.js performance optimization for portfolio context, lazy loading strategies, bundle size impact — IF pursued, this is complex and performance-critical; would benefit from targeted research on Three.js best practices for non-3D-focused portfolios

**Overall assessment:** This is a **well-trodden domain** with established patterns and minimal unknowns. Research-phase likely unnecessary for Phases 1-5. Only consider research-phase for Phase 6 if 3D elements pursued.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Next.js 16 + React 19 + TypeScript + Tailwind is dominant 2026 pattern. Verified through official Next.js docs, multiple portfolio examples, and craftz.dog reference implementation. Version requirements clear. |
| Features | HIGH | Table stakes features (projects, responsive, performance, resume) have strong consensus across hiring manager research (60+ hiring managers surveyed). Differentiators (animations, dark theme) validated via craftz.dog and portfolio best practices research. |
| Architecture | HIGH | App Router patterns well-documented in Next.js official docs. Server-first rendering, static content as code, composition-based animations are proven patterns with extensive examples. craftzdog-homepage GitHub repository provides reference implementation. |
| Pitfalls | MEDIUM-HIGH | Common mistakes validated across multiple sources (developer portfolio mistakes articles, recruiter perspectives, Next.js optimization guides). Top pitfalls (dead demos, poor performance, mobile failures) have strong consensus. Some recovery strategies are inference-based rather than documented. |

**Overall confidence:** HIGH

### Gaps to Address

**No major gaps identified.** This is a mature domain with established patterns. Minor gaps to validate during planning:

- **3D implementation details (Phase 6):** If pursuing Three.js voxel character, research performance optimization techniques specific to portfolio context. Gap: how to achieve craftz.dog-level polish while maintaining <1s load time. **Resolution:** Defer 3D to Phase 6, only add if performance budget allows; use research-phase if pursuing.

- **Specific project content:** Research focused on general patterns, not your specific projects. Gap: which 3-5 projects to feature, how to frame them for maximum recruiter appeal. **Resolution:** During Phase 2 planning, audit existing projects against "problem/solution/results" template; prioritize full-stack projects with live demos.

- **Personal branding voice:** Research covered structure but not tone/voice for About section. Gap: how to differentiate personal brand while maintaining professionalism. **Resolution:** During Phase 3, review multiple portfolio About sections for tone patterns; A/B test with peers for recruiter perception.

## Sources

### Primary Sources (HIGH confidence)

**Official Documentation:**
- [Next.js 16 Official Release](https://nextjs.org/blog/next-16) — features, breaking changes, Turbopack
- [Next.js 16.1 Release](https://nextjs.org/blog/next-16-1) — stable Turbopack file system caching
- [React 19.2 Announcement](https://react.dev/blog/2025/10/01/react-19-2) — View Transitions, useEffectEvent
- [React v19 Stable](https://react.dev/blog/2024/12/05/react-19) — Server Components, Actions API
- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — official structure guide
- [Next.js App Router Architecture](https://nextjs.org/docs/architecture) — official architecture patterns
- [Motion.dev Official Docs](https://motion.dev) — rebranding from Framer Motion, React 19 compatibility
- [Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) — v4 migration, CSS-first config
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) — next/font built-in features
- [Next.js App Router: Optimizing Fonts and Images](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images) — official optimization guide
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables) — official Vercel docs

**Reference Implementation:**
- [craftzdog/craftzdog-homepage GitHub](https://github.com/craftzdog/craftzdog-homepage) — reference for dark theme, animations, 3D elements
- [Takuya Matsuyama - Homepage](https://www.craftz.dog/) — live example of inspiration

### Secondary Sources (MEDIUM confidence)

**Portfolio Best Practices:**
- [22 Best Developer Portfolios (Examples) 2026 - Colorlib](https://colorlib.com/wp/developer-portfolios/)
- [Best Web Developer Portfolio Examples from Top Developers in 2026 - Elementor](https://elementor.com/blog/best-web-developer-portfolio-examples/)
- [Web Designer & Developer Portfolios: 25 Inspiring Examples (2026) - SiteBuilder Report](https://www.sitebuilderreport.com/inspiration/web-developer-designer-portfolios)
- [Next.js Developer Portfolio Best Practices 2026](https://kinsta.com/blog/next-js-portfolio/)
- [Tailwind CSS Portfolio Templates](https://magicui.design/blog/nextjs-portfolio-template)

**Hiring Manager Research:**
- [Don't waste time on a (React) portfolio website - 60+ hiring managers survey](https://profy.dev/article/portfolio-websites-survey) — 60+ hiring managers surveyed on portfolio evaluation
- [How Recruiters and Hiring Managers Actually Look at Your Portfolio](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio) — recruiter time constraints, priorities
- [Get Hired With this Recruiter's UX Portfolio Tips - Toptal](https://www.toptal.com/designers/ux/ux-portfolio-tips-recruiter)
- [What Hiring Managers Really Look For In A Good Portfolio - Salt](https://welovesalt.com/news/career-advice/what-hiring-managers-really-look-for-in-a-good-portfolio)

**Common Mistakes & Pitfalls:**
- [5 Mistakes Developers Make in Their Portfolio Websites](https://www.devportfoliotemplates.com/blog/5-mistakes-developers-make-in-their-portfolio-websites)
- [8 Software Developer portfolio website mistakes](https://coachfullstack.com/posts/8-software-developer-portfolio-website-mistakes/)
- [7 Deadly Sins of Developer Portfolios](https://pesto.tech/resources/7-deadly-sins-of-developer-portfolios-and-how-to-avoid-them)
- [How to Avoid Common Web Developer Portfolio Mistakes (LinkedIn)](https://www.linkedin.com/advice/0/what-most-important-things-avoid-your-web-developer-lk51e)
- [Developer portfolio do's & don'ts](https://blog.kieranroberts.dev/developer-portfolio-dos-and-donts)

**Architecture & Performance:**
- [Next.js Architecture in 2026 - yogijs.tech](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Modern Full Stack Application Architecture Using Next.js 15+](https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/)
- [NextJS Performance Optimization: Want Faster Web Apps in 2026?](https://solguruz.com/blog/nextjs-performance-optimization/)
- [Next.js Image Optimization Techniques 2026](https://webpeak.org/blog/nextjs-image-optimization-techniques/)
- [Framer Motion Documentation](https://motion.dev/examples)

**Accessibility:**
- [WebAIM: Contrast and Color Accessibility](https://webaim.org/articles/contrast/)
- [Hidden Web Accessibility Issues Most Designers Miss in 2026](https://www.netguru.com/blog/web-design-accessibility-mistakes)
- [10 digital accessibility mistakes to avoid (UK Government)](https://accessibility.blog.gov.uk/2025/02/04/10-digital-accessibility-mistakes-to-avoid/)

**SEO & Social:**
- [Open Graph Meta Tags: Everything You Need to Know (Ahrefs)](https://ahrefs.com/blog/open-graph-meta-tags/)
- [The Complete Guide To Open Graph Meta Tags 2023](https://blankslatedigital.co.uk/blog/web-dev/open-graph-meta-tags/)

**Deployment:**
- [Deploying My Live GitHub Portfolio to Vercel: What I Got Wrong](https://levelup.gitconnected.com/deploying-my-live-github-portfolio-to-vercel-what-i-got-wrong-and-how-you-can-avoid-it-b85f0c70bcdc)
- [Securing Your Secrets: How to Deploy Environment Variables to Vercel](https://llamazookeeper.medium.com/securing-your-secrets-how-to-deploy-environment-variables-to-vercel-without-committing-your-env-c1ca47b35832)

### Tertiary Sources (Context7 not available)

**Note:** Context7 library access was not available (Brave API key not set). All research relied on official documentation and web search. Given the maturity of this domain (Next.js developer portfolios), this limitation had minimal impact. Official Next.js, React, and library documentation provided high-confidence technical guidance, while multiple portfolio best practices articles provided convergent patterns.

---
*Research completed: 2026-02-16*
*Ready for roadmap: yes*
