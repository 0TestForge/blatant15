"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface User {
  uid: string
  email: string | null
  displayName: string | null
}

interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  isAdmin: boolean
  photoURL: string | null
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  logout: () => Promise<void>
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("partyspace_user")
      const storedProfile = localStorage.getItem("partyspace_profile")

      if (storedUser && storedProfile) {
        const parsedUser = JSON.parse(storedUser)
        const parsedProfile = JSON.parse(storedProfile)
        setUser(parsedUser)
        setUserProfile(parsedProfile)
        setIsAdmin(parsedProfile.isAdmin || false)
      }
    } catch (error) {
      console.error("Error loading auth from storage:", error)
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Simulate authentication - in production, this would call Firebase
    // For now, we'll create a simple mock auth
    try {
      // Simple validation
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      // Create a mock user
      const uid = `user_${Date.now()}`
      const mockUser: User = {
        uid,
        email,
        displayName: email.split("@")[0],
      }

      const mockProfile: UserProfile = {
        uid,
        email,
        displayName: email.split("@")[0],
        isAdmin: false,
        photoURL: null,
      }

      // Store in localStorage
      localStorage.setItem("partyspace_user", JSON.stringify(mockUser))
      localStorage.setItem("partyspace_profile", JSON.stringify(mockProfile))

      setUser(mockUser)
      setUserProfile(mockProfile)
      setIsAdmin(false)
    } catch (error) {
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      if (!email || !password || !name) {
        throw new Error("All fields are required")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      const uid = `user_${Date.now()}`
      const mockUser: User = {
        uid,
        email,
        displayName: name,
      }

      const mockProfile: UserProfile = {
        uid,
        email,
        displayName: name,
        isAdmin: false,
        photoURL: null,
      }

      localStorage.setItem("partyspace_user", JSON.stringify(mockUser))
      localStorage.setItem("partyspace_profile", JSON.stringify(mockProfile))

      setUser(mockUser)
      setUserProfile(mockProfile)
      setIsAdmin(false)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem("partyspace_user")
      localStorage.removeItem("partyspace_profile")
      setUser(null)
      setUserProfile(null)
      setIsAdmin(false)
    } catch (error) {
      console.error("Error logging out:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, logout, isAdmin, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
