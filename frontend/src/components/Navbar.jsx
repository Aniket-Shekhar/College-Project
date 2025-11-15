import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun, LogOut, GitBranch } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/commands', label: 'Commands' },
    { path: '/about', label: 'About' },
    { path: '/profile', label: 'Profile' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <GitBranch className="w-6 h-6 text-neon-blue" />
            <span className="text-xl font-bold glow-text">Git Explorer</span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 md:px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? 'text-neon-blue bg-neon-blue/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-neon-blue'
                }`}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.substring(0, 4)}</span>
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user && (
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

