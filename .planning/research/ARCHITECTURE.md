# Architecture Patterns

**Domain:** Developer Portfolio Website
**Researched:** 2026-02-16
**Confidence:** HIGH

## Recommended Architecture

Modern developer portfolios follow a **component-based, file-system routed architecture** built on Next.js App Router. The architecture separates presentational components, layout structure, and static content while leveraging server-side rendering for optimal performance.

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
├─────────────────────────────────────────────────────────────┤
│  Navigation Bar (sticky) │ Page Content │ Scroll Effects    │
│  ├─ Frosted glass effect │ ├─ Hero      │ ├─ Fade-ins      │
│  ├─ Logo/Name            │ ├─ About     │ ├─ Hover states  │
│  └─ Navigation links     │ ├─ Projects  │ └─ Transitions   │
│                          │ └─ Resume    │                   │
├─────────────────────────────────────────────────────────────┤
│                    Component Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Layout  │  │ Section  │  │   Card   │  │ Animation│    │
│  │Components│  │Components│  │Components│  │ Wrappers │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
├─────────────────────────────────────────────────────────────┤
│                     Data Layer                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Static Content (TypeScript constants/objects)      │    │
│  │  ├─ projects.ts (project data)                      │    │
│  │  ├─ experience.ts (work history)                    │    │
│  │  └─ skills.ts (tech stack)                          │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                  Static Assets                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │  Images  │  │   PDFs   │  │  Fonts   │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Layout | Wraps all pages, provides nav bar, theme provider | Root layout with Chakra UI provider, global styles |
| Page | Route-specific content (home, projects, resume) | Server component with static rendering |
| Section | Major page divisions (Hero, About, Projects) | Presentational components with semantic HTML |
| Card | Reusable content containers (project cards, skill badges) | Chakra UI Box/Card with custom styling |
| Animation Wrapper | Declarative animation boundaries | Framer Motion components (motion.div, etc.) |
| Navigation | Site-wide navigation with frosted glass effect | Sticky positioned component with backdrop-filter |
| Data Models | Type-safe content definitions | TypeScript interfaces + const arrays |

## Recommended Project Structure

**Strategy: Feature-first with colocation** - Store components near their usage but extract shared utilities.

```
bjportfolio/
├── app/                      # Next.js App Router (routing layer)
│   ├── layout.tsx            # Root layout (nav, theme, fonts)
│   ├── page.tsx              # Home page (hero section)
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── projects/
│   │   └── page.tsx          # Projects showcase
│   ├── resume/
│   │   └── page.tsx          # Resume on-page view
│   ├── globals.css           # Global styles, CSS variables
│   └── _components/          # Private: shared components
│       ├── Navigation.tsx    # Frosted glass nav bar
│       ├── Footer.tsx        # Site footer
│       └── ThemeProvider.tsx # Dark theme setup
├── components/               # Reusable UI components
│   ├── sections/             # Page sections
│   │   ├── Hero.tsx          # Landing hero section
│   │   ├── About.tsx         # About me section
│   │   └── ProjectsGrid.tsx  # Projects grid layout
│   ├── cards/                # Content cards
│   │   ├── ProjectCard.tsx   # Individual project card
│   │   └── SkillBadge.tsx    # Technology badge/pill
│   └── animations/           # Animation primitives
│       ├── FadeIn.tsx        # Fade-in on scroll
│       ├── SlideUp.tsx       # Slide-up transition
│       └── HoverScale.tsx    # Hover scale effect
├── lib/                      # Business logic & utilities
│   ├── data/                 # Static content data
│   │   ├── projects.ts       # Project definitions
│   │   ├── experience.ts     # Work experience
│   │   └── skills.ts         # Skills/tech stack
│   ├── types.ts              # TypeScript interfaces
│   └── constants.ts          # Site-wide constants (colors, URLs)
├── public/                   # Static assets
│   ├── images/               # Project screenshots, profile photo
│   │   ├── projects/         # Project-specific images
│   │   └── profile.jpg       # Profile photo
│   ├── resume.pdf            # Downloadable resume
│   └── favicon.ico           # Site favicon
├── .planning/                # Project planning docs
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS config (if used)
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

### Structure Rationale

- **app/** - Next.js App Router convention. File-system routing keeps URLs aligned with folder structure.
- **app/_components/** - Private folder (underscore prefix) for components that shouldn't be routes but are specific to app routing layer (nav, footer).
- **components/** - Shared presentational components organized by type (sections, cards, animations). Easy to locate and reuse.
- **lib/data/** - Static content lives separate from components. Changes to project data don't require touching component code.
- **public/** - Static assets served at root URL path. Organized by asset type.
- **Colocation principle** - Route-specific components can live in `app/[route]/_components/` for features unique to that page.

## Architectural Patterns

### Pattern 1: Static Content as Code

**What:** Define all portfolio content (projects, experience, skills) as TypeScript constants with strong typing.

**When to use:** Portfolios without CMS needs, where content updates are infrequent and done by the developer.

**Trade-offs:**
- **Pros:** Type-safe, no database, instant deployments, content versioned with code, zero runtime overhead
- **Cons:** Requires code changes for content updates, not suitable for frequent updates by non-technical users

**Example:**
```typescript
// lib/data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Task Management System',
    description: 'A full-stack task management app with real-time updates',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    imageUrl: '/images/projects/task-manager.png',
    githubUrl: 'https://github.com/belwinjulian/task-manager',
    liveUrl: 'https://tasks.belwinjulian.dev',
    featured: true
  },
  // ... more projects
];
```

### Pattern 2: Server-First Rendering

**What:** Use Next.js Server Components by default, only add 'use client' for interactive components.

**When to use:** Modern Next.js 13+ applications. Default for all new components unless they need client-side interactivity.

**Trade-offs:**
- **Pros:** Better performance, smaller JavaScript bundles, faster initial page load, SEO-friendly
- **Cons:** Cannot use React hooks (useState, useEffect) in server components, requires understanding of server/client boundary

**Example:**
```typescript
// app/projects/page.tsx (Server Component - default)
import { projects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/cards/ProjectCard';

export default function ProjectsPage() {
  // This runs on the server - no JavaScript sent for this logic
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="projects-grid">
      {featuredProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

// components/cards/ProjectCard.tsx (Client Component - has interactions)
'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="project-card"
    >
      {/* ... card content */}
    </motion.div>
  );
}
```

### Pattern 3: Composition-Based Animation

**What:** Create reusable animation wrapper components using Framer Motion that accept children.

**When to use:** When you need consistent animation patterns across multiple components (fade-ins, slide-ups, etc.).

**Trade-offs:**
- **Pros:** DRY principle, consistent animation timing, easy to adjust globally, declarative API
- **Cons:** Adds component nesting depth, requires 'use client' boundary

**Example:**
```typescript
// components/animations/FadeIn.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function FadeIn({ children, delay = 0, direction = 'up' }: FadeInProps) {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

// Usage in a page
<FadeIn delay={0.2}>
  <h2>About Me</h2>
  <p>I'm a developer...</p>
</FadeIn>
```

### Pattern 4: Shared Layout with App Router

**What:** Use Next.js App Router's layout.tsx to provide shared UI (navigation, footer) and context providers.

**When to use:** Always in App Router projects. Single root layout for site-wide elements.

**Trade-offs:**
- **Pros:** Automatically wraps all pages, prevents navigation re-renders, perfect for nav/footer
- **Cons:** Layout persists during navigation (feature, not bug), requires understanding of nesting

**Example:**
```typescript
// app/layout.tsx
import { Navigation } from './_components/Navigation';
import { Footer } from './_components/Footer';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Belwin Julian - Developer Portfolio',
  description: 'Full-stack developer specializing in React and Node.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

## Data Flow

### Static Content Flow

```
Build Time:
  lib/data/projects.ts (Source of truth)
       ↓
  Next.js Build Process
       ↓
  Static HTML Generation (SSG)
       ↓
  Vercel Edge Network

Runtime (User Visit):
  CDN → Static HTML → Browser
       ↓
  Client-side Hydration (for interactive components only)
       ↓
  Framer Motion Animations
```

### Component Hierarchy Flow

```
Root Layout (app/layout.tsx)
    ├─ Navigation (client component - sticky scroll behavior)
    ├─ Page (server component - static content)
    │   ├─ Hero Section (server component)
    │   │   └─ FadeIn Animation (client wrapper)
    │   ├─ Projects Grid (server component)
    │   │   └─ ProjectCard[] (client components - hover effects)
    │   └─ Resume Section (server component)
    │       ├─ PDF Download Button (client component)
    │       └─ Experience Timeline (server component)
    └─ Footer (server component)
```

### Key Data Flows

1. **Content Updates:** Developer updates TypeScript files in `lib/data/` → Git commit → Vercel rebuild → New static site deployed
2. **Page Navigation:** User clicks nav link → Next.js client-side routing → Page content swap (layout persists) → Scroll to top
3. **Animation Trigger:** Page loads → Server HTML rendered → Framer Motion hydrates → Scroll observer fires → Animation plays on viewport intersection

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-20 projects | Static content in TypeScript files is perfect. Simple, fast, version-controlled. |
| 20-100 projects | Consider JSON files in `lib/data/` for easier management. Still static, but easier to parse/filter. Add pagination to project grid. |
| 100+ projects or frequent updates | Migrate to headless CMS (Sanity, Contentful). Introduces build webhooks and ISR (Incremental Static Regeneration). |

### Scaling Priorities

1. **First bottleneck:** Image optimization. With many project screenshots, use Next.js Image component with priority/lazy loading. Implement responsive images (srcset).
2. **Second bottleneck:** JavaScript bundle size from animations. Lazy load animation libraries, use `dynamic()` for below-fold sections. Consider CSS animations for simple effects.
3. **Third bottleneck:** Build times with many pages. If portfolio grows to 50+ project detail pages, switch to ISR or on-demand generation instead of pure SSG.

## Anti-Patterns

### Anti-Pattern 1: Client Components Everywhere

**What people do:** Add 'use client' to every component to avoid thinking about server/client boundary.

**Why it's wrong:**
- Ships unnecessary JavaScript to browser
- Loses benefits of server rendering (performance, SEO)
- Increases initial load time and hydration cost

**Do this instead:**
- Default to Server Components
- Only mark components 'use client' when they need:
  - React hooks (useState, useEffect)
  - Browser APIs (window, document)
  - Event listeners (onClick, onScroll)
- Push 'use client' as deep as possible in component tree

### Anti-Pattern 2: Animations on Everything

**What people do:** Add elaborate animations to every element, including scroll-triggered animations on all content.

**Why it's wrong:**
- Creates motion sickness for some users
- Slows down perceived performance
- Distracts from content
- Accessibility issues (violates prefers-reduced-motion)

**Do this instead:**
- Use subtle animations: fade-ins on page load, gentle hover states
- Respect `prefers-reduced-motion` media query
- Animate only key elements: hero entrance, project card hovers, nav transitions
- Keep animation durations short (0.2s-0.5s)

### Anti-Pattern 3: Deep Component Nesting

**What people do:** Create wrapper components for every visual variation, leading to 6+ levels of nesting.

```typescript
// BAD
<Container>
  <Wrapper>
    <Box>
      <Card>
        <CardContent>
          <Text>Hello</Text>
        </CardContent>
      </Card>
    </Box>
  </Wrapper>
</Container>
```

**Why it's wrong:**
- Hard to debug in React DevTools
- Performance overhead from React reconciliation
- Difficult to trace styles and props
- Makes code harder to read

**Do this instead:**
- Flatten component hierarchy
- Use composition over wrapper components
- Leverage Tailwind/CSS for styling instead of wrapper divs
- Max 2-3 levels of nesting for most components

### Anti-Pattern 4: Hardcoded Content in Components

**What people do:** Put project descriptions, titles, and details directly in JSX.

```typescript
// BAD
export function ProjectsSection() {
  return (
    <div>
      <ProjectCard
        title="My First Project"
        description="This is about..."
      />
      <ProjectCard
        title="My Second Project"
        description="This is about..."
      />
    </div>
  );
}
```

**Why it's wrong:**
- Content changes require component edits
- No single source of truth
- Hard to reuse content elsewhere
- Difficult to add/remove projects
- Can't easily filter or sort

**Do this instead:**
- Extract all content to `lib/data/` files
- Define TypeScript types for content structure
- Map over data arrays in components
- Content and presentation stay separate

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel | Git-based deployment | Push to main → auto-deploy. Configure in vercel.json |
| Analytics (optional) | Vercel Analytics or Plausible | Add script tag in root layout, respects privacy |
| PDF Download | Static file in public/ | Link to `/resume.pdf`, served by CDN |
| GitHub API (optional) | Fetch at build time | Get repo stars/commits for project cards. Use personal access token. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| app/ ↔ components/ | Import statements | App pages import and compose presentational components |
| components/ ↔ lib/data/ | Import data exports | Components receive data as props, never import data directly |
| Server ↔ Client | Props (serializable data only) | Cannot pass functions, classes, or Dates across boundary |
| Animation ↔ Content | Children prop | Animation wrappers wrap content, don't know about content structure |

## Build Order Implications

### Phase 1: Foundation (Build First)
1. **Project setup** - Next.js, TypeScript, Tailwind/Chakra UI
2. **Root layout** - Basic layout.tsx with fonts, global styles
3. **Type definitions** - Define interfaces in lib/types.ts
4. **Static data structure** - Create empty data files with TypeScript types

**Why first:** Everything else depends on types and project configuration.

### Phase 2: Core Components (Build Second)
1. **Basic components** - Simple cards, buttons, sections (no animations)
2. **Navigation** - Nav bar structure (frosted glass effect can wait)
3. **Home page** - Static hero section with hardcoded content

**Why second:** Proves routing works, establishes component patterns before adding complexity.

### Phase 3: Content Layer (Build Third)
1. **Data population** - Fill lib/data/ with actual project/experience data
2. **Connect data to components** - Replace hardcoded content with mapped data
3. **All pages** - About, Projects, Resume pages using real data

**Why third:** Now you have real content to work with for styling and animations.

### Phase 4: Polish (Build Last)
1. **Animations** - Add Framer Motion wrappers, scroll effects
2. **Visual refinement** - Hover states, frosted glass, dark theme polish
3. **Image optimization** - Next.js Image components, proper sizing
4. **SEO metadata** - Page titles, descriptions, og:image

**Why last:** Polish is easier when structure is stable. Animations are enhancement, not requirement.

## Sources

**HIGH CONFIDENCE:**
- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) - Official Next.js documentation
- [Next.js App Router Architecture](https://nextjs.org/docs/architecture) - Official architecture guide
- [craftzdog/craftzdog-homepage GitHub](https://github.com/craftzdog/craftzdog-homepage) - Reference implementation

**MEDIUM CONFIDENCE:**
- [Next.js Architecture in 2026 - yogijs.tech](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) - App Router patterns article
- [Modern Full Stack Application Architecture Using Next.js 15+](https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/) - Architecture patterns
- [React Architecture Patterns and Best Practices for 2026](https://www.bacancytechnology.com/blog/react-architecture-patterns-and-best-practices) - Component patterns

**Supporting Research:**
- [How to Structure a Developer Portfolio](https://www.webportfolios.dev/blog/developer-portfolio-structure) - Portfolio-specific guidance
- [Framer Motion Documentation](https://motion.dev/examples) - Animation library patterns
- [Static Website Architecture](https://www.contentstack.com/docs/developers/architecture-diagrams/static-website-detailed-architecture) - Static site patterns

---
*Architecture research for: Belwin Julian Developer Portfolio*
*Researched: 2026-02-16*
