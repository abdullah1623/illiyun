// src/context/AuthContext.tsx
// Mock authentication context for UI flow.
// Ready to be replaced with Firebase Auth in production.

import React, { createContext, useContext, useState, useCallback } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Persist auth state across page refreshes
    const saved = localStorage.getItem('illiyun_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback(async (email: string, _password: string) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800))
    const mockUser: User = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
    }
    setUser(mockUser)
    localStorage.setItem('illiyun_user', JSON.stringify(mockUser))
  }, [])

  const register = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1000))
    const mockUser: User = { id: 'usr_' + Date.now(), name, email }
    setUser(mockUser)
    localStorage.setItem('illiyun_user', JSON.stringify(mockUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('illiyun_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
