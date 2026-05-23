'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type AuthUser = {
  id: string
  nomeCompleto: string
  email: string
  memberSince: string
  plano: 'Premium Anual' | 'Leitor Verificado'
  status: Array<'Assinante Premium' | 'Leitor Verificado'>
}

type AuthState = {
  user: AuthUser | null
  isAuthenticated: boolean
  setUser: (user: AuthUser) => void
  updateUser: (payload: Partial<AuthUser>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      setUser: user => {
        set({ user, isAuthenticated: true })
      },
      updateUser: payload => {
        set(state => {
          if (!state.user) {
            return state
          }

          return { user: { ...state.user, ...payload } }
        })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'portal-lumen-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
