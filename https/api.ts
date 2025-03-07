import axios from 'axios'

export const $axios = axios.create({
      baseURL: "https://my-dayly-tasks.onrender.com/api",
})

$axios.interceptors.request.use(
      (config) => {
            const token = localStorage.getItem('token')
            if (token) {
                  config.headers['Authorization'] = `Bearer ${token}`
            }

            return config
      },
      (error) => {
            return Promise.reject(error)
      }
)

$axios.interceptors.response.use(
      (response) => {
            return response
      },
      (error) => {
            if (error.response?.status === 401) {
                  localStorage.removeItem('token')
                  window.location.href = '/signin'
            }
            return Promise.reject(error)
      }
)