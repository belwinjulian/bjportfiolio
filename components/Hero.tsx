export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Greeting/Eyebrow */}
        <p
          className="text-primary text-sm sm:text-base font-medium tracking-wide uppercase mb-4 animate-fade-in-up"
          style={{ animationDelay: '0ms' }}
        >
          Hello, I'm
        </p>

        {/* Name */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight animate-fade-in-up"
          style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}
        >
          Belwin Julian
        </h1>

        {/* Professional Title */}
        <p
          className="text-xl sm:text-2xl md:text-3xl text-muted mb-6 animate-fade-in-up"
          style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}
        >
          Full Stack Engineer & ML Student
        </p>

        {/* Value Proposition */}
        <p
          className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}
        >
          I build scalable web applications with modern technologies and AI-powered
          tools. Georgia Tech MS student seeking new grad opportunities — passionate
          about clean architecture, attention to detail, and turning complex problems
          into elegant solutions.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up"
          style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}
