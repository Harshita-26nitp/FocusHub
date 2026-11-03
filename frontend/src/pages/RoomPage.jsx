import { Check, Copy, ListChecks, MessageCircle, Pause, Play, RotateCcw, Send, TimerReset, Trash2, Wifi, WifiOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { env } from '../config/env'
import { focusApi, messageApi, roomApi, taskApi } from '../services/api'
import { createRoomSocket } from '../services/socket'
import { mockMessages, mockTasks } from '../data/mockData'

export default function RoomPage({ room, user, notify }) {
  const [roomData, setRoomData] = useState(room)
  const [tab, setTab] = useState('focus')
  const [tasks, setTasks] = useState(env.demoMode ? mockTasks : [])
  const [messages, setMessages] = useState(env.demoMode ? mockMessages : [])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [socketStatus, setSocketStatus] = useState(env.demoMode ? 'demo' : 'connecting')
  const [draft, setDraft] = useState('')
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [activeSession, setActiveSession] = useState(null)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setRoomData(room)
    setTasks(env.demoMode ? mockTasks : [])
    setMessages(env.demoMode ? mockMessages : [])
    setSeconds(25 * 60)
    setRunning(false)
    setActiveSession(null)

    if (env.demoMode) return undefined
    Promise.allSettled([roomApi.details(room._id), taskApi.list(room._id), messageApi.list(room._id)]).then(([details, taskResult, messageResult]) => {
      if (details.status === 'fulfilled') setRoomData(details.value)
      if (taskResult.status === 'fulfilled') setTasks(taskResult.value)
      if (messageResult.status === 'fulfilled') setMessages(messageResult.value)
    })
    return undefined
  }, [room])

  useEffect(() => {
    if (env.demoMode) return undefined
    const connection = createRoomSocket()
    const joinRoom = () => connection.emit('join-room', room._id)
    const handleMessage = (message) => setMessages((current) => current.some((item) => item._id === message._id) ? current : [...current, message])
    connection.on('connect', () => { setSocketStatus('connected'); joinRoom() })
    connection.on('disconnect', () => setSocketStatus('offline'))
    connection.on('connect_error', (error) => { setSocketStatus('error'); notify(`Chat connection failed: ${error.message}`) })
    connection.on('message-error', (error) => notify(error.message || 'Message could not be sent'))
    connection.on('online-users', setOnlineUsers)
    connection.on('user-online', (person) => setOnlineUsers((current) => current.some((item) => String(item.userId) === String(person.userId)) ? current : [...current, person]))
    connection.on('user-offline', (person) => setOnlineUsers((current) => current.filter((item) => String(item.userId) !== String(person.userId))))
    connection.on('new-message', handleMessage)
    setSocket(connection)
    return () => connection.disconnect()
  }, [room._id, notify])

  useEffect(() => {
    if (!running) return undefined
    const interval = window.setInterval(() => setSeconds((current) => {
      if (current <= 1) {
        window.clearInterval(interval)
        setRunning(false)
        if (activeSession?._id && !env.demoMode) focusApi.complete(activeSession._id).catch(() => {})
        notify('Focus session completed')
        return 0
      }
      return current - 1
    }), 1000)
    return () => window.clearInterval(interval)
  }, [running, activeSession, notify])

  const startTimer = async () => {
    if (running) { setRunning(false); return }
    try {
      if (!env.demoMode && !activeSession) setActiveSession(await focusApi.start(room._id, Math.ceil(seconds / 60)))
      setRunning(true)
    } catch (error) { notify(error.message) }
  }
  const resetTimer = async () => { if (activeSession?._id && !env.demoMode) await focusApi.cancel(activeSession._id).catch(() => {}); setActiveSession(null); setRunning(false); setSeconds(25 * 60) }
  const addTask = async (event) => { event.preventDefault(); const title = event.currentTarget.elements.title.value.trim(); if (!title) return; try { const task = env.demoMode ? { _id: Date.now().toString(), title, status: 'TODO', priority: 'MEDIUM' } : await taskApi.create(room._id, { title, priority: 'MEDIUM' }); setTasks((current) => [task, ...current]); event.currentTarget.reset() } catch (error) { notify(error.message) } }
  const toggleTask = async (task) => { try { const status = task.status === 'DONE' ? 'TODO' : 'DONE'; if (!env.demoMode) await taskApi.update(task._id, { status }); setTasks((current) => current.map((item) => item._id === task._id ? { ...item, status } : item)) } catch (error) { notify(error.message) } }
  const removeTask = async (task) => { try { if (!env.demoMode) await taskApi.remove(task._id); setTasks((current) => current.filter((item) => item._id !== task._id)); notify('Task removed') } catch (error) { notify(error.message) } }
  const sendMessage = (event) => { event.preventDefault(); const content = draft.trim(); if (!content) return; if (env.demoMode) setMessages((current) => [...current, { _id: Date.now(), sender: user, content, createdAt: new Date().toISOString() }]); else if (socket?.connected) socket.emit('send-message', { roomId: room._id, content }); else { notify('Chat is offline. Reconnect before sending a message.'); return } setDraft('') }
  const people = onlineUsers.length ? onlineUsers : (roomData.participants || [])
  const format = (value) => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`

  return <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-10 lg:py-10"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><p className="eyebrow">Focus room</p><h1 className="mt-2 text-3xl font-semibold">{roomData.name}</h1><p className="mt-3 text-sm text-slate-500">{people.length} people present · Hosted by {roomData.host?.fullName || user.fullName}</p></div><button className="button-secondary" onClick={() => { navigator.clipboard?.writeText(roomData._id); notify('Room ID copied') }}><Copy size={16} /> Copy room ID</button></div><div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]"><section><div className="mb-5 flex gap-1 rounded-xl bg-white p-1 ring-1 ring-slate-200 sm:w-fit">{[['focus', TimerReset, 'Focus'], ['tasks', ListChecks, 'Tasks'], ['chat', MessageCircle, 'Chat']].map(([id, Icon, label]) => <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${tab === id ? 'bg-violet-100 text-slate-700' : 'text-slate-500'}`}><Icon size={16} />{label}</button>)}</div>{tab === 'focus' && <FocusPanel seconds={seconds} format={format} running={running} start={startTimer} reset={resetTimer} />}{tab === 'tasks' && <TaskPanel tasks={tasks} addTask={addTask} toggleTask={toggleTask} removeTask={removeTask} />}{tab === 'chat' && <ChatPanel messages={messages} draft={draft} setDraft={setDraft} send={sendMessage} status={socketStatus} />}</section><aside><div className="panel"><div className="flex items-center justify-between"><h3 className="font-semibold">People present</h3>{socketStatus === 'connected' ? <span className="flex items-center gap-1 text-xs text-emerald-700"><Wifi size={13} /> Live</span> : <span className="flex items-center gap-1 text-xs text-slate-400"><WifiOff size={13} /> {socketStatus}</span>}</div>{people.length ? <div className="mt-5 space-y-4">{people.map((person, index) => { const name = person.fullName || person.username || 'Member'; return <div key={person.socketId || person._id || person.userId || index} className="flex items-center gap-3"><span className={`avatar avatar-${index % 4}`}>{name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><span className="flex-1 text-sm font-medium">{name}</span><span className="pulse-dot" /></div> })}</div> : <p className="mt-5 text-sm text-slate-500">No one is online yet.</p>}</div></aside></div></div>
}
function FocusPanel({ seconds, format, running, start, reset }) { return <div className="focus-panel relative overflow-hidden"><div className="relative flex flex-col items-center py-16"><p className="eyebrow">Shared focus timer</p><div className="timer-ring mt-8"><div className="timer-inner"><span className="text-7xl font-light text-slate-700">{format(seconds)}</span><span className="mt-2 text-xs uppercase tracking-[.2em] text-slate-500">{running ? 'In progress' : 'Ready when you are'}</span></div></div><div className="mt-10 flex gap-3"><button onClick={start} className="button-primary h-14 px-7">{running ? <Pause size={18} /> : <Play size={18} />}{running ? 'Pause session' : 'Start focus session'}</button><button onClick={reset} className="button-secondary h-14 px-4"><RotateCcw size={18} /></button></div></div></div> }
function TaskPanel({ tasks, addTask, toggleTask, removeTask }) { return <div className="panel"><p className="eyebrow">Room plan</p><h2 className="mt-1 text-2xl font-semibold">Shared tasks</h2><form onSubmit={addTask} className="mt-7 flex gap-2"><input name="title" className="input" placeholder="Add a task for the room..." /><button className="button-primary px-4">+</button></form>{tasks.length ? <div className="mt-6 divide-y divide-slate-100">{tasks.map((task) => <div key={task._id} className="flex items-start gap-3 py-4"><button onClick={() => toggleTask(task)} className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border ${task.status === 'DONE' ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 text-transparent'}`}><Check size={13} /></button><span className={`flex-1 text-sm font-semibold ${task.status === 'DONE' ? 'text-slate-400 line-through' : ''}`}>{task.title}</span><button onClick={() => removeTask(task)} className="icon-button text-slate-400 hover:text-red-600" title="Remove task"><Trash2 size={16} /></button></div>)}</div> : <p className="mt-6 text-sm text-slate-500">No tasks in this room yet.</p>}</div> }
function ChatPanel({ messages, draft, setDraft, send, status }) { return <div className="panel flex min-h-[560px] flex-col"><div className="flex items-center justify-between"><div><p className="eyebrow">Room conversation</p><h2 className="mt-1 text-2xl font-semibold">Chat</h2></div><span className="text-xs text-slate-500">{status === 'connected' ? 'Connected' : status}</span></div><div className="mt-7 flex-1 space-y-5">{messages.length ? messages.map((message) => <div key={message._id} className="flex gap-3"><span className="avatar avatar-small">{(message.sender?.fullName || 'M').slice(0, 2)}</span><div><b className="text-sm">{message.sender?.fullName || 'Member'}</b><p className="mt-1 rounded-2xl rounded-tl-sm bg-slate-50 px-4 py-3 text-sm text-slate-600">{message.content}</p></div></div>) : <p className="text-sm text-slate-500">No messages yet. Start the conversation.</p>}</div><form onSubmit={send} className="mt-7 flex gap-2 border-t border-slate-100 pt-5"><input className="input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Message the room..." /><button className="button-primary px-4"><Send size={17} /></button></form></div> }
