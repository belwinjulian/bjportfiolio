import { Project } from '@/types/project'
import placeholder1 from '@/public/projects/placeholder-1.webp'
import placeholder2 from '@/public/projects/placeholder-2.webp'
import placeholder3 from '@/public/projects/placeholder-3.webp'

export const projects: Project[] = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'Personal developer portfolio built with Next.js, featuring dark theme, responsive design, and optimized performance.',
    image: placeholder1,
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    demoUrl: 'https://belwinjulian.dev',
    githubUrl: 'https://github.com/belwinjulian/portfolio',
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'Full-stack task management application with real-time updates, drag-and-drop organization, and team collaboration features.',
    image: placeholder2,
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    demoUrl: 'https://taskflow-demo.vercel.app',
    githubUrl: 'https://github.com/belwinjulian/taskflow',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Interactive weather dashboard with location-based forecasts, animated visualizations, and severe weather alerts.',
    image: placeholder3,
    techStack: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
    demoUrl: 'https://weather-dash-demo.vercel.app',
    githubUrl: 'https://github.com/belwinjulian/weather-dashboard',
  },
]
