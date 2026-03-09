import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.NUXT_PUBLIC_API_BASE_URL,
  timeout: 5000
})

/* Request interceptor */

api.interceptors.request.use((config) => {

  if (import.meta.client) {

    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

  }

  return config

})

/* Response interceptor */

api.interceptors.response.use(

  (response) => {
    return response
  },

  (error) => {
    return Promise.reject(error)
  }

)

export default api