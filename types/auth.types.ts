export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface Session {
  user: User
  expires: string
}

export interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
}
