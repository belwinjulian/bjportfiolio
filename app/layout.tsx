import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://belwinjulian.dev'),
  title: {
    default: 'Belwin Julian | Full Stack Developer',
    template: '%s | Belwin Julian',
  },
  description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development', 'Portfolio'],
  authors: [{ name: 'Belwin Julian' }],
  creator: 'Belwin Julian',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://belwinjulian.dev',
    title: 'Belwin Julian | Full Stack Developer',
    description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
    siteName: 'Belwin Julian Portfolio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Belwin Julian - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belwin Julian | Full Stack Developer',
    description: 'Full stack developer portfolio showcasing web applications, technical expertise, and professional experience.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
