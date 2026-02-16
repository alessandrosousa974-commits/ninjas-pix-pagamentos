import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Professional, Company, UserType } from '@/types'

interface AuthContextType {
  user: Professional | Company | null
  userType: UserType | null
  isAuthenticated: boolean
  login: (email: string, password: string, type: UserType) => Promise<void>
  logout: () => void
  register: (data: any, type: UserType) => Promise<void>
  updateProfile: (data: Partial<Professional | Company>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Professional | Company | null>(null)
  const [userType, setUserType] = useState<UserType | null>(null)

  useEffect(() => {
    // Carregar dados do localStorage
    const savedUser = localStorage.getItem('ninjas_user')
    const savedType = localStorage.getItem('ninjas_user_type')

    if (savedUser && savedType) {
      setUser(JSON.parse(savedUser))
      setUserType(savedType as UserType)
    }
  }, [])

  const login = async (email: string, _password: string, type: UserType) => {
    // Simulação de login - aqui você integraria com backend/Supabase
    // Por enquanto, busca do localStorage para demo
    const mockUser: any = {
      id: '1',
      name: 'Usuário Demo',
      email,
      phone: '(11) 99999-9999',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (type === 'professional') {
      mockUser.category = 'sushiman'
      mockUser.hourlyRate = 80
      mockUser.experience = 5
      mockUser.rating = 4.8
      mockUser.totalJobs = 150
      mockUser.available = true
    } else if (type === 'company') {
      mockUser.cnpj = '12.345.678/0001-90'
      mockUser.cnpjVerified = true
      mockUser.type = 'restaurante'
      mockUser.rating = 4.5
    }

    setUser(mockUser)
    setUserType(type)
    localStorage.setItem('ninjas_user', JSON.stringify(mockUser))
    localStorage.setItem('ninjas_user_type', type)
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem('ninjas_user')
    localStorage.removeItem('ninjas_user_type')
  }

  const register = async (data: any, type: UserType) => {
    // Aqui você implementaria o registro real
    // Incluindo upload de documentos, biometria, etc
    const newUser: any = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (type === 'professional') {
      newUser.qrCode = `NINJAS-${Date.now()}`
      newUser.rating = 0
      newUser.totalJobs = 0
      newUser.available = true
      newUser.banned = false
    }

    setUser(newUser)
    setUserType(type)
    localStorage.setItem('ninjas_user', JSON.stringify(newUser))
    localStorage.setItem('ninjas_user_type', type)
  }

  const updateProfile = async (data: Partial<Professional | Company>) => {
    if (!user) return

    const updatedUser = { ...user, ...data, updatedAt: new Date() }
    setUser(updatedUser)
    localStorage.setItem('ninjas_user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
