import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { GitBranch, TrendingUp, GitMerge } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function BranchInsights() {
  const [branchData, setBranchData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBranchData()
  }, [])

  const fetchBranchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/git/branches`)
      setBranchData(response.data)
    } catch (error) {
      console.error('Error fetching branch data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
      </div>
    )
  }

  if (!branchData) {
    return (
      <div className="text-center py-12 text-slate-600 dark:text-slate-400">
        No branch data available
      </div>
    )
  }

  const chartData = Object.entries(branchData.commits || {}).map(([branch, commits]) => ({
    branch: branch.length > 15 ? branch.substring(0, 15) + '...' : branch,
    commits,
    fullName: branch
  }))

  return (
    <div className="space-y-6">
      {/* Branch Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <GitBranch className="w-8 h-8 text-neon-blue" />
            <span className="text-3xl font-bold">{branchData.branches?.length || 0}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Total Branches</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <GitMerge className="w-8 h-8 text-neon-cyan" />
            <span className="text-3xl font-bold text-neon-blue">{branchData.current || 'N/A'}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Current Branch</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-neon-purple" />
            <span className="text-3xl font-bold">
              {Object.values(branchData.commits || {}).reduce((a, b) => a + b, 0)}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Total Branch Commits</p>
        </motion.div>
      </div>

      {/* Branch Commits Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-xl font-semibold mb-4">Commits per Branch</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="branch" 
              stroke="#9ca3af"
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              formatter={(value, name, props) => [
                `${value} commits`,
                props.payload.fullName
              ]}
            />
            <Bar 
              dataKey="commits" 
              fill="#00f0ff"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Branch List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-xl font-semibold mb-4">All Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {branchData.branches?.map((branch, index) => (
            <motion.div
              key={branch}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`p-3 rounded-lg border-2 transition-all ${
                branch === branchData.current
                  ? 'border-neon-blue bg-neon-blue/10 shadow-lg shadow-neon-blue/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-neon-blue/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GitBranch className={`w-4 h-4 ${
                    branch === branchData.current ? 'text-neon-blue' : 'text-slate-400'
                  }`} />
                  <span className="font-mono text-sm">{branch}</span>
                </div>
                {branch === branchData.current && (
                  <span className="px-2 py-0.5 bg-neon-blue text-white rounded text-xs font-semibold">
                    Current
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {branchData.commits?.[branch] || 0} commits
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

