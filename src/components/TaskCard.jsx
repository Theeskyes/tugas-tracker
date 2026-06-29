import { isOverdue, fmtDate, labelCat } from '../utils'

const catTagClasses = {
  sekolah: 'bg-sekolahBg text-sekolah',
  freelance: 'bg-freelanceBg text-freelance',
  pribadi: 'bg-pribadiBg text-pribadi',
}

export default function TaskCard({ task, onToggle, onDelete, removing, index }) {
  return (
    <div
      className={`flex gap-3 items-start bg-surface border border-border rounded-2xl p-3.5 transition-all duration-200 animate-fadeUp ${
        removing ? 'opacity-0 scale-95 translate-x-5' : ''
      }`}
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <button
        onClick={() => onToggle(task.id)}
        aria-label="Tandai selesai"
        className={`w-[21px] h-[21px] rounded-[7px] border-[1.5px] flex-none mt-0.5 flex items-center justify-center transition-all duration-200 ${
          task.done ? 'bg-textSecondary border-textSecondary' : 'border-borderStrong bg-transparent'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-[13px] h-[13px] text-bg transition-all duration-200 ${
            task.done ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <div
          className={`text-[14.5px] leading-snug transition-colors duration-200 ${
            task.done ? 'text-textMuted line-through opacity-70' : 'text-textMain'
          }`}
        >
          {task.title}
        </div>
        <div className="flex gap-1.5 items-center mt-1.5 flex-wrap">
          <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-medium ${catTagClasses[task.cat]}`}>
            {labelCat(task.cat)}
          </span>
          {task.deadline && (
            <span className={`text-[11px] ${isOverdue(task) ? 'text-danger' : 'text-textMuted'}`}>
              {isOverdue(task) ? 'Lewat • ' : ''}
              {fmtDate(task.deadline)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        aria-label="Hapus"
        className="flex-none w-7 h-7 rounded-lg flex items-center justify-center text-textMuted hover:bg-surface2 hover:text-danger transition-colors duration-150"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6" />
        </svg>
      </button>
    </div>
  )
}
