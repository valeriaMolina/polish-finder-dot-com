import axios from 'axios'
import config from '@/config'

const SERVER = config.SERVER

/**
 * Fetches a list of polishes from the server.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The maximum number of polishes to return per page.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the fetched polishes.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function fetchPolish(page, limit) {
  try {
    const request = await axios.get(`${SERVER}/polish/all?page=${page}&limit=${limit}`)
    return request.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch polishes')
  }
}
