import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Copy, Check, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'

const commands = [
  {
    category: 'Repository Setup',
    items: [
      {
        title: 'Clone a Repository',
        description: 'Download a repository from a remote location',
        command: 'git clone <repository-url>',
        example: 'git clone https://github.com/user/repo.git',
        explanation: 'This command creates a copy of the remote repository on your local machine.'
      },
      {
        title: 'Initialize a Repository',
        description: 'Start a new Git repository in your current directory',
        command: 'git init',
        example: 'git init',
        explanation: 'Creates a new .git directory to start tracking changes in your project.'
      }
    ]
  },
  {
    category: 'Basic Commands',
    items: [
      {
        title: 'Check Status',
        description: 'See what files have been changed',
        command: 'git status',
        example: 'git status',
        explanation: 'Shows which files are modified, staged, or untracked.'
      },
      {
        title: 'Add Files',
        description: 'Stage files for commit',
        command: 'git add <file>',
        example: 'git add .',
        explanation: 'Stages all changes. Use "git add <filename>" to stage specific files.'
      },
      {
        title: 'Commit Changes',
        description: 'Save your changes with a message',
        command: 'git commit -m "message"',
        example: 'git commit -m "Add new feature"',
        explanation: 'Creates a snapshot of your staged changes with a descriptive message.'
      }
    ]
  },
  {
    category: 'Pushing Code',
    items: [
      {
        title: 'Push to Remote',
        description: 'Upload your commits to a remote repository',
        command: 'git push <remote> <branch>',
        example: 'git push origin main',
        explanation: 'Sends your local commits to the remote repository on the specified branch.'
      },
      {
        title: 'Set Upstream',
        description: 'Link your local branch to a remote branch',
        command: 'git push -u origin <branch>',
        example: 'git push -u origin main',
        explanation: 'Sets the upstream branch and pushes your code in one command.'
      }
    ]
  },
  {
    category: 'Branching',
    items: [
      {
        title: 'Create Branch',
        description: 'Create a new branch for features',
        command: 'git branch <branch-name>',
        example: 'git branch feature/new-feature',
        explanation: 'Creates a new branch without switching to it.'
      },
      {
        title: 'Switch Branch',
        description: 'Move to a different branch',
        command: 'git checkout <branch-name>',
        example: 'git checkout main',
        explanation: 'Switches to the specified branch. Use "git checkout -b <name>" to create and switch.'
      },
      {
        title: 'Merge Branch',
        description: 'Combine changes from another branch',
        command: 'git merge <branch-name>',
        example: 'git merge feature/new-feature',
        explanation: 'Merges the specified branch into your current branch.'
      }
    ]
  },
  {
    category: 'Viewing History',
    items: [
      {
        title: 'View Log',
        description: 'See commit history',
        command: 'git log',
        example: 'git log --oneline',
        explanation: 'Shows commit history. Add --oneline for a compact view.'
      },
      {
        title: 'View Changes',
        description: 'See what changed in files',
        command: 'git diff',
        example: 'git diff',
        explanation: 'Shows the differences between your working directory and the staging area.'
      }
    ]
  }
]

export default function CommandHelper() {
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [expandedCategory, setExpandedCategory] = useState(null)

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Terminal className="w-10 h-10 text-neon-blue" />
            <h1 className="text-4xl font-bold glow-text">Command Helper</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Visual guide to essential Git commands with step-by-step explanations
          </p>
        </motion.div>

        <div className="space-y-6">
          {commands.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => setExpandedCategory(
                  expandedCategory === categoryIndex ? null : categoryIndex
                )}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <h2 className="text-xl font-semibold">{category.category}</h2>
                <motion.div
                  animate={{ rotate: expandedCategory === categoryIndex ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedCategory === categoryIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 space-y-6 border-t border-slate-200 dark:border-slate-700">
                      {category.items.map((item, itemIndex) => {
                        const uniqueIndex = `${categoryIndex}-${itemIndex}`
                        return (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-5"
                          >
                            <div className="mb-3">
                              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                {item.description}
                              </p>
                            </div>

                            <div className="bg-slate-900 rounded-lg p-4 mb-3 font-mono text-sm relative group">
                              <div className="flex items-center justify-between">
                                <code className="text-green-400">{item.command}</code>
                                <button
                                  onClick={() => copyToClipboard(item.command, uniqueIndex)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-800 rounded"
                                >
                                  {copiedIndex === uniqueIndex ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-slate-400" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {item.example && (
                              <div className="mb-3">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                  Example:
                                </p>
                                <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm">
                                  <code className="text-cyan-400">{item.example}</code>
                                </div>
                              </div>
                            )}

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                              <p className="text-sm text-slate-700 dark:text-slate-300">
                                {item.explanation}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 backdrop-blur-sm rounded-xl p-6 border border-neon-blue/20 text-center"
        >
          <p className="text-slate-700 dark:text-slate-300">
            💡 <strong>Tip:</strong> Click on any command to copy it to your clipboard!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

