# Requirements: BJ Portfolio

**Defined:** 2026-02-16
**Core Value:** Recruiters can quickly see who Belwin is, what he's built, and download his resume — all in a visually impressive, fast-loading experience.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Hero & Navigation

- [ ] **HERO-01**: User sees name, professional title, and brief value prop on landing
- [ ] **HERO-02**: Frosted-glass sticky navigation bar with smooth scroll to sections
- [ ] **HERO-03**: Dark theme applied consistently across all pages

### Projects

- [ ] **PROJ-01**: User can view 3-5 curated project cards in a responsive grid
- [ ] **PROJ-02**: Each project card displays screenshot, title, description, and tech stack
- [ ] **PROJ-03**: Each project card links to live demo and GitHub repository
- [ ] **PROJ-04**: Project images are optimized with next/image (WebP, lazy loading)

### About & Contact

- [ ] **ABUT-01**: About section with bio, background, and skills overview
- [ ] **ABUT-02**: Social links (GitHub, LinkedIn) visible in navigation/footer
- [ ] **ABUT-03**: Email contact link accessible from any page

### Resume

- [ ] **RESM-01**: Resume content rendered as on-page section
- [ ] **RESM-02**: Downloadable PDF resume via button

### Technical

- [ ] **TECH-01**: Responsive design works on mobile, tablet, and desktop
- [ ] **TECH-02**: Lighthouse Performance score 90+ (fast load, optimized assets)
- [ ] **TECH-03**: SEO metadata and Open Graph tags for social sharing
- [ ] **TECH-04**: Deployed on Vercel with custom domain support

### Polish

- [ ] **PLSH-01**: Fade-in animations on page sections (scroll-triggered)
- [ ] **PLSH-02**: Hover effects on project cards and interactive elements
- [ ] **PLSH-03**: Smooth page transitions and micro-interactions
- [ ] **PLSH-04**: Respects prefers-reduced-motion for accessibility

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Projects

- **PROJ-05**: Project process documentation (problem/solution/results writeups)
- **PROJ-06**: Project metrics and quantifiable impact display

### Advanced Visuals

- **ADVS-01**: 3D interactive element (Three.js) inspired by craftz.dog's voxel dog
- **ADVS-02**: Light/dark theme toggle

### Content

- **CONT-01**: Technical blog/writing section
- **CONT-02**: Testimonials/recommendations section

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Blog/posts section | Not needed for job hunting focus; empty blog worse than none |
| Light/dark theme toggle | Dark only — reduces complexity, matches desired aesthetic |
| Contact form with backend | Email link sufficient; avoids deployment complexity and spam |
| CMS/admin panel | Content managed in code; developer is the only editor |
| User accounts/auth | Static portfolio, no auth needed |
| Auto-playing media | Universally disliked, instant tab close |
| 3D elements (v1) | High complexity, performance risk; defer to v2 after validation |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| HERO-01 | — | Pending |
| HERO-02 | — | Pending |
| HERO-03 | — | Pending |
| PROJ-01 | — | Pending |
| PROJ-02 | — | Pending |
| PROJ-03 | — | Pending |
| PROJ-04 | — | Pending |
| ABUT-01 | — | Pending |
| ABUT-02 | — | Pending |
| ABUT-03 | — | Pending |
| RESM-01 | — | Pending |
| RESM-02 | — | Pending |
| TECH-01 | — | Pending |
| TECH-02 | — | Pending |
| TECH-03 | — | Pending |
| TECH-04 | — | Pending |
| PLSH-01 | — | Pending |
| PLSH-02 | — | Pending |
| PLSH-03 | — | Pending |
| PLSH-04 | — | Pending |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 0
- Unmapped: 20 ⚠️

---
*Requirements defined: 2026-02-16*
*Last updated: 2026-02-16 after initial definition*
