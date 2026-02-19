import { Project } from '@/types/project'
import discopoly from '@/public/projects/discopoly.png'
import nitestaurant from '@/public/projects/nitestaurant.png'

export const projects: Project[] = [
  {
    id: 'discopoly',
    title: 'Discopoly',
    description: 'A Monopoly-inspired city-building board game that runs inside Discord voice channels. 2-6 players, animated dice, property trading, and cosmetics — no downloads required.',
    image: discopoly,
    techStack: ['React', 'TypeScript', 'Node.js', 'Colyseus', 'Discord SDK'],
    demoUrl: 'https://discord.com/oauth2/authorize?client_id=1470907522444558481',
    demoLabel: 'Install',
    githubUrl: 'https://github.com/belwinjulian/Discopoly',
  },
  {
    id: 'nitestaurant',
    title: 'Nitestaurant',
    description: 'A mobile-first web app that helps college students find food spots that are actually open near them right now. Interactive map with real-time hours, category filters, and late-night smart defaults.',
    image: nitestaurant,
    techStack: ['React', 'TypeScript', 'Vite', 'Leaflet', 'Zustand'],
    demoUrl: 'https://nitestaurant.vercel.app/',
    githubUrl: 'https://github.com/belwinjulian/Nitestaurant',
  },
]
