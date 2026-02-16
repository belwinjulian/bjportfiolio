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
      <Hero />
      <About />
      <Projects />
      <Resume />
      <Footer />
    </>
  )
}
