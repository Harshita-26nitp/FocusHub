import { io } from 'socket.io-client'
import { env } from '../config/env'

export function createRoomSocket() {
  return io(env.socketUrl, { auth: { token: localStorage.getItem('focushub_token') } })
}

