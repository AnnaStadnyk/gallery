import { defineStore } from 'pinia'
import axiosClient from "../axios"

export const useAuthStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    errors: null
  }),

  actions: {
    async register(data) {
      this.errors = null
      await axiosClient.get('/sanctum/csrf-cookie')
      try {
        await axiosClient.post('/register', data)
        await this.getUser()
        this.router.push({ name: 'uploadFile' })
      } catch (error) {
        if (error.response.status === 422) {
          this.setErrors(error.response.data.errors)
        }
      }
    },

    async login(data) {
      this.errors = null
      await axiosClient.get('/sanctum/csrf-cookie')
      try {
        await axiosClient.post('/login', data)
        await this.getUser()
        this.router.push({ name: 'uploadFile' })
      } catch (error) {
        if (error.response.status === 422) {
          this.setErrors(error.response.data.errors)
        }
      }
    },

    async logout() {
      await axiosClient.get('/sanctum/csrf-cookie')
      try {
        await axiosClient.post('/logout')
        this.deleteUser()
        this.router.push({ name: 'login' })
      } catch (error) {
        console.log(error);
      }
    },

    async getUser() {
      // await axiosClient.get('/sanctum/csrf-cookie')
      try {
        const response = await axiosClient.get('/api/user')
        this.user = { name: response.data.name, email: response.data.email }
        this.isLoggedIn = true
        sessionStorage.setItem('user', JSON.stringify(this.user))
        sessionStorage.setItem('isLoggedIn', this.isLoggedIn)
      } catch (error) {
        console.log(error);
      }
    },

    deleteUser() {
      this.user = null
      this.isLoggedIn = false
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('isLoggedIn')
    },

    tryLogin() {
      const user = sessionStorage.getItem('user')
      const isLoggedIn = sessionStorage.getItem('isLoggedIn')
      if (isLoggedIn) {
        this.user = JSON.parse(user)
        this.isLoggedIn = isLoggedIn
      }
    },

    setErrors(errors) {
      this.errors = {}
      for (const key in errors) {
        this.errors[key] = errors[key][0];
      }
    },

    cancelError(error) {
      if (this.errors && (Object.hasOwn(this.errors, error))) this.errors[error] = null
    },

    deleteErrors() {
      this.errors = {}
    },
  },
})