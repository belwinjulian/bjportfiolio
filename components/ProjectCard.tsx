import Image from 'next/image'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30 will-change-transform">
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>

        {/* Description */}
        <p className="text-muted mb-4 line-clamp-3">{project.description}</p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2 mb-4" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links row */}
        <div className="flex gap-4">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary transition-all duration-200 hover:text-primary/80 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
          >
            Live Demo
            <span className="sr-only"> of {project.title}</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary transition-all duration-200 hover:text-primary/80 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
          >
            GitHub
            <span className="sr-only"> repository for {project.title}</span>
          </a>
        </div>
      </div>
    </article>
  )
}
