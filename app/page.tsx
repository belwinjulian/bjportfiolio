import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      {/* Placeholder sections for navigation targets */}
      <section id="about" className="min-h-screen flex items-center justify-center scroll-mt-20">
        <p className="text-muted">About section coming soon</p>
      </section>
      <section id="projects" className="min-h-screen flex items-center justify-center scroll-mt-20">
        <p className="text-muted">Projects section coming soon</p>
      </section>
      <section id="resume" className="min-h-screen flex items-center justify-center scroll-mt-20">
        <p className="text-muted">Resume section coming soon</p>
      </section>
      <section id="contact" className="min-h-screen flex items-center justify-center scroll-mt-20">
        <p className="text-muted">Contact section coming soon</p>
      </section>
    </>
  )
}
