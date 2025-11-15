import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { TrendingUp, Users, GitBranch, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar'
import Charts from '../components/Charts'
import Leaderboard from '../components/Leaderboard'
import BranchInsights from '../components/BranchInsights'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Analytics() {
  const [stats, setStats] = useState(null)
  const [aiSummary, setAiSummary] = useState('')
  const [loading, setLoading] = useState(true)
  const [summaryLoading, setSummaryLoading] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/analytics/stats`)
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSummary = async () => {
    try {
      setSummaryLoading(true)
      const commitsResponse = await axios.get(`${API_URL}/api/git/commits`)
      const commits = commitsResponse.data.commits || []
      
      const summaryResponse = await axios.post(`${API_URL}/api/analytics/summarize`, {
        commits: commits.slice(0, 20)
      })
      setAiSummary(summaryResponse.data.summary)
    } catch (error) {
      console.error('Error generating summary:', error)
      setAiSummary('Unable to generate AI summary. Please configure OpenAI API key.')
    } finally {
      setSummaryLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold glow-text mb-8">Analytics</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-neon-blue" />
                <span className="text-3xl font-bold">{stats?.totalCommits || 0}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Total Commits</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-neon-cyan" />
                <span className="text-3xl font-bold">{stats?.uniqueAuthors || 0}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Contributors</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <GitBranch className="w-8 h-8 text-neon-purple" />
                <span className="text-3xl font-bold">{stats?.branches || 0}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Branches</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-neon-blue/20 animate-ping"></div>
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan"></div>
                </div>
                <span className="text-3xl font-bold">{stats?.healthScore || 0}%</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Health Score</p>
            </motion.div>
          </div>

          {/* Charts */}
          <Charts stats={stats} />

          {/* Branch Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Branch Insights</h2>
            <BranchInsights />
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Contributor Leaderboard</h2>
            <Leaderboard contributors={stats?.authorStats || []} />
          </motion.div>

          {/* AI Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 backdrop-blur-sm rounded-xl p-6 border border-neon-blue/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-neon-blue" />
                <span>AI Commit Summary</span>
              </h2>
              <button
                onClick={generateSummary}
                disabled={summaryLoading}
                className="px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {summaryLoading ? 'Generating...' : 'Generate Summary'}
              </button>
            </div>
            {aiSummary ? (
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{aiSummary}</p>
            ) : (
              <p className="text-slate-600 dark:text-slate-400">
                Click "Generate Summary" to get an AI-powered analysis of your recent commits.
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

