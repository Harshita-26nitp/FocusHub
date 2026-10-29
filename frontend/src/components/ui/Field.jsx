export default function Field({ label, value, onChange, ...props }) { return <label className="mb-5 block text-sm font-medium text-slate-700">{label}<input className="input mt-2" value={value} onChange={(e) => onChange(e.target.value)} {...props} /></label> }

