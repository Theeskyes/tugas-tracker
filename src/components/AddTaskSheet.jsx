import { useState, useRef, useEffect } from 'react'

const catSelectedClasses = {
  sekolah: 'bg-sekolahBg text-sekolah border-sekolah',
  freelance: 'bg-freelanceBg text-freelance border-freelance',
  pribadi: 'bg-pribadiBg text-pribadi border-pribadi',
}

export default function AddTaskSheet({ open, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [cat, setCat] = useState('sekolah')
  const [deadline, setDeadline] = useState('')
  const [errorShake, setErrorShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTitle('')
      setCat('sekolah')
      setDeadline('')
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [open])

  function handleSave() {
    const trimmed = title.trim()
    if (!trimmed) {
      setErrorShake(true)
      inputRef.current?.focus()
      setTimeout(() => setErrorShake(false), 400)
      return
    }
    onSave({ title: trimmed, cat, deadline: deadline || null })
  }

  return (
    <div
      className={`fixed inset-0 bg-black/55 flex items-end z-50 transition-opacity duration-200 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-surface rounded-t-[20px] w-full max-w-[480px] mx-auto p-5 pb-7 transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(.32,.72,0,1)' }}
      >
        <h2 className="text-base font-semibold mb-4">Tugas baru</h2>

        <div className="mb-3">
          <label className="text-xs text-textMuted block mb-1.5">Judul tugas</label>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Misal: Kerjain laporan VLSM"
            className={`w-full bg-surface2 border rounded-[10px] px-3 py-2.5 text-[14.5px] text-textMain focus:outline-none transition-colors ${
              errorShake ? 'border-danger' : 'border-border focus:border-borderStrong'
            }`}
          />
        </div>

        <div className="mb-3">
          <label className="text-xs text-textMuted block mb-1.5">Kategori</label>
          <div className="flex gap-1.5">
            {['sekolah', 'freelance', 'pribadi'].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`flex-1 text-center py-2.5 rounded-[10px] border text-[13px] capitalize transition-colors ${
                  cat === c ? catSelectedClasses[c] : 'border-border text-textSecondary'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="text-xs text-textMuted block mb-1.5">Deadline (opsional)</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full bg-surface2 border border-border rounded-[10px] px-3 py-2.5 text-[14.5px] text-textMain focus:outline-none focus:border-borderStrong"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-[11px] text-[14.5px] font-medium border border-border text-textSecondary active:scale-[0.97] transition-transform"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-[11px] text-[14.5px] font-medium bg-textMain text-bg active:scale-[0.97] transition-transform"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}
