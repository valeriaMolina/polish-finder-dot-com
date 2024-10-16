/**
 * @author Valeria Molina Recinos
 */

import axios from 'axios'
import config from '@/config'

const SERVER = config.SERVER

export async function likePolish(email, polishId) {
  try {
    const likeRequest = axios.create({
      baseURL: SERVER,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    const response = await likeRequest.post('/user-likes/like', {
      email,
      polishId
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to like polish')
  }
}

export async function removeLike(email, polishId) {
  try {
    const unlikeRequest = axios.create({
      baseURL: SERVER,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    const response = await unlikeRequest.post('/user-likes/unlike', {
      email,
      polishId
    })
    if (response.status === 200) {
      return
    } else {
      throw new Error('Failed to unlike polish')
    }
  } catch (error) {
    throw error
  }
}

export async function getUserLikes(email) {
  try {
    const getLikesRequest = axios.create({
      baseURL: SERVER,
      method: 'get',
      withCredentials: true
    })
    const response = await getLikesRequest.get(`/user-likes/${email}/likes`)
    return response.data
  } catch (error) {
    throw new Error('Failed to get user likes')
  }
}
