import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'member'
}

export const useAuthStore = defineStore('auth', () => {

  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  function login(email: string, password: string) {

    if (email === 'admin@gmail.com' && password === 'admin123') {

      user.value = {
        id: 1,
        name: 'Admin',
        email,
        role: 'admin'
      }

    } else {

      user.value = {
        id: 2,
        name: 'Member',
        email,
        role: 'member'
      }

    }

    token.value = 'demo-token'

    if (import.meta.client) {
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  function loadUser() {

    if (!import.meta.client) return

    const saved = localStorage.getItem('user')

    if (saved) {
      user.value = JSON.parse(saved)
    }
  }

  function logout() {

    user.value = null
    token.value = null

    if (import.meta.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  return {
    user,
    token,
    login,
    logout,
    loadUser
  }

})