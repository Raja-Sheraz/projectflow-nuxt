import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'member'
}

export const useAuthStore = defineStore('auth', () => {

  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const users = ref<User[]>([])

  function loadUsers() {

    if (!import.meta.client) return

    const saved = localStorage.getItem('users')

    if (saved) {
      users.value = JSON.parse(saved)
    }

    /* Ensure admin always exists */

    const adminExists = users.value.some(
      u => u.email === "admin@gmail.com"
    )

    if (!adminExists) {

      users.value.push({
        id: 1,
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin"
      })

      localStorage.setItem("users", JSON.stringify(users.value))
    }

  }

  function register(name: string, email: string, password: string) {

    loadUsers()

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
      role: "member"
    }

    users.value.push(newUser)

    localStorage.setItem("users", JSON.stringify(users.value))

  }

  function login(email: string, password: string) {

    loadUsers()

    const foundUser = users.value.find(
      u => u.email === email && u.password === password
    )

    if (!foundUser) {
      alert("Invalid credentials")
      return
    }

    user.value = foundUser
    token.value = "demo-token"

    localStorage.setItem("token", token.value)
    localStorage.setItem("user", JSON.stringify(user.value))

  }

  function loadUser() {

    if (!import.meta.client) return

    const saved = localStorage.getItem("user")

    if (saved) {
      user.value = JSON.parse(saved)
    }

  }

  function logout() {

    user.value = null
    token.value = null

    localStorage.removeItem("token")
    localStorage.removeItem("user")

  }

  return {
    user,
    token,
    users,
    register,
    login,
    logout,
    loadUser
  }

})