import { useAuthStore } from '../stores/auth'

export function errorMessageString(statusCode) {
  if (statusCode === 404) {
    return 'Username or password is incorrect'
  }
}

export function isAuthenticated() {
  // Todo? check if user is authenticated using backend API
  const authStore = useAuthStore()
  return authStore.isLoggedIn
}
