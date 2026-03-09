export default defineNuxtRouteMiddleware(() => {

  if (!import.meta.client) return

  const token = localStorage.getItem("token")

  if (!token) {
    return navigateTo("/login")
  }

})