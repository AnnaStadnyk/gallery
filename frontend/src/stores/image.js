import { defineStore } from 'pinia'
import axiosClient from "../axios"

export const useImageStore = defineStore('image', {
  state: () => ({
    images: [],
    errors: null,
    isLoading: false
  }),

  // getters: {
  //   getImageErrors: (state) => {
  //     const error = {}
  //     for (const key in state.errors) {
  //       if (String(key).includes('images.')) {
  //         error[key] = state.errors[key]
  //       }
  //     }
  //     return error
  //   }
  // },

  actions: {
    async upload(data) {
      this.errors = null

      const formData = new FormData()
      for (let i = 0; i < data.files.length; i++) {
        formData.append('files[' + i + ']', data.files[i])
      }
      formData.append('description', data.description)

      try {
        this.isLoading = true
        await axiosClient.post('/api/image', formData)
        // if (response.status === 201) {
        this.router.push({ name: 'gallery' })
        // }
      } catch (error) {
        if (error.response.status === 422) {
          this.setErrors(error.response.data.errors)
        }
      }
      finally {
        this.isLoading = false
      }
    },

    async getImages(page) {
      try {
        this.isLoading = true
        const response = await axiosClient.get(`/api/image?page=${page}`)
        this.images = response.data
        // if (!response.data.from && page > 1) {
        //   const response = await axiosClient.get(`/api/image?page=${page - 1}`)
        //   this.images = response.data
        // }
      } catch (error) {
        console.log(error);
      }
      finally {
        this.isLoading = false
      }
    },

    async deleteImage(id, page) {
      try {
        await axiosClient.delete(`/api/image/${id}`)
        await this.getImages(page)
      } catch (error) {
        console.log(error);
      }
    },

    setErrors(errors) {
      this.errors = {}
      // this.errors['files'] = {}
      for (const key in errors) {
        if (String(key).includes('files.')) { this.errors['files'] = errors[key][0] }
        else this.errors[key] = errors[key][0]
      }
    },

    cancelError(error) {
      if (this.errors && Object.hasOwn(this.errors, error)) this.errors[error] = null
    }
  },
})