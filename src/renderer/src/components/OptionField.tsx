import { useState, useEffect, useRef } from 'react'

export function OptionField({
  label,
  desc,
  compact,
  children
}: {
  label: string
  desc: string
  compact?: boolean
  children: React.ReactNode
}) {
  const [showDesc, setShowDesc] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showDesc) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDesc(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showDesc])

  return (
    <div className={compact ? '' : 'mb-4'} ref={ref}>
      <div className="flex items-center gap-1 mb-1">
        <label className="block text-xs text-slate-400">{label}</label>
        <button
          type="button"
          onClick={() => setShowDesc(!showDesc)}
          className="w-3.5 h-3.5 rounded-full bg-slate-600 hover:bg-slate-500 text-[9px] text-slate-300 flex items-center justify-center flex-shrink-0 transition"
        >
          ?
        </button>
      </div>
      {showDesc && (
        <p className="text-[11px] text-slate-400 bg-slate-700/60 rounded px-2 py-1.5 mb-1.5 leading-relaxed">
          {desc}
        </p>
      )}
      {children}
    </div>
  )
}
