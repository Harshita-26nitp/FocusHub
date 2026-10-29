import { X } from 'lucide-react'
export default function Modal({ title, subtitle, onClose, children }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5 backdrop-blur-sm"><div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl sm:p-9"><div className="flex items-start justify-between"><div><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-2 text-sm text-slate-500">{subtitle}</p></div><button className="icon-button" onClick={onClose}><X size={18} /></button></div>{children}</div></div> }

