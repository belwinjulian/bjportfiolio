'use client'

import { AnimatedSection } from '@/components/AnimatedSection'

export default function Resume() {
  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20"
    >
      <AnimatedSection>
        {/* Header with Download Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2
            id="resume-heading"
            className="text-3xl sm:text-4xl font-bold"
          >
            Resume
          </h2>
          <a
            href="/resume.pdf"
            download="Belwin_Julian_Resume.pdf"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Download resume as PDF"
          >
            Download PDF
          </a>
        </div>

        {/* Resume Content */}
        <div className="space-y-12">
          {/* Experience Section */}
          <section aria-labelledby="experience-heading">
            <h3 id="experience-heading" className="text-2xl font-semibold mb-6">
              Experience
            </h3>
            <div className="space-y-6">
              <article className="border-l-2 border-border pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h4 className="text-xl font-medium">Software Engineer Intern</h4>
                  <span className="text-foreground/60 text-sm">June 2025 &ndash; August 2025</span>
                </div>
                <p className="text-foreground/70 mb-2">SageSure &middot; Jersey City, NJ</p>
                <ul className="list-disc list-inside space-y-1 text-foreground/80">
                  <li>
                    Shipped a real-time status indicator displaying site availability, cutting
                    incident-response time 50% by polling the uptime API and surfacing alerts
                    in the React portal
                  </li>
                  <li>
                    Delivered a reusable Breadcrumbs component to the Design System, boosting
                    developer velocity 30% and improving accessibility across 15+ internal apps
                    with ARIA labeling and Storybook docs
                  </li>
                  <li>
                    Developed an AI-powered meeting assistant that creates action items from
                    meetings; presented to 300+ attendees including company executives
                  </li>
                </ul>
              </article>

              <article className="border-l-2 border-border pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h4 className="text-xl font-medium">Software Engineer Intern</h4>
                  <span className="text-foreground/60 text-sm">June 2024 &ndash; August 2024</span>
                </div>
                <p className="text-foreground/70 mb-2">Gigaforce &middot; Sunnyvale, CA</p>
                <ul className="list-disc list-inside space-y-1 text-foreground/80">
                  <li>
                    Developed a benchmarking application enabling insurance companies to upload
                    data and compare against industry averages across 9+ participants
                  </li>
                  <li>
                    Implemented a secure login system using Express, Node, and REST APIs with
                    password hashing, achieving 100% reduction in unauthorized access incidents
                  </li>
                  <li>
                    Built interactive charts with Plotly and Streamlit, resulting in a 60%
                    increase in user engagement
                  </li>
                  <li>
                    Utilized Pandas DataFrames to analyze user-uploaded data, enhancing
                    processing speed by 40%
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Education Section */}
          <section aria-labelledby="education-heading">
            <h3 id="education-heading" className="text-2xl font-semibold mb-6">
              Education
            </h3>
            <div className="space-y-6">
              <article className="border-l-2 border-border pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h4 className="text-xl font-medium">M.S. Computer Science (Machine Learning)</h4>
                  <span className="text-foreground/60 text-sm">In Progress</span>
                </div>
                <p className="text-foreground/70">Georgia Institute of Technology</p>
              </article>

              <article className="border-l-2 border-border pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h4 className="text-xl font-medium">B.S. Computer Science</h4>
                  <span className="text-foreground/60 text-sm">Sep 2022 &ndash; May 2026</span>
                </div>
                <p className="text-foreground/70 mb-2">Rutgers University &middot; New Brunswick, NJ</p>
                <p className="text-foreground/80">
                  GPA: 3.6 &middot; 3x Dean&apos;s List &middot; Coursework: Data Structures, Algorithms
                  Analysis, Systems Programming, AI, Data Science, Computer Architecture
                </p>
              </article>
            </div>
          </section>

          {/* Skills Summary Section */}
          <section aria-labelledby="skills-summary-heading">
            <h3 id="skills-summary-heading" className="text-2xl font-semibold mb-6">
              Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Languages</h4>
                <ul className="space-y-1">
                  <li className="text-foreground/70">Python</li>
                  <li className="text-foreground/70">Java</li>
                  <li className="text-foreground/70">JavaScript / TypeScript</li>
                  <li className="text-foreground/70">HTML / CSS</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Frameworks</h4>
                <ul className="space-y-1">
                  <li className="text-foreground/70">React / Next.js</li>
                  <li className="text-foreground/70">Node.js / Express</li>
                  <li className="text-foreground/70">Tailwind CSS</li>
                  <li className="text-foreground/70">Plotly / Streamlit</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tools & AI</h4>
                <ul className="space-y-1">
                  <li className="text-foreground/70">Git</li>
                  <li className="text-foreground/70">Vercel</li>
                  <li className="text-foreground/70">Claude Code / Cursor</li>
                  <li className="text-foreground/70">Pandas / NumPy</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </AnimatedSection>
    </section>
  );
}
