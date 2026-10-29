import { useEffect, useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import AuthScreen from '../components/auth/AuthScreen'
import { CreateRoomModal, JoinRoomModal } from '../components/rooms/RoomModals'
import DashboardPage from '../pages/DashboardPage'
import RoomPage from '../pages/RoomPage'
import { env } from '../config/env'
import { authApi, roomApi } from '../services/api'
import { mockRooms, mockUser } from '../data/mockData'

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('focushub_user') || 'null'))
  const [authMode, setAuthMode] = useState('login')
  const [page, setPage] = useState('dashboard')
  const [rooms, setRooms] = useState(mockRooms)
  const [activeRoom, setActiveRoom] = useState(mockRooms[0])
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 3000) }

  useEffect(() => { if (user && !env.demoMode) roomApi.list().then(setRooms).catch((error) => notify(error.message)) }, [user])
  const authenticate = async (form) => { try { if (env.demoMode) { setUser({ ...mockUser, fullName: form.fullName || mockUser.fullName, email: form.email || mockUser.email, username: form.username || mockUser.username }); localStorage.setItem('focushub_user', JSON.stringify(mockUser)); return } const result = authMode === 'register' ? await authApi.register(form) : await authApi.login(form); const loggedIn = authMode === 'register' ? await authApi.login({ email: form.email, password: form.password }) : result; localStorage.setItem('focushub_token', loggedIn.token); localStorage.setItem('focushub_user', JSON.stringify(loggedIn.user)); setUser(loggedIn.user) } catch (error) { notify(error.message); throw error } }
  const createRoom = async (form) => { try { const room = env.demoMode ? { _id: `room-${Date.now()}`, ...form, participants: [{ _id: 'you' }], host: { fullName: user.fullName }, isSessionActive: false } : await roomApi.create(form); setRooms((current) => [room, ...current]); setActiveRoom(room); setPage('room'); setModal(null); notify('Your room is ready to go') } catch (error) { notify(error.message) } }
  const joinRoom = async (id) => { try { if (!env.demoMode) await roomApi.join(id); const room = rooms.find((item) => item._id === id) || rooms[0]; setActiveRoom(room); setPage('room'); setModal(null); notify('Joined room successfully') } catch (error) { notify(error.message) } }
  const openRoom = (room) => { setActiveRoom(room); setPage('room'); setSidebarOpen(false) }
  const logout = () => { localStorage.removeItem('focushub_user'); localStorage.removeItem('focushub_token'); setUser(null) }
  if (!user) return <AuthScreen mode={authMode} onSubmit={authenticate} onSwitch={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} error={toast} />
  return <div className="min-h-screen bg-[#f7f8fc] text-slate-900"><Sidebar page={page} rooms={rooms} onPage={setPage} onRoom={openRoom} onCreate={() => setModal('create')} onJoin={() => setModal('join')} open={sidebarOpen} setOpen={setSidebarOpen} /><main className="lg:pl-[260px]"><Topbar user={user} onLogout={logout} onMenu={() => setSidebarOpen(true)} />{page === 'dashboard' ? <DashboardPage rooms={rooms} user={user} onOpenRoom={openRoom} onCreate={() => setModal('create')} onJoin={() => setModal('join')} /> : <RoomPage room={activeRoom} user={user} notify={notify} />}</main>{modal === 'create' && <CreateRoomModal onClose={() => setModal(null)} onSubmit={createRoom} />}{modal === 'join' && <JoinRoomModal onClose={() => setModal(null)} onSubmit={joinRoom} />}{toast && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-2xl">{toast}</div>}</div>
}

