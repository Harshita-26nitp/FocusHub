import { Zap } from 'lucide-react'
export default function Brand({ light = false }) { return <div className="flex items-center gap-2.5"><span className="brand-mark"><Zap size={18} fill="currentColor" /></span><span className={`text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>Focus<span className="text-violet-500">Hub</span></span></div> }

