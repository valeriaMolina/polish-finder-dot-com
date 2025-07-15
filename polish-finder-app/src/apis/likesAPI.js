/**
 * @author Valeria Molina Recinos
 */

import axiosInstance from '@/utils/axios'

/**
 * Protected endpoint that will be used to
 * like a polish
 * @param {*} email
 * @param {*} polishId
 * @returns
 */
export async function likePolish(email, polishId) {
  try {
    const response = await axiosInstance.post('/user-likes/like', {
      email,
      polishId
    })
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * This is a protected endpoint that will fail
 * if the access token is missing or invalid
 * @param {*} email
 * @param {*} polishId
 */
export async function removeLike(email, polishId) {
  try {
    await axiosInstance.post('/user-likes/unlike', {
      email,
      polishId
    })
  } catch (error) {
    throw error
  }
}

/**
 * This is a protected endpoint
 * if the accessToken is invalid the request will be rejected
 * @param {*} email
 * @returns
 */
export async function getUserLikes(email) {
  try {
    const response = await axiosInstance.get(`/user-likes/${email}/likes`)
    return response.data
  } catch (error) {
    throw error
  }
}
