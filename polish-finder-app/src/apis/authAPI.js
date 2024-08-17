/**
 * @author Valeria Molina Recinos
 */
import config from '@/config'
import axiosInstance from '@/utils/axios'
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
    const instance = axiosInstance.create({
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

export async function sendLogout() {
  try {
    const instance = axiosInstance.create({
      baseURL: SERVER,
      method: 'post'
    })
    const res = await instance.post('/logout')
    return res
  } catch (error) {
    throw new Error(error.response.status)
  }
}

export async function sendRegister(username, password, email) {
  try {
    const instance = axiosInstance.create({
      baseURL: SERVER,
      method: 'post',
      data: {
        username,
        password,
        email
      }
    })
    const res = await instance.post('/signup')
  } catch (error) {
    throw new Error(error)
  }
}

export async function verifyUser(token) {
  try {
    const verifyRequest = axiosInstance.create({
      baseURL: SERVER,
      method: 'post',
      data: {
        mes: 'null'
      }
    })
    const res = await verifyRequest.post(`/verify?token=${token}`)
    return res
  } catch (error) {
    throw new Error(error)
  }
}
