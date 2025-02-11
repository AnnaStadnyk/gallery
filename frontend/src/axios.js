import axios from "axios"
import router from "./router";
import { useAuthStore } from "./stores/auth";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  withCredentials: true,
  withXSRFToken: true
})

// axiosClient.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
// })

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore()
    switch (error.response.status) {
      case 401:
        authStore.deleteUser()
        router.push({ name: 'login' })
        break;
      case 404:
        router.push({ name: '404' })
        break;
      case 419:
        authStore.deleteUser()
        router.push({ name: 'login' })
        break;
      case 500:
        router.push({ name: '500' })
        break;
    }
    return Promise.reject(error)
  })

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && (error.response.status === 401 || error.response.status === 419)) {
//       const authStore = useAuthStore()
//       authStore.deleteUser()
//       router.push({ name: 'login' })
//     }

//     throw error
//   })

export default axiosClient