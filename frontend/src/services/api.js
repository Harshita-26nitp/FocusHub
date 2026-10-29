import { env } from '../config/env'

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('focushub_token')
  let response
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
      body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body,
    })
  } catch {
    throw new Error('Cannot connect to the backend. Start the backend on port 8000 and check MongoDB.')
  }
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.message || 'Request failed')
  return payload.data ?? payload
}
export const authApi = { login: (body) => apiRequest('/auth/login', { method: 'POST', body }), register: (body) => apiRequest('/auth/register', { method: 'POST', body }), me: () => apiRequest('/auth/me') }
export const roomApi = { list: () => apiRequest('/rooms'), mine: () => apiRequest('/rooms/my-rooms'), details: (id) => apiRequest(`/rooms/${id}`), create: (body) => apiRequest('/rooms', { method: 'POST', body }), join: (id) => apiRequest(`/rooms/${id}/join`, { method: 'POST' }), leave: (id) => apiRequest(`/rooms/${id}/leave`, { method: 'POST' }) }
export const taskApi = { list: (id) => apiRequest(`/rooms/${id}/tasks`), create: (id, body) => apiRequest(`/rooms/${id}/tasks`, { method: 'POST', body }), update: (id, body) => apiRequest(`/tasks/${id}`, { method: 'PUT', body }), remove: (id) => apiRequest(`/tasks/${id}`, { method: 'DELETE' }) }
export const messageApi = { list: (id) => apiRequest(`/rooms/${id}/messages`) }
export const focusApi = { list: (id) => apiRequest(`/rooms/${id}/focus-sessions`), start: (id, duration) => apiRequest(`/rooms/${id}/focus-sessions`, { method: 'POST', body: { duration } }), complete: (id) => apiRequest(`/focus-sessions/${id}/complete`, { method: 'PUT' }), cancel: (id) => apiRequest(`/focus-sessions/${id}/cancel`, { method: 'PUT' }) }
