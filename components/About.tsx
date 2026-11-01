'use client'

import { motion } from 'framer-motion'
import { Code2, Sparkles, Workflow, Brain } from 'lucide-react'

export default function About() {
  const passions = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Crafting pixel-perfect, responsive interfaces with modern frameworks and best practices.',
    },
    {
      icon: Sparkles,
      title: 'Full-Stack Development',
      description: 'Building end-to-end solutions from database design to interactive user experiences.',
    },
    {
      icon: Brain,
      title: 'AI Agents & Automation',
      description: 'Developing intelligent agents and RAG systems that automate complex workflows.',
    },
    {
      icon: Workflow,
      title: 'Modern Web Experiences',
      description: 'Creating immersive digital experiences that blend creativity with cutting-edge technology.',
    },
  ]

  return (
    <section id="about" className="relative py-32 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            About <span className="text-neon-blue">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A passionate developer dedicated to building innovative solutions where technology meets creativity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {passions.map((passion, index) => {
            const Icon = passion.icon
            return (
              <motion.div
                key={passion.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="interactive group relative p-8 bg-dark-card border border-gray-800 rounded-xl hover:border-neon-blue/50 transition-all duration-300"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-neon-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neon-blue/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-neon-blue transition-colors duration-300">
                    {passion.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {passion.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-neon-blue/10 to-transparent border border-neon-blue/30 rounded-xl"
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            I specialize in creating seamless digital experiences using cutting-edge technologies like{' '}
            <span className="text-neon-blue font-semibold">React, Next.js</span>, and modern AI tools.
            My passion lies in building{' '}
            <span className="text-neon-blue font-semibold">AI-powered applications</span> that solve
            real-world problems, from intelligent agents to RAG systems and automated workflows.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
