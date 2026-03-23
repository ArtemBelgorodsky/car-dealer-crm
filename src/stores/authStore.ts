import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserRole } from '@/types'
import { mockUsers } from '@/mocks'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = (email: string, password: string) => {
    // Имитация логина - в реальном приложении это был бы API запрос
    const mockUser = mockUsers.find(u => u.email === email)
    if (mockUser) {
      user.value = mockUser
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('userRole', mockUser.role)
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
  }

  const setUser = (newUser: User) => {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const initAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch {
        logout()
      }
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    setUser,
    initAuth
  }
})
