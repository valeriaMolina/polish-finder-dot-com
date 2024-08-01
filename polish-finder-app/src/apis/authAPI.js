/**
 * @author Valeria Molina Recinos
 */
import config from '@/config'
import axios from 'axios'
import base64 from 'base-64'

const SERVER = config.SERVER

export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` }
  } else {
    return {}
  }
}

export async function sendLogin(username, password) {
  try {
    const instance = axios.create({
      baseURL: SERVER,
      headers: { Authorization: `Basic ${base64.encode(`${username}:${password}`)}` },
      method: 'post',
      data: {
        username
      }
    })
    const res = await instance.post('/login')
    localStorage.setItem('user', JSON.stringify(res.data))
    return res.data
  } catch (err) {
    throw new Error(err.response.status)
  }
}

export function logout() {
  localStorage.removeItem('user')
}
