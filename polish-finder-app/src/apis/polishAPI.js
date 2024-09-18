import axiosInstance from '@/utils/axios'
import config from '@/config'

const SERVER = config.SERVER

export async function fetchPolish(page, limit) {
  try {
    const request = axiosInstance.create({
      baseUrl: SERVER,
      method: 'get'
    })
    const rest = await request.get(`/polish/all?page=${page}&limit=${limit}`)
    return rest.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch polishes')
  }
}
