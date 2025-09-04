/*
  File: app/page.tsx
  Single-file preview for Akshar Bhakare's portfolio (Next.js App Router)
  - Tailwind CSS required
  - framer-motion installed
  - lucide-react installed
  - inter-tight font in global layout

  To run locally:
  1. Create Next app: `npx create-next-app@latest --experimental-app` (or your preferred setup)
  2. Install: `npm i framer-motion lucide-react` (Tailwind already configured)
  3. Paste this file into `app/page.tsx` and adapt assets in /public
*/

'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Download, Mail, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react'

const THEME_KEY = 'akshar_theme'

export default function Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  // On mount, read saved theme or system preference
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
      return
    }
    const system = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(system)
  }, [])

  // Apply theme class and persist when `theme` changes
  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem(THEME_KEY, theme) } catch (e) {}
  }, [theme, mounted])

  // enable smooth scrolling (helps anchor links)
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => { document.documentElement.style.scrollBehavior = prev }
  }, [])

  // helper: smooth scroll to section and account for sticky header
  function handleNavClick(e: React.MouseEvent, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const header = document.querySelector('header')
    const headerHeight = header ? (header as HTMLElement).getBoundingClientRect().height : 0
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12 // small offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const projects = [
    {
      name: 'PassOP',
      description: "Simple password manager with Auth.js, encrypted storage, and vault UI.",
      tech: ['Next.js', 'Tailwind', 'Auth.js', 'MongoDB'],
      demo: '#',
      github: '#',
      image: 'passop-screenshot.png'
    },
    {
      name: 'DevNotes',
      description: 'Markdown notebook with sync, search, and offline-first caching.',
      tech: ['React', 'Vite', 'IndexedDB', 'PWA'],
      demo: '#',
      github: '#',
      image: 'devnotes-screenshot.png'
    },
    {
      name: 'InsightBoard',
      description: 'Analytics dashboard with role-based auth and real-time charts.',
      tech: ['Next.js', 'Prisma', 'Postgres', 'WebSockets'],
      demo: '#',
      github: '#',
      image: 'insightboard-screenshot.png'
    }
  ]

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0F1117] dark:to-[#0B0D12] font-inter-tight text-gray-800 dark:text-gray-100">
      <header className="fixed top-4 left-0 right-0 z-40">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 backdrop-blur-md bg-gray-100/80 dark:bg-[#0F1117]/60 rounded-2xl shadow-sm border border-gray-200/50 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <a href="#home" className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Akshar Bhakare</a>
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium hover:text-emerald-500 dark:hover:text-cyan-400 transition">About</a>
              <a href="#projects" className="text-sm font-medium hover:text-emerald-500 dark:hover:text-cyan-400 transition">Projects</a>
              <a href="#contact" className="text-sm font-medium hover:text-emerald-500 dark:hover:text-cyan-400 transition">Contact</a>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/resume.pdf" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium bg-emerald-400 hover:bg-emerald-500 text-gray-900 shadow-sm transition"> <Download size={16} /> Resume</a>
            <a href="/resume.pdf" className="sm:hidden p-2 rounded-full bg-emerald-400 hover:bg-emerald-500 text-gray-900 transition"> <Download size={16} /></a>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full hover:bg-gray-200/60 dark:hover:bg-neutral-800/40 transition"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </nav>
      </header>
        {/* HERO */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 snap-start relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-300/20 dark:bg-[#22D3EE]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-300/20 dark:bg-[#6EE7B7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto w-full">
            {/* Mobile Layout */}
            <div className="lg:hidden text-center space-y-8 py-8">
              {/* Profile Picture - Top on Mobile */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="flex justify-center"
              >
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-br from-gray-100/90 to-gray-200/60 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-gray-300/30 dark:border-neutral-700 shadow-2xl overflow-hidden">
                  <div className="absolute inset-3 rounded-2xl bg-gradient-to-tr from-emerald-400/20 via-transparent to-cyan-400/20 overflow-hidden">
                    <img 
                      src="/profile-placeholder.png" 
                      alt="Akshar Bhakare" 
                      className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-emerald-400/30 via-transparent to-cyan-400/30 bg-clip-border"></div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300/50 dark:border-neutral-700 text-sm font-medium"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Available for work
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-3xl sm:text-4xl font-black leading-tight"
                >
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-gradient bg-300% dark:from-[#22D3EE] dark:via-[#6EE7B7] dark:to-[#22D3EE]">
                    Akshar
                  </span>
                  <br />
                  <span className="text-gray-700 dark:text-gray-200">Full-Stack Developer</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-lg mx-auto"
                >
                  I craft exceptional digital experiences with modern technologies, 
                  turning ideas into scalable web applications that make a difference.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <a 
                    href="/resume.pdf" 
                    className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-400/25 hover:scale-105 transition-all duration-300"
                  >
                    <Download size={18} />
                    Download Resume
                    <div className="w-0 group-hover:w-2 h-2 bg-black/20 rounded-full transition-all duration-300"></div>
                  </a>
                  <a 
                    href="#projects" 
                    className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-gray-400 dark:border-neutral-600 hover:border-emerald-400 dark:hover:border-[#22D3EE] hover:bg-gray-200/50 dark:hover:bg-white/5 transition-all duration-300 font-semibold"
                  >
                    View Projects
                    <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                    </div>
                  </a>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm mx-auto pt-4"
                >
                  <Stat label="Projects" value="12+" />
                  <Stat label="Hackathons" value="3" />
                  <Stat label="PRs" value="15+" />
                </motion.div>
              </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-2 gap-16 items-center min-h-screen py-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300/50 dark:border-neutral-700 text-sm font-medium"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl xl:text-5xl font-black leading-tight"
                  >
                    Hi, I'm{' '}
                    <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-gradient bg-300% dark:from-[#22D3EE] dark:via-[#6EE7B7] dark:to-[#22D3EE]">
                      Akshar
                    </span>{' '}
                    <span className="text-gray-700 dark:text-gray-200">Full-Stack Developer</span>
                  </motion.h1>
                </div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl"
                >
                  I craft exceptional digital experiences with modern technologies, 
                  turning ideas into scalable web applications that make a difference.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <a 
                    href="/resume.pdf" 
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-400/25 hover:scale-105 transition-all duration-300"
                  >
                    <Download size={20} />
                    Download Resume
                    <div className="w-0 group-hover:w-2 h-2 bg-black/20 rounded-full transition-all duration-300"></div>
                  </a>
                  <a 
                    href="#projects" 
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-gray-400 dark:border-neutral-600 hover:border-emerald-400 dark:hover:border-[#22D3EE] hover:bg-gray-200/50 dark:hover:bg-white/5 transition-all duration-300 font-semibold"
                  >
                    View Projects
                    <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                    </div>
                  </a>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="grid grid-cols-3 gap-6 max-w-md pt-4"
                >
                  <Stat label="Projects Shipped" value="12+" />
                  <Stat label="Hackathons" value="3" />
                  <Stat label="Open-source PRs" value="15+" />
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.8 }} 
                animate={{ opacity: 1, x: 0, scale: 1 }} 
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="flex justify-center xl:justify-end"
              >
                <div className="relative">
                  <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-3xl bg-gradient-to-br from-gray-100/90 to-gray-200/60 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-gray-300/30 dark:border-neutral-700 shadow-2xl overflow-hidden">
                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-emerald-400/20 via-transparent to-cyan-400/20 overflow-hidden">
                      <img 
                        src="/profile-placeholder.png" 
                        alt="Akshar Bhakare" 
                        className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-emerald-400/30 via-transparent to-cyan-400/30 bg-clip-border"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 snap-start py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-center">About</h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-center leading-relaxed mb-12 sm:mb-16 px-4">
                I'm a 3rd yr CSE student @DYPDPU... <br className="hidden sm:block"></br>
                I love to code and build websites and vibe code... <br className="hidden sm:block"></br>
                I've been focusing on Next.js and integrating AI tools to accelerate development...
              </p>

              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Tech Stack</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 max-w-4xl mx-auto">
                  {[
                    { name: 'JavaScript', icon: 'javascript.png' },
                    { name: 'TypeScript', icon: 'typescript.png' },
                    { name: 'React', icon: 'react.png' },
                    { name: 'Next.js', icon: 'nextjs.png' },
                    { name: 'Node.js', icon: 'nodejs.png' },
                    { name: 'MongoDB', icon: 'mongodb.png' },
                    { name: 'Postgres', icon: 'postgres.png' },
                    { name: 'Prisma', icon: 'prisma.png' },
                    { name: 'Tailwind CSS', icon: 'tailwind.png' },
                    { name: 'Framer Motion', icon: 'framer-motion.png' },
                    { name: 'Docker', icon: 'docker.png' },
                    { name: 'Git', icon: 'git.png' }
                  ].map((tech, index) => (
                    <motion.div 
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: "easeOut" 
                      }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.05,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-transparent dark:border-neutral-800 hover:bg-white/80 dark:hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 mb-1 sm:mb-2 flex items-center justify-center">
                        <img 
                          src={`/tech-icons/${tech.icon}`} 
                          alt={tech.name}
                          className="w-6 h-6 sm:w-10 sm:h-10 object-contain"
                          onError={(e) => {
                            // Fallback to a placeholder if image doesn't exist
                            const target = e.currentTarget as HTMLImageElement;
                            const sibling = target.nextElementSibling as HTMLElement;
                            target.style.display = 'none';
                            if (sibling) sibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg items-center justify-center text-white text-xs font-bold hidden"
                        >
                          {tech.name.charAt(0)}
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm text-center font-medium">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 snap-start py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-center">Projects</h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 text-center max-w-3xl mx-auto px-4">A selection of interactive builds. Hover or tap to reveal details, tech, and links.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {projects.map((p, i) => (
                  <ProjectCard key={p.name} project={p} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="h-screen flex items-center justify-center px-4 sm:px-6 snap-start">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pt-8 sm:pt-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 text-center">Get in touch</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 text-center max-w-2xl mx-auto px-4">Have an idea or opportunity? I'd love to hear about it.</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <form className="space-y-5 bg-white/80 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-neutral-700 shadow-lg shadow-black/5 dark:shadow-black/20">
                  <label className="block">
                    <span className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Your name</span>
                    <input 
                      required 
                      name="name" 
                      className="w-full rounded-lg p-3 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-neutral-600 focus:border-[#6EE7B7] dark:focus:border-[#22D3EE] focus:ring-2 focus:ring-[#6EE7B7]/20 dark:focus:ring-[#22D3EE]/20 outline-none transition-all duration-300 placeholder:text-gray-400" 
                      placeholder="Enter your full name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Email</span>
                    <input 
                      required 
                      name="email" 
                      type="email" 
                      className="w-full rounded-lg p-3 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-neutral-600 focus:border-[#6EE7B7] dark:focus:border-[#22D3EE] focus:ring-2 focus:ring-[#6EE7B7]/20 dark:focus:ring-[#22D3EE]/20 outline-none transition-all duration-300 placeholder:text-gray-400" 
                      placeholder="your.email@example.com"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Message</span>
                    <textarea 
                      required 
                      name="message" 
                      rows={4} 
                      className="w-full rounded-lg p-3 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-neutral-600 focus:border-[#6EE7B7] dark:focus:border-[#22D3EE] focus:ring-2 focus:ring-[#6EE7B7]/20 dark:focus:ring-[#22D3EE]/20 outline-none transition-all duration-300 resize-none placeholder:text-gray-400" 
                      placeholder="Tell me about your project or idea..."
                    ></textarea>
                  </label>
                  <div className="pt-1">
                    <button 
                      type="submit" 
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 font-semibold hover:shadow-lg hover:shadow-emerald-400/25 hover:scale-105 transition-all duration-300 mb-3"
                    >
                      <Mail size={16} />
                      Send Message
                    </button>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span>Or reach me directly at </span>
                      <a href="mailto:aksharbhakare@gmail.com" className="inline-flex items-center gap-1 text-emerald-500 dark:text-cyan-400 hover:underline font-medium"> 
                        <Mail size={12} /> 
                        email
                      </a>
                    </div>
                  </div>
                </form>

                <div className="space-y-4">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-gray-100/60 to-gray-200/40 dark:from-white/5 dark:to-transparent border border-gray-300/50 dark:border-neutral-800">
                    <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
                    <div className="space-y-3">
                      <a href="mailto:aksharbhakare@gmail.com" className="flex items-center gap-2.5 p-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-200/50 dark:hover:bg-white/5 transition"> 
                        <Mail size={18} /> 
                        <span className="text-sm">aksharbhakare@gmail.com</span>
                      </a>
                      <a href="https://www.linkedin.com/in/akshar-bhakare-ba6055292" className="flex items-center gap-2.5 p-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-200/50 dark:hover:bg-white/5 transition"> 
                        <Linkedin size={18} /> 
                        <span className="text-sm">LinkedIn</span>
                      </a>
                      <a href="https://x.com/aksharbhakare" className="flex items-center gap-2.5 p-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-200/50 dark:hover:bg-white/5 transition"> 
                        <Twitter size={18} /> 
                        <span className="text-sm">X</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-gray-100/60 to-gray-200/40 dark:from-white/5 dark:to-transparent border border-gray-300/50 dark:border-neutral-800">
                    <h5 className="text-base font-semibold mb-3">Location & Availability</h5>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                      📍 Based in Pune, Maharashtra<br/>
                      💼 Available for freelance projects<br/>
                      🎓 Open to internship opportunities
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }){
  return (
    <div className="text-center p-3 sm:p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-neutral-800">
      <div className="text-xl sm:text-2xl font-bold">{value}</div>
      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }){
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group rounded-2xl overflow-hidden bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-neutral-700 hover:border-emerald-400/30 dark:hover:border-cyan-400/30 hover:shadow-xl hover:shadow-emerald-400/10 dark:hover:shadow-cyan-400/10 transition-all duration-300"
      tabIndex={0}
    >
      {/* Project Screenshot */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
        <img 
          src={`/project-screenshots/${project.image}`} 
          alt={`${project.name} screenshot`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image doesn't exist
            const target = e.currentTarget as HTMLImageElement;
            const sibling = target.nextElementSibling as HTMLElement;
            target.style.display = 'none';
            if (sibling) sibling.style.display = 'flex';
          }}
        />
        <div className="w-full h-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium hidden">
          {project.name} Preview
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 group-hover:text-emerald-500 dark:group-hover:text-cyan-400 transition-colors">{project.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t: string) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 border border-emerald-400/30 dark:border-cyan-400/30 text-gray-700 dark:text-gray-200 font-medium">{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href={project.demo} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 font-medium hover:shadow-lg hover:shadow-emerald-400/25 hover:scale-105 transition-all duration-300 text-sm">
            <ExternalLink size={16} />
            Link
          </a>
          <a href={project.github} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-medium">
            <Github size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
