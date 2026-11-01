'use client'

import { motion } from 'framer-motion'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'JavaScript', level: 92 },
        { name: 'HTML & CSS', level: 95 },
        { name: 'Tailwind CSS', level: 93 },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'REST APIs', level: 88 },
        { name: 'Express.js', level: 82 },
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'AI & Automation',
      skills: [
        { name: 'AI Agents', level: 90 },
        { name: 'RAG Systems', level: 88 },
        { name: 'Agentic AI', level: 87 },
        { name: 'AI Workflows', level: 92 },
        { name: 'Automation', level: 90 },
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git & GitHub', level: 93 },
        { name: 'VS Code', level: 95 },
        { name: 'Claude Code', level: 90 },
        { name: 'Responsive Design', level: 94 },
      ],
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section id="skills" className="relative py-32 bg-gradient-to-b from-dark-card to-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Technical <span className="text-neon-blue">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, AI-powered web applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-card border border-gray-800 rounded-xl p-8 hover:border-neon-blue/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">
                {category.title}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-neon-blue text-sm font-semibold">{skill.level}%</span>
                    </div>

                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: 'easeOut',
                        }}
                        viewport={{ once: true }}
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.color} rounded-full`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            { number: '20+', label: 'Projects Completed' },
            { number: '5+', label: 'Technologies Mastered' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-dark-card border border-gray-800 rounded-xl hover:border-neon-blue/30 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-neon-blue mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
