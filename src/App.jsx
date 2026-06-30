import { useState, useEffect } from 'react'
import TaskCard from './components/TaskCard'
import AddTaskSheet from './components/AddTaskSheet'
import { uid, isOverdue, loadTasks, saveTasks, greeting } from './utils'

const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'sekolah', label: 'Sekolah' },
  { key: 'freelance', label: 'Freelance' },
  { key: 'pribadi', label: 'Pribadi' },
  { key: 'done', label: 'Selesai' },
]

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [removingId, setRemovingId] = useState(null)

  useEffect(() => { setTasks(loadTasks()) }, [])
  useEffect(() => { saveTasks(tasks) }, [tasks])

  function handleToggle(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function handleDelete(id) {
    setRemovingId(id)
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id))
      setRemovingId(null)
    }, 200)
  }

  function handleSave({ title, cat, deadline }) {
    setTasks((prev) => [{ id: uid(), title, cat, deadline, done: false }, ...prev])
    setSheetOpen(false)
  }

  const total = tasks.length
  const done = tasks.filter((t) => t.done).length
  const overdue = tasks.filter(isOverdue).length
  const progressPct = total === 0 ? 0 : Math.round((done / total) * 100)

  let filtered = tasks
  if (filter === 'done') filtered = tasks.filter((t) => t.done)
  else if (filter !== 'all') filtered = tasks.filter((t) => t.cat === filter)

  filtered = [...filtered].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    if (a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline)
    if (a.deadline) return -1
    if (b.deadline) return 1
    return 0
  })

  const todayLabel = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div className="min-h-screen bg-bg text-textMain">
      <div className="max-w-[480px] mx-auto px-4 pt-6 pb-28">

        {/* Header */}
        <header className="mb-6 animate-fadeDown">
          <p className="text-[13px] text-textMuted mb-0.5">{todayLabel}</p>
          <h1 className="text-2xl font-semibold tracking-tight">{greeting()}</h1>
        </header>

        {/* Progress */}
        {total > 0 && (
          <div className="bg-surface rounded-2xl p-4 mb-4 animate-fadeUp">
            <div className="flex justify-between items-baseline mb-2.5">
              <span className="text-[13px] text-textSecondary">Progress hari ini</span>
              <span className="text-[13px] font-medium text-textMain">{done} dari {total} selesai</span>
            </div>
            <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
              <div
                className="h-full bg-freelance rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {progressPct === 100 && (
              <p className="text-[12px] text-freelance mt-2">Semua beres! 🎉</p>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex gap-2 mb-5">
          <div className="flex-1 bg-surface rounded-2xl p-3 text-center">
            <span className="text-[18px] font-semibold text-textMain block">{total}</span>
            <span className="text-[11px] text-textMuted">total</span>
          </div>
          <div className="flex-1 bg-surface rounded-2xl p-3 text-center">
            <span className="text-[18px] font-semibold text-freelance block">{done}</span>
            <span className="text-[11px] text-textMuted">selesai</span>
          </div>
          <div className="flex-1 bg-surface rounded-2xl p-3 text-center">
            <span className={`text-[18px] font-semibold block ${overdue > 0 ? 'text-danger' : 'text-textMain'}`}>{overdue}</span>
            <span className="text-[11px] text-textMuted">lewat deadline</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto filters-scroll pb-0.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-none px-3.5 py-1.5 rounded-full text-[13px] whitespace-nowrap transition-all duration-200 active:scale-95 ${
                filter === f.key
                  ? 'bg-surface2 text-textMain border border-borderStrong'
                  : 'bg-transparent text-textMuted border border-border'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="text-center py-14 px-5 animate-fadeUp">
              <div className="text-4xl mb-3">
                {filter === 'done' ? '✅' : filter === 'sekolah' ? '📘' : filter === 'freelance' ? '💻' : filter === 'pribadi' ? '🛒' : '🗒️'}
              </div>
              <p className="text-textSecondary text-[14px] font-medium mb-1">
                {filter === 'done' ? 'Belum ada yang selesai.' : 'Hari ini masih kosong.'}
              </p>
              <p className="text-textMuted text-[13px]">
                {filter === 'done' ? 'Mulai centang tugas yang udah kelar.' : 'Tambah tugas pertama dan mulai produktif.'}
              </p>
            </div>
          ) : (
            filtered.map((task, i) => (
              <TaskCard
                key={task.id}
                task={task}
                index={i}
                removing={removingId === task.id}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-0 left-0 right-0 pt-6 pb-5 px-4 flex justify-center bg-gradient-to-t from-bg via-bg/90 to-transparent pointer-events-none">
        <button
          onClick={() => setSheetOpen(true)}
          className="pointer-events-auto w-full max-w-[448px] bg-surface2 border border-borderStrong text-textMain text-[14.5px] font-medium py-3.5 rounded-2xl flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Tambah tugas
        </button>
      </div>

      <AddTaskSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onSave={handleSave} />
    </div>
  )
}