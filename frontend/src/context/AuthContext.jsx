import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token is still valid by checking user
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // In a real app, you'd verify the token with the backend
      setUser({ token })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser({ ...user, token })
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        return { success: false, message: 'Cannot connect to server. Make sure the backend is running on port 5000.' }
      }
      return { success: false, message: error.response?.data?.message || error.message || 'Login failed' }
    }
  }

  const signup = async (email, password, name) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, { email, password, name })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser({ ...user, token })
      return { success: true }
    } catch (error) {
      console.error('Signup error:', error)
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        return { success: false, message: 'Cannot connect to server. Make sure the backend is running on port 5000.' }
      }
      return { success: false, message: error.response?.data?.message || error.message || 'Signup failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

