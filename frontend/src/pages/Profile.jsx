import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, TrendingUp, GitBranch, Code, Award } from 'lucide-react'
import Navbar from '../components/Navbar'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchProfile()
    fetchStats()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/profile`)
      setUser(response.data)
      setName(response.data.name || '')
      setEmail(response.data.email || '')
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/analytics/stats`)
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/api/users/profile`, { name, email })
      await fetchProfile()
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold glow-text mb-8">Profile</h1>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{user?.name || 'User'}</h2>
                  <p className="text-slate-600 dark:text-slate-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => editing ? handleUpdate() : setEditing(true)}
                className="px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-cyan transition-colors"
              >
                {editing ? 'Save' : 'Edit'}
              </button>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <User className="w-5 h-5 text-neon-blue" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Name</p>
                    <p className="font-semibold">{user?.name || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <Mail className="w-5 h-5 text-neon-blue" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <Calendar className="w-5 h-5 text-neon-blue" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Member Since</p>
                    <p className="font-semibold">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Repository Stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Repository Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Code className="w-8 h-8 text-neon-blue" />
                    <span className="text-3xl font-bold">{stats.totalCommits || 0}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">Total Commits</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <GitBranch className="w-8 h-8 text-neon-cyan" />
                    <span className="text-3xl font-bold">{stats.branches || 0}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">Branches</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 text-neon-purple" />
                    <span className="text-3xl font-bold">{stats.uniqueAuthors || 0}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">Contributors</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-8 h-8 text-yellow-500" />
                    <span className="text-3xl font-bold">{stats.healthScore || 0}%</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">Health Score</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

