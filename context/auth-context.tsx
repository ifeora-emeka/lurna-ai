"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { AuthContextType, User, Session } from "@/types/auth.types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ 
  children, 
  initialUser 
}: { 
  children: React.ReactNode
  initialUser?: User | null
}) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(initialUser || null)
  const isLoading = status === "loading"

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id || "",
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      })
    } else {
      setUser(null)
    }
  }, [session])

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session: session as Session | null, 
        isLoading 
      }}
    >
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
