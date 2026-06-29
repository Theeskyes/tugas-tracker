export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function isOverdue(task) {
  if (!task.deadline || task.done) return false
  const d = new Date(task.deadline + 'T23:59:59')
  return d < new Date()
}

export function fmtDate(s) {
  const d = new Date(s + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

export function labelCat(c) {
  return { sekolah: 'Sekolah', freelance: 'Freelance', pribadi: 'Pribadi' }[c] || c
}

const STORAGE_KEY = 'tugas-tracker-data'

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (e) {
    console.error('Gagal nyimpen', e)
  }
}
