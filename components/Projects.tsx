import { projects } from '@/lib/projects-data'
import { ProjectCard } from '@/components/ProjectCard'

export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header area */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            A selection of projects showcasing full-stack development, clean architecture, and modern web technologies.
          </p>
        </div>

        {/* Grid of project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
