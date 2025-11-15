import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { GitBranch, RefreshCw } from 'lucide-react'
import Navbar from '../components/Navbar'
import CommitTable from '../components/CommitTable'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Dashboard() {
  const [commits, setCommits] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentBranch, setCurrentBranch] = useState('')

  useEffect(() => {
    fetchCommits()
  }, [])

  const fetchCommits = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/git/commits`)
      setCommits(response.data.commits || [])
      setCurrentBranch(response.data.branch || 'main')
    } catch (error) {
      console.error('Error fetching commits:', error)
      setCommits([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold glow-text mb-2">Dashboard</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Explore your Git repository commit history
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchCommits}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/10 text-neon-blue rounded-lg hover:bg-neon-blue/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </motion.button>
          </div>

          {currentBranch && (
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <GitBranch className="w-4 h-4" />
              <span>Current branch: <span className="text-neon-blue font-semibold">{currentBranch}</span></span>
            </div>
          )}
        </motion.div>

        {/* Commits Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
          </div>
        ) : (
          <CommitTable commits={commits} onRefresh={fetchCommits} />
        )}
      </div>
    </div>
  )
}

