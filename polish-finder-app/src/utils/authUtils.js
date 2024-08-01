export function errorMessageString(statusCode) {
  if (statusCode === 404) {
    return 'Username or password is incorrect'
  }
}
