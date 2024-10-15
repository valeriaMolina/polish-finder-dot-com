/**
 * @author Valeria Molina Recinos
 */

import axios from 'axios'
import config from '@/config'

const SERVER = config.SERVER

export async function likePolish(userId, polishId) {
  try {
    const likeRequest = axios.create({
      baseURL: SERVER,
      method: 'post',
      data: {
        user_id: userId,
        polish_id: polishId
      }
    })
    const response = await likeRequest.post('/user-likes/like')
    return response.data
  } catch (error) {
    throw new Error('Failed to like polish')
  }
}
