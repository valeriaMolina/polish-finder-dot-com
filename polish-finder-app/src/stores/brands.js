import { defineStore } from 'pinia'
import axios from 'axios'

export const useBrandStore = defineStore('brands', {
  state: () => {
    return {
      brands: []
    }
  },
  actions: {
    async fetchAllBrands() {
      try {
        const response = await axios.get('http://localhost:8040/brands/all')
        this.brands = response.data
      } catch (error) {
        return error
      }
    }
  },
  getters: {
    getBrands(state) {
      return state.brands
    }
  }
})
