import { motion } from 'framer-motion'
import { GitBranch, Code, Heart, Users } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function About() {
  const features = [
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: 'Git Visualization',
      description: 'Explore your repository history with beautiful, interactive visualizations.'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'AI-Powered Insights',
      description: 'Get intelligent summaries and analysis of your commit patterns.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Team Analytics',
      description: 'Track contributor activity and project health metrics.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Open Source',
      description: 'Built with modern technologies and best practices.'
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-neon-blue/20 rounded-full blur-xl animate-pulse"></div>
              <GitBranch className="w-24 h-24 text-neon-blue relative" />
            </div>
          </motion.div>
          <h1 className="text-5xl font-bold glow-text mb-4">Git History Explorer</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A modern, AI-powered tool for visualizing and analyzing Git repository history.
            Transform your commit data into beautiful insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-neon-blue/50 transition-all"
            >
              <div className="text-neon-blue mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 backdrop-blur-sm rounded-xl p-8 border border-neon-blue/20 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Built With</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">React</span>
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">Vite</span>
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">TailwindCSS</span>
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">Framer Motion</span>
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">Recharts</span>
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">Node.js</span>
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">Express</span>
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">MongoDB</span>
            <span className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">OpenAI</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-slate-600 dark:text-slate-400"
        >
          <p>Made with ❤️ for developers who love beautiful data visualization</p>
        </motion.div>
      </div>
    </div>
  )
}

