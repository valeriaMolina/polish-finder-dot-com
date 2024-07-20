import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      isLoggedIn: false,
      user: {
        id: null,
        username: null,
        email: null,
        isAdmin: false
      }
    }
  },
  actions: {
    async userLogin(id, password) {
      // login logic goes here
      // TODO
    }
  }
})
