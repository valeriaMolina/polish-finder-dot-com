import { fetchPolish } from '@/apis/polishAPI'
import { defineStore } from 'pinia'

export const usePolishStore = defineStore('polish', {
  state: () => {
    return {
      polish: []
    }
  },
  persist: true,
  actions: {
    async fetchPolish(page, limit) {
      try {
        const polish = await fetchPolish(page, limit)
        this.polish = polish.polishes
      } catch (err) {
        console.error(err)
        throw new Error('Failed to fetch polishes')
      }
    }
  },
  getters: {
    getPolish(state) {
      return state.polish
    },
    getPolishById(state) {
      return (polishId) => state.polish.find((polish) => polish.polish_id === polishId)
    }
  }
})
