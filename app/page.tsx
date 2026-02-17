import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import About from '@/components/About'
import Resume from '@/components/Resume'
import { Projects } from '@/components/Projects'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="scroll-mt-20">
        <Hero />
        <About />
        <Projects />
        <Resume />
        <Footer />
      </main>
    </>
  )
}
