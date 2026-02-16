'use client'

import { AnimatedSection } from '@/components/AnimatedSection'

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20"
    >
      <AnimatedSection>
        <h2
          id="about-heading"
          className="text-3xl sm:text-4xl font-bold mb-8"
        >
          About
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column: Background */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Background</h3>
            <p className="text-foreground/80 mb-4">
              I'm a full stack developer with a passion for building modern web applications
              that combine powerful functionality with intuitive user experiences. My journey
              in software development has been driven by curiosity and a constant desire to
              learn and adapt to new technologies.
            </p>
            <p className="text-foreground/80 mb-4">
              With extensive experience in React, Next.js, and TypeScript, I specialize in
              creating scalable, performant applications that prioritize accessibility and
              user experience. I believe that great software should be fast, accessible to
              everyone, and a joy to use.
            </p>
            <p className="text-foreground/80">
              Whether I'm architecting backend systems, crafting pixel-perfect interfaces, or
              optimizing application performance, I approach every project with attention to
              detail and a commitment to delivering high-quality solutions that solve real
              problems.
            </p>
          </div>

          {/* Right column: Technical Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Frontend</h4>
                <p className="text-foreground/70">
                  React, Next.js, TypeScript, Tailwind CSS, HTML/CSS
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
                  Git, Docker, Vercel, CI/CD, Linux
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
