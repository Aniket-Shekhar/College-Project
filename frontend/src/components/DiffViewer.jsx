import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { X, FileCode, Plus, Minus } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function DiffViewer({ commitA, commitB, onClose }) {
  const [diff, setDiff] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (commitA && commitB) {
      fetchDiff()
    }
  }, [commitA, commitB])

  const fetchDiff = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(
        `${API_URL}/api/git/diff/${commitA}/${commitB}`
      )
      setDiff(response.data.diff)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load diff')
    } finally {
      setLoading(false)
    }
  }

  const parseDiff = (diffText) => {
    if (!diffText) return []
    
    const lines = diffText.split('\n')
    const chunks = []
    let currentChunk = null
    let currentFile = null

    lines.forEach((line, index) => {
      if (line.startsWith('diff --git')) {
        if (currentChunk) {
          chunks.push(currentChunk)
        }
        const fileMatch = line.match(/b\/(.+)/)
        currentFile = fileMatch ? fileMatch[1] : 'unknown'
        currentChunk = {
          file: currentFile,
          lines: [],
          additions: 0,
          deletions: 0
        }
      } else if (line.startsWith('@@')) {
        // Hunk header
        currentChunk.lines.push({ type: 'header', content: line, index })
      } else if (line.startsWith('+') && !line.startsWith('+++')) {
        currentChunk.lines.push({ type: 'addition', content: line, index })
        currentChunk.additions++
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        currentChunk.lines.push({ type: 'deletion', content: line, index })
        currentChunk.deletions++
      } else if (currentChunk) {
        currentChunk.lines.push({ type: 'context', content: line, index })
      }
    })

    if (currentChunk) {
      chunks.push(currentChunk)
    }

    return chunks
  }

  const diffChunks = parseDiff(diff)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col border border-neon-blue/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <FileCode className="w-5 h-5 text-neon-blue" />
            <div>
              <h2 className="text-lg font-semibold">Diff Viewer</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Comparing {commitA?.substring(0, 7)} → {commitB?.substring(0, 7)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neon-blue"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">{error}</div>
          ) : diffChunks.length === 0 ? (
            <div className="text-center py-20 text-slate-600 dark:text-slate-400">
              No differences found
            </div>
          ) : (
            <div className="space-y-6">
              {diffChunks.map((chunk, chunkIndex) => (
                <motion.div
                  key={chunkIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: chunkIndex * 0.1 }}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                >
                  <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold">{chunk.file}</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center space-x-1 text-green-500">
                        <Plus className="w-4 h-4" />
                        <span>{chunk.additions}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-red-500">
                        <Minus className="w-4 h-4" />
                        <span>{chunk.deletions}</span>
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-sm">
                    {chunk.lines.map((line, lineIndex) => (
                      <div
                        key={lineIndex}
                        className={`px-4 py-0.5 flex ${
                          line.type === 'addition'
                            ? 'bg-green-500/10 text-green-400'
                            : line.type === 'deletion'
                            ? 'bg-red-500/10 text-red-400'
                            : line.type === 'header'
                            ? 'bg-blue-500/10 text-blue-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className="w-12 text-right pr-4 text-slate-500 dark:text-slate-400">
                          {line.type === 'addition' && '+'}
                          {line.type === 'deletion' && '-'}
                        </span>
                        <span className="flex-1">{line.content}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

