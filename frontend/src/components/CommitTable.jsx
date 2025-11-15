import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, GitBranch, Calendar, Search, GitCompare } from 'lucide-react'
import DiffViewer from './DiffViewer'

export default function CommitTable({ commits, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [selectedCommits, setSelectedCommits] = useState([])
  const [showDiff, setShowDiff] = useState(false)

  const uniqueAuthors = [...new Set(commits.map(c => c.author))]

  const filteredCommits = commits.filter(commit => {
    const matchesSearch = 
      commit.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commit.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAuthor = !filterAuthor || commit.author === filterAuthor
    const matchesDate = !filterDate || 
      new Date(commit.date).toISOString().split('T')[0] === filterDate
    
    return matchesSearch && matchesAuthor && matchesDate
  })

  const toggleCommitSelection = (commitId) => {
    setSelectedCommits(prev => {
      if (prev.includes(commitId)) {
        return prev.filter(id => id !== commitId)
      } else if (prev.length < 2) {
        return [...prev, commitId]
      } else {
        return [prev[1], commitId]
      }
    })
  }

  const handleCompare = () => {
    if (selectedCommits.length === 2) {
      setShowDiff(true)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search commits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all hover:border-neon-blue/50"
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <select
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all hover:border-neon-blue/50"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all hover:border-neon-blue/50"
          />
        </div>
      </div>

      {/* Compare Button */}
      {selectedCommits.length === 2 && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleCompare}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-cyan transition-all shadow-lg hover:shadow-neon-blue/50"
        >
          <GitCompare className="w-4 h-4" />
          <span>Compare Selected Commits</span>
        </motion.button>
      )}

      {/* Commits List */}
      <div className="space-y-3">
        {filteredCommits.map((commit, index) => (
          <motion.div
            key={commit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.01, borderColor: 'rgba(0, 240, 255, 0.5)' }}
            className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 border-2 transition-all cursor-pointer ${
              selectedCommits.includes(commit.id)
                ? 'border-neon-blue shadow-lg shadow-neon-blue/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-neon-blue/30'
            }`}
            onClick={() => toggleCommitSelection(commit.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <code className="px-2 py-1 bg-neon-blue/10 text-neon-blue rounded text-sm font-mono border border-neon-blue/20">
                    {commit.shortId || commit.id.substring(0, 7)}
                  </code>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(commit.date).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{commit.message.split('\n')[0]}</h3>
                {commit.message.includes('\n') && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {commit.message.split('\n').slice(1).join(' ')}
                  </p>
                )}
              </div>
              {selectedCommits.includes(commit.id) && (
                <div className="w-6 h-6 rounded-full bg-neon-blue flex items-center justify-center text-white text-xs font-bold">
                  {selectedCommits.indexOf(commit.id) + 1}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <User className="w-4 h-4" />
                <span>{commit.author}</span>
              </div>
              {commit.branch && (
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                  <GitBranch className="w-4 h-4" />
                  <span>{commit.branch}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {showDiff && selectedCommits.length === 2 && (
        <DiffViewer
          commitA={selectedCommits[0]}
          commitB={selectedCommits[1]}
          onClose={() => {
            setShowDiff(false)
            setSelectedCommits([])
          }}
        />
      )}
    </div>
  )
}

