# Phase 3: About, Resume & Contact - Research

**Researched:** 2026-02-16
**Domain:** Content sections, SEO metadata, document presentation, contact patterns
**Confidence:** HIGH

## Summary

Phase 3 implements About, Resume, and Contact sections along with SEO optimization. The phase leverages Next.js 16's Metadata API for comprehensive SEO and Open Graph support, follows semantic HTML patterns for accessibility, and implements recruiter-focused content structure. Key technical decisions include: static PDF hosting (vs dynamic generation), Open Graph image generation using Next.js file conventions, simple mailto links (vs contact forms), and footer-based social link presentation.

The research reveals a mature ecosystem with clear best practices. Next.js 16.1.6 (updated February 2026) provides built-in metadata APIs that are now the standard for SEO. Resume presentation favors on-page HTML for scannability plus static PDF download. Email obfuscation is less critical than previously thought due to improved spam filtering, but simple techniques remain effective. Footer patterns emphasize minimalism with essential navigation and social links.

**Primary recommendation:** Use Next.js 16 Metadata API for all SEO/OG tags, semantic HTML sectioning with ARIA landmarks for accessibility, static PDF in /public for resume download, and minimal footer with social links.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Metadata API, App Router | Built-in SEO support, server components, file-based metadata |
| next/og | Built-in | Open Graph image generation | Native Next.js feature using Satori, no external dependencies |
| React | 19.2.4 | Component structure | Already in project, semantic component composition |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font | Built-in | Font optimization for OG images | Loading custom fonts in ImageResponse |
| Node.js fs/promises | Built-in | Reading local assets | OG image generation with local logos/images |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static PDF | Puppeteer/react-pdf | Dynamic generation adds complexity, build time, and serverless cost; static PDF is sufficient for job hunting portfolio |
| Metadata object | generateMetadata function | Dynamic metadata unnecessary for static portfolio; object is simpler |
| Contact form | Formspree/EmailJS | Forms add dependencies and maintenance; mailto is immediate and familiar to recruiters |
| next/og | @vercel/og | next/og is preferred for Next.js projects, maintained as part of framework |

**Installation:**
No additional packages required - all features built into Next.js 16.1.6

## Architecture Patterns

### Recommended Project Structure
```
app/
├── layout.tsx              # Root metadata (title template, OG defaults)
├── page.tsx                # Hero + sections wire-up
├── opengraph-image.tsx     # Dynamic OG image generation
└── opengraph-image.alt.txt # OG image alt text

components/
├── About.tsx               # Bio, background, skills overview
├── Resume.tsx              # On-page resume content
├── Contact.tsx             # Email + social links (optional dedicated section)
└── Footer.tsx              # Navigation, social links, copyright

public/
└── resume.pdf              # Static PDF for download

types/
└── resume.ts               # TypeScript interfaces for resume data
```

### Pattern 1: Metadata Configuration (Next.js 16)
**What:** Static metadata object exported from layout.tsx for global SEO
**When to use:** All portfolio pages benefit from proper metadata
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://belwinjulian.dev'),
  title: {
    default: 'Belwin Julian | Full Stack Developer',
    template: '%s | Belwin Julian',
  },
  description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development'],
  authors: [{ name: 'Belwin Julian' }],
  openGraph: {
    title: 'Belwin Julian | Full Stack Developer',
    description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
    url: 'https://belwinjulian.dev',
    siteName: 'Belwin Julian Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Belwin Julian - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belwin Julian | Full Stack Developer',
    description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### Pattern 2: Open Graph Image Generation
**What:** Use Next.js file convention to generate OG image with branding
**When to use:** Social sharing preview images
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const alt = 'Belwin Julian - Full Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>Belwin Julian</div>
        <div style={{ fontSize: 36, marginTop: 20, opacity: 0.8 }}>
          Full Stack Developer
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
```

### Pattern 3: Semantic Section Structure with ARIA Landmarks
**What:** Use semantic HTML elements with proper ARIA labeling for accessibility
**When to use:** All content sections (About, Resume, Contact)
**Example:**
```tsx
// Source: https://developer.mozilla.org/en-US/blog/aria-accessibility-html-landmark-roles/
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">About</h2>
      <div>
        <h3>Background</h3>
        <p>Bio content...</p>
      </div>
      <div>
        <h3>Skills</h3>
        <ul>
          <li>React & Next.js</li>
          <li>TypeScript</li>
        </ul>
      </div>
    </section>
  )
}
```

### Pattern 4: Resume On-Page + PDF Download
**What:** HTML resume for SEO/scannability + static PDF for traditional download
**When to use:** Always - recruiters need both formats
**Example:**
```tsx
export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading">
      <div className="flex justify-between items-center">
        <h2 id="resume-heading">Resume</h2>
        <a
          href="/resume.pdf"
          download="Belwin_Julian_Resume.pdf"
          className="btn-primary"
        >
          Download PDF
        </a>
      </div>

      {/* On-page resume content for SEO and quick scanning */}
      <div className="resume-content">
        <section aria-labelledby="experience-heading">
          <h3 id="experience-heading">Experience</h3>
          {/* Experience items */}
        </section>

        <section aria-labelledby="education-heading">
          <h3 id="education-heading">Education</h3>
          {/* Education items */}
        </section>
      </div>
    </section>
  )
}
```

### Pattern 5: Simple Contact with Social Links
**What:** Mailto link + social platform links (GitHub, LinkedIn)
**When to use:** Portfolio contact - recruiters familiar with direct links
**Example:**
```tsx
export function Footer() {
  return (
    <footer className="border-t border-border mt-20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/70">
            © 2026 Belwin Julian. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="mailto:belwin@example.com"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Email Belwin Julian"
            >
              Email
            </a>
            <a
              href="https://github.com/belwinjulian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/belwinjulian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### Pattern 6: Skills Visualization
**What:** Clean list-based presentation of tech stack with categorization
**When to use:** About section skills overview
**Example:**
```tsx
const skills = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  'Backend': ['Node.js', 'Express', 'PostgreSQL'],
  'Tools': ['Git', 'Docker', 'Vercel'],
}

export function SkillsDisplay() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h4 className="font-semibold mb-2">{category}</h4>
          <ul className="space-y-1">
            {items.map(skill => (
              <li key={skill} className="text-foreground/70">{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
```

### Anti-Patterns to Avoid
- **Over-engineered PDF generation:** Puppeteer/react-pdf adds build complexity and serverless costs for a static resume that changes infrequently
- **Contact forms without backend:** Client-side form services (Formspree, EmailJS) add dependencies; mailto is simpler and immediate
- **Excessive email obfuscation:** Modern spam filters are effective; simple JavaScript obfuscation or mailto links work fine for portfolios
- **Dynamic metadata for static content:** generateMetadata function unnecessary when portfolio content doesn't change per-request
- **Missing alt text for OG images:** Always provide opengraph-image.alt.txt or export alt from opengraph-image.tsx
- **Unlabeled landmarks:** When using multiple <section> elements, always use aria-labelledby to connect to heading IDs
- **Skills progress bars/percentages:** Arbitrary self-ratings (70% React) are meaningless to recruiters; simple lists are clearer

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SEO meta tags | Manual <Head> components with meta tags | Next.js Metadata API | Automatic merging, type safety, validation, server component support |
| OG image generation | Canvas API, custom image server | next/og ImageResponse | Built-in, optimized, cached, supports flexbox/fonts |
| PDF generation | Puppeteer for simple static resume | Static PDF file in /public | No build-time cost, no serverless function, instant download |
| Email obfuscation | Complex encryption schemes | Simple JavaScript or direct mailto | Modern spam filters work well, complex obfuscation hurts UX |
| Social icons | Custom SVG components | Existing icon library or simple text links | Icons already built, maintained, accessible |

**Key insight:** Next.js 16 has matured to the point where most SEO/metadata concerns are solved by framework features. Don't rebuild what's built-in.

## Common Pitfalls

### Pitfall 1: Metadata Not Appearing in Social Previews
**What goes wrong:** OG tags defined but social platforms show generic preview
**Why it happens:** metadataBase not set, causing relative URLs to be invalid; or images exceed size limits (Twitter: 5MB, Facebook: 8MB)
**How to avoid:**
- Always set metadataBase in root layout.tsx: `metadataBase: new URL('https://yourdomain.com')`
- Use absolute URLs for OG images or ensure metadataBase is configured
- Test with validators: Facebook Sharing Debugger, Twitter Card Validator
- Check image file sizes and dimensions (recommended: 1200x630)
**Warning signs:** Browser dev tools show meta tags but social preview doesn't update

### Pitfall 2: OG Image Not Generating at Build Time
**What goes wrong:** opengraph-image.tsx exists but image not generated
**Why it happens:** TypeScript errors, missing exports (alt, size, contentType), or ImageResponse syntax errors
**How to avoid:**
- Export all required metadata: alt, size, contentType
- Use ImageResponse from 'next/og' (not @vercel/og)
- Check build output for errors: `next build` shows OG image generation status
- Test locally: visit /opengraph-image directly in browser
**Warning signs:** Build completes but /opengraph-image returns 404

### Pitfall 3: Resume PDF Not Downloadable
**What goes wrong:** Link exists but clicking opens in browser instead of downloading
**Why it happens:** Missing download attribute on anchor tag
**How to avoid:**
- Use `<a href="/resume.pdf" download="Filename.pdf">` pattern
- Ensure PDF is in /public directory
- Use descriptive download filename (Firstname_Lastname_Resume.pdf)
- Test in multiple browsers (Safari handles downloads differently)
**Warning signs:** Users report "can't save resume" or PDF opens in new tab

### Pitfall 4: Poor Mobile Resume Experience
**What goes wrong:** Resume readable on desktop but unreadable on mobile
**Why it happens:** Fixed widths, small fonts, horizontal scrolling
**How to avoid:**
- Use responsive typography (text-base on mobile, text-lg on desktop)
- Test on actual mobile devices, not just browser DevTools
- Ensure PDF is also mobile-friendly (many recruiters browse on phone)
- Consider stacked layout for mobile vs multi-column for desktop
**Warning signs:** High mobile bounce rate on /resume route

### Pitfall 5: Missing Accessibility Landmarks
**What goes wrong:** Screen readers can't navigate between sections efficiently
**Why it happens:** Using generic <div> instead of semantic HTML; missing ARIA labels on <section> elements
**How to avoid:**
- Use <section> with aria-labelledby pointing to heading ID
- Use <nav> for navigation, <footer> for footer content
- Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- Use automated testing: axe DevTools, Lighthouse accessibility audit
**Warning signs:** Lighthouse accessibility score below 90

### Pitfall 6: Email Harvesting from Mailto Links
**What goes wrong:** Simple mailto link leads to spam
**Why it happens:** Bots scrape email addresses from HTML source
**How to avoid:**
- Simple JavaScript obfuscation is sufficient for most cases
- Alternative: Use contact form service if spam becomes problematic
- Don't over-engineer: complex obfuscation hurts legitimate users more than it helps
- Modern email providers have excellent spam filtering
**Warning signs:** Increase in spam after portfolio launch (monitor for 2 weeks)

## Code Examples

Verified patterns from official sources:

### Complete Metadata Configuration
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://belwinjulian.dev'),
  title: {
    default: 'Belwin Julian | Full Stack Developer',
    template: '%s | Belwin Julian',
  },
  description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Web Development'],
  authors: [{ name: 'Belwin Julian' }],
  creator: 'Belwin Julian',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://belwinjulian.dev',
    title: 'Belwin Julian | Full Stack Developer',
    description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
    siteName: 'Belwin Julian Portfolio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Belwin Julian - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belwin Julian | Full Stack Developer',
    description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### About Section with Bio and Skills
```tsx
// components/About.tsx
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <h2 id="about-heading" className="text-3xl font-bold mb-8">
        About
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4">Background</h3>
          <p className="text-foreground/80 mb-4">
            Full stack developer with X years of experience building modern web
            applications. Passionate about creating performant, accessible user
            experiences and writing maintainable code.
          </p>
          <p className="text-foreground/80">
            Currently focused on React, Next.js, and TypeScript development,
            with strong backend experience in Node.js and PostgreSQL.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Frontend</h4>
              <p className="text-foreground/70">
                React, Next.js, TypeScript, Tailwind CSS
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Backend</h4>
              <p className="text-foreground/70">
                Node.js, Express, PostgreSQL, REST APIs
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tools & Platform</h4>
              <p className="text-foreground/70">
                Git, Docker, Vercel, CI/CD
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Resume Section with PDF Download
```tsx
// components/Resume.tsx
export function Resume() {
  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 id="resume-heading" className="text-3xl font-bold">
          Resume
        </h2>
        <a
          href="/resume.pdf"
          download="Belwin_Julian_Resume.pdf"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          aria-label="Download resume as PDF"
        >
          Download PDF
        </a>
      </div>

      <div className="space-y-12">
        <section aria-labelledby="experience-heading">
          <h3 id="experience-heading" className="text-2xl font-semibold mb-6">
            Experience
          </h3>
          <div className="space-y-6">
            <article className="border-l-2 border-border pl-4">
              <h4 className="text-xl font-medium">Full Stack Developer</h4>
              <p className="text-foreground/70 mb-2">Company Name • 2023 - Present</p>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li>Built and shipped 5+ production features using React and Next.js</li>
                <li>Improved application performance by 40% through optimization</li>
                <li>Collaborated with design team to implement accessible UI components</li>
              </ul>
            </article>
          </div>
        </section>

        <section aria-labelledby="education-heading">
          <h3 id="education-heading" className="text-2xl font-semibold mb-6">
            Education
          </h3>
          <article className="border-l-2 border-border pl-4">
            <h4 className="text-xl font-medium">Bachelor of Science in Computer Science</h4>
            <p className="text-foreground/70">University Name • 2019 - 2023</p>
          </article>
        </section>
      </div>
    </section>
  )
}
```

### Footer with Contact and Social Links
```tsx
// components/Footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-foreground/70 text-sm">
            © {currentYear} Belwin Julian. All rights reserved.
          </p>

          <nav aria-label="Social links">
            <ul className="flex gap-6">
              <li>
                <a
                  href="mailto:belwin@example.com"
                  className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  aria-label="Email Belwin Julian"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/belwinjulian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  aria-label="Visit GitHub profile"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/belwinjulian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  aria-label="Visit LinkedIn profile"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
```

### Simple JavaScript Email Obfuscation (Optional)
```tsx
// Source: https://spencermortensen.com/articles/email-obfuscation/
'use client'

import { useEffect, useState } from 'react'

export function ObfuscatedEmail() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Simple obfuscation - concatenate at runtime
    const user = 'belwin'
    const domain = 'example.com'
    setEmail(`${user}@${domain}`)
  }, [])

  if (!email) return <span>Loading...</span>

  return (
    <a
      href={`mailto:${email}`}
      className="text-foreground/70 hover:text-foreground transition-colors"
    >
      Email
    </a>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next/head with manual meta tags | Metadata API in layout.tsx | Next.js 13.2 (Feb 2023) | Type safety, automatic merging, server component support |
| @vercel/og package | next/og built-in | Next.js 14+ (2024) | One less dependency, framework-maintained |
| Dynamic PDF generation (Puppeteer) | Static PDF + on-page HTML | Ongoing trend | Simpler deployment, faster loads, lower cost |
| Complex email obfuscation | Simple approaches or direct mailto | 2020s spam filter improvement | Better UX without sacrificing protection |
| Custom OG image endpoints | File convention (opengraph-image.tsx) | Next.js 13.3 (May 2023) | Automatic routing, caching, simpler implementation |
| Skills percentage bars | Simple categorized lists | 2024-2025 portfolio trends | More honest, less arbitrary, faster to scan |

**Deprecated/outdated:**
- **viewport/themeColor in metadata object:** Deprecated in Next.js 14, use viewport configuration instead
- **@vercel/og package:** Still works but next/og is preferred for Next.js projects
- **Contact forms for portfolios:** Still valid but mailto links are making a comeback for simplicity
- **Dynamic metadata for static portfolios:** generateMetadata function unnecessary overhead when content is static

## Open Questions

1. **Should social links appear in navigation, footer, or both?**
   - What we know: Most 2026 portfolios put social links in footer only; navigation is reserved for content sections
   - What's unclear: Whether including email in both nav and footer creates redundancy
   - Recommendation: Footer only for social links; navigation focuses on content sections (About, Projects, Resume, Contact)

2. **Is JavaScript email obfuscation still necessary in 2026?**
   - What we know: Modern spam filters are very effective; simple obfuscation defeats most bots; complex obfuscation hurts UX
   - What's unclear: Whether portfolio context (publicly shared URL) changes spam risk
   - Recommendation: Start with simple mailto, add basic JavaScript obfuscation only if spam becomes problematic

3. **Should we create a dedicated Contact section or embed in footer?**
   - What we know: ABUT-03 requires "email contact link accessible from any page"; footer accomplishes this
   - What's unclear: Whether recruiters expect a dedicated #contact section
   - Recommendation: Include in footer for accessibility; optionally add small contact section for visual symmetry if design calls for it

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 Metadata API - https://nextjs.org/docs/app/api-reference/functions/generate-metadata (2026-02-11)
- Next.js OG Image Generation - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image (2026-02-11)
- Next.js Metadata and OG Images Guide - https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- ARIA Landmark Roles - https://developer.mozilla.org/en-US/blog/aria-accessibility-html-landmark-roles/
- Email Obfuscation 2026 - https://spencermortensen.com/articles/email-obfuscation/

### Secondary (MEDIUM confidence)
- Developer Portfolio Best Practices - https://www.webportfolios.dev/blog/developer-portfolio-structure
- Footer Design Patterns 2026 - https://www.eleken.co/blog-posts/footer-ux
- Skills Display Strategies - https://medium.com/@zulfikarditya/building-a-modern-developer-portfolio-a-technical-deep-dive-a95d068b99fd
- Resume Website with Next.js - https://www.colinhemphill.com/blog/creating-a-resume-website-and-pdf-generator-with-nextjs
- Portfolio Footer Examples - https://curator.io/blog/footer-for-portfolio-website

### Secondary (verified with official docs)
- Next.js 16 SEO Guide - https://www.djamware.com/post/697a19b07c935b6bb054313e/next-js-seo-optimization-guide--2026-edition
- Dynamic OG Images Tutorial - https://makerkit.dev/blog/tutorials/dynamic-og-image
- Web Developer Portfolio Examples - https://elementor.com/blog/best-web-developer-portfolio-examples/

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All features built into Next.js 16.1.6, official docs current as of Feb 2026
- Architecture: HIGH - Next.js file conventions and metadata API are well-documented and stable
- Pitfalls: MEDIUM-HIGH - Common issues well-documented in community; some specific to this project context

**Research date:** 2026-02-16
**Valid until:** March 2026 (30 days) - metadata APIs are stable; portfolio patterns slow-moving
