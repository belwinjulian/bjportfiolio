'use client'

import { AnimatedSection } from '@/components/AnimatedSection'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-border bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright text */}
            <p className="text-foreground/70 text-sm">
              © {currentYear} Belwin Julian. All rights reserved.
            </p>

            {/* Social links */}
            <nav aria-label="Social links">
              <ul className="flex gap-6">
                <li>
                  <a
                    href="mailto:belwin@example.com"
                    aria-label="Email Belwin Julian"
                    className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/belwinjulian"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit GitHub profile"
                    className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/belwinjulian"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LinkedIn profile"
                    className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
