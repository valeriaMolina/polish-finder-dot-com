import config from '../config/index'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useBrandStore = defineStore('brands', {
  state: () => {
    return {
      brands: []
    }
  },
  persist: true,
  actions: {
    async fetchAllBrands() {
      // check if we have already called the API
      if (this.brands.length === 0) {
        try {
          const server = config.SERVER
          const response = await axios.get(`${server}/brands/all`)
          this.brands = response.data
        } catch (error) {
          return error
        }
      }
    }
  },
  getters: {
    getBrands(state) {
      return state.brands
    }
  }
})
