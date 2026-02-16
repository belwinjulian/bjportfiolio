export default function Resume() {
  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20"
    >
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
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
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
              <h4 className="text-xl font-medium">Full Stack Developer</h4>
              <p className="text-foreground/70 mb-2">Company Name | 2023 - Present</p>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li>
                  Developed and maintained multiple full-stack applications using React, Next.js,
                  and Node.js, serving over 10,000 daily active users
                </li>
                <li>
                  Implemented comprehensive testing strategies including unit and integration tests,
                  increasing code coverage from 45% to 85%
                </li>
                <li>
                  Collaborated with cross-functional teams to deliver features on time, participating
                  in agile ceremonies and code reviews
                </li>
              </ul>
            </article>

            <article className="border-l-2 border-border pl-4">
              <h4 className="text-xl font-medium">Frontend Developer</h4>
              <p className="text-foreground/70 mb-2">Previous Company | 2021 - 2023</p>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li>
                  Built responsive user interfaces using React and TypeScript, ensuring cross-browser
                  compatibility and accessibility standards (WCAG 2.1 AA)
                </li>
                <li>
                  Optimized application performance, reducing initial load time by 40% through code
                  splitting and lazy loading techniques
                </li>
                <li>
                  Mentored junior developers through pair programming sessions and technical
                  documentation, improving team productivity
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
          <article className="border-l-2 border-border pl-4">
            <h4 className="text-xl font-medium">Bachelor of Science in Computer Science</h4>
            <p className="text-foreground/70 mb-2">University Name | 2019 - 2023</p>
            <p className="text-foreground/80">
              Specialized in software engineering and web development. Graduated with honors.
              Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development,
              Software Engineering.
            </p>
          </article>
        </section>

        {/* Skills Summary Section */}
        <section aria-labelledby="skills-summary-heading">
          <h3 id="skills-summary-heading" className="text-2xl font-semibold mb-6">
            Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Frontend</h4>
              <ul className="space-y-1">
                <li className="text-foreground/70">React</li>
                <li className="text-foreground/70">Next.js</li>
                <li className="text-foreground/70">TypeScript</li>
                <li className="text-foreground/70">Tailwind CSS</li>
                <li className="text-foreground/70">HTML/CSS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Backend</h4>
              <ul className="space-y-1">
                <li className="text-foreground/70">Node.js</li>
                <li className="text-foreground/70">Express</li>
                <li className="text-foreground/70">PostgreSQL</li>
                <li className="text-foreground/70">REST APIs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tools</h4>
              <ul className="space-y-1">
                <li className="text-foreground/70">Git</li>
                <li className="text-foreground/70">Docker</li>
                <li className="text-foreground/70">Vercel</li>
                <li className="text-foreground/70">CI/CD</li>
                <li className="text-foreground/70">Linux</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
