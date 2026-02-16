'use client'

import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{
        transitionDelay: inView ? '0ms' : `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}
