'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const projects = [
    {
      title: 'LAYR Hoodie',
      description: 'A premium e-commerce website for streetwear hoodies featuring smooth animations, product showcases, and modern design aesthetics.',
      category: 'E-Commerce',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      gradient: 'from-slate-600 via-slate-700 to-gray-800',
      github: 'https://github.com/umershahzaib',
      demo: 'https://layr-hoodie-website.vercel.app/',
    },
    {
      title: 'VYBE Soda',
      description: 'An energetic product landing page for a soda brand with vibrant visuals, interactive elements, and engaging user experience.',
      category: 'Landing Page',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'GSAP'],
      gradient: 'from-pink-600 via-rose-600 to-red-600',
      github: 'https://github.com/umershahzaib',
      demo: 'https://vybe-soda-website.vercel.app/',
    },
    {
      title: 'AI Chatbot',
      description: 'An intelligent conversational AI chatbot with natural language processing, context awareness, and real-time responses.',
      category: 'AI Application',
      tech: ['Next.js', 'AI API', 'TypeScript', 'Tailwind CSS'],
      gradient: 'from-blue-600 via-indigo-600 to-purple-600',
      github: 'https://github.com/umershahzaib',
      demo: 'https://ai-chatbot-ruho.vercel.app/chat',
    },
    {
      title: 'AI Interview Simulator',
      description: 'An intelligent interview preparation platform powered by AI that provides real-time feedback and personalized coaching.',
      category: 'AI Application',
      tech: ['React', 'Next.js', 'AI API', 'Tailwind CSS'],
      gradient: 'from-violet-600 via-purple-600 to-indigo-600',
      github: 'https://github.com/umershahzaib',
      demo: 'https://ai-interview-simulator-ivory.vercel.app/',
    },
    {
      title: 'CareerCraft AI',
      description: 'Advanced resume analysis tool using AI to provide actionable insights, keyword optimization, and ATS compatibility checks.',
      category: 'AI Application',
      tech: ['Next.js', 'OpenAI', 'TypeScript', 'Tailwind CSS'],
      gradient: 'from-emerald-600 via-green-600 to-teal-600',
      github: 'https://github.com/umershahzaib',
      demo: 'https://career-craft-ai-3-4oulp03hf-umershahjpi18-5520s-projects.vercel.app/',
    },
    {
      title: 'GameScope',
      description: 'A comprehensive gaming platform with real-time multiplayer features, leaderboards, and immersive 3D environments.',
      category: 'Gaming Platform',
      tech: ['React', 'Three.js', 'WebSocket', 'Node.js'],
      gradient: 'from-orange-600 via-red-600 to-rose-600',
      github: 'https://github.com/umershahzaib',
      demo: 'https://gamescope-umber.vercel.app/',
    },
    {
      title: 'PromptFlow',
      description: 'A sophisticated prompt engineering tool for AI workflows with version control, testing, and optimization features.',
      category: 'Developer Tool',
      tech: ['Next.js', 'AI Agents', 'PostgreSQL', 'Tailwind CSS'],
      gradient: 'from-fuchsia-600 via-purple-600 to-pink-600',
      github: 'https://github.com/umershahzaib',
      demo: 'https://promptflow-phi.vercel.app/',
    },
    {
      title: 'PHANTOM — 3D Sneaker',
      description: 'An immersive 3D e-commerce experience showcasing sneakers with interactive models, realistic materials, and smooth animations.',
      category: '3D Experience',
      tech: ['Three.js', 'React', 'GSAP', 'WebGL'],
      gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
      github: 'https://github.com/umershahzaib',
      demo: 'https://phantom-sneaker.vercel.app',
    },
  ]

  return (
    <section id="projects" className="relative py-32 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-neon-blue"></div>
            <span className="text-neon-blue text-sm font-medium tracking-wider uppercase">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Featured <span className="text-neon-blue">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            A curated collection of my recent work, showcasing expertise in modern web development,
            AI integration, and interactive experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative bg-dark-card border border-gray-800 rounded-2xl overflow-hidden hover:border-neon-blue/30 transition-all duration-500"
            >
              {/* Project Image/Gradient Area */}
              <div className="relative h-80 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}>
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Animated Grid Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                      backgroundSize: '50px 50px'
                    }} />
                  </div>

                  {/* Project Initial - Large Background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                        opacity: hoveredIndex === index ? 0.15 : 0.1
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-[20rem] font-bold text-white leading-none"
                    >
                      {project.title.charAt(0)}
                    </motion.div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/80 to-transparent"
                  />
                </div>
              </div>

              {/* Project Info */}
              <div className="relative p-8">
                {/* Title & Links */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive p-2 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300"
                      aria-label="View code"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive p-2 text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all duration-300"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-neon-blue/5 text-neon-blue border border-neon-blue/20 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex items-center gap-2 text-neon-blue font-medium group/link"
                >
                  <span>View Project</span>
                  <ArrowUpRight
                    size={18}
                    className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300"
                  />
                </a>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-neon-blue/30 rounded-tr-2xl" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/umershahzaib"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive inline-flex items-center gap-3 px-8 py-4 border-2 border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 font-semibold"
          >
            <Github size={20} />
            View More on GitHub
            <ArrowUpRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
