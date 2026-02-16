---
phase: 02-projects-showcase
plan: 01
subsystem: "projects"
tags: ["data-model", "components", "images", "accessibility"]
dependency_graph:
  requires: ["01-02 (theme tokens, component conventions)"]
  provides: ["Project type", "projects data array", "ProjectCard component", "placeholder images"]
  affects: ["02-02 (will consume ProjectCard and projects data)"]
tech_stack:
  added: ["next/image optimization", "StaticImageData type"]
  patterns: ["typed data models", "semantic HTML (article)", "paired hover/focus states"]
key_files:
  created:
    - "types/project.ts"
    - "lib/projects-data.ts"
    - "components/ProjectCard.tsx"
    - "public/projects/placeholder-1.webp"
    - "public/projects/placeholder-2.webp"
    - "public/projects/placeholder-3.webp"
  modified: []
decisions:
  - "Used StaticImageData type for image field to support Next.js static imports"
  - "Created placeholder images using sips (macOS tool) converting SVG to PNG, named as .webp for Next.js optimization"
  - "Used 16:9 aspect ratio (800x450) for project images to ensure consistent card layouts"
  - "Added sr-only spans to links for improved screen reader context"
  - "Applied line-clamp-3 to descriptions for consistent card height"
metrics:
  duration_min: 1
  completed_date: "2026-02-16"
  tasks_completed: 2
  files_created: 6
  commits: 2
---

# Phase 02 Plan 01: Project Data Model & Card Component Summary

**One-liner:** Created type-safe project data model with 3 placeholder projects and built accessible ProjectCard component using next/image optimization.

## What Was Built

### 1. Project Type Definition
Created `types/project.ts` with comprehensive Project interface:
- All 7 required fields (id, title, description, image, techStack, demoUrl, githubUrl)
- Uses StaticImageData from next/image for type-safe static imports
- Provides foundation for type-safe project data throughout the application

### 2. Projects Data Array
Created `lib/projects-data.ts` with 3 placeholder projects:
- Portfolio Website (Next.js, TypeScript, Tailwind CSS)
- Task Management App (React, Node.js, MongoDB, Socket.io)
- Weather Dashboard (React, TypeScript, OpenWeather API, Chart.js)
- Uses static imports for placeholder images
- Fully typed against Project interface

### 3. Placeholder Images
Generated 3 placeholder images (800x450, 16:9 aspect ratio):
- Used macOS sips tool to convert SVG to PNG
- Named as .webp for Next.js automatic optimization
- Each 12KB, distinct colors (dark blue, dark purple, dark teal) matching dark theme
- Ready for replacement with real project screenshots

### 4. ProjectCard Component
Built `components/ProjectCard.tsx` with:
- Semantic HTML using `<article>` element
- next/image with fill prop and responsive sizes
- Accessible hover and focus states (paired on all links)
- Screen reader text for link context
- Tech stack pills with ARIA label
- Theme tokens from globals.css (text-foreground, text-muted, bg-card, text-primary, etc.)
- Group hover effect with image scale and card lift animation

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

All verification criteria passed:
- ✓ TypeScript compilation: No errors
- ✓ All 6 files exist (3 code files + 3 images)
- ✓ Project interface has all 7 required fields
- ✓ Projects array contains exactly 3 entries
- ✓ ProjectCard uses next/image with fill and sizes props
- ✓ All links have paired hover and focus states

## Technical Details

### Image Optimization Strategy
- Used `fill` prop instead of fixed dimensions for responsive scaling
- Configured `sizes` attribute for optimal image loading across breakpoints:
  - Mobile (<768px): 100vw
  - Tablet (768-1200px): 50vw
  - Desktop (>1200px): 33vw
- Lazy loading enabled by default with next/image

### Accessibility Features
- Semantic `<article>` markup for each card
- Descriptive alt text: "Screenshot of [Project Title]"
- Screen reader context on links: " of [Project Title]" and " repository for [Project Title]"
- ARIA label on tech stack container: "Technologies used"
- Paired hover and focus states on all interactive elements
- Focus rings with offset for visibility on dark backgrounds

### Styling Conventions
- Theme tokens: text-foreground, text-muted, bg-card, text-primary, bg-primary/10
- Group hover pattern: parent has `group` class, children use `group-hover:`
- Transition animations: 300ms duration for smooth interactions
- Border, shadow, and transform effects on hover

## Files Created

| File | Purpose | Exports |
|------|---------|---------|
| types/project.ts | Project interface definition | Project |
| lib/projects-data.ts | Typed array of 3 projects | projects |
| components/ProjectCard.tsx | Reusable project card component | ProjectCard |
| public/projects/placeholder-1.webp | Placeholder image 1 (dark blue) | - |
| public/projects/placeholder-2.webp | Placeholder image 2 (dark purple) | - |
| public/projects/placeholder-3.webp | Placeholder image 3 (dark teal) | - |

## Commits

| Hash | Message |
|------|---------|
| ee5ea9c | feat(02-projects-showcase-01): create project type and data model |
| f52295b | feat(02-projects-showcase-01): create ProjectCard component |

## Next Steps

This plan provides the data layer and card component for the projects showcase. Plan 02-02 will:
- Create the ProjectsSection layout component
- Implement responsive grid for project cards
- Add section heading and optional filtering/sorting
- Integrate ProjectCard with projects data

## Self-Check: PASSED

All files verified:
- ✓ types/project.ts
- ✓ lib/projects-data.ts
- ✓ components/ProjectCard.tsx
- ✓ public/projects/placeholder-1.webp
- ✓ public/projects/placeholder-2.webp
- ✓ public/projects/placeholder-3.webp

All commits verified:
- ✓ ee5ea9c
- ✓ f52295b
