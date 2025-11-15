import { motion } from 'framer-motion'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'

export default function Leaderboard({ contributors }) {
  if (!contributors || contributors.length === 0) {
    return (
      <div className="text-center py-12 text-slate-600 dark:text-slate-400">
        No contributor data available
      </div>
    )
  }

  // Handle both formats: {author, count} or {name, commits}
  const normalizedContributors = contributors.map(c => ({
    name: c.name || c.author,
    commits: c.commits || c.count,
    firstCommit: c.firstCommit,
    email: c.email
  }))

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan flex items-center justify-center text-white text-xs font-bold">
          {index + 1}
        </span>
    }
  }

  const maxCommits = normalizedContributors[0]?.commits || 1

  return (
    <div className="space-y-3">
      {normalizedContributors.slice(0, 10).map((contributor, index) => (
        <motion.div
          key={contributor.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, x: 5 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-neon-blue/50 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-shrink-0">
                {getRankIcon(index)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-semibold text-lg truncate">{contributor.name}</p>
                  {index < 3 && (
                    <span className="px-2 py-0.5 bg-neon-blue/10 text-neon-blue rounded text-xs font-semibold">
                      Top {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{contributor.commits} commits</span>
                  </span>
                  {contributor.firstCommit && (
                    <span>
                      Since {new Date(contributor.firstCommit).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-slate-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(contributor.commits / maxCommits) * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full"
                />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-blue">{contributor.commits}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">commits</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

