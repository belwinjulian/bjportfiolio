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
              I'm a full stack developer and recent Computer Science graduate from Rutgers
              University, currently pursuing my M.S. at Georgia Tech with a specialization
              in Machine Learning.
            </p>
            <p className="text-foreground/80 mb-4">
              Through software engineering internships at Gigaforce and SageSure, I've built
              full stack applications from the ground up — working across frontend interfaces,
              backend APIs, and everything in between. I enjoy turning complex problems into
              clean, functional products.
            </p>
            <p className="text-foreground/80">
              I'm especially excited about the intersection of software engineering and AI,
              and I actively leverage AI-powered development tools to ship faster and build
              smarter.
            </p>
          </div>

          {/* Right column: Technical Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Languages</h4>
                <p className="text-foreground/70">
                  Python, Java, JavaScript, TypeScript, HTML/CSS
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Frontend</h4>
                <p className="text-foreground/70">
                  React, Next.js, Tailwind CSS
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Backend</h4>
                <p className="text-foreground/70">
                  Node.js, REST APIs, PostgreSQL
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">AI & Tools</h4>
                <p className="text-foreground/70">
                  Claude Code, Cursor, Gemini, Vercel, Git
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
