const USER_KEY = 'focushub_user'
const TOKEN_KEY = 'focushub_token'

export function getSessionUser() {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || 'null')
  } catch {
    return null
  }
}

export function saveSession({ user, token }) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
}

export function getSessionToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function clearSession() {
  sessionStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}
