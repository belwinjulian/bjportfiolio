# Roadmap: BJ Portfolio

## Overview

This roadmap transforms Belwin Julian's professional background into a recruiter-ready portfolio website. Starting with a solid Next.js foundation and dark-themed design system, the project builds through a projects showcase (the core value driver), adds essential About/Resume/Contact sections, layers in polished animations inspired by craftz.dog, and concludes with comprehensive QA before launch. Each phase delivers verifiable user-facing capabilities, ensuring the portfolio impresses recruiters with fast load times, working demos, and professional presentation.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Hero** - Next.js setup with dark theme and responsive landing section
- [ ] **Phase 2: Projects Showcase** - Curated project cards with live demos and optimized images
- [ ] **Phase 3: About, Resume & Contact** - Professional background, downloadable resume, and contact access
- [ ] **Phase 4: Polish & Performance** - Animations, micro-interactions, and optimization
- [ ] **Phase 5: Launch & Deployment** - QA, testing, and production deployment

## Phase Details

### Phase 1: Foundation & Hero
**Goal**: Portfolio has responsive dark-themed foundation with working navigation and compelling hero section
**Depends on**: Nothing (first phase)
**Requirements**: HERO-01, HERO-02, HERO-03, TECH-01
**Success Criteria** (what must be TRUE):
  1. User sees name, professional title, and value prop immediately on landing
  2. Frosted-glass navigation bar sticks to top and smoothly scrolls to sections
  3. Dark theme applied consistently across all pages with proper contrast ratios
  4. Site displays correctly on mobile, tablet, and desktop screens
  5. Page loads in under 1 second with Lighthouse Performance score 90+
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md -- Project scaffolding & dark theme system (Wave 1)
- [ ] 01-02-PLAN.md -- Navigation & hero section with visual verification (Wave 2)

### Phase 2: Projects Showcase
**Goal**: Recruiters can view curated projects with live demos, technical context, and working links
**Depends on**: Phase 1
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04
**Success Criteria** (what must be TRUE):
  1. User sees 3-5 project cards in responsive grid layout
  2. Each project displays screenshot, title, description, and tech stack clearly
  3. Each project has clickable links to live demo and GitHub repository
  4. Project images load quickly via WebP format and lazy loading
  5. All demo links work and load functioning applications
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md -- Project data model, images, and card component (Wave 1)
- [ ] 02-02-PLAN.md -- Projects section, page integration, and visual verification (Wave 2)

### Phase 3: About, Resume & Contact
**Goal**: Recruiters learn who Belwin is, access his resume, and can initiate contact
**Depends on**: Phase 2
**Requirements**: ABUT-01, ABUT-02, ABUT-03, RESM-01, RESM-02, TECH-03
**Success Criteria** (what must be TRUE):
  1. User reads About section with bio, background, and skills without scrolling excessively
  2. User views resume content on-page in clean, scannable format
  3. User downloads PDF resume via prominent button
  4. User clicks GitHub/LinkedIn links from navigation or footer
  5. User clicks email link that opens their mail client
  6. Search engines display correct title, description, and preview image when portfolio is shared
**Plans**: TBD

Plans:
- (To be created during planning phase)

### Phase 4: Polish & Performance
**Goal**: Portfolio feels polished with subtle animations and meets performance benchmarks
**Depends on**: Phase 3
**Requirements**: PLSH-01, PLSH-02, PLSH-03, PLSH-04, TECH-02
**Success Criteria** (what must be TRUE):
  1. Sections fade in smoothly as user scrolls down the page
  2. Project cards and interactive elements respond to hover with smooth transitions
  3. Page transitions feel smooth without blocking user interaction
  4. Users with reduced motion preferences see instant transitions instead of animations
  5. Lighthouse Performance score remains 90+ after adding animations
**Plans**: TBD

Plans:
- (To be created during planning phase)

### Phase 5: Launch & Deployment
**Goal**: Portfolio is tested, optimized, and deployed to production on Vercel
**Depends on**: Phase 4
**Requirements**: TECH-04
**Success Criteria** (what must be TRUE):
  1. All project demo links verified working on real devices
  2. Site tested and working on mobile (iOS and Android) and desktop browsers
  3. Lighthouse audit passes with Performance 90+, Accessibility 90+
  4. Contrast ratios meet WCAG 2.1 AA standards (4.5:1 minimum)
  5. Full keyboard navigation works without mouse
  6. Social media previews display correctly on LinkedIn, Twitter, Facebook
  7. Portfolio deployed to Vercel with custom domain configured
  8. Analytics tracking configured and verified
**Plans**: TBD

Plans:
- (To be created during planning phase)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Hero | 0/2 | Planned | - |
| 2. Projects Showcase | 0/2 | Planned | - |
| 3. About, Resume & Contact | 0/? | Not started | - |
| 4. Polish & Performance | 0/? | Not started | - |
| 5. Launch & Deployment | 0/? | Not started | - |

---
*Roadmap created: 2026-02-16*
*Last updated: 2026-02-16*
