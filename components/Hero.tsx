'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import InteractiveAvatar from './InteractiveAvatar'

export default function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, window.innerHeight + 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <p className="text-neon-blue text-sm md:text-base font-medium tracking-wider uppercase">
              Welcome to my portfolio
            </p>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight">
              UMER
              <br />
              <span className="text-neon-blue">SHAHZAIB</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap gap-2 text-sm md:text-base text-gray-300">
              <span className="px-3 py-1 bg-dark-card border border-neon-blue/30 rounded-full">
                Frontend Developer
              </span>
              <span className="px-3 py-1 bg-dark-card border border-neon-blue/30 rounded-full">
                Full-Stack Developer
              </span>
              <span className="px-3 py-1 bg-dark-card border border-neon-blue/30 rounded-full">
                AI Developer
              </span>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Building Digital Experiences at the{' '}
              <span className="text-neon-blue font-normal">Intersection of Code & AI</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="interactive px-8 py-3 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-blue/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="interactive px-8 py-3 border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue hover:text-dark-bg transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Right - Interactive Avatar with Eye Tracking */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-neon-blue/30 rounded-full blur-[60px] animate-glow" />

            {/* Floating Animation with Interactive Avatar */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
            >
              <InteractiveAvatar
                videoSrc="/assets/avatar.mp4"
                className="w-full h-full"
              />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-neon-blue/30 rounded-lg rotate-12" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-neon-blue/20 rounded-lg -rotate-12" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400 interactive cursor-pointer"
          onClick={() => {
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll Down</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
