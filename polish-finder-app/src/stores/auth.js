import { defineStore } from 'pinia'
import { sendLogin, sendLogout } from '@/apis/authAPI'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')) || null,
    username: JSON.parse(localStorage.getItem('user'))?.userName || null,
    email: JSON.parse(localStorage.getItem('user'))?.userEmail || null
  }),
  actions: {
    async login(username, password) {
      try {
        const user = await sendLogin(username, password)
        this.isLoggedIn = true
        this.user = user
        this.username = user.userName
        this.email = user.userEmail
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('username', user.userName)
        localStorage.setItem('email', user.userEmail)
        return user
      } catch (error) {
        this.isLoggedIn = false
        this.user = null
        if (error.message === '404') {
          throw new Error('Username or password is incorrect')
        } else {
          console.error(error)
          throw new Error('An error occurred while trying to login')
        }
      }
    },
    async logout() {
      try {
        await sendLogout()
        this.isLoggedIn = false
        this.user = null
        localStorage.setItem('isLoggedIn', false)
        localStorage.removeItem('user')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
      } catch (error) {
        throw new Error('An error occurred while trying to logout: ', error.message)
      }
    }
  },
  getters: {
    getUsername: (state) => state.username,
    getEmail: (state) => state.email
  }
})
