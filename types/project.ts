import { StaticImageData } from 'next/image'

export interface Project {
  id: string
  title: string
  description: string
  image: StaticImageData
  techStack: string[]
  demoUrl: string
  demoLabel?: string
  githubUrl: string
}
